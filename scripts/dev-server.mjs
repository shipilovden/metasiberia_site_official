import http from "node:http";
import path from "node:path";
import { promises as fs } from "node:fs";

const ROOT_DIR = process.cwd();
const DEFAULT_PORT = 8000;
const DEFAULT_HOST = "127.0.0.1";
const FALLBACK_ERROR_PAGE = "/page64027043.html";
const SAME_SITE_URL_PATTERN = /https?:\/\/(?:www\.)?metasiberia\.com(?=\/)/gi;
const REWRITE_MAP = new Map([
  ["/", "/page62281087.html"],
  ["/faq", "/page62442585.html"],
  ["/faq/", "/page62442585.html"],
  ["/terms", "/page63809043.html"],
  ["/terms/", "/page63809043.html"],
  ["/lua", "/page63810393.html"],
  ["/lua/", "/page63810393.html"],
  ["/scripts", "/page63811825.html"],
  ["/scripts/", "/page63811825.html"],
  ["/store", "/page63813121.html"],
  ["/store/", "/page63813121.html"],
  ["/header", "/page64026745.html"],
  ["/header/", "/page64026745.html"],
  ["/footer", "/page64026811.html"],
  ["/footer/", "/page64026811.html"],
  ["/error", "/page64027043.html"],
  ["/error/", "/page64027043.html"],
  ["/morpher", "/page64103135.html"],
  ["/morpher/", "/page64103135.html"],
]);

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

const getContentType = (filePath) =>
  MIME_TYPES[path.extname(filePath).toLowerCase()] ||
  "application/octet-stream";

const toSafePath = (requestPath) => {
  const relativePath = requestPath.replace(/^\/+/, "");
  const absolutePath = path.resolve(ROOT_DIR, relativePath);

  if (
    absolutePath !== ROOT_DIR &&
    !absolutePath.startsWith(`${ROOT_DIR}${path.sep}`)
  ) {
    return null;
  }

  return absolutePath;
};

const rewriteHtmlForLocalPreview = (html) =>
  html.replace(SAME_SITE_URL_PATTERN, "");

const serveFile = async ({ filePath, response, statusCode, htmlTransform }) => {
  const buffer = await fs.readFile(filePath);
  const contentType = getContentType(filePath);

  response.statusCode = statusCode;
  response.setHeader("Content-Type", contentType);

  if (contentType.startsWith("text/html")) {
    response.end(htmlTransform(buffer.toString("utf8")));
    return;
  }

  response.end(buffer);
};

const createServer = async () => {
  const knownRoutes = [...REWRITE_MAP.keys()];

  return http.createServer(async (request, response) => {
    if (!request.url) {
      response.statusCode = 400;
      response.end("Bad Request");
      return;
    }

    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    const requestedPath = decodeURIComponent(url.pathname);
    const rewrittenPath = REWRITE_MAP.get(requestedPath) || requestedPath;
    const filePath = toSafePath(rewrittenPath);

    if (!filePath) {
      response.statusCode = 403;
      response.end("Forbidden");
      return;
    }

    try {
      const stat = await fs.stat(filePath);

      if (stat.isFile()) {
        await serveFile({
          filePath,
          response,
          statusCode: 200,
          htmlTransform: rewriteHtmlForLocalPreview,
        });
        return;
      }
    } catch {
      // Fall through to the local 404 page below.
    }

    const errorPagePath = toSafePath(FALLBACK_ERROR_PAGE);

    if (errorPagePath) {
      try {
        await serveFile({
          filePath: errorPagePath,
          response,
          statusCode: 404,
          htmlTransform: rewriteHtmlForLocalPreview,
        });
        return;
      } catch {
        // Fall through to plain-text 404.
      }
    }

    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end("Not Found");
  }).on("listening", () => {
    const host = process.env.HOST || DEFAULT_HOST;
    const port = Number(process.env.PORT || DEFAULT_PORT);

    console.log(`[dev-server] Metasiberia one local preview is running.`);
    console.log(`[dev-server] Open http://${host}:${port}/`);
    console.log(
      `[dev-server] Clean routes: ${knownRoutes.join(", ")}`
    );
  });
};

const host = process.env.HOST || DEFAULT_HOST;
const port = Number(process.env.PORT || DEFAULT_PORT);
const server = await createServer();

server.listen(port, host);
