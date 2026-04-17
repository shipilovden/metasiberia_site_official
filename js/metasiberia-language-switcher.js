(function() {
  var STORAGE_KEY = "metasiberia.site.language";
  var DEFAULT_LANGUAGE = "ru";
  var STYLE_ID = "metasiberia-language-switcher-styles";
  var SWITCHER_CLASS = "t450__lang-switcher";
  var CHATBOT_SCRIPT_ID = "metasiberia-chatbot-script";
  var CHATBOT_SCRIPT_SRC = "js/metasiberia-chatbot.js";

  var originalHtml = new WeakMap();

  var MENU_LABELS = {
    news: { ru: "Новости", en: "News" },
    "1": { ru: "Главная", en: "Main" },
    "2": { ru: "Участки", en: "Parcels" },
    "3": { ru: "Магазин", en: "Store" },
    "4": { ru: "Админ-панель", en: "Admin panel" },
    "5": { ru: "Карта", en: "Map" },
    "6": { ru: "Скриптинг", en: "Scripting" },
    "7": { ru: "Вопросы", en: "F.A.Q." },
    "8": { ru: "Условия", en: "Terms of Use" },
    "9": { ru: "Чат-бот", en: "Chat-bot" },
    "10": { ru: "NFT", en: "NFT" }
  };

  var PAGE_TITLES = {
    "64220001": { ru: "Новости Metasiberia", en: "Metasiberia News" },
    "62281087": { ru: "Метасибирь", en: "Metasiberia" },
    "62442585": { ru: "Вопросы", en: "FAQ" },
    "63809043": { ru: "Условия", en: "Terms of Use" },
    "63810393": { ru: "Скриптинг", en: "Scripting" },
    "63811825": { ru: "Примеры скриптов", en: "Script examples" },
    "63813121": { ru: "Магазин", en: "Store" },
    "64026745": { ru: "Хедер", en: "Header" },
    "64026811": { ru: "Футер", en: "Footer" },
    "64027043": { ru: "Ошибка 404", en: "Error 404" },
    "64103135": { ru: "Морфер", en: "Morpher" }
  };

  var NEWS_PAGE_ID = "64220001";
  var NEWS_MENU_KEY = "news";
  var NEWS_SECTION_ID = "news";
  var NEWS_SECTION_HREF = "/#news";
  var NEWS_SECTION_MOUNT_ID = "metasiberia-news-home";
  var NEWS_POSTS = [
    {
      slug: "site-journal-launch",
      date: "2026-03-29",
      category: { ru: "Сайт", en: "Site" },
      title: {
        ru: "На официальном сайте появился раздел новостей и блога",
        en: "The official site now has a dedicated news and blog hub"
      },
      excerpt: {
        ru: "Апдейты проекта, заметки о мире и редакционные публикации теперь можно собирать в одном понятном месте.",
        en: "Project updates, world notes, and editorial posts can now live in one clear place."
      },
      body: {
        ru: [
          "На metasiberia.com появился отдельный раздел новостей и блога. Он нужен как единая точка для коротких апдейтов, анонсов, заметок о мире и публикаций о развитии проекта.",
          "Теперь новости можно показывать в виде краткой витрины на главной странице, а полные тексты и архив материалов держать на отдельной странице /news без пустых якорей и незавершённых заглушек.",
          "Эту ленту удобно использовать для запусков, публикаций о локациях, витринах магазина, участках, инструментах и заметках о том, как меняется Metasiberia."
        ],
        en: [
          "Metasiberia.com now has a dedicated news and blog hub. It acts as a single place for short updates, announcements, world notes, and longer editorial posts about the project.",
          "News can now appear as a compact showcase on the homepage, while full posts and the archive live on a dedicated /news page instead of relying on empty anchors and unfinished placeholders.",
          "This stream is a good fit for launches, location spotlights, store updates, parcel announcements, tooling notes, and development stories about how Metasiberia evolves."
        ]
      }
    },
    {
      slug: "parcels-store-roadmap",
      date: "2026-03-24",
      category: { ru: "Мир", en: "World" },
      title: {
        ru: "Анонсы по участкам и магазину стоит вести как отдельную редакционную линию",
        en: "Parcel and store announcements deserve their own editorial stream"
      },
      excerpt: {
        ru: "Запуски витрины, резерв участков и обновления магазина удобнее читать в новостной ленте, а не искать внутри главной страницы.",
        en: "Store launches, parcel reservations, and catalogue updates are easier to follow in a news stream than inside the homepage."
      },
      body: {
        ru: [
          "Участки и магазин остаются одной из ключевых тем для Metasiberia. Когда эти анонсы разбросаны по кнопкам, слайдерам и случайным ссылкам, пользователю трудно понять, что уже доступно, а что только готовится.",
          "Новостная страница позволяет собирать такие обновления в хронику: когда откроется витрина, как будет устроен резерв, какие лоты появятся первыми и где смотреть следующие статусы.",
          "На главной при этом достаточно оставить только последние карточки и кнопку на архив, чтобы сайт не превращался в бесконечный список мелких объявлений."
        ],
        en: [
          "Parcels and the store remain one of the central themes for Metasiberia. When those announcements are scattered across buttons, sliders, and stray links, it becomes hard to tell what is available now and what is still being prepared.",
          "A dedicated news page turns those updates into a timeline: when the storefront opens, how reservations will work, which lots appear first, and where to watch the next status updates.",
          "The homepage can then stay focused by showing only the latest highlights and a clear path to the full archive."
        ]
      }
    },
    {
      slug: "scripting-guides-format",
      date: "2026-03-18",
      category: { ru: "Разработка", en: "Development" },
      title: {
        ru: "Материалы по Luau, инструментам и разработке логичнее публиковать как блоговые статьи",
        en: "Luau, tooling, and development notes work better as blog-style articles"
      },
      excerpt: {
        ru: "Длинные заметки со ссылками, примерами и контекстом удобнее читать в формате статей, а не как случайные фрагменты по сайту.",
        en: "Longer notes with links, examples, and context are easier to read as articles instead of scattered fragments across the site."
      },
      body: {
        ru: [
          "На сайте уже есть отдельные страницы про скриптинг и примеры Luau, но редакционные материалы о том, зачем этот инструментарий нужен и как им пользоваться в мире, лучше работают в формате статей.",
          "Блоговый формат позволяет публиковать короткие руководства, заметки о пайплайне, новости о редакторских инструментах и наблюдения за тем, как авторы используют участки и объекты.",
          "Такой раздел поможет постепенно вырастить не только новостную ленту, но и полноценный журнал проекта с накопленным контекстом."
        ],
        en: [
          "The site already has separate scripting and Luau example pages, but editorial material about why those tools matter and how they fit into the world works better in article form.",
          "A blog format makes it easier to publish short guides, pipeline notes, tooling updates, and observations about how creators use parcels, objects, and scripts in practice.",
          "That gives Metasiberia room to grow not only a news feed, but a real project journal with accumulated context."
        ]
      }
    }
  ];
  var NEWS_UI_COPY = {
    ru: {
      homeKicker: "[новости / blog]",
      homeTitle: "Новости и блог Metasiberia",
      homeIntro:
        "Новый раздел для апдейтов проекта, коротких анонсов, редакционных заметок и более длинных публикаций о мире Metasiberia.",
      homeArchiveLink: "Открыть все публикации",
      homeStoryLink: "Читать заметку",
      pageHeroKicker: "[новости / blog]",
      pageHeroTitle: "Новости и блог Metasiberia",
      pageHeroSubtitle:
        "Обновления проекта, анонсы мира, заметки о разработке и материалы, к которым можно возвращаться как к журналу проекта.",
      pageHomeLink: "К секции новостей на главной",
      pageStoreLink: "Открыть магазин",
      pagePanelTitle: "Что здесь будет",
      pagePanelItems: [
        "короткие апдейты по сайту и миру",
        "анонсы запусков, витрин и новых разделов",
        "публикации о скриптинге, участках и инструментах"
      ],
      archiveKicker: "архив",
      archiveTitle: "Последние публикации",
      archiveCopy:
        "Карточки ниже ведут к полным заметкам на этой же странице. Это удобный старт, если нужно быстро проверить, что нового.",
      storiesKicker: "журнал",
      storiesTitle: "Полные заметки",
      storiesCopy:
        "Здесь можно публиковать короткие новости, а при необходимости разворачивать их в полноценные блоговые материалы.",
      backToTop: "Наверх"
    },
    en: {
      homeKicker: "[news / blog]",
      homeTitle: "Metasiberia news & blog",
      homeIntro:
        "A new space for project updates, short announcements, editorial notes, and longer stories about the Metasiberia world.",
      homeArchiveLink: "Open all posts",
      homeStoryLink: "Read update",
      pageHeroKicker: "[news / blog]",
      pageHeroTitle: "Metasiberia news & blog",
      pageHeroSubtitle:
        "Project updates, world announcements, development notes, and articles that can grow into a proper project journal.",
      pageHomeLink: "Go to the homepage news section",
      pageStoreLink: "Open the store",
      pagePanelTitle: "What lives here",
      pagePanelItems: [
        "short updates about the site and world",
        "launch notes, storefront announcements, and new sections",
        "posts about scripting, parcels, tools, and production flow"
      ],
      archiveKicker: "archive",
      archiveTitle: "Latest posts",
      archiveCopy:
        "The cards below jump to the full notes on this page, so the archive can work both as a quick digest and as a readable journal.",
      storiesKicker: "journal",
      storiesTitle: "Full notes",
      storiesCopy:
        "This is where compact updates can expand into blog-style posts whenever the topic needs more context.",
      backToTop: "Back to top"
    }
  };
  var AVATAR_SECTION_ID = "avatars";
  var AVATAR_SECTION_MOUNT_ID = "metasiberia-avatar-home";
  var AVATAR_IMAGE_FOLDER = "images/avatar";
  var AVATAR_IMAGE_EXTENSIONS = ["png", "webp", "jpg", "jpeg", "svg"];
  var AVATAR_UI_COPY = {
    ru: {
      sectionTitle: "Аватары Metasiberia",
      sectionIntro: "Полная костомизация аватаров.\nВ процессе разработки",
      imageLabel: "Изображение раздела",
      folderLabel: "Папка для изображений",
      autoloadHint: "Секция автоматически подхватит файл с именем",
      prevLabel: "Предыдущее изображение",
      nextLabel: "Следующее изображение",
      bulletLabel: "Перейти к изображению ",
      slideLabel: "Изображение",
      formatLabel: "Формат",
      formatValue: "горизонтальный скриншот",
      ratioLabel: "Рекомендуемая пропорция",
      ratioValue: "16:9 или близко к ней",
      placeholderTitle: "Добавьте изображение",
      placeholderHint: "Положите горизонтальный скриншот в images/avatar, и блок обновится автоматически"
    },
    en: {
      sectionTitle: "Metasiberia avatars",
      sectionIntro: "Full avatar customization.\nWork in progress",
      imageLabel: "Section image",
      folderLabel: "Image folder",
      autoloadHint: "The section will pick up a file named",
      prevLabel: "Previous image",
      nextLabel: "Next image",
      bulletLabel: "Go to image ",
      slideLabel: "Image",
      formatLabel: "Format",
      formatValue: "horizontal screenshot",
      ratioLabel: "Suggested ratio",
      ratioValue: "16:9 or close to it",
      placeholderTitle: "Add an image",
      placeholderHint: "Drop a horizontal screenshot into images/avatar and this block will update automatically"
    }
  };
  var AVATAR_SHOWCASE_SLIDES = [
    {
      fileStem: "avatars-metasiberia-01",
      eyebrow: {
        ru: "Слайд 01",
        en: "Slide 01"
      },
      title: {
        ru: "Аватары Metasiberia",
        en: "Metasiberia avatars"
      },
      deck: {
        ru:
          "Широкий кадр с несколькими персонажами лучше всего смотрится в этой секции: он показывает стиль аватаров, их разнообразие и общий визуальный характер проекта.",
        en:
          "A wide frame with several characters works best in this section because it shows the avatar style, their variety, and the overall visual identity of the project."
      },
      highlights: {
        ru: [
          "Используйте один готовый горизонтальный скриншот",
          "Лучше, если персонажи занимают центральную и среднюю часть кадра",
          "Подойдут соотношения сторон 16:9, 21:9 или близкие к ним"
        ],
        en: [
          "Use one finished horizontal screenshot",
          "It works best when the characters occupy the center and middle of the frame",
          "16:9, 21:9, or similar aspect ratios will fit well"
        ]
      }
    },
    {
      fileStem: "avatars-metasiberia-02",
      eyebrow: {
        ru: "Слайд 02",
        en: "Slide 02"
      },
      title: {
        ru: "Аватары Metasiberia",
        en: "Metasiberia avatars"
      },
      deck: {
        ru:
          "Широкий кадр с несколькими персонажами лучше всего смотрится в этой секции: он показывает стиль аватаров, их разнообразие и общий визуальный характер проекта.",
        en:
          "A wide frame with several characters works best in this section because it shows the avatar style, their variety, and the overall visual identity of the project."
      },
      highlights: {
        ru: [
          "Используйте один готовый горизонтальный скриншот",
          "Лучше, если персонажи занимают центральную и среднюю часть кадра",
          "Подойдут соотношения сторон 16:9, 21:9 или близкие к ним"
        ],
        en: [
          "Use one finished horizontal screenshot",
          "It works best when the characters occupy the center and middle of the frame",
          "16:9, 21:9, or similar aspect ratios will fit well"
        ]
      }
    },
    {
      fileStem: "avatars-metasiberia-03",
      eyebrow: {
        ru: "Слайд 03",
        en: "Slide 03"
      },
      title: {
        ru: "Аватары Metasiberia",
        en: "Metasiberia avatars"
      },
      deck: {
        ru:
          "Широкий кадр с несколькими персонажами лучше всего смотрится в этой секции: он показывает стиль аватаров, их разнообразие и общий визуальный характер проекта.",
        en:
          "A wide frame with several characters works best in this section because it shows the avatar style, their variety, and the overall visual identity of the project."
      },
      highlights: {
        ru: [
          "Используйте один готовый горизонтальный скриншот",
          "Лучше, если персонажи занимают центральную и среднюю часть кадра",
          "Подойдут соотношения сторон 16:9, 21:9 или близкие к ним"
        ],
        en: [
          "Use one finished horizontal screenshot",
          "It works best when the characters occupy the center and middle of the frame",
          "16:9, 21:9, or similar aspect ratios will fit well"
        ]
      }
    }
  ];
  var TECH_SECTION_ID = "capabilities";
  var TECH_SECTION_MOUNT_ID = "metasiberia-tech-home";
  var TECH_SLIDER_DELAY = 0;
  var HERO_QUICK_LINKS = [
    {
      label: { ru: "[новости]", en: "[news]" },
      href: "#news"
    },
    {
      label: { ru: "[участки]", en: "[parcels]" },
      href: "#parsels"
    },
    {
      label: { ru: "[магазин]", en: "[store]" },
      href: "/store"
    },
    {
      label: { ru: "[админ-панель]", en: "[admin panel]" },
      href: "https://vr.metasiberia.com/",
      external: true
    },
    {
      label: { ru: "[карта]", en: "[map]" },
      href: "https://vr.metasiberia.com/map",
      external: true
    }
  ];
  var TECH_GITHUB_REPO_OWNER = "shipilovden";
  var TECH_GITHUB_REPO_NAME = "sub-metasiberia";
  var TECH_GITHUB_API_BASE = "https://api.github.com/repos/" + TECH_GITHUB_REPO_OWNER + "/" + TECH_GITHUB_REPO_NAME;
  var TECH_GITHUB_CACHE_KEY = "metasiberia-tech-github-meta-v1";
  var TECH_GITHUB_CACHE_TTL_MS = 15 * 60 * 1000;
  var TECH_UI_COPY = {
    ru: {
      sectionKicker: "[технические возможности]",
      sectionTitle: "Журнал технических возможностей Metasiberia",
      sectionIntro:
        "Переключаемый журнальный блок по миру, VR, инструментам, стеку и масштабированию проекта.",
      highlightsLabel: "Ключевые пункты",
      prevLabel: "Предыдущий разворот",
      nextLabel: "Следующий разворот",
      bulletLabel: "Перейти к развороту ",
      slideLabel: "Разворот"
    },
    en: {
      sectionKicker: "[technical capabilities]",
      sectionTitle: "Metasiberia technical journal",
      sectionIntro:
        "A switchable magazine-style block about the world, VR, tools, stack, and scaling path of the project.",
      highlightsLabel: "Key points",
      prevLabel: "Previous spread",
      nextLabel: "Next spread",
      bulletLabel: "Go to spread ",
      slideLabel: "Spread"
    }
  };
  var TECH_FEATURE_SLIDES = [
    {
      eyebrow: {
        ru: "Общая платформа",
        en: "Platform overview"
      },
      title: {
        ru: "Metasiberia создана на движке Glare-core",
        en: "Metasiberia is built on the Glare-core engine"
      },
      deck: {
        ru:
          "Metasiberia развивает виртуальный мир на движке Glare-core как среду для присутствия, создания контента и совместной работы. Это открытая 3D-платформа с активной beta-разработкой и несколькими клиентскими линиями.",
        en:
          "Metasiberia develops its virtual world on the Glare-core engine as a space for presence, creation, and collaboration. It is an open 3D platform with an active beta cycle and multiple client tracks."
      },
      highlights: {
        ru: [
          "Ядро Glare-core",
          "Полнофункциональная 3D-среда для присутствия, создания контента и совместной работы",
          "Открытая кодовая база проекта",
          "Текущая версия: 0.0.19 Beta",
          "Основные линии: desktop, web, VR"
        ],
        en: [
          "Glare-core engine at the core",
          "A full 3D environment for presence, creation, and collaboration",
          "An open project codebase",
          "Current version: 0.0.19 Beta",
          "Main tracks: desktop, web, VR"
        ]
      },
      asideTitle: {
        ru: "Срез проекта",
        en: "Project snapshot"
      },
      asideItems: {
        ru: [
          "Последнее обновление: 26 марта 2026",
          "Статус: pre-release и активная разработка",
          "Лицензия: MIT"
        ],
        en: [
          "Last update: March 26, 2026",
          "Status: pre-release with active development",
          "License: MIT"
        ]
      },
      links: {
        ru: [
          { label: "Glare-core", href: "https://www.glaretechnologies.com/" },
          { label: "Исходный код", href: "https://github.com/shipilovden/sub-metasiberia" }
        ],
        en: [
          { label: "Glare-core", href: "https://www.glaretechnologies.com/" },
          { label: "Source code", href: "https://github.com/shipilovden/sub-metasiberia" }
        ]
      },
      footer: {
        ru: "Glare-core / open source / active beta",
        en: "Glare-core / open source / active beta"
      }
    },
    {
      eyebrow: {
        ru: "Мир, аватары, связь",
        en: "World, avatars, connection"
      },
      title: {
        ru: "Навигация по миру, парсели, аватары и социальный слой",
        en: "World navigation, parcels, avatars, and the social layer"
      },
      deck: {
        ru:
          "Мир уже объединяет свободную навигацию, телепортацию, земельные участки, кастомизируемые аватары и встроенные каналы общения, так что Metasiberia работает не как статичная сцена, а как живая среда.",
        en:
          "The world layer already combines free navigation, teleportation, land parcels, customizable avatars, and built-in communication channels, so Metasiberia behaves like a live environment rather than a static scene."
      },
      highlights: {
        ru: [
          "Полнофункциональная 3D-среда с различными режимами камеры и свободной навигацией",
          "Телепортация между локациями и поддержка масштабов от комнат до ландшафтов",
          "Система координат и парселей для цифровых участков",
          "Кастомизируемые аватары, head tracking и body tracking",
          "Текстовый и голосовой чат, каналы, сообщения и плавающие подписи над аватарами"
        ],
        en: [
          "A full 3D environment with multiple camera modes and free navigation",
          "Teleportation between locations and support for spaces from rooms to landscapes",
          "A coordinate system and parcel layer for digital land",
          "Customizable avatars with head tracking and body tracking",
          "Text and voice chat, channels, messages, and floating labels above avatars"
        ]
      },
      asideTitle: {
        ru: "Социальные системы",
        en: "Social systems"
      },
      asideItems: {
        ru: [
          "Имена и профили пользователей",
          "Эмоции и жесты аватаров",
          "Система друзей и контактов",
          "Emoji-пикер и групповые беседы"
        ],
        en: [
          "User names and profiles",
          "Avatar emotions and gestures",
          "Friends and contact systems",
          "An emoji picker and group conversations"
        ]
      },
      footer: {
        ru: "World / parcels / avatars / chat",
        en: "World / parcels / avatars / chat"
      }
    },
    {
      eyebrow: {
        ru: "Создание контента",
        en: "Content authoring"
      },
      title: {
        ru: "3D-объекты, текст, медиа, воксели, камеры и порталы",
        en: "3D objects, text, media, voxels, cameras, and portals"
      },
      deck: {
        ru:
          "Внутри Metasiberia уже есть набор инструментов для создания мира прямо на месте: от обычных моделей и 3D-текста до WebView-панелей, вокселей, камер и порталов между мирами.",
        en:
          "Metasiberia already ships with a world-building toolkit that works in-place: from ordinary models and 3D text to WebView panels, voxels, cameras, and portals between worlds."
      },
      highlights: {
        ru: [
          "3D-объекты: загрузка и размещение моделей",
          "Текстовые объекты: 3D-текст с поддержкой шрифтов",
          "Изображения: размещение 2D-изображений в мире",
          "Аудио: встроенные аудиоплееры и звуковые объекты",
          "WebView: встраивание веб-контента в мир",
          "Воксели: система вокселей для создания структур",
          "Камеры: объекты камер для видеозаписи и трансляции",
          "Порталы: система порталов для перемещения между мирами"
        ],
        en: [
          "3D objects: model upload and placement",
          "Text objects: 3D text with font support",
          "Images: placing 2D images inside the world",
          "Audio: built-in audio players and sound objects",
          "WebView: embedding web content into the world",
          "Voxels: a voxel system for building structures",
          "Cameras: camera objects for capture and streaming",
          "Portals: a portal system for moving between worlds"
        ]
      },
      asideTitle: {
        ru: "Редакторы и инструменты",
        en: "Editors and tools"
      },
      asideItems: {
        ru: [
          "Object Editor: полный контроль параметров объектов",
          "Material Editor: материалы и текстуры",
          "Parcel Editor: управление земельными участками",
          "World Editor: редактирование параметров мира",
          "Environment Editor: свет, небо и погода"
        ],
        en: [
          "Object Editor: full control over object parameters",
          "Material Editor: materials and textures",
          "Parcel Editor: land parcel management",
          "World Editor: editing world parameters",
          "Environment Editor: light, sky, and weather"
        ]
      },
      footer: {
        ru: "Objects / media / voxels / portals",
        en: "Objects / media / voxels / portals"
      }
    },
    {
      eyebrow: {
        ru: "Рендер и звук",
        en: "Render and audio"
      },
      title: {
        ru: "PBR-материалы, визуализация и пространственный звук",
        en: "PBR materials, visualization, and spatial audio"
      },
      deck: {
        ru:
          "Помимо редакторов, у платформы уже есть собственный слой визуализации и звука: PBR-материалы, шейдеры, свет, тени, постобработка и полноценная аудиосистема с голосовым каналом.",
        en:
          "Beyond its editors, the platform already includes a dedicated render and audio layer: PBR materials, shaders, lighting, shadows, post-processing, and a full audio stack with voice channels."
      },
      highlights: {
        ru: [
          "Поддержка PBR (Physical Based Rendering)",
          "Система шейдеров на GLSL",
          "Текстурирование и UV-маппинг",
          "Система освещения: динамическое и статическое",
          "Система теней",
          "Постобработка и эффекты",
          "Поддержка различных форматов текстур"
        ],
        en: [
          "Support for PBR (Physical Based Rendering)",
          "A shader system built on GLSL",
          "Texturing and UV mapping",
          "Lighting systems: dynamic and static",
          "Shadow systems",
          "Post-processing and effects",
          "Support for multiple texture formats"
        ]
      },
      asideTitle: {
        ru: "Аудиосистема",
        en: "Audio system"
      },
      asideItems: {
        ru: [
          "Пространственный звук на Resonance Audio",
          "Поддержка MP3, WAV и OPUS",
          "Система аудиоплееров и звуковых объектов",
          "Микрофонный ввод",
          "Голосовой чат с кодеками",
          "Регулировка громкости и эффектов"
        ],
        en: [
          "Spatial audio via Resonance Audio",
          "Support for MP3, WAV, and OPUS",
          "Audio players and sound objects",
          "Microphone input",
          "Voice chat with codecs",
          "Volume and effect controls"
        ]
      },
      footer: {
        ru: "PBR / GLSL / lighting / Resonance",
        en: "PBR / GLSL / lighting / Resonance"
      }
    },
    {
      eyebrow: {
        ru: "VR и XR",
        en: "VR and XR"
      },
      title: {
        ru: "OpenXR и матрица поддерживаемых VR-шлемов",
        en: "OpenXR and the supported VR headset matrix"
      },
      deck: {
        ru:
          "Релизы ветки 0.0.19 вывели VR в отдельную сильную линию проекта: экспериментальный режим на Windows Qt-клиенте, стерео-рендеринг, трекинг и поддержка реальных гарнитур.",
        en:
          "The 0.0.19 branch turns VR into one of the project’s strongest tracks: an experimental mode in the Windows Qt client, stereo rendering, tracking, and support for real headsets."
      },
      highlights: {
        ru: [
          "Экспериментальный VR-режим в Windows Qt-клиенте через OpenXR",
          "Стерео-рендеринг с поддержкой VR-шлемов",
          "Трекинг головы, контроллеров и движений рук/тела",
          "VR-функциональность встроена прямо в клиентскую линию Metasiberia",
          "OpenXR выступает основным слоем VR-интеграции"
        ],
        en: [
          "An experimental VR mode in the Windows Qt client via OpenXR",
          "Stereo rendering with VR headset support",
          "Head, controller, and hand/body tracking",
          "VR functionality is built directly into the Metasiberia client line",
          "OpenXR acts as the core VR integration layer"
        ]
      },
      asideTitle: {
        ru: "Поддерживаемые VR-шлемы",
        en: "Supported VR headsets"
      },
      asideItems: {
        ru: [
          "Meta Quest 2 (PCVR/OpenXR)",
          "Meta Quest 3 (PCVR/OpenXR)",
          "HTC Vive и HTC Vive Cosmos",
          "HTC Vive Focus 3",
          "Valve Index",
          "Microsoft Motion Controllers",
          "Khronos generic controller",
          "Линейка Vive поддерживается как отдельный класс устройств"
        ],
        en: [
          "Meta Quest 2 (PCVR/OpenXR)",
          "Meta Quest 3 (PCVR/OpenXR)",
          "HTC Vive and HTC Vive Cosmos",
          "HTC Vive Focus 3",
          "Valve Index",
          "Microsoft Motion Controllers",
          "Khronos generic controller",
          "The Vive line is supported as a dedicated device class"
        ]
      },
      footer: {
        ru: "OpenXR / stereo / headset support",
        en: "OpenXR / stereo / headset support"
      }
    },
    {
      eyebrow: {
        ru: "VR-взаимодействие",
        en: "VR interaction"
      },
      title: {
        ru: "Локомоция, grounding, диагностика и VR-утилиты",
        en: "Locomotion, grounding, diagnostics, and VR utilities"
      },
      deck: {
        ru:
          "VR-линия не ограничивается простым запуском сцены в шлеме. В проект уже встроены режимы движения, выравнивание, first-person-представление, диагностика позы и сервисные инструменты для отладки.",
        en:
          "The VR branch goes far beyond simply launching a scene in a headset. It already includes movement modes, recentering, first-person presentation, pose diagnostics, and utility tooling for debugging."
      },
      highlights: {
        ru: [
          "Телепортационная локомоция с валидацией точек посадки",
          "Плавная локомоция на стиках и трекпадах",
          "Recenter-пайплайн для ручного выравнивания (Home/End)",
          "First-person отображение аватара в VR",
          "Grounding аватара с привязкой к LeftEye/RightEye/Head",
          "Portal rendering в VR с корректным tonemapping и bloom",
          "Поддержка controller interaction profiles для разных шлемов"
        ],
        en: [
          "Teleport locomotion with landing point validation",
          "Smooth locomotion on sticks and trackpads",
          "A recenter pipeline for manual alignment (Home/End)",
          "First-person avatar rendering in VR",
          "Avatar grounding tied to LeftEye/RightEye/Head",
          "Portal rendering in VR with correct tonemapping and bloom",
          "Support for controller interaction profiles across headsets"
        ]
      },
      asideTitle: {
        ru: "VR-отладка и утилиты",
        en: "VR debugging and utilities"
      },
      asideItems: {
        ru: [
          "xr_pose_trace.csv для анализа высоты головы, горизонта и симметрии глаз",
          "analyze_xr_pose_trace.py для анализа трассировки позы",
          "Автоматическая синхронизация записей со шлема через ADB",
          "Watch-режим и bat-стартер для мониторинга и запуска"
        ],
        en: [
          "xr_pose_trace.csv for head height, horizon, and eye symmetry analysis",
          "analyze_xr_pose_trace.py for pose trace inspection",
          "Automatic headset recording sync over ADB",
          "Watch mode and a bat launcher for monitoring and startup"
        ]
      },
      footer: {
        ru: "Locomotion / diagnostics / portal VR",
        en: "Locomotion / diagnostics / portal VR"
      }
    },
    {
      eyebrow: {
        ru: "Стек и клиенты",
        en: "Stack and clients"
      },
      title: {
        ru: "C++, Luau, Qt, WebGL и клиентская линейка проекта",
        en: "C++, Luau, Qt, WebGL, and the project client lineup"
      },
      deck: {
        ru:
          "Техническое ядро объединяет системные языки, шейдерный слой, desktop-интерфейс, web-клиент, сетевую синхронизацию и сборочную инфраструктуру. Это уже не один клиент, а полноценная технологическая платформа.",
        en:
          "The technical core combines system languages, a shader layer, desktop UI, a web client, network synchronization, and build infrastructure. This is already a full technology platform rather than a single client."
      },
      highlights: {
        ru: [
          "Языки: C++ (47.4%), C (46.9%), GLSL, CMake, Lua/Luau, JavaScript и Fortran",
          "Графика и рендеринг: OpenGL / DirectX, OpenXR и ядро Glare-core",
          "UI и интерфейс: Qt 5 / Qt 6, SDL и CEF",
          "Аудиостек: Resonance Audio, miniaudio, minimp3, Opus и RtAudio",
          "Сеть и синхронизация: собственный сетевой протокол, Ethereum и secp256k1",
          "Сборка и развёртывание: CMake, GitHub Actions, Windows CI и Linux Configure"
        ],
        en: [
          "Languages: C++ (47.4%), C (46.9%), GLSL, CMake, Lua/Luau, JavaScript, and Fortran",
          "Graphics and rendering: OpenGL / DirectX, OpenXR, and the Glare-core engine core",
          "UI and interface: Qt 5 / Qt 6, SDL, and CEF",
          "Audio stack: Resonance Audio, miniaudio, minimp3, Opus, and RtAudio",
          "Network and sync: a custom network protocol, Ethereum, and secp256k1",
          "Build and delivery: CMake, GitHub Actions, Windows CI, and Linux Configure"
        ]
      },
      asideTitle: {
        ru: "Клиентские приложения",
        en: "Client applications"
      },
      asideItems: {
        ru: [
          "Desktop-клиент (Windows/Linux): Qt-приложение, встроенный редактор, админ-система, VR через OpenXR, настройки графики, аудио, микрофона и веб-камеры",
          "Веб-клиент: JavaScript, WebGL, навигация, чат, просмотр, адаптивный интерфейс, loading overlay и управление чатом",
          "Мобильный клиент: Android APK в разработке, iOS запланирован"
        ],
        en: [
          "Desktop client (Windows/Linux): a Qt app with a built-in editor, admin system, VR via OpenXR, and graphics/audio/mic/webcam settings",
          "Web client: JavaScript, WebGL, navigation, chat, viewing, adaptive UI, a loading overlay, and chat controls",
          "Mobile client: Android APK in development, iOS planned"
        ]
      },
      footer: {
        ru: "C++ / Luau / Qt / WebGL",
        en: "C++ / Luau / Qt / WebGL"
      }
    },
    {
      eyebrow: {
        ru: "Ассеты, скрипты, масштаб",
        en: "Assets, scripts, scale"
      },
      title: {
        ru: "Форматы, ресурсный пайплайн, Lua VM и масштабирование мира",
        en: "Formats, the resource pipeline, the Lua VM, and world scaling"
      },
      deck: {
        ru:
          "Слой контента и расширяемости уже включает поддержку форматов, клиентский ресурсный пайплайн, встроенную Lua VM и архитектуру, рассчитанную на рост числа пользователей и сервисов.",
        en:
          "The content and extensibility layer already includes file format support, a client-side resource pipeline, a built-in Lua VM, and an architecture designed to scale with more users and services."
      },
      highlights: {
        ru: [
          "Поддерживаемые форматы: 3D-модели OBJ, FBX, GLTF, DAE и другие",
          "Изображения PNG, JPG, WebP, EXR, BMP; аудио MP3, WAV, OGG, OPUS; видео MP4 и WebM; текстуры Basis",
          "Система ресурсов: кэширование, LOD, Basis-сжатие, streaming больших ассетов и версионирование",
          "Lua/Luau-скриптинг: встроенная Lua VM, API для объектов, события и обработчики",
          "Система плагинов через Lua и бот-контур для автоматизации",
          "Масштабируемость: поддержка большого числа пользователей, серверная система распределения нагрузки, клиентский и серверный кэш, оптимизация памяти"
        ],
        en: [
          "Supported formats: 3D models such as OBJ, FBX, GLTF, DAE, and more",
          "Images in PNG, JPG, WebP, EXR, BMP; audio in MP3, WAV, OGG, OPUS; video in MP4 and WebM; Basis textures",
          "A resource pipeline with caching, LOD, Basis compression, large-asset streaming, and versioning",
          "Lua/Luau scripting with a built-in Lua VM, an object API, events, and handlers",
          "A plugin system through Lua and a bot layer for automation",
          "Scalability through many-user support, load-distribution servers, client/server caching, and memory optimization"
        ]
      },
      asideTitle: {
        ru: "Автоматизация и боты",
        en: "Automation and bots"
      },
      asideItems: {
        ru: [
          "lightmapper_bot — автоматическое создание карт освещения",
          "screenshot_bot — автоматические скриншоты",
          "cv_bot — компьютерное зрение",
          "backup_bot — резервное копирование"
        ],
        en: [
          "lightmapper_bot — automatic lightmap generation",
          "screenshot_bot — automated screenshots",
          "cv_bot — computer vision",
          "backup_bot — backups"
        ]
      },
      footer: {
        ru: "Formats / Lua / caching / scale",
        en: "Formats / Lua / caching / scale"
      }
    },
    {
      eyebrow: {
        ru: "Дорожная карта и входы",
        en: "Roadmap and entry points"
      },
      title: {
        ru: "Ближайшие векторы развития и кнопки перехода в экосистему проекта",
        en: "Near-term development vectors and entry buttons into the project ecosystem"
      },
      deck: {
        ru:
          "Следующий слой работы уже понятен: углубление VR, расширение контента, рост социальных функций, мобильные клиенты и интеграции. Ниже собраны прямые кнопки на сервисы, комьюнити и базовые точки входа.",
        en:
          "The next layer of work is already clear: deeper VR, broader content tooling, stronger social systems, mobile clients, and integrations. Below are direct buttons to services, community channels, and the core project entry points."
      },
      highlights: {
        ru: [
          "Улучшение VR-опыта: производительность, больше шлемов и лучшая работа контроллеров",
          "Расширение контента: больше встроенных объектов, библиотека шейдеров и система частиц",
          "Социальные функции: гильдии/группы, достижения и ранги",
          "Мобильная поддержка: Android APK, iOS-приложение и mobile VR (Cardboard)",
          "Интеграции: NFT, социальные сети и потоковые платформы"
        ],
        en: [
          "VR improvements: better performance, more headsets, and stronger controller interactions",
          "Content expansion: more built-in objects, a shader library, and a particle system",
          "Social systems: guilds/groups, achievements, and ranks",
          "Mobile support: Android APK, an iOS app, and mobile VR (Cardboard)",
          "Integrations: NFTs, social networks, and streaming platforms"
        ]
      },
      asideTitle: {
        ru: "Ресурсы и ссылки",
        en: "Resources and links"
      },
      asideItems: {
        ru: [
          "Официальные сервисы проекта доступны отдельно через кнопки ниже",
          "Сообщество и кодовая база вынесены в отдельный набор переходов",
          "Лицензия проекта: MIT"
        ],
        en: [
          "Official project services are available through the buttons below",
          "Community channels and the codebase live in a separate set of links",
          "Project license: MIT"
        ]
      },
      links: {
        ru: [
          { label: "Admin", href: "https://vr.metasiberia.com/" },
          { label: "Signup", href: "https://vr.metasiberia.com/signup" },
          { label: "Web Client", href: "https://vr.metasiberia.com/webclient" },
          { label: "Website", href: "https://metasiberia.com/" }
        ],
        en: [
          { label: "Admin", href: "https://vr.metasiberia.com/" },
          { label: "Signup", href: "https://vr.metasiberia.com/signup" },
          { label: "Web Client", href: "https://vr.metasiberia.com/webclient" },
          { label: "Website", href: "https://metasiberia.com/" }
        ]
      },
      asideLinks: {
        ru: [
          { label: "VK", href: "https://vk.com/metasiberia_official" },
          { label: "Telegram", href: "https://t.me/metasiberia_channel" },
          { label: "GitHub", href: "https://github.com/shipilovden/sub-metasiberia" },
          { label: "Wiki", href: "https://github.com/shipilovden/sub-metasiberia/wiki" },
          { label: "Glare-core", href: "https://www.glaretechnologies.com/" }
        ],
        en: [
          { label: "VK", href: "https://vk.com/metasiberia_official" },
          { label: "Telegram", href: "https://t.me/metasiberia_channel" },
          { label: "GitHub", href: "https://github.com/shipilovden/sub-metasiberia" },
          { label: "Wiki", href: "https://github.com/shipilovden/sub-metasiberia/wiki" },
          { label: "Glare-core", href: "https://www.glaretechnologies.com/" }
        ]
      },
      footer: {
        ru: "Roadmap / services / community / links",
        en: "Roadmap / services / community / links"
      }
    }
  ];
  TECH_UI_COPY.ru.githubLoading = "загрузка...";
  TECH_UI_COPY.ru.githubUnavailable = "данные GitHub недоступны";
  TECH_UI_COPY.ru.githubVersionLabel = "Текущая версия";
  TECH_UI_COPY.ru.githubReleaseLabel = "Последний релиз";
  TECH_UI_COPY.ru.githubActivityLabel = "Последняя активность репозитория";
  TECH_UI_COPY.ru.githubUpdateLabel = "Последнее обновление";
  TECH_UI_COPY.ru.githubCommitLabel = "Последний коммит";
  TECH_UI_COPY.ru.githubCommitMessageLabel = "Описание коммита";
  TECH_UI_COPY.en.githubLoading = "loading...";
  TECH_UI_COPY.en.githubUnavailable = "GitHub data unavailable";
  TECH_UI_COPY.en.githubVersionLabel = "Current version";
  TECH_UI_COPY.en.githubReleaseLabel = "Latest release";
  TECH_UI_COPY.en.githubActivityLabel = "Latest repository activity";
  TECH_UI_COPY.en.githubUpdateLabel = "Last update";
  TECH_UI_COPY.en.githubCommitLabel = "Latest commit";
  TECH_UI_COPY.en.githubCommitMessageLabel = "Commit description";
  if (TECH_FEATURE_SLIDES[0]) {
    TECH_FEATURE_SLIDES[0].highlights = {
      ru: [
        "Ядро Glare-core",
        "Полнофункциональная 3D-среда для присутствия, создания контента и совместной работы",
        "Открытая кодовая база проекта",
        {
          dynamicKey: "current-version",
          label: { ru: "Текущая версия", en: "Current version" },
          fallback: { ru: "v0.0.19 Beta", en: "v0.0.19 Beta" }
        },
        "Основные линии: desktop, web, VR"
      ],
      en: [
        "Glare-core engine at the core",
        "A full 3D environment for presence, creation, and collaboration",
        "An open project codebase",
        {
          dynamicKey: "current-version",
          label: { ru: "Текущая версия", en: "Current version" },
          fallback: { ru: "v0.0.19 Beta", en: "v0.0.19 Beta" }
        },
        "Main tracks: desktop, web, VR"
      ]
    };
    TECH_FEATURE_SLIDES[0].asideItems = {
      ru: [
        {
          dynamicKey: "repo-activity",
          label: { ru: "Последняя активность репозитория", en: "Latest repository activity" },
          fallback: { ru: "загрузка...", en: "loading..." }
        },
        {
          dynamicKey: "latest-release",
          label: { ru: "Последний релиз", en: "Latest release" },
          fallback: { ru: "v0.0.19 Beta", en: "v0.0.19 Beta" }
        },
        {
          dynamicKey: "last-update",
          label: { ru: "Последнее обновление", en: "Last update" },
          fallback: { ru: "26 марта 2026", en: "March 26, 2026" }
        },
        {
          dynamicKey: "last-commit",
          label: { ru: "Последний коммит", en: "Latest commit" },
          fallback: { ru: "загрузка...", en: "loading..." }
        },
        {
          dynamicKey: "commit-message",
          label: { ru: "Описание коммита", en: "Commit description" },
          fallback: { ru: "загрузка...", en: "loading..." }
        },
        "Лицензия: MIT"
      ],
      en: [
        {
          dynamicKey: "repo-activity",
          label: { ru: "Последняя активность репозитория", en: "Latest repository activity" },
          fallback: { ru: "загрузка...", en: "loading..." }
        },
        {
          dynamicKey: "latest-release",
          label: { ru: "Последний релиз", en: "Latest release" },
          fallback: { ru: "v0.0.19 Beta", en: "v0.0.19 Beta" }
        },
        {
          dynamicKey: "last-update",
          label: { ru: "Последнее обновление", en: "Last update" },
          fallback: { ru: "26 марта 2026", en: "March 26, 2026" }
        },
        {
          dynamicKey: "last-commit",
          label: { ru: "Последний коммит", en: "Latest commit" },
          fallback: { ru: "загрузка...", en: "loading..." }
        },
        {
          dynamicKey: "commit-message",
          label: { ru: "Описание коммита", en: "Commit description" },
          fallback: { ru: "загрузка...", en: "loading..." }
        },
        "License: MIT"
      ]
    };
  }
  var SELECTOR_UPDATES = [
    {
      selector: 'a[href="#t-main-content"]',
      type: "text",
      values: {
        ru: "К основному контенту",
        en: "Skip to main content"
      }
    },
    {
      selector: "#rec872145463 .t300__content-text",
      type: "text",
      values: {
        ru: "Для вашего удобства вебклиент пока работает только с компьютеров",
        en: "For your convenience, the web client currently works on desktop devices only."
      }
    },
    {
      selector: "#rec872697073 .t134__descr",
      type: "html",
      values: {
        ru: '<div style="color: rgb(0, 0, 0); text-align: center;"><strong>Denis Shipilov</strong><br /><span>© 2023–2026 Метасибирь.</span><br /><span class="metasiberia-footer__links"><a href="https://t.me/metasiberia_metaverse" target="_blank" rel="noopener noreferrer">Telegram</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://vk.com/metasiberia_official" target="_blank" rel="noopener noreferrer">VK</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://github.com/shipilovden/sub-metasiberia" target="_blank" rel="noopener noreferrer">Github</a></span><br /><span class="metasiberia-footer__links metasiberia-footer__links--secondary"><a href="https://vr.metasiberia.com/webclient" target="_blank" rel="noopener noreferrer">Webclient</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://vr.metasiberia.com/signup" target="_blank" rel="noopener noreferrer">Регистрация</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://vr.metasiberia.com/login" target="_blank" rel="noopener noreferrer">Вход</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://vr.metasiberia.com/map" target="_blank" rel="noopener noreferrer">Карта</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://metasiberia.com/faq" target="_blank" rel="noopener noreferrer">F.A.Q.</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://metasiberia.com/terms" target="_blank" rel="noopener noreferrer">Правила</a></span><br /><span>Сделано на Glare-core, кофе и вере в метавселенную</span></div>',
        en: '<div style="color: rgb(0, 0, 0); text-align: center;"><strong>Denis Shipilov</strong><br /><span>© 2023–2026 Metasiberia.</span><br /><span class="metasiberia-footer__links"><a href="https://t.me/metasiberia_metaverse" target="_blank" rel="noopener noreferrer">Telegram</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://vk.com/metasiberia_official" target="_blank" rel="noopener noreferrer">VK</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://github.com/shipilovden/sub-metasiberia" target="_blank" rel="noopener noreferrer">Github</a></span><br /><span class="metasiberia-footer__links metasiberia-footer__links--secondary"><a href="https://vr.metasiberia.com/webclient" target="_blank" rel="noopener noreferrer">Webclient</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://vr.metasiberia.com/signup" target="_blank" rel="noopener noreferrer">Signup</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://vr.metasiberia.com/login" target="_blank" rel="noopener noreferrer">Login</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://vr.metasiberia.com/map" target="_blank" rel="noopener noreferrer">Map</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://metasiberia.com/faq" target="_blank" rel="noopener noreferrer">F.A.Q.</a><span class="metasiberia-footer__separator" aria-hidden="true">|</span><a href="https://metasiberia.com/terms" target="_blank" rel="noopener noreferrer">Terms</a></span><br /><span>Built with Glare-core, coffee, and faith in the metaverse</span></div>'
      }
    },
    {
      selector: "#rec859988145 .t801__button",
      type: "html",
      values: {
        ru: '<span class="t-btntext__text">Открыть в браузере</span> <style>#rec859988145 .t-btntext.t-btntext_type_button {color:#222222;border-style:none !important;box-shadow:none !important;transition-duration:0.2s;transition-property:background-color,color,border-color,box-shadow,opacity,transform;transition-timing-function:ease-in-out;}</style>',
        en: '<span class="t-btntext__text">Open in browser</span> <style>#rec859988145 .t-btntext.t-btntext_type_button {color:#222222;border-style:none !important;box-shadow:none !important;transition-duration:0.2s;transition-property:background-color,color,border-color,box-shadow,opacity,transform;transition-timing-function:ease-in-out;}</style>'
      }
    },
    {
      selector: "#rec858665447 .t134__descr",
      type: "text",
      values: {
        ru: "Участки",
        en: "Parcels"
      }
    },
    {
      selector: "#rec871768544 .t001__title, #recorddiv871768544 .t001__title",
      type: "html",
      values: {
        ru: '<span style="color: rgb(0, 0, 0);">скоро</span>',
        en: '<span style="color: rgb(0, 0, 0);">coming soon</span>'
      }
    },
    {
      selector: "#rec872704795 .t001__title, #recorddiv872704795 .t001__title",
      type: "html",
      values: {
        ru: '<span style="color: rgb(255, 255, 255);">Ой, ошибка 404</span>',
        en: '<span style="color: rgb(255, 255, 255);">Oops, error 404</span>'
      }
    }
  ];
  var PAGE_HTML_TRANSLATIONS = {
    "62281087": [
      {
        selector: "#rec922094125 .t675__descr",
        html: [
          '<span>METASIBERIA&deg; is a virtual world project built with the Glare-core engine. Metasiberia is fully open source, and you can browse the source code on </span><strong><a href="https://github.com/shipilovden/sub-metasiberia" target="_blank" rel="noreferrer noopener">GitHub</a></strong><span>.</span>',
          "Study, work, play, and connect with other users. Ride motorcycles, build your own world, or buy a parcel and create your presence in the main world."
        ]
      },
      {
        selector: "#rec859988145 .t-text.t-text_md",
        html: [
          "To create an object in the main world, you need to be either on a parcel you own or in the sandbox (Parcel #31). As an alternative, you can create objects in your personal world, where there are no restrictions.",
          'A parcel is your own digital plot in virtual space. You can script it, modify it, and use it however you like, as well as grant permissions to other users for collaborative creation. Metasiberia has a huge number of parcels, and they will appear in our <strong>store</strong> soon. Follow the <strong><a href="#news">news</a></strong> so you can claim your own piece of the digital world and build something unique.'
        ]
      }
    ],
    "62442585": [
      {
        selector: "#rec859828747 .t167__text",
        html: [
          '<strong style="font-size: 28px;">Frequently Asked Questions about Metasiberia</strong><br /><br />' +
            "<strong>What is Metasiberia?</strong><br />" +
            "Metasiberia is a metaverse. Here, users can explore vast spaces, communicate, play, and create their own unique territories inside a shared virtual world.<br /><br />" +
            "<strong>How do I enter Metasiberia?</strong><br /><br />" +
            '~Client address: <a href="denied:sub://vr.metasiberia.com" style="color: rgb(0, 10, 255);">sub://vr.metasiberia.com</a><br />' +
            '~Web mode: <a href="https://vr.metasiberia.com/webclient" target="_blank" rel="noreferrer noopener" style="color: rgb(0, 10, 255);">https://vr.metasiberia.com/webclient</a><br /><br />' +
            "<ol>" +
            '<li data-list="ordered">Sign up: <a href="https://vr.metasiberia.com/signup" target="_blank" rel="noreferrer noopener" style="color: rgb(0, 10, 255);">https://vr.metasiberia.com/signup</a></li>' +
            '<li data-list="ordered">Download and install the Metasiberia desktop client: <strong style="color: rgb(0, 10, 255);"><a href="https://disk.yandex.ru/d/-5Zv226SSBvBsg" style="color: rgb(0, 10, 255);">here</a></strong>.</li>' +
            '<li data-list="ordered">Enter <a href="denied:sub://vr.metasiberia.com" target="_blank" rel="noreferrer noopener" style="color: rgb(0, 10, 255);">sub://vr.metasiberia.com</a> in the address bar and press Enter.</li>' +
            '<li data-list="ordered">In the client, click <strong>Log in</strong> in the top-right corner and enter your username and password.</li>' +
            '<li data-list="ordered">Set Metasiberia as your start location. In the <strong>Go</strong> menu, choose <strong>Set current location as start location</strong>.</li>' +
            '<li data-list="ordered">Your avatar will now always appear in the center of Metasiberia.</li>' +
            "</ol>" +
            "<strong>What engine powers Metasiberia?</strong><br />" +
            'Metasiberia is built on the <strong>Glare-core</strong> engine developed by Glare Technologies Limited. The same team is also known for Indigo Renderer and Chaotica Fractals.<br /><br />' +
            "<strong>Why is Metasiberia considered a metaverse?</strong><br />" +
            "Metasiberia is classified as a metaverse because it is an integrated digital environment that unites multiple virtual spaces with a high degree of interactivity and user autonomy. From a scientific perspective, a metaverse is a persistent, collectively inhabited virtual reality that functions as a parallel system supporting social, creative, and economic interactions. In Metasiberia, this is achieved through the central world, which serves as a hub for new users, and through personal territories available at <strong>sub://vr.metasiberia.com/username</strong>, where everyone can shape their own space.<br /><br />" +
            "<strong>How can I buy a parcel in Metasiberia?</strong><br />" +
            "At the moment, parcel purchases are available only on request. Soon we will launch a store where parcels can be bought directly. Follow updates on our website and social channels.<br /><br />" +
            "<strong>Can I share parcel permissions in Metasiberia?</strong><br />" +
            "Yes. You can add other users as co-authors of your parcel. They will be able to create, edit, and delete objects on your land.<br />" +
            "<ol>" +
            '<li data-list="ordered">Log in to your account on the Metasiberia website and open the admin panel.</li>' +
            '<li data-list="ordered">Open your parcel from your user page.</li>' +
            '<li data-list="ordered">Click <strong>Add writer</strong> and enter the Metasiberia username.</li>' +
            "</ol>" +
            'You can also temporarily or permanently open the parcel for public editing by selecting <strong>All writeable</strong> in the object editor.<br /><br />' +
            "<strong>Creating and building in Metasiberia</strong><br />" +
            "<strong>How do I create objects in Metasiberia?</strong><br />" +
            "In the central world, you can create objects either on a parcel you own or in the sandbox (Parcel #31). In your personal world, there are no such restrictions.<br />" +
            "There are two ways to create objects:<br />" +
            "<ul>" +
            '<li data-list="bullet">In the client, choose <strong>Add model / image / video</strong> and follow the instructions.</li>' +
            '<li data-list="bullet">Create an object from voxels directly inside Metasiberia by choosing <strong>Add voxels</strong>.</li>' +
            "</ul>" +
            "Supported formats:<br />" +
            "Models: OBJ, GLTF, GLB, VOX, STL, IGMESH<br />" +
            "Images: JPG, PNG, GIF, TIF, EXR, KTX, KTX2<br />" +
            "Video: MP4<br />" +
            "Please avoid uploading very high-poly models or large files so performance stays comfortable for everyone.<br /><br />" +
            "<strong>How do voxels work in Metasiberia?</strong><br />" +
            'You can either upload a ready-made voxel file in a supported format or build it directly inside Metasiberia. To create voxels yourself, go to a parcel where you have editing rights and choose <strong>Add voxels</strong>. The first block appears as a gray cube, and a hint window explains the controls. The core interaction is simple: <strong>Ctrl + left click</strong> adds a new voxel to the selected face. While holding Ctrl, you will see exactly where the next block will appear. Voxels can be scaled in the editor with the <strong>Scale</strong> parameter.<br /><br />' +
            "<strong>How do I animate objects in Metasiberia?</strong><br />" +
            "Animation and interactivity in Metasiberia are built with the Lua-based scripting system. More details are available on the scripting pages. To assign a script, select your object in the client, open the editor, and enter the code in the <strong>Script</strong> section. Only your own objects can be edited this way.<br /><br />" +
            "<strong>Are there any content restrictions in Metasiberia?</strong><br />" +
            "Yes. Content that is not suitable for everyone, including explicit sexual or violent material, is prohibited. See the terms of use for details.<br /><br />" +
            "<strong>Troubleshooting</strong><br />" +
            "<strong>I am having trouble with Metasiberia. Where can I get help?</strong><br />" +
            "The fastest way is to contact us through our VK community or Telegram.<br /><br />" +
            "<strong>Metasiberia is built on the Glare-core engine.</strong>"
        ]
      }
    ],
    "63809043": [
      {
        selector: "#rec870753101 .t167__text",
        html: [
          '<strong style="font-size: 26px;">Metasiberia</strong><br /><br />' +
            "<strong>Terms of Service.</strong><br />" +
            'These terms of service apply to the Metasiberia website at metasiberia.com and to the Metasiberia virtual world hosted on Reg.ru servers and accessed through the Metasiberia client software.<br />' +
            'Together they form the “Service”.<br /><br />' +
            "<strong>General terms.</strong><br />" +
            'By accessing or using the “Service”, you agree to follow these Terms.<br />' +
            "If you do not agree with any part of the terms, you may not access the Service.<br />" +
            "Pornographic or violent content is not allowed.<br />" +
            "Package content must not seriously or negatively affect the performance or functioning of the Metasiberia server(s) or the Metasiberia client. For example, do not upload models with excessive polygon counts or overly large textures.<br />" +
            "Do not intentionally attempt to disrupt or degrade the server or other users’ clients.<br />" +
            "We reserve the right to refuse service to anyone at any time for any reason.<br />" +
            "We reserve the right to change these terms of service.<br /><br />"
        ]
      }
    ],
    "63810393": [
      {
        selector: "#rec870763264 .t167__text",
        html: [
          '<strong style="font-size: 28px;">Luau scripting in Metasiberia</strong><br /><br />' +
            "In Metasiberia, you can bring your objects to life with Luau, a modern Lua dialect inspired by Roblox. It is a powerful tool for building interactive elements and automating behavior in your virtual world.<br /><br />" +
            "<strong>Creating a script for an object.</strong><br />" +
            "You need the Metasiberia desktop client to work with scripts.<br />" +
            "<ol>" +
            '<li data-list="ordered">Open the client and double-click the object you want to configure.</li>' +
            '<li data-list="ordered">In the <strong>Script</strong> section, click <strong>Edit</strong>. The editor window will appear.</li>' +
            '<li data-list="ordered">Start your code with <strong>--lua</strong> to indicate that you are using Luau instead of Winter or XML.</li>' +
            '<li data-list="ordered">After making changes, close the editor. The script will immediately be applied to the object.</li>' +
            "</ol>" +
            "<strong>How scripts work.</strong><br />" +
            "Scripts in Metasiberia run simultaneously on the client and on the metasiberia.world server. This means your code is activated on every connected device and on the central server.<br />" +
            "<ul>" +
            '<li data-list="bullet">Physical effects such as collisions are processed on the client side, where the physics simulation is calculated.</li>' +
            '<li data-list="bullet">All other changes happen on the server and are synchronized with other users instantly.</li>' +
            "</ul>" +
            "<strong>Debugging scripts.</strong><br />" +
            "Use the <strong>print</strong> function to output messages:<br />" +
            "--lua<br />" +
            'print("Hello from Metasiberia!")<br />' +
            'All debug data, including output and errors, is visible in the log window (<strong>tools &gt; Show log</strong>). If your script contains an error, it will be shown in the log and execution will stop.<br />' +
            'Server-side logs are available at <strong>metasiberia.com/script_log</strong> for logged-in users. There you can see up to 1000 recent messages and errors produced by your scripts.<br /><br />' +
            "<strong>Event listeners.</strong><br />" +
            "Scripts can react to user actions through special callback functions. Define them to track object-related events:<br />" +
            "<ul>" +
            '<li data-list="bullet">onUserTouchedObject(avatar, object) — the avatar touched the object. It fires every 0.5 seconds while contact continues.</li>' +
            '<li data-list="bullet">onUserUsedObject(avatar, object) — the user activated the object with the <strong>E</strong> key.</li>' +
            '<li data-list="bullet">onUserMovedNearToObject(avatar, object) — the avatar moved within a 20-meter radius of the object.</li>' +
            '<li data-list="bullet">onUserMovedAwayFromObject(avatar, object) — the avatar moved farther than 20 meters away.</li>' +
            '<li data-list="bullet">onUserEnteredParcel(avatar, object, parcel) — the avatar entered a parcel.</li>' +
            '<li data-list="bullet">onUserExitedParcel(avatar, object, parcel) — the avatar left a parcel.</li>' +
            '<li data-list="bullet">onUserEnteredVehicle(avatar, vehicle_ob) — the avatar entered a vehicle.</li>' +
            '<li data-list="bullet">onUserExitedVehicle(avatar, vehicle_ob) — the avatar left a vehicle.</li>' +
            "</ul>" +
            'To listen for events on other objects, use <strong>addEventListener</strong>:<br />' +
            '--lua<br />' +
            'addEventListener("onUserTouchedObject", 583, onUserTouchedObject)<br /><br />' +
            "<strong>Global functions.</strong><br />" +
            "<ul>" +
            '<li data-list="bullet">getObjectForUID(uid) — returns an object by its ID.</li>' +
            '<li data-list="bullet">showMessageToUser(msg, avatar) — displays a message to the selected user on screen.</li>' +
            '<li data-list="bullet">createTimer(onTimerEvent, interval, repeating) — creates a timer. Maximum: 4 timers.</li>' +
            '<li data-list="bullet">onTimerEvent(object) — function invoked when the timer fires.</li>' +
            '<li data-list="bullet">Returns a handle that can later be used by destroyTimer.</li>' +
            '<li data-list="bullet">destroyTimer(timer_handle) — removes a timer.</li>' +
            '<li data-list="bullet">doHTTPGetRequestAsync(url, headers, onDone, onError) — asynchronous HTTP GET request. Limit: 5 requests per 300 seconds.</li>' +
            '<li data-list="bullet">onDone({response_code, response_message, mime_type, body_data}) — success callback.</li>' +
            '<li data-list="bullet">onError({error_code, error_description}) — error callback. 0 = OK, 1 = other, 2 = rate limit.</li>' +
            '<li data-list="bullet">doHTTPPostRequestAsync(url, post_content, content_type, headers, onDone, onError) — asynchronous HTTP POST request.</li>' +
            '<li data-list="bullet">Example:</li>' +
            '<li data-list="bullet">--lua</li>' +
            `<li data-list="bullet">doHTTPPostRequestAsync( "https://example.com/api", "{ id: '123' }", "application/json", { Authorization = "Basic key" }, function(result) print(result.response_code) end, function(err) print(err.error_description) end)</li>` +
            '<li data-list="bullet">getSecret(secret_name) — retrieves a secret such as an API key from your account settings.</li>' +
            '<li data-list="bullet">my_key = getSecret("MY_API_KEY")</li>' +
            '<li data-list="bullet">parseJSON(json) — converts JSON into a Lua object.</li>' +
            `<li data-list="bullet">parseJSON('[1, true, "text", null]') → {1, true, "text", nil}</li>` +
            '<li data-list="bullet">objectstorage.setItem(key, value) — stores persistent data that survives reloads.</li>' +
            '<li data-list="bullet">objectstorage.getItem(key) — reads stored data, or nil if there is no value.</li>' +
            "</ul><br />" +
            "<strong>Visit counter example.</strong><br />" +
            "--lua<br />" +
            'local visits = objectstorage.getItem("visits") or 0<br />' +
            "visits = visits + 1<br />" +
            'objectstorage.setItem("visits", visits)<br /><br />' +
            "<strong>Global variables.</strong><br />" +
            "<ul>" +
            '<li data-list="bullet">this_object — the current object that owns the script.</li>' +
            '<li data-list="bullet">IS_CLIENT — true on the client, false on the server.</li>' +
            '<li data-list="bullet">IS_SERVER — true on the server, false on the client.</li>' +
            "</ul>" +
            "<strong>Classes.</strong><br />" +
            "<ul>" +
            '<li data-list="bullet"><strong>Object</strong></li>' +
            '<li data-list="bullet">Attributes:</li>' +
            '<li data-list="bullet">model_url — model URL (string).</li>' +
            '<li data-list="bullet">pos — position (Vec3d).</li>' +
            '<li data-list="bullet">axis — rotation axis (Vec3f).</li>' +
            '<li data-list="bullet">angle — rotation angle in radians (number).</li>' +
            '<li data-list="bullet">scale — scale (Vec3f).</li>' +
            '<li data-list="bullet">collidable — collisions enabled (true/false).</li>' +
            '<li data-list="bullet">dynamic — physics-enabled object (true/false).</li>' +
            '<li data-list="bullet">sensor — sensor mode (true/false).</li>' +
            '<li data-list="bullet">content — text content for text objects (string).</li>' +
            '<li data-list="bullet">video_autoplay — autoplay video (true/false).</li>' +
            '<li data-list="bullet">video_loop — loop video (true/false).</li>' +
            '<li data-list="bullet">video_muted — mute video (true/false).</li>' +
            '<li data-list="bullet">mass — mass in kilograms (number, for dynamic objects).</li>' +
            '<li data-list="bullet">friction — friction coefficient (0–1).</li>' +
            '<li data-list="bullet">restitution — bounciness (0–1).</li>' +
            '<li data-list="bullet">centre_of_mass_offset_os — center of mass offset (Vec3f).</li>' +
            '<li data-list="bullet">audio_source_url — audio URL (string).</li>' +
            '<li data-list="bullet">audio_volume — audio volume (number, default 1).</li>' +
            '<li data-list="bullet">Methods:</li>' +
            '<li data-list="bullet">getNumMaterials() — number of materials.</li>' +
            '<li data-list="bullet">getMaterial(index) — returns the material by index.</li>' +
            '<li data-list="bullet"><strong>Material</strong></li>' +
            '<li data-list="bullet">Attributes:</li>' +
            '<li data-list="bullet">colour — color (Vec3f, sRGB).</li>' +
            '<li data-list="bullet">colour_texture_url — color texture URL (string).</li>' +
            '<li data-list="bullet">emission_rgb — emission color (Vec3f, sRGB).</li>' +
            '<li data-list="bullet">emission_texture_url — emission texture URL (string).</li>' +
            '<li data-list="bullet">normal_map_url — normal map URL (string).</li>' +
            '<li data-list="bullet">roughness_val — roughness (0–1).</li>' +
            '<li data-list="bullet">roughness_texture_url — roughness texture URL (string).</li>' +
            '<li data-list="bullet">metallic_fraction_val — metallic value (0–1).</li>' +
            '<li data-list="bullet">opacity_val — opacity (0–1).</li>' +
            '<li data-list="bullet">tex_matrix — texture matrix (Matrix2f, default {1, 0, 0, 1}).</li>' +
            '<li data-list="bullet">emission_lum_flux_or_lum — luminous flux or luminance (number).</li>' +
            '<li data-list="bullet">hologram — hologram rendering (true/false).</li>' +
            '<li data-list="bullet">double_sided — double-sided rendering (true/false).</li>' +
            '<li data-list="bullet"><strong>Avatar</strong></li>' +
            '<li data-list="bullet">Attributes:</li>' +
            '<li data-list="bullet">pos — position (Vec3d, roughly 1.67 m above the surface).</li>' +
            '<li data-list="bullet">name — username (string).</li>' +
            '<li data-list="bullet">linear_velocity — velocity (Vec3f, m/s).</li>' +
            '<li data-list="bullet">vehicle_inside — vehicle object (Object or nil). <strong style="color: rgb(31, 0, 255);"><a href="/scripts" style="color: rgb(31, 0, 255);">Luau script examples</a></strong></li>' +
            "</ul>"
        ]
      }
    ],
    "63811825": [
      {
        selector: "#rec870773520 .t167__text",
        html: [
          '<strong style="font-size: 24px;">Luau script examples in Metasiberia</strong><br /><br />' +
            "<strong>Welcome message on object touch</strong><br />" +
            "<strong>A simple script that shows the user a personalized message when their avatar touches an object.</strong><br /><br />" +
            '<span style="color: rgb(20, 0, 252);">--lua</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserTouchedObject(avatar, object) showMessageToUser("Hello, " .. avatar.name .. ", you touched the object!", avatar)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            "When the avatar touches the object, for example a red cube, a greeting with their name appears on screen.<br /><br />" +
            "<strong>Jump pad</strong><br />" +
            "<strong>An object that launches the avatar into the air when touched.</strong><br /><br />" +
            '<span style="color: rgb(20, 0, 252);">--lua</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserTouchedObject(avatar, object)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local v = avatar.linear_velocity</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local new_v = Vec3f(v.x, v.y, 10.0) -- Launch upward at 10 m/s</span><br />' +
            '<span style="color: rgb(20, 0, 252);">avatar.linear_velocity = new_v</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            "On contact, the avatar receives a vertical impulse that creates a jump effect.<br /><br />" +
            "<strong>Changing text when entering or leaving a parcel</strong><br />" +
            "<strong>A script for a text object that changes its text and color depending on whether the user has entered or left the parcel.</strong><br /><br />" +
            '<span style="color: rgb(20, 0, 252);">--lua</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserEnteredParcel(avatar, object, parcel)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">object.content = "User entered the parcel"</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local mat = object:getMaterial(0)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">mat.colour = Vec3f(0, 1, 0) -- Green color</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br /><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserExitedParcel(avatar, object, parcel)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">object.content = "User left the parcel"</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local mat = object:getMaterial(0)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">mat.colour = Vec3f(1, 0.1, 0) -- Reddish color</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            "The text updates, while the object material turns green on entry and red on exit.<br /><br />" +
            "<strong>Changing object color on enter and exit</strong><br />" +
            "<strong>This script changes the color of an object when the avatar enters or leaves a parcel.</strong><br /><br />" +
            '<span style="color: rgb(20, 0, 252);">--lua</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserEnteredParcel(avatar, object, parcel)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local mat = object:getMaterial(0)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">mat.colour = Vec3f(1, 0, 0) -- Red color</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br /><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserExitedParcel(avatar, object, parcel)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local mat = object:getMaterial(0)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">mat.colour = Vec3f(0, 1, 0) -- Green color</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            "The object turns red on entry and green on exit.<br /><br />" +
            "<strong>Object following nearby users</strong><br />" +
            "<strong>An object that moves toward the nearest avatar while the avatar stays within range.</strong><br /><br />" +
            '<span style="color: rgb(20, 0, 252);">--lua</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local near_user = nil</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onTimerEvent(object)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">if near_user then</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local dx = near_user.pos.x - object.pos.x</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local dy = near_user.pos.y - object.pos.y</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local dz = (near_user.pos.z - 1.68) - object.pos.z -- Account for avatar height</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local d = math.sqrt(dx*dx + dy*dy + dz*dz)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">if d &gt; 1.0 then</span><br />' +
            '<span style="color: rgb(20, 0, 252);">dx = dx / d</span><br />' +
            '<span style="color: rgb(20, 0, 252);">dy = dy / d</span><br />' +
            '<span style="color: rgb(20, 0, 252);">dz = dz / d</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local step_dist = 0.4</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local newx = object.pos.x + dx * step_dist</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local newy = object.pos.y + dy * step_dist</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local newz = object.pos.z + dz * step_dist</span><br />' +
            '<span style="color: rgb(20, 0, 252);">object.pos = Vec3d(newx, newy, newz)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            '<span style="color: rgb(20, 0, 252);">createTimer(onTimerEvent, 0.1, true) -- Update every 0.1 seconds</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserMovedNearToObject(avatar, object)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">print("Avatar nearby!")</span><br />' +
            '<span style="color: rgb(20, 0, 252);">near_user = avatar</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserMovedAwayFromObject(avatar, object)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">print("Avatar left!")</span><br />' +
            '<span style="color: rgb(20, 0, 252);">near_user = nil</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            "The object moves smoothly toward the avatar in 0.4 m steps while the avatar remains within a 20-meter radius, and stops once the avatar moves away.<br /><br />" +
            "<strong>Teleportation</strong><br />" +
            "<strong>A script that teleports the user to a specific position in space.</strong><br /><br />" +
            '<span style="color: rgb(20, 0, 252);">--lua</span><br />' +
            '<span style="color: rgb(20, 0, 252);">-- Teleport the user and optionally print a message</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserTouchedObject(avatar, ob)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">print("onUserTouchedObject!!!!!")</span><br /><br />' +
            '<span style="color: rgb(20, 0, 252);">-- Move the user to new coordinates</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local p = avatar.pos</span><br />' +
            '<span style="color: rgb(20, 0, 252);">p.x = -4265.</span><br />' +
            '<span style="color: rgb(20, 0, 252);">p.y = -424.8</span><br />' +
            '<span style="color: rgb(20, 0, 252);">p.z = 1434.63</span><br />' +
            '<span style="color: rgb(20, 0, 252);">avatar.pos = p</span><br /><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br /><br /><br /><br />'
        ]
      }
    ]
  };
  var LEAF_TEXT_RULES = [
    { match: function(text) { return text === "[Главная]" || text === "[Main]"; }, values: { ru: "[Главная]", en: "[Main]" } },
    { match: function(text) { return text === "[вебклиент]" || text === "[webclient]"; }, values: { ru: "[вебклиент]", en: "[webclient]" } },
    { match: function(text) { return text === "[Скачать Metasiberia beta]" || text === "[Download Metasiberia beta]" || text === "[Downlod Metasiberia beta]"; }, values: { ru: "[Скачать Metasiberia beta]", en: "[Download Metasiberia beta]" } },
    { match: function(text) { return text === "[участки]" || text === "[parcels]"; }, values: { ru: "[участки]", en: "[parcels]" } },
    { match: function(text) { return /^\[PAR/i.test(text) || text === "[УЧАСТКИ]"; }, values: { ru: "[УЧАСТКИ]", en: "[PARCELS]" } },
    { match: function(text) { return text === "[магазин]" || text === "[store]"; }, values: { ru: "[магазин]", en: "[store]" } },
    { match: function(text) { return text === "[админ-панель]" || text === "[admin panel]"; }, values: { ru: "[админ-панель]", en: "[admin panel]" } },
    { match: function(text) { return text === "[карта]" || text === "[map]"; }, values: { ru: "[карта]", en: "[map]" } },
    { match: function(text) { return text === "Sandbox. Parcel #31" || text === "Песочница. Участок #31"; }, values: { ru: "Песочница. Участок #31", en: "Sandbox. Parcel #31" } },
    { match: function(text) { return text === "Вид на основной мир Metasiberia." || text === "View of the main Metasiberia world."; }, values: { ru: "Вид на основной мир Metasiberia.", en: "View of the main Metasiberia world." } },
    { match: function(text) { return text === "Скриптинг в Metasiberia." || text === "Scripting in Metasiberia."; }, values: { ru: "Скриптинг в Metasiberia.", en: "Scripting in Metasiberia." } },
    { match: function(text) { return text === "Metasiberia Verse Morpher NFT" || text === "Морфер NFT вселенной Metasiberia"; }, values: { ru: "Морфер NFT вселенной Metasiberia", en: "Metasiberia Verse Morpher NFT" } },
    { match: function(text) { return text === "Sphere" || text === "Сфера"; }, values: { ru: "Сфера", en: "Sphere" } },
    { match: function(text) { return text === "Cube" || text === "Куб"; }, values: { ru: "Куб", en: "Cube" } },
    { match: function(text) { return text === "Torus" || text === "Тор"; }, values: { ru: "Тор", en: "Torus" } },
    { match: function(text) { return text === "Icosahedron" || text === "Икосаэдр"; }, values: { ru: "Икосаэдр", en: "Icosahedron" } },
    { match: function(text) { return text === "Teapot" || text === "Чайник"; }, values: { ru: "Чайник", en: "Teapot" } },
    { match: function(text) { return text === "DNA"; }, values: { ru: "DNA", en: "DNA" } },
    { match: function(text) { return text === "Help" || text === "Помощь"; }, values: { ru: "Помощь", en: "Help" } },
    { match: function(text) { return text.indexOf("Particle Basics") === 0 || text.indexOf("Основы частиц") === 0; }, values: { ru: "Основы частиц ▼", en: "Particle Basics ▼" } },
    { match: function(text) { return text.indexOf("Visual Effects") === 0 || text.indexOf("Визуальные эффекты") === 0; }, values: { ru: "Визуальные эффекты ▼", en: "Visual Effects ▼" } },
    { match: function(text) { return text.indexOf("Motion & Shape") === 0 || text.indexOf("Движение и форма") === 0; }, values: { ru: "Движение и форма ▼", en: "Motion & Shape ▼" } },
    { match: function(text) { return text.indexOf("Physics & Scale") === 0 || text.indexOf("Физика и масштаб") === 0; }, values: { ru: "Физика и масштаб ▼", en: "Physics & Scale ▼" } },
    { match: function(text) { return text.indexOf("Variations") === 0 || text.indexOf("Вариации") === 0; }, values: { ru: "Вариации ▼", en: "Variations ▼" } },
    { match: function(text) { return text === "Made by Denis Shipilov for Metasiberia using Three.js & Grok" || text === "Сделано Denis Shipilov для Metasiberia с помощью Three.js и Grok"; }, values: { ru: "Сделано Denis Shipilov для Metasiberia с помощью Three.js и Grok", en: "Made by Denis Shipilov for Metasiberia using Three.js & Grok" } },
    { match: function(text) { return text === "BASICS" || text === "ОСНОВЫ"; }, values: { ru: "ОСНОВЫ", en: "BASICS" } },
    { match: function(text) { return text === "Why typography matters?" || text === "Почему типографика важна?"; }, values: { ru: "Почему типографика важна?", en: "Why typography matters?" } },
    { match: function(text) { return text === "Particle Size (0.01–0.1):" || text === "Размер частиц (0.01–0.1):"; }, values: { ru: "Размер частиц (0.01–0.1):", en: "Particle Size (0.01–0.1):" } },
    { match: function(text) { return text === "Rotation Speed (0–0.5):" || text === "Скорость вращения (0–0.5):"; }, values: { ru: "Скорость вращения (0–0.5):", en: "Rotation Speed (0–0.5):" } },
    { match: function(text) { return text === "Particle Color:" || text === "Цвет частиц:"; }, values: { ru: "Цвет частиц:", en: "Particle Color:" } },
    { match: function(text) { return text === "Particle Density (5000–50000):" || text === "Плотность частиц (5000–50000):"; }, values: { ru: "Плотность частиц (5000–50000):", en: "Particle Density (5000–50000):" } },
    { match: function(text) { return text === "Mass Influence (0–1):" || text === "Влияние массы (0–1):"; }, values: { ru: "Влияние массы (0–1):", en: "Mass Influence (0–1):" } },
    { match: function(text) { return text === "Orbital Velocity (0–0.5):" || text === "Орбитальная скорость (0–0.5):"; }, values: { ru: "Орбитальная скорость (0–0.5):", en: "Orbital Velocity (0–0.5):" } },
    { match: function(text) { return text === "Bloom Strength (0–2):" || text === "Сила свечения (0–2):"; }, values: { ru: "Сила свечения (0–2):", en: "Bloom Strength (0–2):" } },
    { match: function(text) { return text === "Trail Length (0–1):" || text === "Длина следа (0–1):"; }, values: { ru: "Длина следа (0–1):", en: "Trail Length (0–1):" } },
    { match: function(text) { return text === "Star Flare (0–1):" || text === "Звёздные блики (0–1):"; }, values: { ru: "Звёздные блики (0–1):", en: "Star Flare (0–1):" } },
    { match: function(text) { return text === "Cosmic Wind (0–0.3):" || text === "Космический ветер (0–0.3):"; }, values: { ru: "Космический ветер (0–0.3):", en: "Cosmic Wind (0–0.3):" } },
    { match: function(text) { return text === "Warp Speed (0–1):" || text === "Скорость варпа (0–1):"; }, values: { ru: "Скорость варпа (0–1):", en: "Warp Speed (0–1):" } },
    { match: function(text) { return text === "Morph Speed (0.5–3):" || text === "Скорость морфа (0.5–3):"; }, values: { ru: "Скорость морфа (0.5–3):", en: "Morph Speed (0.5–3):" } },
    { match: function(text) { return text === "Randomness (0–0.5):" || text === "Случайность (0–0.5):"; }, values: { ru: "Случайность (0–0.5):", en: "Randomness (0–0.5):" } },
    { match: function(text) { return text === "Twirl Intensity (0–1):" || text === "Интенсивность завихрения (0–1):"; }, values: { ru: "Интенсивность завихрения (0–1):", en: "Twirl Intensity (0–1):" } },
    { match: function(text) { return text === "Pulse Effect (0–1):" || text === "Эффект пульсации (0–1):"; }, values: { ru: "Эффект пульсации (0–1):", en: "Pulse Effect (0–1):" } },
    { match: function(text) { return text === "Black Hole Pull (0–0.2):" || text === "Притяжение чёрной дыры (0–0.2):"; }, values: { ru: "Притяжение чёрной дыры (0–0.2):", en: "Black Hole Pull (0–0.2):" } },
    { match: function(text) { return text === "Galaxy Spiral (0–1):" || text === "Спираль галактики (0–1):"; }, values: { ru: "Спираль галактики (0–1):", en: "Galaxy Spiral (0–1):" } },
    { match: function(text) { return text === "Meteor Shower (0–1):" || text === "Метеоритный дождь (0–1):"; }, values: { ru: "Метеоритный дождь (0–1):", en: "Meteor Shower (0–1):" } },
    { match: function(text) { return text === "Gravity Pull (0–0.1):" || text === "Гравитационное притяжение (0–0.1):"; }, values: { ru: "Гравитационное притяжение (0–0.1):", en: "Gravity Pull (0–0.1):" } },
    { match: function(text) { return text === "Shape Scale (0.5–2):" || text === "Масштаб формы (0.5–2):"; }, values: { ru: "Масштаб формы (0.5–2):", en: "Shape Scale (0.5–2):" } },
    { match: function(text) { return text === "Nebula Density (0–1):" || text === "Плотность туманности (0–1):"; }, values: { ru: "Плотность туманности (0–1):", en: "Nebula Density (0–1):" } },
    { match: function(text) { return text === "Dark Matter (0–0.5):" || text === "Тёмная материя (0–0.5):"; }, values: { ru: "Тёмная материя (0–0.5):", en: "Dark Matter (0–0.5):" } },
    { match: function(text) { return text === "Color Variation (0–0.5):" || text === "Вариация цвета (0–0.5):"; }, values: { ru: "Вариация цвета (0–0.5):", en: "Color Variation (0–0.5):" } },
    { match: function(text) { return text === "Noise Amplitude (0–0.2):" || text === "Амплитуда шума (0–0.2):"; }, values: { ru: "Амплитуда шума (0–0.2):", en: "Noise Amplitude (0–0.2):" } }
  ];

  function normalizeLanguage(language) {
    return language === "en" ? "en" : "ru";
  }

  function normalizeText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function getSavedLanguage() {
    try {
      return normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return DEFAULT_LANGUAGE;
    }
  }

  function setSavedLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, normalizeLanguage(language));
    } catch (error) {
      /* Ignore storage errors. */
    }
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "#rec872696359 .t450__menu__content_lang-ready{display:flex;align-items:center;justify-content:flex-end;gap:8px;}",
      "#rec872696359 ." + SWITCHER_CLASS + "{display:inline-flex;align-items:center;gap:4px;padding:4px 5px;border-radius:999px;background:rgba(7,11,18,0.58);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 14px 28px rgba(0,0,0,0.2);}",
      "#rec872696359 .t450__lang-icon{display:flex;align-items:center;justify-content:center;width:18px;height:18px;color:#ffffff;opacity:0.88;}",
      "#rec872696359 .t450__lang-button{appearance:none;border:0;background:transparent;color:rgba(255,255,255,0.72);font:700 10px/1 'Source Code Pro',monospace;letter-spacing:0.1em;text-transform:uppercase;border-radius:999px;min-width:32px;height:28px;padding:0 8px;cursor:pointer;transition:background-color .18s ease,color .18s ease,box-shadow .18s ease;}",
      "#rec872696359 .t450__lang-button:hover{color:#ffffff;background:rgba(255,255,255,0.1);}",
      "#rec872696359 .t450__lang-button.is-active{background:#ffffff;color:#06080c;box-shadow:0 8px 16px rgba(255,255,255,0.18);}",
      "#rec872696359 .t450__lang-button:focus-visible{outline:2px solid #ffffff;outline-offset:2px;}",
      "#rec922090354 .js-hero-quick-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 16px;max-width:780px;margin:14px auto 0;}",
      "#rec922090354 .js-hero-quick-link{display:inline-flex;align-items:center;justify-content:center;color:#ffffff;font:700 16px/1.2 'Source Code Pro',monospace;letter-spacing:0.04em;text-decoration:none;transition:opacity .18s ease,transform .18s ease;}",
      "#rec922090354 .js-hero-quick-link:hover{opacity:0.88;transform:translateY(-1px);}",
      "#rec922090354 .js-hero-quick-link:focus-visible{outline:2px solid #ffffff;outline-offset:3px;}",
      "#t-footer,#rec872697073{background:#0b1017 !important;}",
      "#rec872697073{border-top:1px solid rgba(255,255,255,0.08);}",
      "#rec872697073 .t134{padding-top:28px;padding-bottom:34px;}",
      "#rec872697073 .t134__descr,#rec872697073 .t134__descr *,#rec872697073 .t134__title,#rec872697073 .t134__title *{color:#f4efe5 !important;}",
      "#rec872697073 .metasiberia-footer__links{display:inline-flex;align-items:center;justify-content:center;flex-wrap:wrap;row-gap:4px;}",
      "#rec872697073 .metasiberia-footer__links--secondary{margin-top:2px;}",
      "#rec872697073 .metasiberia-footer__links a{text-decoration:none;transition:text-decoration-color .18s ease;}",
      "#rec872697073 .metasiberia-footer__links a:hover{text-decoration:underline;text-underline-offset:0.16em;}",
      "#rec872697073 .metasiberia-footer__links a:focus-visible{outline:2px solid rgba(244,239,229,0.92);outline-offset:2px;}",
      "#rec872697073 .metasiberia-footer__separator{display:inline-block;margin:0 0.38em;}",
      "#" + NEWS_SECTION_MOUNT_ID + "{padding:0;background:#0b1017;color:#ffffff;overflow:hidden;}",
      "#" + NEWS_SECTION_MOUNT_ID + ",#" + NEWS_SECTION_MOUNT_ID + " *{box-sizing:border-box;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__shell{position:relative;padding:42px 0 36px;background:radial-gradient(circle at top left, rgba(70,118,182,0.28), transparent 32%),radial-gradient(circle at top right, rgba(19,77,122,0.24), transparent 28%),linear-gradient(180deg,#101721 0%,#090d14 100%);border-top:1px solid rgba(255,255,255,0.08);border-bottom:1px solid rgba(255,255,255,0.08);}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__head{width:min(1320px,calc(100% - 96px));margin:0 auto 28px;display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__kicker{margin:0 0 14px;color:#92dbff;font:700 13px/1 'Source Code Pro',monospace;letter-spacing:0.14em;text-transform:uppercase;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__title{margin:0 auto;max-width:18ch;font:600 clamp(30px,4.3vw,58px)/1.02 'Source Code Pro',monospace;color:#f4efe5;text-align:center;text-wrap:balance;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__intro{margin:0 auto;max-width:56ch;color:rgba(244,239,229,0.76);font:400 16px/1.8 'Source Code Pro',monospace;text-align:center;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__grid{position:relative;width:min(1320px,calc(100% - 96px));margin:0 auto;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;padding:24px;background:linear-gradient(180deg,rgba(248,245,236,0.98),rgba(236,231,220,0.98));border:1px solid rgba(255,255,255,0.14);box-shadow:0 34px 80px rgba(0,0,0,0.34);}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__grid::before{content:'';position:absolute;inset:18px;border:1px solid rgba(16,16,16,0.08);pointer-events:none;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__card{position:relative;z-index:1;display:flex;flex-direction:column;min-height:100%;padding:22px;border:1px solid rgba(16,16,16,0.1);border-radius:0;background:rgba(255,255,255,0.56);color:#101010;text-decoration:none;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease,background-color .18s ease;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__card:hover{transform:translateY(-2px);box-shadow:0 18px 34px rgba(10,10,10,0.12);border-color:rgba(15,80,173,0.24);background:#ffffff;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__meta{display:flex;flex-wrap:wrap;gap:10px;align-items:center;color:rgba(16,16,16,0.64);font:400 13px/1.5 'Source Code Pro',monospace;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__tag{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:0;background:rgba(15,80,173,0.08);color:#0f50ad;font:700 11px/1 'Source Code Pro',monospace;letter-spacing:0.1em;text-transform:uppercase;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__card-title{margin:18px 0 12px;font:600 22px/1.18 'Source Code Pro',monospace;color:#101010;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__card-excerpt{margin:0;color:rgba(16,16,16,0.76);font:400 15px/1.72 'Source Code Pro',monospace;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__card-link{margin-top:auto;padding-top:18px;color:#101010;font:700 14px/1.5 'Source Code Pro',monospace;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__actions{display:flex;justify-content:center;margin-top:22px;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__archive-link{display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:0 22px;border-radius:0;background:#111;border:1px solid #111;color:#ffffff;text-decoration:none;font:700 14px/1 'Source Code Pro',monospace;letter-spacing:0.08em;text-transform:uppercase;}",
      "#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__archive-link:hover{background:#1f00ff;border-color:#1f00ff;}",
      "#rec858665447,#rec859988145,#rec860756273{background:#0b1017 !important;}",
      "#rec858665447{padding-top:42px !important;border-top:1px solid rgba(255,255,255,0.08);}",
      "#rec859988145{padding-top:0 !important;padding-bottom:0 !important;overflow:hidden;}",
      "#rec860756273{padding-top:0 !important;padding-bottom:36px !important;border-bottom:1px solid rgba(255,255,255,0.08);}",
      "#rec858665447 .t134,#rec859988145 .t801,#rec860756273 .t142{position:relative;z-index:1;}",
      "#rec858665447 .t-container,#rec859988145 .t-slds__main,#rec860756273 .t142{width:min(1320px,calc(100% - 96px));max-width:none;margin:0 auto;box-sizing:border-box;}",
      "#rec858665447 .t-col,#rec858665447 .t-col_10,#rec858665447 .t-prefix_1{float:none;width:100%;max-width:none;margin:0;padding-left:0;padding-right:0;}",
      "#rec858665447 .t134__descr{display:block;width:100%;max-width:18ch;margin:0 auto;color:#f4efe5 !important;opacity:1 !important;text-align:center;font:600 clamp(30px,4.3vw,58px)/1.02 'Source Code Pro',monospace;letter-spacing:0;text-transform:none;text-wrap:balance;}",
      "#rec859988145 .t-slds__container,#rec859988145 .t-slds__items-wrapper{overflow:hidden;}",
      "#rec859988145 .t-slds__item .t-container{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px;align-items:center;width:100%;max-width:none;margin:0 auto;box-sizing:border-box;padding:36px;background:linear-gradient(180deg,rgba(248,245,236,0.98),rgba(236,231,220,0.98));border:1px solid rgba(255,255,255,0.14);box-shadow:0 34px 80px rgba(0,0,0,0.34);overflow:hidden;}",
      "#rec859988145 .t-slds__item .t-container::before{content:'';position:absolute;inset:20px;border:1px solid rgba(16,16,16,0.08);pointer-events:none;}",
      "#rec859988145 .t-slds__item .t-col{position:relative;z-index:1;float:none;width:auto;max-width:none;margin:0;padding-left:0;padding-right:0;}",
      "#rec859988145 .t801__centeredsection{display:flex;align-items:center;justify-content:center;}",
      "#rec859988145 .t-slds__img{display:block;border:1px solid rgba(16,16,16,0.1);box-shadow:0 18px 34px rgba(0,0,0,0.14);}",
      "#rec859988145 .t801__title,#rec859988145 .t-text{color:#101010 !important;font-family:'Source Code Pro',monospace;}",
      "#rec859988145 .t801__title{font-weight:600 !important;line-height:1.1;}",
      "#rec859988145 .t-text{line-height:1.78 !important;color:rgba(16,16,16,0.8) !important;}",
      "#rec859988145 .t-text a,#rec859988145 .t-text strong{color:#0f50ad !important;}",
      "#rec859988145 .t801__button{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 16px;border:1px solid rgba(16,16,16,0.16);background:#111826;color:#f5efe6 !important;font:700 11px/1.2 'Source Code Pro',monospace;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;transition:transform .18s ease,background-color .18s ease,border-color .18s ease,color .18s ease;}",
      "#rec859988145 .t801__button:hover{transform:translateY(-1px);background:#0f50ad;border-color:#0f50ad;color:#ffffff !important;}",
      "#rec859988145 .t801__button:focus-visible{outline:2px solid #0f50ad;outline-offset:2px;}",
      "#rec859988145 .t-btntext__text{color:inherit !important;}",
      "#rec859988145 .t-slds__arrow-withbg{width:48px !important;height:48px !important;background:rgba(255,255,255,0.92) !important;border:1px solid rgba(255,255,255,0.28);}",
      "#rec859988145 .t-slds__arrow-withbg:hover{background:#ffffff !important;border-color:#ffffff;}",
      "#rec859988145 .t-slds__arrow_body polyline{stroke:#09101a !important;}",
      "#rec859988145 .t-slds__bullet_body{width:11px !important;height:11px !important;border:2px solid rgba(255,255,255,0.84) !important;background:transparent !important;}",
      "#rec859988145 .t-slds__bullet_active .t-slds__bullet_body,#rec859988145 .t-slds__bullet:hover .t-slds__bullet_body,#rec859988145 .t-slds__bullet_body:focus-visible{background:#ffffff !important;}",
      "#rec860756273 .t142{display:flex;justify-content:center;}",
      "#rec860756273 .t-btnflex{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 16px;border:1px solid rgba(255,255,255,0.22);background:transparent;color:#f6f0e7 !important;font:700 11px/1.2 'Source Code Pro',monospace;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;transition:transform .18s ease,background-color .18s ease,border-color .18s ease,color .18s ease;}",
      "#rec860756273 .t-btnflex:hover{transform:translateY(-1px);background:rgba(255,255,255,0.12);border-color:#ffffff;color:#ffffff !important;}",
      "#rec860756273 .t-btnflex:focus-visible{outline:2px solid #ffffff;outline-offset:2px;}",
      "#rec860756273 .t-btnflex__text{color:inherit !important;}",
      "#" + AVATAR_SECTION_MOUNT_ID + "{padding:0;background:#0b1017;color:#ffffff;overflow:hidden;}",
      "#" + AVATAR_SECTION_MOUNT_ID + ",#" + AVATAR_SECTION_MOUNT_ID + " *{box-sizing:border-box;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__shell{position:relative;padding:40px 0;background:radial-gradient(circle at top left, rgba(70,118,182,0.28), transparent 32%),radial-gradient(circle at top right, rgba(19,77,122,0.24), transparent 28%),linear-gradient(180deg,#101721 0%,#090d14 100%);border-top:1px solid rgba(255,255,255,0.08);border-bottom:1px solid rgba(255,255,255,0.08);}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__header{width:min(1320px,calc(100% - 96px));margin:0 auto 24px;display:grid;gap:10px;justify-items:center;text-align:center;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__section-title{margin:0;color:#f4efe5;font:600 clamp(30px,4.3vw,58px)/1.02 'Source Code Pro',monospace;max-width:18ch;text-wrap:balance;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__section-intro{margin:0;color:rgba(244,239,229,0.76);font:400 16px/1.8 'Source Code Pro',monospace;white-space:pre-line;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__viewport{position:relative;overflow:hidden;width:min(1320px,calc(100% - 96px));margin:0 auto;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__track{display:flex;transition:transform .45s ease;will-change:transform;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__slide{flex:0 0 100%;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__spread{position:relative;z-index:1;width:100%;margin:0 auto;padding:22px;background:linear-gradient(180deg,rgba(248,245,236,0.98),rgba(236,231,220,0.98));border:1px solid rgba(255,255,255,0.14);box-shadow:0 34px 80px rgba(0,0,0,0.34);}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__spread::before{content:'';position:absolute;inset:20px;border:1px solid rgba(16,16,16,0.08);pointer-events:none;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__media-frame{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;aspect-ratio:16 / 9;width:100%;min-height:320px;border:1px solid rgba(16,16,16,0.1);background:radial-gradient(circle at top, rgba(146,219,255,0.2), transparent 32%),linear-gradient(180deg,#101721 0%,#09101a 100%);box-shadow:0 18px 34px rgba(0,0,0,0.14);overflow:hidden;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__media-frame::before{content:'';position:absolute;inset:18px;border:1px solid rgba(255,255,255,0.08);pointer-events:none;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__image{display:block;width:100%;height:100%;object-fit:cover;object-position:center center;background:#09101a;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__image[data-avatar-state='placeholder']{object-fit:cover;padding:0;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__controls{position:absolute;inset:0;pointer-events:none;z-index:3;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__arrow{pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border:1px solid rgba(255,255,255,0.28);background:rgba(255,255,255,0.92);color:#09101a;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .18s ease,background-color .18s ease,border-color .18s ease;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__arrow:hover{background:#ffffff;border-color:#ffffff;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__arrow:focus-visible{outline:2px solid #ffffff;outline-offset:2px;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__arrow--prev{left:22px;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__arrow--next{right:22px;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__arrow svg{display:block;width:14px;height:14px;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__bullets{display:flex;justify-content:center;gap:12px;margin-top:22px;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__bullet{width:11px;height:11px;padding:0;border-radius:999px;border:2px solid rgba(255,255,255,0.84);background:transparent;cursor:pointer;transition:transform .18s ease,background-color .18s ease;}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__bullet:hover{transform:scale(1.08);}",
      "#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__bullet.is-active{background:#ffffff;transform:scale(1.12);}",
      "#" + TECH_SECTION_MOUNT_ID + "{padding:0;background:#0b1017;color:#ffffff;overflow:hidden;}",
      "#" + TECH_SECTION_MOUNT_ID + ",#" + TECH_SECTION_MOUNT_ID + " *{box-sizing:border-box;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__shell{position:relative;padding:42px 0 36px;background:radial-gradient(circle at top left, rgba(70,118,182,0.28), transparent 32%),radial-gradient(circle at top right, rgba(19,77,122,0.24), transparent 28%),linear-gradient(180deg,#101721 0%,#090d14 100%);border-top:1px solid rgba(255,255,255,0.08);border-bottom:1px solid rgba(255,255,255,0.08);}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__header{width:min(1320px,calc(100% - 96px));margin:0 auto 28px;display:grid;grid-template-columns:1fr;gap:24px;align-items:end;justify-items:center;text-align:center;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__section-kicker{margin:0 0 12px;color:#92dbff;font:700 13px/1 'Source Code Pro',monospace;letter-spacing:0.14em;text-transform:uppercase;text-align:center;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__section-title{margin:0;color:#f4efe5;font:600 clamp(30px,4.3vw,58px)/1.02 'Source Code Pro',monospace;max-width:18ch;text-wrap:balance;text-align:center;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__section-intro{margin:0;color:rgba(244,239,229,0.76);font:400 16px/1.8 'Source Code Pro',monospace;max-width:56ch;justify-self:center;text-align:center;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__viewport{overflow:hidden;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__track{display:flex;transition:transform .5s ease;will-change:transform;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__slide{flex:0 0 100%;padding:0 88px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__spread{position:relative;z-index:1;width:min(1320px,100%);margin:0 auto;min-height:66vh;display:grid;grid-template-columns:minmax(0,1.18fr) minmax(320px,0.82fr);gap:28px;padding:36px;background:linear-gradient(180deg,rgba(248,245,236,0.98),rgba(236,231,220,0.98));border:1px solid rgba(255,255,255,0.14);box-shadow:0 34px 80px rgba(0,0,0,0.34);}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__spread::before{content:'';position:absolute;inset:20px;border:1px solid rgba(16,16,16,0.08);pointer-events:none;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__lead{position:relative;z-index:1;display:flex;flex-direction:column;gap:16px;min-width:0;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__meta{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-bottom:16px;border-bottom:1px solid rgba(16,16,16,0.12);}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__kicker{margin:0;color:#0f50ad;font:700 12px/1 'Source Code Pro',monospace;letter-spacing:0.14em;text-transform:uppercase;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__pagination{margin:0;color:rgba(16,16,16,0.56);font:700 13px/1 'Source Code Pro',monospace;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__eyebrow{margin:0;color:rgba(16,16,16,0.56);font:700 12px/1 'Source Code Pro',monospace;letter-spacing:0.1em;text-transform:uppercase;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__title{margin:0;max-width:13ch;color:#111111;font:600 clamp(31px,4.2vw,60px)/0.98 'Source Code Pro',monospace;text-wrap:balance;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__deck{margin:0;max-width:44ch;color:rgba(16,16,16,0.8);font:400 18px/1.78 'Source Code Pro',monospace;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__actions,#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__panel-links{display:flex;flex-wrap:wrap;gap:12px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__actions{margin-top:4px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__panel-links{margin-top:18px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__action-link{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 16px;border:1px solid rgba(16,16,16,0.16);background:#111826;color:#f5efe6;font:700 11px/1.2 'Source Code Pro',monospace;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;transition:transform .18s ease,background-color .18s ease,border-color .18s ease,color .18s ease;flex:1 1 150px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__action-link:hover{transform:translateY(-1px);background:#0f50ad;border-color:#0f50ad;color:#ffffff;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__action-link:focus-visible{outline:2px solid #0f50ad;outline-offset:2px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__action-link--inverse{background:transparent;border-color:rgba(255,255,255,0.22);color:#f6f0e7;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__action-link--inverse:hover{background:rgba(255,255,255,0.12);border-color:#ffffff;color:#ffffff;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__action-link--inverse:focus-visible{outline:2px solid #ffffff;outline-offset:2px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__footer{margin-top:auto;padding-top:18px;border-top:1px solid rgba(16,16,16,0.12);color:rgba(16,16,16,0.56);font:700 12px/1.55 'Source Code Pro',monospace;letter-spacing:0.08em;text-transform:uppercase;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__body{position:relative;z-index:1;display:grid;grid-template-rows:minmax(0,1fr) auto;gap:18px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__panel{padding:22px 22px 24px;border:1px solid rgba(16,16,16,0.1);background:rgba(255,255,255,0.5);}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__panel--accent{background:linear-gradient(180deg,rgba(8,25,42,0.96),rgba(13,47,78,0.94));border-color:rgba(255,255,255,0.08);color:#f6f0e7;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__panel-label{margin:0 0 14px;color:rgba(16,16,16,0.54);font:700 12px/1 'Source Code Pro',monospace;letter-spacing:0.1em;text-transform:uppercase;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__panel--accent .metasiberia-tech__panel-label{color:rgba(255,255,255,0.64);}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__list,#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__aside{list-style:none;margin:0;padding:0;display:grid;gap:12px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__list li{padding-top:12px;border-top:1px solid rgba(16,16,16,0.1);color:#101010;font:400 15px/1.72 'Source Code Pro',monospace;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__aside li{padding-top:12px;border-top:1px solid rgba(255,255,255,0.12);color:rgba(246,240,231,0.88);font:400 14px/1.68 'Source Code Pro',monospace;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__list li:first-child,#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__aside li:first-child{padding-top:0;border-top:0;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__live-item{position:relative;display:grid;gap:6px;padding-left:14px !important;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__list .metasiberia-tech__live-item{border-left:2px solid rgba(15,80,173,0.38);background:rgba(15,80,173,0.04);}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__aside .metasiberia-tech__live-item{border-left:2px solid rgba(146,219,255,0.52);background:rgba(255,255,255,0.04);}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__meta-source{display:inline-flex;align-items:center;justify-content:center;width:max-content;min-height:20px;padding:0 7px;background:rgba(15,80,173,0.1);color:#0f50ad;font:700 10px/1 'Source Code Pro',monospace;letter-spacing:0.1em;text-transform:uppercase;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__aside .metasiberia-tech__meta-source{background:rgba(146,219,255,0.12);color:#92dbff;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__meta-label{font-weight:700;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__meta-value{word-break:break-word;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__meta-link{color:inherit;text-decoration:underline;text-underline-offset:0.18em;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__meta-link:hover{opacity:0.78;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__meta-link:focus-visible{outline:2px solid currentColor;outline-offset:2px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__meta-muted{opacity:0.74;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__controls{position:absolute;inset:0;pointer-events:none;z-index:3;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__arrow{pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border:1px solid rgba(255,255,255,0.28);background:rgba(255,255,255,0.92);color:#09101a;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .18s ease,background-color .18s ease,border-color .18s ease;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__arrow:hover{background:#ffffff;border-color:#ffffff;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__arrow:focus-visible{outline:2px solid #ffffff;outline-offset:2px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__arrow--prev{left:22px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__arrow--next{right:22px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__arrow svg{display:block;width:14px;height:14px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__bullets{display:flex;justify-content:center;gap:12px;margin-top:22px;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__bullet{width:11px;height:11px;padding:0;border-radius:999px;border:2px solid rgba(255,255,255,0.84);background:transparent;cursor:pointer;transition:transform .18s ease,background-color .18s ease;}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__bullet:hover{transform:scale(1.08);}",
      "#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__bullet.is-active{background:#ffffff;transform:scale(1.12);}",
      "@media screen and (max-width:1100px){#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__header,#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__viewport{width:min(1320px,calc(100% - 48px));}}",
      "@media screen and (max-width:1100px){#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__header{width:min(1320px,calc(100% - 48px));grid-template-columns:1fr;justify-items:center;text-align:center;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__section-intro{justify-self:center;max-width:56ch;text-align:center;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__slide{padding:0 56px;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__spread{grid-template-columns:1fr;min-height:auto;}}",
      "@media screen and (max-width:700px){#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__shell{padding:26px 0;}#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__header,#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__viewport{width:calc(100% - 32px);}#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__section-title{font-size:clamp(26px,9vw,38px);}#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__section-intro{font-size:15px;line-height:1.7;}#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__spread{padding:16px;}#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__spread::before{inset:10px;}#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__media-frame{min-height:220px;}#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__media-frame::before{inset:12px;}#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__arrow{width:42px;height:42px;}#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__arrow--prev{left:16px;}#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__arrow--next{right:16px;}#" + AVATAR_SECTION_MOUNT_ID + " .metasiberia-avatar__bullets{margin-top:18px;}}",
      "@media screen and (max-width:700px){#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__shell{padding:26px 0 24px;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__header{width:calc(100% - 32px);margin-bottom:18px;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__slide{padding:0 16px;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__spread{padding:22px 20px 20px;gap:16px;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__spread::before{inset:12px;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__meta{align-items:flex-start;flex-direction:column;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__title{max-width:none;font-size:clamp(28px,10vw,40px);}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__deck{font-size:15px;line-height:1.7;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__panel{padding:18px 16px 18px;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__action-link{flex:1 1 calc(50% - 6px);min-height:40px;padding:10px 12px;font-size:10px;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__arrow{width:42px;height:42px;top:auto;bottom:74px;transform:none;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__arrow--prev{left:16px;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__arrow--next{right:16px;}#" + TECH_SECTION_MOUNT_ID + " .metasiberia-tech__bullets{margin-top:18px;}}",
      "@media screen and (max-width:1100px){#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__head,#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__grid,#rec858665447 .t-container,#rec859988145 .t-slds__main,#rec860756273 .t142{width:min(1320px,calc(100% - 48px));}}",
      "@media screen and (max-width:980px){#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__grid{grid-template-columns:repeat(2,minmax(0,1fr));}#rec859988145 .t-slds__item .t-container{grid-template-columns:1fr;padding:28px;}}",
      "@media screen and (max-width:640px){#rec872696359 .t450__menu__content_lang-ready{gap:6px;}#rec872696359 ." + SWITCHER_CLASS + "{padding:3px 4px;}#rec872696359 .t450__lang-icon{width:16px;height:16px;}#rec872696359 .t450__lang-button{min-width:30px;height:26px;font-size:9px;padding:0 7px;}#rec922090354 .js-hero-quick-links{max-width:320px;gap:10px 14px;margin-top:12px;}#rec922090354 .js-hero-quick-link{font-size:14px;}#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__shell{padding:26px 0 24px;}#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__head,#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__grid,#rec858665447 .t-container,#rec859988145 .t-slds__main,#rec860756273 .t142{width:calc(100% - 32px);}#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__title{max-width:12ch;}#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__grid{grid-template-columns:1fr;padding:18px 16px;}#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__grid::before{inset:12px;}#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__actions{justify-content:stretch;}#" + NEWS_SECTION_MOUNT_ID + " .metasiberia-news-home__archive-link{width:100%;}#rec858665447{padding-top:26px !important;}#rec859988145 .t-slds__item .t-container{padding:22px 18px;}#rec859988145 .t-slds__item .t-container::before{inset:12px;}#rec859988145 .t-slds__arrow-withbg{width:42px !important;height:42px !important;}#rec860756273{padding-bottom:24px !important;}#rec860756273 .t-btnflex{width:100%;}}"
    ].join("");

    document.head.appendChild(style);
  }

  function ensureChatbotScript() {
    var script;

    if (document.getElementById(CHATBOT_SCRIPT_ID)) {
      return;
    }

    script = document.createElement("script");
    script.id = CHATBOT_SCRIPT_ID;
    script.src = CHATBOT_SCRIPT_SRC;
    script.charset = "utf-8";
    script.async = true;
    document.head.appendChild(script);
  }

  function buildSwitcher() {
    var switcher = document.createElement("div");
    switcher.className = SWITCHER_CLASS;
    switcher.setAttribute("role", "group");
    switcher.setAttribute("aria-label", "Language switch");
    switcher.innerHTML =
      '<span class="t450__lang-icon" aria-hidden="true">' +
      '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.2"/>' +
      '<path d="M2.2 8H13.8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>' +
      '<path d="M8 1.8C9.6 3.45 10.5 5.64 10.5 8C10.5 10.36 9.6 12.55 8 14.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>' +
      '<path d="M8 1.8C6.4 3.45 5.5 5.64 5.5 8C5.5 10.36 6.4 12.55 8 14.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>' +
      "</svg></span>";

    [
      { language: "ru", label: "RU", title: "Русский" },
      { language: "en", label: "EN", title: "English" }
    ].forEach(function(item) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "t450__lang-button";
      button.dataset.language = item.language;
      button.textContent = item.label;
      button.title = item.title;
      button.setAttribute("aria-label", item.title);
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", function() {
        setSavedLanguage(item.language);
        applyLanguage(item.language);
      });
      switcher.appendChild(button);
    });

    return switcher;
  }

  function updateSwitcher(language) {
    document.querySelectorAll("#rec872696359 .t450__lang-button").forEach(function(button) {
      var isActive = button.dataset.language === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function updateMenuLabels(language) {
    document.querySelectorAll("#rec872696359 .t-menu__link-item").forEach(function(link) {
      var itemNumber = link.getAttribute("data-menu-item-number");
      var copy = MENU_LABELS[itemNumber];

      if (copy) {
        link.textContent = copy[language];
      }
    });
  }

  function getNewsCopy(language) {
    return NEWS_UI_COPY[normalizeLanguage(language)] || NEWS_UI_COPY.ru;
  }

  function getAvatarCopy(language) {
    return AVATAR_UI_COPY[normalizeLanguage(language)] || AVATAR_UI_COPY.ru;
  }

  function getLocalizedNewsValue(value, language) {
    if (!value || typeof value !== "object") {
      return "";
    }

    return value[normalizeLanguage(language)] || value.ru || value.en || "";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatNewsDate(language, value) {
    try {
      return new Intl.DateTimeFormat(language === "ru" ? "ru-RU" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(new Date(value + "T00:00:00Z"));
    } catch (error) {
      return value;
    }
  }

  function getNewsPostHref(slug) {
    return "/news#" + slug;
  }

  function buildNewsMenuItem() {
    var item = document.createElement("li");
    var link = document.createElement("a");

    item.className = "t450__list_item";
    link.className = "t-menu__link-item js-news-menu-item";
    link.setAttribute("href", NEWS_SECTION_HREF);
    link.setAttribute("data-menu-submenu-hook", "");
    link.setAttribute("data-menu-item-number", NEWS_MENU_KEY);
    link.textContent = "News";
    item.appendChild(link);

    return item;
  }

  function normalizeNewsMenuLink(link) {
    link.classList.add("js-news-menu-item");
    link.setAttribute("href", NEWS_SECTION_HREF);
    link.setAttribute("data-menu-item-number", NEWS_MENU_KEY);
    link.removeAttribute("target");
  }

  function ensureNewsMenuLinks() {
    document.querySelectorAll("#rec872696359 .t450__list").forEach(function(list) {
      var existingLink = list.querySelector(
        ".js-news-menu-item, .t-menu__link-item[data-menu-item-number='" + NEWS_MENU_KEY + "'], .t-menu__link-item[href='#news'], .t-menu__link-item[href='/#news'], .t-menu__link-item[href='/news']"
      );

      if (existingLink) {
        normalizeNewsMenuLink(existingLink);
        return;
      }

      var mainLink = list.querySelector(".t-menu__link-item[data-menu-item-number='1']");
      var newsItem = buildNewsMenuItem();

      if (mainLink && mainLink.parentElement) {
        if (mainLink.parentElement.nextSibling) {
          list.insertBefore(newsItem, mainLink.parentElement.nextSibling);
        } else {
          list.appendChild(newsItem);
        }
        return;
      }

      list.insertBefore(newsItem, list.firstChild || null);
    });
  }

  function ensureHomepageNewsQuickLink(language) {
    var title = document.querySelector("#rec859054067 .t001__title");
    var existingLink = title ? title.querySelector(".js-home-news-quick-link") : null;
    var parcelLink;
    var wrapper;
    var link;
    var lineBreak;

    if (!title) {
      return;
    }

    if (!existingLink) {
      parcelLink = Array.from(title.querySelectorAll("a")).find(function(node) {
        var href = node.getAttribute("href") || "";

        return href === "#rec859988145" || href === "#parsels" || href === "/#parsels";
      });

      wrapper = document.createElement("strong");
      wrapper.className = "js-home-news-quick-link-wrap";
      wrapper.style.fontSize = "20px";
      wrapper.style.color = "rgb(0, 0, 0)";

      link = document.createElement("a");
      link.className = "js-home-news-quick-link";
      link.style.color = "rgb(0, 0, 0)";
      wrapper.appendChild(link);

      lineBreak = document.createElement("br");

      if (parcelLink && parcelLink.parentElement) {
        title.insertBefore(wrapper, parcelLink.parentElement);
        title.insertBefore(lineBreak, parcelLink.parentElement);
      } else {
        title.appendChild(wrapper);
        title.appendChild(lineBreak);
      }

      existingLink = link;
    }

    existingLink.textContent = language === "ru" ? "[новости]" : "[news]";
    existingLink.setAttribute("href", "#news");
  }

  function ensureHomepageHeroQuickLinks(language) {
    var allRecords = document.getElementById("allrecords");
    var pageId = allRecords ? allRecords.getAttribute("data-tilda-page-id") : "";
    var title;
    var mount;

    if (pageId !== "62281087") {
      return;
    }

    title = document.querySelector("#rec922090354 .t001__title");

    if (!title) {
      return;
    }

    mount = title.querySelector(".js-hero-quick-links");

    if (!mount) {
      mount = document.createElement("div");
      mount.className = "js-hero-quick-links";
      title.appendChild(mount);
    }

    mount.innerHTML = HERO_QUICK_LINKS.map(function(link) {
      var attrs =
        ' class="js-hero-quick-link" href="' + escapeHtml(link.href) + '"' +
        (link.external ? ' target="_blank" rel="noreferrer noopener"' : "");

      return "<a" + attrs + ">" + escapeHtml(getLocalizedNewsValue(link.label, language)) + "</a>";
    }).join("");
  }

  function removeDeprecatedHomepageQuickSection() {
    var obsoleteSection = document.getElementById("rec859054067");

    if (obsoleteSection && obsoleteSection.parentElement) {
      obsoleteSection.parentElement.removeChild(obsoleteSection);
    }
  }

  function buildHomeNewsCardMarkup(post, language, linkLabel) {
    return [
      '<a class="metasiberia-news-home__card" href="' + getNewsPostHref(post.slug) + '">',
      '<div class="metasiberia-news-home__meta">',
      '<span class="metasiberia-news-home__tag">' + escapeHtml(getLocalizedNewsValue(post.category, language)) + "</span>",
      "<span>" + escapeHtml(formatNewsDate(language, post.date)) + "</span>",
      "</div>",
      '<h3 class="metasiberia-news-home__card-title">' + escapeHtml(getLocalizedNewsValue(post.title, language)) + "</h3>",
      '<p class="metasiberia-news-home__card-excerpt">' + escapeHtml(getLocalizedNewsValue(post.excerpt, language)) + "</p>",
      '<span class="metasiberia-news-home__card-link">' + escapeHtml(linkLabel) + "</span>",
      "</a>"
    ].join("");
  }

  function buildNewsPageCardMarkup(post, language, linkLabel) {
    return [
      '<a class="news-card" href="#' + escapeHtml(post.slug) + '">',
      '<div class="news-card__meta">',
      '<span class="news-card__tag">' + escapeHtml(getLocalizedNewsValue(post.category, language)) + "</span>",
      "<span>" + escapeHtml(formatNewsDate(language, post.date)) + "</span>",
      "</div>",
      '<h3 class="news-card__title">' + escapeHtml(getLocalizedNewsValue(post.title, language)) + "</h3>",
      '<p class="news-card__excerpt">' + escapeHtml(getLocalizedNewsValue(post.excerpt, language)) + "</p>",
      '<span class="news-card__link">' + escapeHtml(linkLabel) + "</span>",
      "</a>"
    ].join("");
  }

  function buildNewsStoryMarkup(post, language, backToTopLabel) {
    var paragraphs = (post.body[language] || post.body.ru || [])
      .map(function(paragraph) {
        return "<p>" + escapeHtml(paragraph) + "</p>";
      })
      .join("");

    return [
      '<article class="news-story" id="' + escapeHtml(post.slug) + '">',
      '<div class="news-story__meta">',
      '<span class="news-story__tag">' + escapeHtml(getLocalizedNewsValue(post.category, language)) + "</span>",
      "<span>" + escapeHtml(formatNewsDate(language, post.date)) + "</span>",
      "</div>",
      '<h3 class="news-story__title">' + escapeHtml(getLocalizedNewsValue(post.title, language)) + "</h3>",
      '<div class="news-story__body">' + paragraphs + "</div>",
      '<a class="news-story__backlink" href="#allrecords">' + escapeHtml(backToTopLabel) + "</a>",
      "</article>"
    ].join("");
  }

  function getAvatarFilePattern(slide) {
    return slide.fileStem + ".{" + AVATAR_IMAGE_EXTENSIONS.join(",") + "}";
  }

  function getAvatarImageBasePath(slide) {
    return AVATAR_IMAGE_FOLDER + "/" + slide.fileStem;
  }

  function createAvatarPlaceholderDataUri(title, filePattern, language) {
    var svg = [
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'>",
      "<defs>",
      "<linearGradient id='bg' x1='0' y1='0' x2='0' y2='1'>",
      "<stop offset='0%' stop-color='#162233'/>",
      "<stop offset='100%' stop-color='#09101a'/>",
      "</linearGradient>",
      "<linearGradient id='beam' x1='0' y1='0' x2='1' y2='1'>",
      "<stop offset='0%' stop-color='#7eb7ff' stop-opacity='0.55'/>",
      "<stop offset='100%' stop-color='#7eb7ff' stop-opacity='0'/>",
      "</linearGradient>",
      "</defs>",
      "<rect width='1600' height='900' fill='url(#bg)'/>",
      "<circle cx='1280' cy='180' r='250' fill='url(#beam)'/>",
      "<circle cx='300' cy='760' r='260' fill='url(#beam)' opacity='0.42'/>",
      "<rect x='64' y='64' width='1472' height='772' fill='none' stroke='rgba(255,255,255,0.18)'/>",
      "<rect x='132' y='150' width='1336' height='520' rx='18' fill='rgba(255,255,255,0.04)' stroke='rgba(255,255,255,0.12)'/>",
      "<circle cx='800' cy='410' r='150' fill='rgba(255,255,255,0.08)'/>",
      "<path d='M520 694c74-126 164-188 280-188s206 62 280 188' fill='rgba(255,255,255,0.08)'/>",
      "</svg>"
    ].join("");

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function buildAvatarBulletMarkup(slide, language, index, copy, isActive) {
    return [
      '<button class="metasiberia-avatar__bullet' + (isActive ? " is-active" : "") + '" type="button" data-avatar-slide="' + index + '" aria-label="' + escapeHtml(copy.bulletLabel + (index + 1) + ": " + getLocalizedNewsValue(slide.title, language)) + '"' + (isActive ? ' aria-current="true"' : "") + "></button>"
    ].join("");
  }

  function buildAvatarSlideMarkup(slide, language, index, total, copy) {
    var filePattern = getAvatarFilePattern(slide);
    var imagePath = getAvatarImageBasePath(slide);
    var title = getLocalizedNewsValue(slide.title, language);

    return [
      '<section class="metasiberia-avatar__slide' + (index === 0 ? " is-active" : "") + '" data-avatar-slide-index="' + index + '" role="group" aria-label="' + escapeHtml(copy.slideLabel + " " + (index + 1) + " / " + total + ": " + title) + '" aria-hidden="' + (index === 0 ? "false" : "true") + '">',
      '<article class="metasiberia-avatar__spread">',
      '<div class="metasiberia-avatar__media-frame">',
      '<img class="metasiberia-avatar__image" src="" alt="' + escapeHtml(title) + '" loading="eager" fetchpriority="high" decoding="async" data-avatar-base="' + escapeHtml(imagePath) + '" data-avatar-title="' + escapeHtml(title) + '" data-avatar-file="' + escapeHtml(filePattern) + '">',
      "</div>",
      "</article>",
      "</section>"
    ].join("");
  }

  function setNodeText(id, value) {
    var node = document.getElementById(id);

    if (node) {
      node.textContent = value;
    }
  }

  function getTechCopy(language) {
    return TECH_UI_COPY[normalizeLanguage(language)] || TECH_UI_COPY.ru;
  }

  function getLocalizedCollection(value, language) {
    if (Array.isArray(value)) {
      return value;
    }

    if (!value || typeof value !== "object") {
      return [];
    }

    value = value[normalizeLanguage(language)] || value.ru || value.en || [];
    return Array.isArray(value) ? value : [];
  }

  function buildTechListItemMarkup(item, language) {
    var text;
    var label;
    var fallback;

    if (item && typeof item === "object" && !Array.isArray(item)) {
      label = item.label ? getLocalizedNewsValue(item.label, language) : "";
      fallback = item.fallback ? getLocalizedNewsValue(item.fallback, language) : "";
      text = item.text ? getLocalizedNewsValue(item.text, language) : "";

      if (item.dynamicKey && label) {
        return (
          '<li class="metasiberia-tech__live-item" data-tech-meta="' +
          escapeHtml(item.dynamicKey) +
          '">' +
          '<span class="metasiberia-tech__meta-source">[github]</span>' +
          '<span class="metasiberia-tech__meta-label">' +
          escapeHtml(label) +
          ':</span> ' +
          '<span class="metasiberia-tech__meta-value">' +
          escapeHtml(fallback || "") +
          "</span></li>"
        );
      }

      if (text) {
        return "<li>" + escapeHtml(text) + "</li>";
      }
    }

    return "<li>" + escapeHtml(item || "") + "</li>";
  }

  function formatTechGitHubDate(dateString, language, includeTime) {
    var locale = normalizeLanguage(language) === "ru" ? "ru-RU" : "en-US";
    var date = new Date(dateString);
    var options;

    if (isNaN(date.getTime())) {
      return "";
    }

    options = includeTime
      ? { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }
      : { day: "numeric", month: "long", year: "numeric" };

    try {
      return new Intl.DateTimeFormat(locale, options).format(date);
    } catch (error) {
      return date.toISOString();
    }
  }

  function readTechGitHubCache() {
    var raw;
    var parsed;

    try {
      raw = window.localStorage.getItem(TECH_GITHUB_CACHE_KEY);
      parsed = raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }

    if (!parsed || !parsed.savedAt || !parsed.data) {
      return null;
    }

    if (Date.now() - parsed.savedAt > TECH_GITHUB_CACHE_TTL_MS) {
      return null;
    }

    return parsed.data;
  }

  function writeTechGitHubCache(data) {
    try {
      window.localStorage.setItem(
        TECH_GITHUB_CACHE_KEY,
        JSON.stringify({
          savedAt: Date.now(),
          data: data
        })
      );
    } catch (error) {
      /* Ignore storage errors. */
    }
  }

  function fetchTechGitHubJson(path) {
    return window.fetch(TECH_GITHUB_API_BASE + path, {
      headers: {
        Accept: "application/vnd.github+json"
      }
    }).then(function(response) {
      if (!response.ok) {
        throw new Error("GitHub request failed: " + response.status);
      }

      return response.json();
    });
  }

  function fetchTechGitHubMeta() {
    var cached;

    if (!window.fetch) {
      return Promise.reject(new Error("Fetch is unavailable"));
    }

    if (fetchTechGitHubMeta.promise) {
      return fetchTechGitHubMeta.promise;
    }

    cached = readTechGitHubCache();

    if (cached) {
      return Promise.resolve(cached);
    }

    fetchTechGitHubMeta.promise = fetchTechGitHubJson("")
      .then(function(repo) {
        return Promise.all([
          Promise.resolve(repo || {}),
          fetchTechGitHubJson("/releases?per_page=1"),
          fetchTechGitHubJson("/commits?sha=" + encodeURIComponent((repo && repo.default_branch) || "master") + "&per_page=1")
        ]);
      })
      .then(function(results) {
        var repo = results[0] || {};
        var releases = Array.isArray(results[1]) ? results[1] : [];
        var commitList = Array.isArray(results[2]) ? results[2] : [];
        var release = releases[0] || null;
        var commit = commitList[0] || null;
        var data = {
          repoPushedAt: repo.pushed_at || "",
          releaseName: release && (release.name || release.tag_name) || "",
          releaseTag: release && release.tag_name || "",
          releaseUrl: release && release.html_url || "",
          releasePublishedAt: release && release.published_at || "",
          releasePrerelease: !!(release && release.prerelease),
          commitSha: commit && commit.sha || "",
          commitDate: commit && commit.commit && commit.commit.committer && commit.commit.committer.date || "",
          commitUrl: commit && commit.html_url || "",
          commitMessage: commit && commit.commit && commit.commit.message || ""
        };

        writeTechGitHubCache(data);
        fetchTechGitHubMeta.promise = null;
        return data;
      })
      .catch(function(error) {
        fetchTechGitHubMeta.promise = null;
        throw error;
      });

    return fetchTechGitHubMeta.promise;
  }

  function setTechMetaValue(mount, key, value, asHtml) {
    mount.querySelectorAll('[data-tech-meta="' + key + '"] .metasiberia-tech__meta-value').forEach(function(node) {
      if (asHtml) {
        node.innerHTML = value;
      } else {
        node.textContent = value;
      }
    });
  }

  function updateTechnicalCapabilitiesGitHubMeta(mount, language) {
    var copy = getTechCopy(language);
    var unavailable = copy.githubUnavailable || "GitHub data unavailable";

    if (!mount) {
      return;
    }

    fetchTechGitHubMeta()
      .then(function(data) {
        var releaseVersion = data.releaseTag || data.releaseName || unavailable;
        var releaseDate = data.releasePublishedAt ? formatTechGitHubDate(data.releasePublishedAt, language, true) : unavailable;
        var releaseShortDate = data.releasePublishedAt ? formatTechGitHubDate(data.releasePublishedAt, language, false) : unavailable;
        var repoActivity = data.repoPushedAt ? formatTechGitHubDate(data.repoPushedAt, language, true) : unavailable;
        var commitDate = data.commitDate ? formatTechGitHubDate(data.commitDate, language, true) : "";
        var commitShaShort = data.commitSha ? data.commitSha.slice(0, 7) : unavailable;
        var commitLine = commitDate ? commitShaShort + " - " + commitDate : commitShaShort;
        var releaseName = data.releaseName || data.releaseTag || unavailable;
        var releaseMarkup = data.releaseUrl
          ? '<a class="metasiberia-tech__meta-link" href="' + escapeHtml(data.releaseUrl) + '" target="_blank" rel="noreferrer noopener">' + escapeHtml(releaseName) + "</a>" +
            (releaseDate ? '<span class="metasiberia-tech__meta-muted"> - ' + escapeHtml(releaseDate) + "</span>" : "")
          : escapeHtml(releaseName) + (releaseDate ? " - " + escapeHtml(releaseDate) : "");
        var commitMarkup = data.commitUrl
          ? '<a class="metasiberia-tech__meta-link" href="' + escapeHtml(data.commitUrl) + '" target="_blank" rel="noreferrer noopener">' + escapeHtml(commitShaShort) + "</a>" +
            (commitDate ? '<span class="metasiberia-tech__meta-muted"> - ' + escapeHtml(commitDate) + "</span>" : "")
          : escapeHtml(commitLine);

        if (data.releasePrerelease && /^v/i.test(releaseVersion)) {
          releaseVersion += " Beta";
        }

        setTechMetaValue(mount, "current-version", releaseVersion, false);
        setTechMetaValue(mount, "latest-release", releaseMarkup, true);
        setTechMetaValue(mount, "repo-activity", repoActivity, false);
        setTechMetaValue(mount, "last-update", releaseShortDate, false);
        setTechMetaValue(mount, "last-commit", commitMarkup, true);
        setTechMetaValue(mount, "commit-message", data.commitMessage || unavailable, false);
      })
      .catch(function() {
        setTechMetaValue(mount, "current-version", unavailable, false);
        setTechMetaValue(mount, "latest-release", unavailable, false);
        setTechMetaValue(mount, "repo-activity", unavailable, false);
        setTechMetaValue(mount, "last-update", unavailable, false);
        setTechMetaValue(mount, "last-commit", unavailable, false);
        setTechMetaValue(mount, "commit-message", unavailable, false);
      });
  }

  function buildTechLinksMarkup(links, language, className, isInverse) {
    links = getLocalizedCollection(links, language);

    if (!links.length) {
      return "";
    }

    return [
      '<div class="' + className + '">',
      links
        .map(function(link) {
          var label =
            link && link.label && typeof link.label === "object"
              ? getLocalizedNewsValue(link.label, language)
              : (link && link.label) || "";

          if (!link || !link.href || !label) {
            return "";
          }

          return (
            '<a class="metasiberia-tech__action-link' +
            (isInverse ? " metasiberia-tech__action-link--inverse" : "") +
            '" href="' +
            escapeHtml(link.href) +
            '" target="_blank" rel="noreferrer noopener">' +
            escapeHtml(label) +
            "</a>"
          );
        })
        .join(""),
      "</div>"
    ].join("");
  }

  function buildTechBulletMarkup(slide, language, index, copy, isActive) {
    return [
      '<button class="metasiberia-tech__bullet' + (isActive ? " is-active" : "") + '" type="button" data-tech-slide="' + index + '" aria-label="' + escapeHtml(copy.bulletLabel + (index + 1) + ": " + getLocalizedNewsValue(slide.title, language)) + '"' + (isActive ? ' aria-current="true"' : "") + "></button>"
    ].join("");
  }

  function buildTechSlideMarkup(slide, language, index, total, copy) {
    var highlights = getLocalizedCollection(slide.highlights, language)
      .map(function(item) {
        return buildTechListItemMarkup(item, language);
      })
      .join("");
    var asideItems = getLocalizedCollection(slide.asideItems, language)
      .map(function(item) {
        return buildTechListItemMarkup(item, language);
      })
      .join("");
    var leadLinks = buildTechLinksMarkup(slide.links, language, "metasiberia-tech__actions", false);
    var panelLinks = buildTechLinksMarkup(slide.asideLinks, language, "metasiberia-tech__panel-links", true);

    return [
      '<section class="metasiberia-tech__slide' + (index === 0 ? " is-active" : "") + '" data-tech-slide-index="' + index + '" role="group" aria-label="' + escapeHtml(copy.slideLabel + " " + (index + 1) + " / " + total + ": " + getLocalizedNewsValue(slide.title, language)) + '" aria-hidden="' + (index === 0 ? "false" : "true") + '">',
      '<article class="metasiberia-tech__spread">',
      '<div class="metasiberia-tech__lead">',
      '<div class="metasiberia-tech__meta">',
      '<p class="metasiberia-tech__kicker">' + escapeHtml(copy.sectionKicker) + "</p>",
      '<p class="metasiberia-tech__pagination">' + escapeHtml(String(index + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0")) + "</p>",
      "</div>",
      '<p class="metasiberia-tech__eyebrow">' + escapeHtml(getLocalizedNewsValue(slide.eyebrow, language)) + "</p>",
      '<h2 class="metasiberia-tech__title">' + escapeHtml(getLocalizedNewsValue(slide.title, language)) + "</h2>",
      '<p class="metasiberia-tech__deck">' + escapeHtml(getLocalizedNewsValue(slide.deck, language)) + "</p>",
      leadLinks,
      '<p class="metasiberia-tech__footer">' + escapeHtml(getLocalizedNewsValue(slide.footer, language)) + "</p>",
      "</div>",
      '<div class="metasiberia-tech__body">',
      '<div class="metasiberia-tech__panel">',
      '<p class="metasiberia-tech__panel-label">' + escapeHtml(copy.highlightsLabel) + "</p>",
      '<ul class="metasiberia-tech__list">' + highlights + "</ul>",
      "</div>",
      '<div class="metasiberia-tech__panel metasiberia-tech__panel--accent">',
      '<p class="metasiberia-tech__panel-label">' + escapeHtml(getLocalizedNewsValue(slide.asideTitle, language)) + "</p>",
      '<ul class="metasiberia-tech__aside">' + asideItems + "</ul>",
      panelLinks,
      "</div>",
      "</div>",
      "</article>",
      "</section>"
    ].join("");
  }

  function clearAvatarSectionAutoPlay(mount) {
    var state = mount && mount.__avatarSliderState;

    if (state && state.timerId) {
      window.clearTimeout(state.timerId);
      state.timerId = 0;
    }
  }

  function scheduleAvatarSectionAutoPlay(mount) {
    var state = mount && mount.__avatarSliderState;

    if (!mount || !state || state.paused) {
      return;
    }
  }

  function setAvatarSectionSlide(mount, nextIndex) {
    var state = mount && mount.__avatarSliderState;
    var slides = mount ? mount.querySelectorAll(".metasiberia-avatar__slide") : [];
    var bullets = mount ? mount.querySelectorAll(".metasiberia-avatar__bullet") : [];
    var track = mount ? mount.querySelector(".metasiberia-avatar__track") : null;
    var total = slides.length;

    if (!mount || !state || !total) {
      return;
    }

    nextIndex = ((nextIndex % total) + total) % total;
    state.index = nextIndex;
    mount.setAttribute("data-avatar-slide-current", String(nextIndex));

    if (track) {
      track.style.transform = "translateX(-" + nextIndex * 100 + "%)";
    }

    Array.prototype.forEach.call(slides, function(slide, index) {
      var isActive = index === nextIndex;

      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    Array.prototype.forEach.call(bullets, function(button, index) {
      var isActive = index === nextIndex;

      button.classList.toggle("is-active", isActive);

      if (isActive) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    scheduleAvatarSectionAutoPlay(mount);
  }

  function resolveAvatarImages(mount, language) {
    Array.prototype.forEach.call(mount ? mount.querySelectorAll(".metasiberia-avatar__image") : [], function(imageNode) {
      var basePath = imageNode.getAttribute("data-avatar-base") || "";
      var title = imageNode.getAttribute("data-avatar-title") || "";
      var filePattern = imageNode.getAttribute("data-avatar-file") || "";
      var requestToken = String(Date.now()) + Math.random();

      if (!basePath) {
        return;
      }

      imageNode.setAttribute("data-avatar-request", requestToken);
      imageNode.setAttribute("data-avatar-state", "loading");

      (function tryCandidate(index) {
        var candidate;

        if (!imageNode.isConnected || imageNode.getAttribute("data-avatar-request") !== requestToken) {
          return;
        }

        if (index >= AVATAR_IMAGE_EXTENSIONS.length) {
          imageNode.onload = null;
          imageNode.onerror = null;
          imageNode.setAttribute("data-avatar-state", "placeholder");
          imageNode.src = createAvatarPlaceholderDataUri(title, filePattern, language);
          return;
        }

        candidate = basePath + "." + AVATAR_IMAGE_EXTENSIONS[index];

        imageNode.onload = function() {
          if (!imageNode.isConnected || imageNode.getAttribute("data-avatar-request") !== requestToken) {
            return;
          }

          imageNode.onload = null;
          imageNode.onerror = null;
          imageNode.setAttribute("data-avatar-state", "ready");
        };

        imageNode.onerror = function() {
          tryCandidate(index + 1);
        };

        imageNode.src = candidate;
      })(0);
    });
  }

  function ensureAvatarSection() {
    var allRecords = document.getElementById("allrecords");
    var pageId = allRecords ? allRecords.getAttribute("data-tilda-page-id") : "";

    if (pageId !== "62281087" || !allRecords) {
      return null;
    }

    var existingMount = document.getElementById(AVATAR_SECTION_MOUNT_ID);

    if (existingMount) {
      return existingMount;
    }

    var section = document.createElement("section");
    var mount = document.createElement("div");
    var anchor =
      document.getElementById(TECH_SECTION_ID) ||
      allRecords.querySelector("#rec858665447") ||
      allRecords.querySelector("#rec859988145");
    var footer = allRecords.querySelector("#t-footer");

    section.id = AVATAR_SECTION_ID;
    section.className = "r t-rec metasiberia-avatar-home";
    section.style.scrollMarginTop = "96px";
    mount.id = AVATAR_SECTION_MOUNT_ID;
    section.appendChild(mount);

    if (anchor && anchor.parentElement === allRecords) {
      allRecords.insertBefore(section, anchor);
    } else if (footer && footer.parentElement === allRecords) {
      allRecords.insertBefore(section, footer);
    } else {
      allRecords.appendChild(section);
    }

    return mount;
  }

  function renderAvatarSection(language) {
    var mount = ensureAvatarSection();
    var copy = getAvatarCopy(language);
    var state;
    var slidesMarkup;
    var controlsMarkup;
    var bulletsMarkup;
    var prevButton;
    var nextButton;
    var shell;
    var hasMultipleSlides;

    if (!mount) {
      return;
    }

    state = mount.__avatarSliderState || {
      index: 0,
      timerId: 0,
      paused: false
    };
    clearAvatarSectionAutoPlay(mount);
    state.index = Math.min(state.index, Math.max(AVATAR_SHOWCASE_SLIDES.length - 1, 0));
    state.paused = false;
    mount.__avatarSliderState = state;
    hasMultipleSlides = AVATAR_SHOWCASE_SLIDES.length > 1;

    slidesMarkup = AVATAR_SHOWCASE_SLIDES.map(function(slide, index) {
      return buildAvatarSlideMarkup(slide, language, index, AVATAR_SHOWCASE_SLIDES.length, copy);
    }).join("");
    controlsMarkup = hasMultipleSlides
      ? [
          '<div class="metasiberia-avatar__controls">',
          '<button class="metasiberia-avatar__arrow metasiberia-avatar__arrow--prev" type="button" aria-label="' + escapeHtml(copy.prevLabel) + '"><svg role="presentation" viewBox="0 0 7.3 13" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="currentColor" stroke-linecap="butt" stroke-linejoin="butt" stroke-width="1" points="6.5,0.5 0.5,6.5 6.5,12.5"/></svg></button>',
          '<button class="metasiberia-avatar__arrow metasiberia-avatar__arrow--next" type="button" aria-label="' + escapeHtml(copy.nextLabel) + '"><svg role="presentation" viewBox="0 0 7.3 13" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="currentColor" stroke-linecap="butt" stroke-linejoin="butt" stroke-width="1" points="0.5,0.5 6.5,6.5 0.5,12.5"/></svg></button>',
          "</div>"
        ].join("")
      : "";
    bulletsMarkup = hasMultipleSlides
      ? '<div class="metasiberia-avatar__bullets">' + AVATAR_SHOWCASE_SLIDES.map(function(slide, index) {
          return buildAvatarBulletMarkup(slide, language, index, copy, index === state.index);
        }).join("") + "</div>"
      : "";
    mount.innerHTML = [
      '<div class="metasiberia-avatar__shell" role="region" aria-label="' + escapeHtml(copy.sectionTitle) + '">',
      '<div class="metasiberia-avatar__header">',
      '<h2 class="metasiberia-avatar__section-title">' + escapeHtml(copy.sectionTitle) + "</h2>",
      '<p class="metasiberia-avatar__section-intro">' + escapeHtml(copy.sectionIntro) + "</p>",
      "</div>",
      '<div class="metasiberia-avatar__viewport">',
      '<div class="metasiberia-avatar__track">' + slidesMarkup + "</div>",
      "</div>",
      controlsMarkup,
      bulletsMarkup,
      "</div>"
    ].join("");

    prevButton = mount.querySelector(".metasiberia-avatar__arrow--prev");
    nextButton = mount.querySelector(".metasiberia-avatar__arrow--next");
    shell = mount.querySelector(".metasiberia-avatar__shell");

    if (prevButton) {
      prevButton.onclick = function() {
        state.paused = false;
        setAvatarSectionSlide(mount, state.index - 1);
      };
    }

    if (nextButton) {
      nextButton.onclick = function() {
        state.paused = false;
        setAvatarSectionSlide(mount, state.index + 1);
      };
    }

    Array.prototype.forEach.call(mount.querySelectorAll(".metasiberia-avatar__bullet"), function(button) {
      button.onclick = function() {
        state.paused = false;
        setAvatarSectionSlide(mount, parseInt(button.getAttribute("data-avatar-slide"), 10) || 0);
      };
    });

    if (shell) {
      shell.onmouseenter = function() {
        state.paused = true;
        clearAvatarSectionAutoPlay(mount);
      };

      shell.onmouseleave = function() {
        state.paused = false;
        scheduleAvatarSectionAutoPlay(mount);
      };
    }

    resolveAvatarImages(mount, language);
    setAvatarSectionSlide(mount, state.index);
  }

  function clearTechnicalCapabilitiesAutoPlay(mount) {
    var state = mount && mount.__techSliderState;

    if (state && state.timerId) {
      window.clearTimeout(state.timerId);
      state.timerId = 0;
    }
  }

  function scheduleTechnicalCapabilitiesAutoPlay(mount) {
    var state = mount && mount.__techSliderState;

    if (!mount || !state || state.paused || !TECH_SLIDER_DELAY) {
      return;
    }

    clearTechnicalCapabilitiesAutoPlay(mount);
    state.timerId = window.setTimeout(function() {
      setTechnicalCapabilitiesSlide(mount, state.index + 1);
    }, TECH_SLIDER_DELAY);
  }

  function setTechnicalCapabilitiesSlide(mount, nextIndex) {
    var state = mount && mount.__techSliderState;
    var slides = mount ? mount.querySelectorAll(".metasiberia-tech__slide") : [];
    var bullets = mount ? mount.querySelectorAll(".metasiberia-tech__bullet") : [];
    var track = mount ? mount.querySelector(".metasiberia-tech__track") : null;
    var total = slides.length;

    if (!mount || !state || !total) {
      return;
    }

    nextIndex = ((nextIndex % total) + total) % total;
    state.index = nextIndex;
    mount.setAttribute("data-tech-slide-current", String(nextIndex));

    if (track) {
      track.style.transform = "translateX(-" + nextIndex * 100 + "%)";
    }

    Array.prototype.forEach.call(slides, function(slide, index) {
      var isActive = index === nextIndex;

      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    Array.prototype.forEach.call(bullets, function(button, index) {
      var isActive = index === nextIndex;

      button.classList.toggle("is-active", isActive);

      if (isActive) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    scheduleTechnicalCapabilitiesAutoPlay(mount);
  }

  function ensureTechnicalCapabilitiesSection() {
    var allRecords = document.getElementById("allrecords");
    var pageId = allRecords ? allRecords.getAttribute("data-tilda-page-id") : "";

    if (pageId !== "62281087" || !allRecords) {
      return null;
    }

    var existingMount = document.getElementById(TECH_SECTION_MOUNT_ID);

    if (existingMount) {
      return existingMount;
    }

    var section = document.createElement("section");
    var mount = document.createElement("div");
    var anchor = allRecords.querySelector("#rec858665447") || allRecords.querySelector("#rec859988145");
    var footer = allRecords.querySelector("#t-footer");

    section.id = TECH_SECTION_ID;
    section.className = "r t-rec metasiberia-tech-home";
    section.style.scrollMarginTop = "96px";
    mount.id = TECH_SECTION_MOUNT_ID;
    section.appendChild(mount);

    if (anchor && anchor.parentElement === allRecords) {
      allRecords.insertBefore(section, anchor);
    } else if (footer && footer.parentElement === allRecords) {
      allRecords.insertBefore(section, footer);
    } else {
      allRecords.appendChild(section);
    }

    return mount;
  }

  function renderTechnicalCapabilitiesSection(language) {
    var mount = ensureTechnicalCapabilitiesSection();
    var copy = getTechCopy(language);
    var state;
    var slidesMarkup;
    var bulletsMarkup;
    var prevButton;
    var nextButton;
    var shell;

    if (!mount) {
      return;
    }

    state = mount.__techSliderState || {
      index: 0,
      timerId: 0,
      paused: false
    };
    clearTechnicalCapabilitiesAutoPlay(mount);
    state.index = Math.min(state.index, Math.max(TECH_FEATURE_SLIDES.length - 1, 0));
    state.paused = false;
    mount.__techSliderState = state;

    slidesMarkup = TECH_FEATURE_SLIDES.map(function(slide, index) {
      return buildTechSlideMarkup(slide, language, index, TECH_FEATURE_SLIDES.length, copy);
    }).join("");
    bulletsMarkup = TECH_FEATURE_SLIDES.map(function(slide, index) {
      return buildTechBulletMarkup(slide, language, index, copy, index === state.index);
    }).join("");

    mount.innerHTML = [
      '<div class="metasiberia-tech__shell" aria-label="' + escapeHtml(copy.sectionTitle) + '">',
      '<div class="metasiberia-tech__header">',
      "<div>",
      '<p class="metasiberia-tech__section-kicker">' + escapeHtml(copy.sectionKicker) + "</p>",
      '<h2 class="metasiberia-tech__section-title">' + escapeHtml(copy.sectionTitle) + "</h2>",
      "</div>",
      '<p class="metasiberia-tech__section-intro">' + escapeHtml(copy.sectionIntro) + "</p>",
      "</div>",
      '<div class="metasiberia-tech__viewport">',
      '<div class="metasiberia-tech__track">' + slidesMarkup + "</div>",
      "</div>",
      '<div class="metasiberia-tech__controls">',
      '<button class="metasiberia-tech__arrow metasiberia-tech__arrow--prev" type="button" aria-label="' + escapeHtml(copy.prevLabel) + '"><svg role="presentation" viewBox="0 0 7.3 13" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="currentColor" stroke-linecap="butt" stroke-linejoin="butt" stroke-width="1" points="6.5,0.5 0.5,6.5 6.5,12.5"/></svg></button>',
      '<button class="metasiberia-tech__arrow metasiberia-tech__arrow--next" type="button" aria-label="' + escapeHtml(copy.nextLabel) + '"><svg role="presentation" viewBox="0 0 7.3 13" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="currentColor" stroke-linecap="butt" stroke-linejoin="butt" stroke-width="1" points="0.5,0.5 6.5,6.5 0.5,12.5"/></svg></button>',
      "</div>",
      '<div class="metasiberia-tech__bullets">' + bulletsMarkup + "</div>",
      "</div>"
    ].join("");

    prevButton = mount.querySelector(".metasiberia-tech__arrow--prev");
    nextButton = mount.querySelector(".metasiberia-tech__arrow--next");
    shell = mount.querySelector(".metasiberia-tech__shell");

    if (prevButton) {
      prevButton.onclick = function() {
        state.paused = false;
        setTechnicalCapabilitiesSlide(mount, state.index - 1);
      };
    }

    if (nextButton) {
      nextButton.onclick = function() {
        state.paused = false;
        setTechnicalCapabilitiesSlide(mount, state.index + 1);
      };
    }

    mount.querySelectorAll(".metasiberia-tech__bullet").forEach(function(button) {
      button.onclick = function() {
        state.paused = false;
        setTechnicalCapabilitiesSlide(mount, parseInt(button.getAttribute("data-tech-slide"), 10) || 0);
      };
    });

    if (shell) {
      shell.onmouseenter = function() {
        state.paused = true;
        clearTechnicalCapabilitiesAutoPlay(mount);
      };

      shell.onmouseleave = function() {
        state.paused = false;
        scheduleTechnicalCapabilitiesAutoPlay(mount);
      };
    }

    setTechnicalCapabilitiesSlide(mount, state.index);
    updateTechnicalCapabilitiesGitHubMeta(mount, language);
  }

  function ensureHomepageNewsSection() {
    var allRecords = document.getElementById("allrecords");
    var pageId = allRecords ? allRecords.getAttribute("data-tilda-page-id") : "";

    if (pageId !== "62281087" || !allRecords) {
      return null;
    }

    var existingMount = document.getElementById(NEWS_SECTION_MOUNT_ID);

    if (existingMount) {
      return existingMount;
    }

    var section = document.createElement("section");
    var mount = document.createElement("div");
    var footer = allRecords.querySelector("#t-footer");

    section.id = NEWS_SECTION_ID;
    section.className = "r t-rec metasiberia-news-home";
    section.style.scrollMarginTop = "96px";
    mount.id = NEWS_SECTION_MOUNT_ID;
    section.appendChild(mount);

    if (footer && footer.parentElement === allRecords) {
      allRecords.insertBefore(section, footer);
    } else {
      allRecords.appendChild(section);
    }

    return mount;
  }

  function renderHomepageNewsSection(language) {
    var mount = ensureHomepageNewsSection();
    var copy = getNewsCopy(language);
    var cardsMarkup;

    if (!mount) {
      return;
    }

    cardsMarkup = NEWS_POSTS.slice(0, 3)
      .map(function(post) {
        return buildHomeNewsCardMarkup(post, language, copy.homeStoryLink);
      })
      .join("");

    mount.innerHTML = [
      '<div class="metasiberia-news-home__shell">',
      '<div class="metasiberia-news-home__head">',
      "<div>",
      '<p class="metasiberia-news-home__kicker">' + escapeHtml(copy.homeKicker) + "</p>",
      '<h2 class="metasiberia-news-home__title">' + escapeHtml(copy.homeTitle) + "</h2>",
      "</div>",
      '<p class="metasiberia-news-home__intro">' + escapeHtml(copy.homeIntro) + "</p>",
      "</div>",
      '<div class="metasiberia-news-home__grid">' + cardsMarkup + "</div>",
      "</div>"
    ].join("");
  }

  function renderNewsPage(language) {
    var allRecords = document.getElementById("allrecords");
    var pageId = allRecords ? allRecords.getAttribute("data-tilda-page-id") : "";
    var copy = getNewsCopy(language);
    var grid = document.getElementById("news-page-grid");
    var stories = document.getElementById("news-page-stories");
    var panelList = document.getElementById("news-page-panel-list");

    if (pageId !== NEWS_PAGE_ID) {
      return;
    }

    setNodeText("news-page-kicker", copy.pageHeroKicker);
    setNodeText("news-page-title", copy.pageHeroTitle);
    setNodeText("news-page-subtitle", copy.pageHeroSubtitle);
    setNodeText("news-page-panel-title", copy.pagePanelTitle);
    setNodeText("news-page-archive-kicker", copy.archiveKicker);
    setNodeText("news-page-archive-title", copy.archiveTitle);
    setNodeText("news-page-archive-copy", copy.archiveCopy);
    setNodeText("news-page-stories-kicker", copy.storiesKicker);
    setNodeText("news-page-stories-title", copy.storiesTitle);
    setNodeText("news-page-stories-copy", copy.storiesCopy);

    if (panelList) {
      panelList.innerHTML = copy.pagePanelItems
        .map(function(item) {
          return "<li>" + escapeHtml(item) + "</li>";
        })
        .join("");
    }

    if (grid) {
      grid.innerHTML = NEWS_POSTS.map(function(post) {
        return buildNewsPageCardMarkup(post, language, copy.homeStoryLink);
      }).join("");
    }

    if (stories) {
      stories.innerHTML = NEWS_POSTS.map(function(post) {
        return buildNewsStoryMarkup(post, language, copy.backToTop);
      }).join("");
    }

    var homeLink = document.getElementById("news-page-home-link");
    var storeLink = document.getElementById("news-page-store-link");

    if (homeLink) {
      homeLink.textContent = copy.pageHomeLink;
    }

    if (storeLink) {
      storeLink.textContent = copy.pageStoreLink;
    }
  }

  function applyProjectTerminology(language) {
    var allRecords = document.getElementById("allrecords");
    var pageId = allRecords ? allRecords.getAttribute("data-tilda-page-id") : "";
    var textBlocks;

    if (pageId === "62442585") {
      textBlocks = document.querySelectorAll("#rec859828747 .t167__text");
      textBlocks.forEach(function(node) {
        var html = node.innerHTML;

        if (language === "ru") {
          html = html
            .replace("клиент виртуальных миров Substrata", "клиент Metasiberia")
            .replace("<strong>На чём основана Metasiberia?</strong><br />", "<strong>На каком движке работает Metasiberia?</strong><br />")
            .replace('Metasiberia — это проект, основанный на технологиях <strong style="color: rgb(0, 10, 255);"><a href="https://substrata.info/" target="_blank" rel="noreferrer noopener" style="color: rgb(0, 10, 255);">Substrata</a></strong>, разработанных Glare Technologies Limited.', "Metasiberia создана на движке <strong>Glare-core</strong>, разработанном Glare Technologies Limited.")
            .replace("<strong>Metasiberia состоит из Substrata.</strong>", "<strong>Metasiberia создана на движке Glare-core.</strong>");
        }

        node.innerHTML = html;
      });
    }

    if (pageId === "63809043") {
      textBlocks = document.querySelectorAll("#rec870753101 .t167__text");
      textBlocks.forEach(function(node) {
        var html = node.innerHTML;

        if (language === "ru") {
          html = html
            .replace('клиентское программное обеспечение <span style="color: rgb(0, 0, 0);">Substrata</span>', "клиентское приложение Metasiberia")
            .replace("или клиента Substrata.", "или клиента Metasiberia.");
        }

        node.innerHTML = html;
      });
    }

    if (pageId === "63810393") {
      textBlocks = document.querySelectorAll("#rec870763264 .t167__text");
      textBlocks.forEach(function(node) {
        var html = node.innerHTML;

        if (language === "ru") {
          html = html.replace("Для работы со скриптами нужен клиент Substrata.", "Для работы со скриптами нужен клиент Metasiberia.");
        }

        node.innerHTML = html;
      });
    }
  }

  function rememberOriginal(node) {
    if (!originalHtml.has(node)) {
      originalHtml.set(node, node.innerHTML);
    }
  }

  function restorePageBlocks(pageId) {
    var blocks = PAGE_HTML_TRANSLATIONS[pageId] || [];

    blocks.forEach(function(block) {
      document.querySelectorAll(block.selector).forEach(function(node) {
        if (originalHtml.has(node)) {
          node.innerHTML = originalHtml.get(node);
        }
      });
    });
  }

  function applyEnglishPageBlocks(pageId) {
    var blocks = PAGE_HTML_TRANSLATIONS[pageId] || [];

    blocks.forEach(function(block) {
      var nodes = Array.from(document.querySelectorAll(block.selector));
      var values = Array.isArray(block.html) ? block.html : [block.html];

      nodes.forEach(function(node, index) {
        rememberOriginal(node);
        node.innerHTML = values[index % values.length];
      });
    });
  }

  function setFirstTextNode(node, value) {
    var textNodes = Array.from(node.childNodes).filter(function(child) {
      return child.nodeType === Node.TEXT_NODE && normalizeText(child.nodeValue);
    });

    if (textNodes.length) {
      textNodes.forEach(function(child, index) {
        child.nodeValue = index === 0 ? value : "";
      });
      return;
    }

    node.insertBefore(document.createTextNode(value), node.firstChild || null);
  }

  function applySelectorUpdates(language) {
    SELECTOR_UPDATES.forEach(function(update) {
      document.querySelectorAll(update.selector).forEach(function(node) {
        var value = update.values[language];

        if (typeof value !== "string") {
          return;
        }

        if (update.type === "html") {
          node.innerHTML = value;
          return;
        }

        if (update.type === "firstText") {
          setFirstTextNode(node, value);
          return;
        }

        node.textContent = value;
      });
    });
  }

  function applyLeafTextRules(language) {
    document.querySelectorAll("body *").forEach(function(node) {
      if (
        node.closest("." + SWITCHER_CLASS) ||
        node.tagName === "SCRIPT" ||
        node.tagName === "STYLE" ||
        node.childElementCount !== 0
      ) {
        return;
      }

      var text = normalizeText(node.textContent);

      if (!text) {
        return;
      }

      var rule = LEAF_TEXT_RULES.find(function(candidate) {
        return candidate.match(text);
      });

      if (rule) {
        node.textContent = rule.values[language];
      }
    });
  }

  function updatePageTitle(language) {
    var allRecords = document.getElementById("allrecords");
    var pageId = allRecords ? allRecords.getAttribute("data-tilda-page-id") : "";
    var copy = PAGE_TITLES[pageId];

    if (copy) {
      document.title = copy[language];
    }
  }

  function updateSharedUiLanguage(language) {
    var isRussian = language === "ru";
    var repositoryUrl = "https://github.com/shipilovden/sub-metasiberia";
    var skipLinkLabel = isRussian ? "К основному контенту" : "Skip to main content";
    var sliderLabel = isRussian ? "Слайдер" : "Slider";
    var previousSlideLabel = isRussian ? "Предыдущий слайд" : "Previous slide";
    var nextSlideLabel = isRussian ? "Следующий слайд" : "Next slide";
    var socialLinksLabel = isRussian ? "Соц. сети" : "Social links";

    document.querySelectorAll('a[href="#t-main-content"]').forEach(function(node) {
      node.textContent = skipLinkLabel;
      node.setAttribute("aria-label", skipLinkLabel);
    });

    document.querySelectorAll(".t-sociallinks__wrapper").forEach(function(node) {
      node.setAttribute("aria-label", socialLinksLabel);
    });

    document
      .querySelectorAll('a[href="https://github.com/glaretechnologies/substrata"]')
      .forEach(function(node) {
        node.setAttribute("href", repositoryUrl);
      });

    document.querySelectorAll(".t-slds").forEach(function(node) {
      node.setAttribute("aria-label", sliderLabel);
      node.setAttribute("aria-roledescription", isRussian ? "карусель" : "carousel");
    });

    document.querySelectorAll(".t-slds__arrow_wrapper-left button").forEach(function(node) {
      node.setAttribute("aria-label", previousSlideLabel);
    });

    document.querySelectorAll(".t-slds__arrow_wrapper-right button").forEach(function(node) {
      node.setAttribute("aria-label", nextSlideLabel);
    });

    document.querySelectorAll(".t-slds__bullet[data-slide-bullet-for] button").forEach(function(node) {
      var index = node.parentElement ? node.parentElement.getAttribute("data-slide-bullet-for") : "";

      if (index) {
        node.setAttribute(
          "aria-label",
          isRussian ? "Перейти к слайду " + index : "Go to slide " + index
        );
      }
    });

    document.querySelectorAll(".t-slds__item[data-slide-index]").forEach(function(node) {
      var index = parseInt(node.getAttribute("data-slide-index"), 10);
      var slider = node.closest(".t-slds");
      var total = 0;

      if (slider) {
        total = new Set(
          Array.from(slider.querySelectorAll(".t-slds__item[data-slide-index]"))
            .map(function(slideNode) {
              return slideNode.getAttribute("data-slide-index");
            })
            .filter(Boolean)
        ).size;
      }

      if (index && total) {
        node.setAttribute("aria-label", isRussian ? index + " из " + total : index + " of " + total);
      }
    });
  }

  function updateAccessibility(language) {
    var burger = document.querySelector("#rec872696359 .t-menuburger");
    var closeButton = document.querySelector("#rec872696359 .t450__close-button");
    var switcher = document.querySelector("#rec872696359 ." + SWITCHER_CLASS);

    if (burger) {
      burger.setAttribute(
        "aria-label",
        language === "ru" ? "Навигационное меню" : "Navigation menu"
      );
    }

    if (closeButton) {
      closeButton.setAttribute(
        "aria-label",
        language === "ru" ? "Закрыть меню" : "Close menu"
      );
    }

    if (switcher) {
      switcher.setAttribute("aria-label", language === "ru" ? "Переключение языка" : "Language switch");
    }

    updateSharedUiLanguage(language);
  }

  function applyLanguage(language) {
    var normalizedLanguage = normalizeLanguage(language);
    var allRecords = document.getElementById("allrecords");
    var pageId = allRecords ? allRecords.getAttribute("data-tilda-page-id") : "";

    document.documentElement.setAttribute("lang", normalizedLanguage);
    document.documentElement.setAttribute("data-site-language", normalizedLanguage);

    restorePageBlocks(pageId);

    if (normalizedLanguage === "en") {
      applyEnglishPageBlocks(pageId);
    }

    ensureNewsMenuLinks();
    updateMenuLabels(normalizedLanguage);
    applySelectorUpdates(normalizedLanguage);
    applyLeafTextRules(normalizedLanguage);
    removeDeprecatedHomepageQuickSection();
    ensureHomepageHeroQuickLinks(normalizedLanguage);
    updatePageTitle(normalizedLanguage);
    renderAvatarSection(normalizedLanguage);
    renderTechnicalCapabilitiesSection(normalizedLanguage);
    renderHomepageNewsSection(normalizedLanguage);
    renderNewsPage(normalizedLanguage);
    applyProjectTerminology(normalizedLanguage);
    updateAccessibility(normalizedLanguage);
    updateSwitcher(normalizedLanguage);
    document.dispatchEvent(
      new CustomEvent("metasiberia:languagechange", {
        detail: { language: normalizedLanguage }
      })
    );
  }

  function scheduleDelayedLanguageRefresh() {
    if (scheduleDelayedLanguageRefresh.done) {
      return;
    }

    scheduleDelayedLanguageRefresh.done = true;

    [300, 1200, 2600, 4200].forEach(function(delay) {
      window.setTimeout(function() {
        applyLanguage(getSavedLanguage());
      }, delay);
    });
  }

  function mountSwitcher() {
    var menuContent = document.querySelector("#rec872696359 .t450__menu__content");
    var burgerContainer = menuContent ? menuContent.querySelector(".t450__burger_container") : null;

    if (!menuContent || !burgerContainer) {
      return false;
    }

    injectStyles();
    menuContent.classList.add("t450__menu__content_lang-ready");

    if (!menuContent.querySelector("." + SWITCHER_CLASS)) {
      menuContent.insertBefore(buildSwitcher(), burgerContainer);
    }

    applyLanguage(getSavedLanguage());
    scheduleDelayedLanguageRefresh();
    return true;
  }

  var attempts = 0;

  function boot() {
    ensureChatbotScript();

    if (mountSwitcher()) {
      return;
    }

    attempts += 1;

    if (attempts < 20) {
      window.setTimeout(boot, 150);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.addEventListener("load", boot);
})();
