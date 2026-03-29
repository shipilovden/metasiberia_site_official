(function() {
  if (window.__METASIBERIA_CHATBOT__) {
    return;
  }

  window.__METASIBERIA_CHATBOT__ = true;

  var STORAGE_KEY = "metasiberia.site.language";
  var STYLE_ID = "metasiberia-chatbot-styles";
  var ROOT_ID = "metasiberia-chatbot-root";
  var MESSAGES_ID = "metasiberia-chatbot-messages";
  var INPUT_ID = "metasiberia-chatbot-input";
  var CHAT_LINK_SELECTOR =
    '#rec872696359 a.t-menu__link-item[data-menu-item-number="9"], ' +
    '#rec872696359 a[href="#popup:embedcode"], ' +
    '#rec872696359 a[href="/#popup:embedcode"]';

  var UI_COPY = {
    ru: {
      kicker: "[chat-bot]",
      title: "Чат-бот Metasiberia",
      subtitle: "Локальный помощник по разделам сайта",
      label: "Сообщение",
      placeholder: "Спроси про МетаСибирь",
      send: "Отправить",
      close: "Закрыть чат",
      welcome: "Привет. Спроси про МетаСибирь.",
      fallback:
        "Пока я лучше всего подсказываю про участки, магазин, FAQ, карту, scripting, вебклиент, новости и основные ссылки проекта.",
      empty: "Введите сообщение перед отправкой."
    },
    en: {
      kicker: "[chat-bot]",
      title: "Metasiberia chat-bot",
      subtitle: "Local assistant for the website sections",
      label: "Message",
      placeholder: "Ask about Metasiberia",
      send: "Send",
      close: "Close chat",
      welcome: "Hi. Ask about Metasiberia.",
      fallback:
        "Right now I am best at guiding you through parcels, store, FAQ, map, scripting, the web client, news, and the main project links.",
      empty: "Type a message before sending."
    }
  };

  var BOT_TOPICS = [
    {
      keywords: ["привет", "здрав", "hello", "hi", "hey"],
      response: {
        ru: "Привет. Спроси про МетаСибирь.",
        en: "Hi. Ask about Metasiberia."
      },
      links: []
    },
    {
      keywords: ["участ", "parcel", "parsel", "parsel", "парсел", "парсель"],
      response: {
        ru: "Раздел с участками находится на главной странице. Там объясняется, как устроены parcels и почему стоит следить за новостями о магазине.",
        en: "The parcels section lives on the homepage. It explains how parcels work and why it is worth watching the store and news updates."
      },
      links: [
        {
          href: "/#parsels",
          label: { ru: "[К участкам]", en: "[Go to parcels]" }
        },
        {
          href: "/news",
          label: { ru: "[Новости]", en: "[News]" }
        }
      ]
    },
    {
      keywords: ["магаз", "store", "shop"],
      response: {
        ru: "Магазин вынесен в отдельный раздел /store. Именно там будут появляться витрины, лоты и следующие точки входа в коммерческую часть сайта.",
        en: "The store is a separate /store section. That is where storefronts, lots, and the commercial entry points of the site will appear."
      },
      links: [
        {
          href: "/store",
          label: { ru: "[Открыть магазин]", en: "[Open store]" }
        },
        {
          href: "/news",
          label: { ru: "[Следить за новостями]", en: "[Follow news]" }
        }
      ]
    },
    {
      keywords: ["webclient", "web client", "веб", "клиент", "скач", "download", "админ", "admin", "логин", "login"],
      response: {
        ru: "Вебклиент, карта и админ-панель ведут во внешний мир Metasiberia. Это быстрые точки входа: открыть мир в браузере, посмотреть карту или перейти к сервисам.",
        en: "The web client, map, and admin panel lead into the external Metasiberia world. They act as quick entry points to open the world, inspect the map, or move to service pages."
      },
      links: [
        {
          href: "https://vr.metasiberia.com/webclient?x=-1.0&y=-2.6&z=1.72&heading=90.2",
          label: { ru: "[Вебклиент]", en: "[Web client]" },
          external: true
        },
        {
          href: "https://vr.metasiberia.com/",
          label: { ru: "[Admin panel]", en: "[Admin panel]" },
          external: true
        },
        {
          href: "https://github.com/shipilovden/sub-metasiberia/releases",
          label: { ru: "[Скачать beta]", en: "[Download beta]" },
          external: true
        }
      ]
    },
    {
      keywords: ["script", "lua", "luau", "скрипт"],
      response: {
        ru: "Скриптинг уже вынесен в отдельный раздел. Там собраны переходы к Luau, примерам скриптов и техническим материалам.",
        en: "Scripting already has its own section. It links to Luau, script examples, and technical materials."
      },
      links: [
        {
          href: "/lua",
          label: { ru: "[Scripting]", en: "[Scripting]" }
        },
        {
          href: "/scripts",
          label: { ru: "[Примеры]", en: "[Examples]" }
        }
      ]
    },
    {
      keywords: ["faq", "вопрос", "question", "help", "помощ"],
      response: {
        ru: "FAQ отвечает на базовые вопросы о Metasiberia, входе в мир, клиенте и общем устройстве проекта.",
        en: "FAQ answers the basic questions about Metasiberia, entering the world, the client, and the overall project setup."
      },
      links: [
        {
          href: "/faq",
          label: { ru: "[Открыть FAQ]", en: "[Open FAQ]" }
        }
      ]
    },
    {
      keywords: ["map", "карт"],
      response: {
        ru: "Карта открывается во внешнем сервисе Metasiberia. Её удобно держать в отдельной вкладке, когда изучаешь мир или ищешь локации.",
        en: "The map opens in the external Metasiberia service. It is convenient to keep it in a separate tab while exploring the world or looking up locations."
      },
      links: [
        {
          href: "https://vr.metasiberia.com/map",
          label: { ru: "[Открыть карту]", en: "[Open map]" },
          external: true
        }
      ]
    },
    {
      keywords: ["новост", "blog", "блог"],
      response: {
        ru: "Новости уже вынесены в отдельный раздел. На главной сейчас показана витрина, а дальше эту систему можно развить до полноценного блога с отдельными страницами материалов.",
        en: "News already has a dedicated section. The homepage now shows a showcase, and this can later grow into a full blog with standalone article pages."
      },
      links: [
        {
          href: "/news",
          label: { ru: "[Открыть новости]", en: "[Open news]" }
        }
      ]
    },
    {
      keywords: ["telegram", "github", "vk", "вк", "телег", "контакт", "связ"],
      response: {
        ru: "Основные внешние каналы Metasiberia сейчас находятся в GitHub, VK и Telegram. Они доступны из меню и соцссылок сайта.",
        en: "The main external Metasiberia channels are GitHub, VK, and Telegram. They are available from the menu and the social links on the site."
      },
      links: [
        {
          href: "https://github.com/shipilovden/sub-metasiberia",
          label: { ru: "[GitHub]", en: "[GitHub]" },
          external: true
        },
        {
          href: "https://vk.com/metasiberia_official",
          label: { ru: "[VK]", en: "[VK]" },
          external: true
        },
        {
          href: "https://t.me/metasiberia_official",
          label: { ru: "[Telegram]", en: "[Telegram]" },
          external: true
        }
      ]
    },
    {
      keywords: ["что такое", "what is", "metasiberia", "метасибир"],
      response: {
        ru: "Metasiberia — это проект виртуального мира на движке Glare-core. На сайте уже есть входные точки в мир, раздел про участки, scripting, FAQ, новости и магазин.",
        en: "Metasiberia is a virtual world project built on the Glare-core engine. The site already has entry points into the world, parcels, scripting, FAQ, news, and the store."
      },
      links: [
        {
          href: "/",
          label: { ru: "[Главная]", en: "[Main]" }
        },
        {
          href: "/faq",
          label: { ru: "[FAQ]", en: "[FAQ]" }
        }
      ]
    }
  ];

  var state = {
    language: "ru",
    messages: [],
    open: false,
    dragged: false,
    drag: null,
    resize: null
  };

  function normalizeLanguage(language) {
    return language === "en" ? "en" : "ru";
  }

  function normalizeText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function getLanguage() {
    var domLanguage = document.documentElement.getAttribute("data-site-language");

    if (domLanguage) {
      return normalizeLanguage(domLanguage);
    }

    try {
      return normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return "ru";
    }
  }

  function getUiCopy() {
    return UI_COPY[state.language] || UI_COPY.ru;
  }

  function getRoot() {
    return document.getElementById(ROOT_ID);
  }

  function getWindowNode() {
    var root = getRoot();

    return root ? root.querySelector("[data-chatbot-window]") : null;
  }

  function getMessagesNode() {
    return document.getElementById(MESSAGES_ID);
  }

  function getInputNode() {
    return document.getElementById(INPUT_ID);
  }

  function ensureStyles() {
    var style;

    if (document.getElementById(STYLE_ID)) {
      return;
    }

    style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "body.metasiberia-chatbot-open{overflow:hidden;}",
      "#" + ROOT_ID + "{position:fixed;inset:0;z-index:10000002;font-family:'Source Code Pro',monospace;}",
      "#" + ROOT_ID + "[hidden]{display:none !important;}",
      "#" + ROOT_ID + " *{box-sizing:border-box;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.44);}",
      "#" + ROOT_ID + " .metasiberia-chatbot__window{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(560px,calc(100vw - 24px));height:min(720px,calc(100vh - 24px));min-width:min(420px,calc(100vw - 24px));min-height:min(460px,calc(100vh - 24px));max-width:calc(100vw - 24px);max-height:calc(100vh - 24px);display:grid;grid-template-rows:auto 1fr auto;border:1px solid #111111;background:#f8f6f1;box-shadow:18px 18px 0 rgba(0,0,0,0.12);color:#111111;overflow:hidden;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__window.is-dragging,#" + ROOT_ID + " .metasiberia-chatbot__window.is-resizing{user-select:none;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:18px;border-bottom:1px solid #111111;background:#ffffff;cursor:move;touch-action:none;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__header-copy{min-width:0;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__kicker{margin:0 0 8px;color:#1f00ff;font:700 12px/1 'Source Code Pro',monospace;letter-spacing:0.12em;text-transform:uppercase;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__title{margin:0;font:600 28px/1.02 'Source Code Pro',monospace;color:#111111;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__subtitle{margin:8px 0 0;color:rgba(17,17,17,0.7);font:400 13px/1.6 'Source Code Pro',monospace;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__close{position:relative;flex-shrink:0;width:42px;height:42px;padding:0;border:1px solid #111111;background:#111111;color:#ffffff;cursor:pointer;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__close-icon{position:relative;display:block;width:18px;height:18px;margin:0 auto;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__close-icon span{position:absolute;left:0;top:8px;display:block;width:100%;height:2px;background:currentColor;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__close-icon span:first-child{transform:rotate(45deg);}",
      "#" + ROOT_ID + " .metasiberia-chatbot__close-icon span:last-child{transform:rotate(-45deg);}",
      "#" + ROOT_ID + " .metasiberia-chatbot__messages{padding:18px;overflow:auto;background:linear-gradient(180deg,#faf8f3 0%,#f3efe6 100%);}",
      "#" + ROOT_ID + " .metasiberia-chatbot__message{display:flex;margin:0 0 14px;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__message_user{justify-content:flex-end;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__message_assistant{justify-content:flex-start;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__bubble{max-width:min(88%,420px);padding:14px;border:1px solid #111111;background:#ffffff;color:#111111;white-space:pre-line;line-height:1.65;overflow-wrap:anywhere;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__message_user .metasiberia-chatbot__bubble{background:#111111;color:#ffffff;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__links{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__link{display:inline-flex;align-items:center;min-height:34px;padding:0 10px;border:1px solid #111111;background:#ffffff;color:#111111;text-decoration:none;font:700 11px/1 'Source Code Pro',monospace;letter-spacing:0.08em;text-transform:uppercase;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__message_user .metasiberia-chatbot__link{border-color:#ffffff;background:transparent;color:#ffffff;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__composer{padding:16px 18px 18px;border-top:1px solid #111111;background:#ffffff;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__label{display:block;margin:0 0 10px;color:rgba(17,17,17,0.72);font:700 11px/1 'Source Code Pro',monospace;letter-spacing:0.1em;text-transform:uppercase;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__composer-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__input{width:100%;min-height:52px;max-height:144px;padding:14px;border:1px solid #111111;background:#faf8f3;color:#111111;resize:none;outline:none;font:400 15px/1.5 'Source Code Pro',monospace;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__input:focus{border-color:#1f00ff;box-shadow:inset 0 0 0 1px #1f00ff;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__send{min-width:124px;height:52px;padding:0 14px;border:1px solid #111111;background:#111111;color:#ffffff;font:700 12px/1 'Source Code Pro',monospace;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__resize{position:absolute;right:0;bottom:0;width:22px;height:22px;border-left:1px solid #111111;border-top:1px solid #111111;background:#ffffff;cursor:nwse-resize;touch-action:none;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__resize::before,#" + ROOT_ID + " .metasiberia-chatbot__resize::after{content:'';position:absolute;right:4px;bottom:4px;width:10px;height:1px;background:#111111;transform-origin:right center;}",
      "#" + ROOT_ID + " .metasiberia-chatbot__resize::before{transform:rotate(-45deg);}",
      "#" + ROOT_ID + " .metasiberia-chatbot__resize::after{right:8px;bottom:8px;transform:rotate(-45deg);}",
      "body.metasiberia-chatbot-open #rec872696359 .t450__overlay{pointer-events:none;}",
      "@media screen and (max-width:760px){#" + ROOT_ID + " .metasiberia-chatbot__window{left:12px;right:12px;top:12px;bottom:12px;transform:none;width:auto;height:auto;min-width:0;min-height:0;max-width:none;max-height:none;box-shadow:none;}#" + ROOT_ID + " .metasiberia-chatbot__header{padding:16px;cursor:default;touch-action:auto;}#" + ROOT_ID + " .metasiberia-chatbot__title{font-size:24px;}#" + ROOT_ID + " .metasiberia-chatbot__composer-row{grid-template-columns:1fr;}#" + ROOT_ID + " .metasiberia-chatbot__send{width:100%;}#" + ROOT_ID + " .metasiberia-chatbot__resize{display:none;}}"
    ].join("");

    document.head.appendChild(style);
  }

  function localizeLinks(links, language) {
    return (links || []).map(function(link) {
      return {
        href: link.href,
        label: (link.label && (link.label[language] || link.label.ru || link.label.en)) || link.href,
        external: Boolean(link.external)
      };
    });
  }

  function createMessage(role, text, links) {
    return {
      role: role,
      text: text,
      links: links || []
    };
  }

  function getDefaultLinks(language) {
    return localizeLinks(
      [
        {
          href: "/#parsels",
          label: { ru: "[Участки]", en: "[Parcels]" }
        },
        {
          href: "/store",
          label: { ru: "[Магазин]", en: "[Store]" }
        },
        {
          href: "/faq",
          label: { ru: "[FAQ]", en: "[FAQ]" }
        }
      ],
      language
    );
  }

  function seedWelcomeMessage() {
    var copy = getUiCopy();

    if (state.messages.length) {
      return;
    }

    state.messages.push(createMessage("assistant", copy.welcome));
  }

  function renderMessages() {
    var messagesNode = getMessagesNode();

    if (!messagesNode) {
      return;
    }

    messagesNode.innerHTML = "";

    state.messages.forEach(function(message) {
      var item = document.createElement("article");
      var bubble = document.createElement("div");

      item.className =
        "metasiberia-chatbot__message metasiberia-chatbot__message_" +
        message.role;
      bubble.className = "metasiberia-chatbot__bubble";
      bubble.textContent = message.text;
      item.appendChild(bubble);

      if (message.links && message.links.length) {
        var links = document.createElement("div");

        links.className = "metasiberia-chatbot__links";

        message.links.forEach(function(link) {
          var anchor = document.createElement("a");

          anchor.className = "metasiberia-chatbot__link";
          anchor.href = link.href;
          anchor.textContent = link.label;

          if (link.external) {
            anchor.target = "_blank";
            anchor.rel = "noreferrer noopener";
          }

          links.appendChild(anchor);
        });

        bubble.appendChild(links);
      }

      messagesNode.appendChild(item);
    });

    messagesNode.scrollTop = messagesNode.scrollHeight;
  }

  function autoResizeInput() {
    var input = getInputNode();

    if (!input) {
      return;
    }

    input.style.height = "52px";
    input.style.height = Math.min(input.scrollHeight, 144) + "px";
  }

  function closeSiteMenu() {
    var burger = document.querySelector("#rec872696359 .t-menuburger");
    var overlay = document.querySelector("#rec872696359 .t450__overlay");
    var tildaPanel = document.querySelector("#rec872696359 .t450");
    var newsPanel = document.getElementById("nav872696359");

    document.body.classList.remove("t450__body_menushowed");
    document.body.classList.remove("news-menu-open");

    if (burger) {
      burger.classList.remove("t-menuburger-opened");
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }

    if (overlay) {
      overlay.classList.remove("t450__menu_show");
      overlay.hidden = true;
    }

    if (tildaPanel) {
      tildaPanel.classList.remove("t450__menu_show");
    }

    if (newsPanel) {
      newsPanel.classList.remove("is-open");
      newsPanel.setAttribute("aria-hidden", "true");
    }
  }

  function resetWindowPosition() {
    var windowNode = getWindowNode();

    if (!windowNode) {
      return;
    }

    windowNode.style.left = "";
    windowNode.style.top = "";
    windowNode.style.right = "";
    windowNode.style.bottom = "";
    windowNode.style.transform = "";
  }

  function constrainWindowBounds() {
    var windowNode = getWindowNode();
    var rect;
    var maxWidth;
    var maxHeight;
    var width;
    var height;

    if (!windowNode || window.innerWidth <= 760) {
      return;
    }

    rect = windowNode.getBoundingClientRect();
    maxWidth = Math.max(320, window.innerWidth - 24);
    maxHeight = Math.max(320, window.innerHeight - 24);
    width = Math.min(rect.width, maxWidth);
    height = Math.min(rect.height, maxHeight);

    windowNode.style.width = width + "px";
    windowNode.style.height = height + "px";
  }

  function constrainWindowToViewport() {
    var windowNode = getWindowNode();
    var rect;
    var maxLeft;
    var maxTop;
    var left;
    var top;

    if (!windowNode || !state.dragged || window.innerWidth <= 760) {
      return;
    }

    rect = windowNode.getBoundingClientRect();
    maxLeft = Math.max(12, window.innerWidth - rect.width - 12);
    maxTop = Math.max(12, window.innerHeight - rect.height - 12);
    left = Math.min(Math.max(rect.left, 12), maxLeft);
    top = Math.min(Math.max(rect.top, 12), maxTop);

    windowNode.style.left = left + "px";
    windowNode.style.top = top + "px";
    windowNode.style.transform = "none";
  }

  function openChat() {
    var root = ensureRoot();
    var input = getInputNode();

    state.open = true;
    state.language = getLanguage();

    seedWelcomeMessage();
    applyUiLanguage();
    renderMessages();
    closeSiteMenu();

    root.hidden = false;
    root.setAttribute("aria-hidden", "false");
    document.body.classList.add("metasiberia-chatbot-open");

    if (!state.dragged || window.innerWidth <= 760) {
      state.dragged = false;
      resetWindowPosition();
    } else {
      constrainWindowBounds();
      constrainWindowToViewport();
    }

    constrainWindowBounds();

    window.requestAnimationFrame(function() {
      if (input) {
        input.focus();
        autoResizeInput();
      }
    });
  }

  function closeChat() {
    var root = getRoot();

    if (!root) {
      return;
    }

    state.open = false;
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
    document.body.classList.remove("metasiberia-chatbot-open");
  }

  function findTopic(text) {
    var normalized = normalizeText(text).toLowerCase();

    return BOT_TOPICS.find(function(topic) {
      return topic.keywords.some(function(keyword) {
        return normalized.indexOf(keyword) !== -1;
      });
    });
  }

  function getReply(text) {
    var topic = findTopic(text);
    var copy = getUiCopy();

    if (topic) {
      return createMessage(
        "assistant",
        topic.response[state.language] || topic.response.ru,
        localizeLinks(topic.links, state.language)
      );
    }

    return createMessage(
      "assistant",
      copy.fallback,
      getDefaultLinks(state.language)
    );
  }

  function submitMessage() {
    var input = getInputNode();
    var value;
    var reply;

    if (!input) {
      return;
    }

    value = normalizeText(input.value);

    if (!value) {
      input.placeholder = getUiCopy().empty;
      input.focus();
      return;
    }

    state.messages.push(createMessage("user", value));
    renderMessages();

    input.value = "";
    input.placeholder = getUiCopy().placeholder;
    autoResizeInput();

    reply = getReply(value);

    window.setTimeout(function() {
      state.messages.push(reply);
      renderMessages();
    }, 180);
  }

  function applyUiLanguage() {
    var root = getRoot();
    var copy = getUiCopy();
    var closeButton;
    var sendButton;
    var label;
    var input;
    var kicker;
    var title;
    var subtitle;

    if (!root) {
      return;
    }

    kicker = root.querySelector("[data-chatbot-kicker]");
    title = root.querySelector("[data-chatbot-title]");
    subtitle = root.querySelector("[data-chatbot-subtitle]");
    label = root.querySelector("[data-chatbot-label]");
    input = getInputNode();
    sendButton = root.querySelector("[data-chatbot-send]");
    closeButton = root.querySelector("[data-chatbot-close]");

    if (kicker) {
      kicker.textContent = copy.kicker;
    }

    if (title) {
      title.textContent = copy.title;
    }

    if (subtitle) {
      subtitle.textContent = copy.subtitle;
    }

    if (label) {
      label.textContent = copy.label;
    }

    if (input && !input.value) {
      input.placeholder = copy.placeholder;
    }

    if (sendButton) {
      sendButton.textContent = copy.send;
      sendButton.setAttribute("aria-label", copy.send);
    }

    if (closeButton) {
      closeButton.setAttribute("aria-label", copy.close);
      closeButton.setAttribute("title", copy.close);
    }
  }

  function startDrag(event) {
    var handle = event.target.closest("[data-chatbot-drag]");
    var windowNode = getWindowNode();
    var rect;

    if (
      !handle ||
      event.target.closest("button, a, textarea, input, label") ||
      event.target.closest("[data-chatbot-resize]")
    ) {
      return;
    }

    if (!windowNode || window.innerWidth <= 760) {
      return;
    }

    rect = windowNode.getBoundingClientRect();

    state.drag = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };

    state.dragged = true;
    windowNode.style.left = rect.left + "px";
    windowNode.style.top = rect.top + "px";
    windowNode.style.transform = "none";
    windowNode.classList.add("is-dragging");

    if (handle.setPointerCapture) {
      handle.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
  }

  function moveDrag(event) {
    var windowNode = getWindowNode();
    var left;
    var top;
    var maxLeft;
    var maxTop;

    if (!state.drag || !windowNode) {
      return;
    }

    maxLeft = Math.max(12, window.innerWidth - windowNode.offsetWidth - 12);
    maxTop = Math.max(12, window.innerHeight - windowNode.offsetHeight - 12);
    left = Math.min(Math.max(event.clientX - state.drag.offsetX, 12), maxLeft);
    top = Math.min(Math.max(event.clientY - state.drag.offsetY, 12), maxTop);

    windowNode.style.left = left + "px";
    windowNode.style.top = top + "px";
    windowNode.style.transform = "none";
  }

  function stopDrag() {
    var windowNode = getWindowNode();

    state.drag = null;

    if (windowNode) {
      windowNode.classList.remove("is-dragging");
    }
  }

  function startResize(event) {
    var handle = event.target.closest("[data-chatbot-resize]");
    var windowNode = getWindowNode();
    var rect;

    if (!handle || !windowNode || window.innerWidth <= 760) {
      return;
    }

    rect = windowNode.getBoundingClientRect();
    state.drag = null;
    state.resize = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: rect.width,
      startHeight: rect.height,
      startLeft: rect.left,
      startTop: rect.top
    };

    state.dragged = true;
    windowNode.style.left = rect.left + "px";
    windowNode.style.top = rect.top + "px";
    windowNode.style.width = rect.width + "px";
    windowNode.style.height = rect.height + "px";
    windowNode.style.transform = "none";
    windowNode.classList.add("is-resizing");

    if (handle.setPointerCapture) {
      handle.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
  }

  function moveResize(event) {
    var windowNode = getWindowNode();
    var minWidth;
    var minHeight;
    var maxWidth;
    var maxHeight;
    var width;
    var height;

    if (!state.resize || !windowNode) {
      return;
    }

    minWidth = Math.min(420, Math.max(320, window.innerWidth - 24));
    minHeight = Math.min(460, Math.max(320, window.innerHeight - 24));
    maxWidth = Math.max(minWidth, window.innerWidth - state.resize.startLeft - 12);
    maxHeight = Math.max(minHeight, window.innerHeight - state.resize.startTop - 12);
    width = Math.min(
      Math.max(
        state.resize.startWidth + (event.clientX - state.resize.startX),
        minWidth
      ),
      maxWidth
    );
    height = Math.min(
      Math.max(
        state.resize.startHeight + (event.clientY - state.resize.startY),
        minHeight
      ),
      maxHeight
    );

    windowNode.style.width = width + "px";
    windowNode.style.height = height + "px";
  }

  function stopResize() {
    var windowNode = getWindowNode();

    state.resize = null;

    if (windowNode) {
      windowNode.classList.remove("is-resizing");
    }
  }

  function bindRoot(root) {
    var form = root.querySelector("[data-chatbot-form]");
    var input = getInputNode();

    root.addEventListener("click", function(event) {
      if (event.target.closest("[data-chatbot-close]")) {
        event.preventDefault();
        closeChat();
        return;
      }

      if (event.target.closest(".metasiberia-chatbot__backdrop")) {
        closeChat();
        return;
      }

      if (event.target.closest(".metasiberia-chatbot__link")) {
        closeChat();
      }
    });

    if (form) {
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        submitMessage();
      });
    }

    if (input) {
      input.addEventListener("input", function() {
        autoResizeInput();
      });

      input.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          submitMessage();
        }
      });
    }

    root.addEventListener("pointerdown", function(event) {
      startResize(event);
      startDrag(event);
    });
    window.addEventListener("pointermove", moveDrag);
    window.addEventListener("pointermove", moveResize);
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopDrag);
    window.addEventListener("pointercancel", stopResize);
  }

  function ensureRoot() {
    var existingRoot = getRoot();
    var root;

    if (existingRoot) {
      return existingRoot;
    }

    ensureStyles();

    root = document.createElement("div");
    root.id = ROOT_ID;
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = [
      '<div class="metasiberia-chatbot__backdrop"></div>',
      '<section class="metasiberia-chatbot__window" data-chatbot-window role="dialog" aria-modal="true" aria-labelledby="metasiberia-chatbot-title">',
      '<header class="metasiberia-chatbot__header" data-chatbot-drag>',
      '<div class="metasiberia-chatbot__header-copy">',
      '<p class="metasiberia-chatbot__kicker" data-chatbot-kicker></p>',
      '<h2 id="metasiberia-chatbot-title" class="metasiberia-chatbot__title" data-chatbot-title></h2>',
      '<p class="metasiberia-chatbot__subtitle" data-chatbot-subtitle></p>',
      "</div>",
      '<button type="button" class="metasiberia-chatbot__close" data-chatbot-close><span class="metasiberia-chatbot__close-icon" aria-hidden="true"><span></span><span></span></span></button>',
      "</header>",
      '<div id="' + MESSAGES_ID + '" class="metasiberia-chatbot__messages" aria-live="polite"></div>',
      '<form class="metasiberia-chatbot__composer" data-chatbot-form novalidate>',
      '<label class="metasiberia-chatbot__label" data-chatbot-label for="' + INPUT_ID + '"></label>',
      '<div class="metasiberia-chatbot__composer-row">',
      '<textarea id="' + INPUT_ID + '" class="metasiberia-chatbot__input" rows="1" maxlength="500"></textarea>',
      '<button type="submit" class="metasiberia-chatbot__send" data-chatbot-send></button>',
      "</div>",
      "</form>",
      '<div class="metasiberia-chatbot__resize" data-chatbot-resize aria-hidden="true"></div>',
      "</section>"
    ].join("");

    document.body.appendChild(root);
    bindRoot(root);
    applyUiLanguage();
    return root;
  }

  function handleDocumentClick(event) {
    var trigger = event.target.closest(CHAT_LINK_SELECTOR);

    if (!trigger) {
      return;
    }

    event.preventDefault();
    openChat();
  }

  function handleKeydown(event) {
    if (event.key === "Escape" && state.open) {
      closeChat();
    }
  }

  function handleResize() {
    var windowNode = getWindowNode();

    if (!state.open) {
      return;
    }

    if (window.innerWidth <= 760) {
      state.dragged = false;
      resetWindowPosition();
      if (windowNode) {
        windowNode.style.width = "";
        windowNode.style.height = "";
      }
      return;
    }

    constrainWindowBounds();
    constrainWindowToViewport();
  }

  function handleLanguageChange(event) {
    state.language = normalizeLanguage(
      event && event.detail ? event.detail.language : getLanguage()
    );
    applyUiLanguage();
  }

  function boot() {
    state.language = getLanguage();
    ensureRoot();

    document.addEventListener("click", handleDocumentClick, true);
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("metasiberia:languagechange", handleLanguageChange);
    window.addEventListener("resize", handleResize);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
