export default function handler(req, res) {
  // Устанавливаем статус 404
  res.status(404);
  
  // Читаем содержимое страницы ошибки
  const fs = require('fs');
  const path = require('path');
  
  try {
    const errorPagePath = path.join(process.cwd(), 'page64027043.html');
    const errorPageContent = fs.readFileSync(errorPagePath, 'utf8');
    
    // Устанавливаем правильные заголовки
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(errorPageContent);
  } catch (error) {
    // Если не удалось прочитать страницу ошибки, отправляем простую 404
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>404 - Страница не найдена</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <h1>404 - Страница не найдена</h1>
          <p>Запрашиваемая страница не существует.</p>
          <a href="/">Вернуться на главную</a>
        </body>
      </html>
    `);
  }
}
