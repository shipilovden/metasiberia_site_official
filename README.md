# Metasiberia Main Site

Официальный статический сайт Metasiberia.

## Актуальный прод

- Продакшен хостинг: REG.RU shared hosting
- Прод-домен: `https://metasiberia.com`
- Текущий деплой делается на REG.RU
- Этот проект деплоится только на REG.RU

## Локальный запуск

Основной способ локального запуска:

```bash
cd "C:/Three/Metasiberia official/Metasiberia one"
npm run dev
```

Локальный адрес:

- `http://127.0.0.1:8000/`

Поддерживаются clean URLs:

- `/`
- `/faq`
- `/terms`
- `/lua`
- `/scripts`
- `/store`
- `/header`
- `/footer`
- `/error`
- `/morpher`

Примеры:

- `http://127.0.0.1:8000/faq`
- `http://127.0.0.1:8000/store`
- `http://127.0.0.1:8000/morpher`

Дополнительно можно запускать сырой статический просмотр:

```bash
python -m http.server 8000
```

или

```bash
npx serve .
```

Но эти способы не воспроизводят clean URLs сами по себе и подходят только для проверки отдельных файлов.

## Структура

- `page62281087.html` — главная страница
- `page62442585.html` — FAQ
- `page63809043.html` — Terms
- `page63810393.html` — Lua
- `page63811825.html` — Scripts
- `page63813121.html` — Store
- `page64026745.html` — Header
- `page64026811.html` — Footer
- `page64027043.html` — Error
- `page64103135.html` — Morpher
- `css/`, `js/`, `images/`, `files/` — статические ассеты
- `htaccess` — Apache-правила для REG.RU

## Деплой

- Актуальный деплой: REG.RU
- Локальные доступы и операционные заметки хранятся только локально
- Подробный контекст смотри в локальном `AGENTS.md`

## Важно

- Не использовать старые legacy-инструкции деплоя для этого проекта
- Не коммитить `.secrets/`
- При изменениях маршрутов синхронизировать локальный dev-сервер и правила Apache
