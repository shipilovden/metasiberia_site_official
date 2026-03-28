# Деплой Metasiberia на REG.RU

Этот проект публикуется на REG.RU shared hosting.

## Источник истины

- Прод-домен: `https://metasiberia.com`
- Текущий прод-хостинг: REG.RU
- Другие старые схемы деплоя для этого проекта не используются

## Что должно попасть на сервер

В корень сайта нужно выкладывать актуальные статические файлы проекта:

- `page*.html`
- `css/`
- `js/`
- `images/`
- `files/`
- `robots.txt`
- `sitemap.xml`
- `404.html`
- `htaccess`

## Перед выкладкой

1. Проверь локально через `npm run dev`
2. Проверь маршруты:
   - `/`
   - `/faq`
   - `/terms`
   - `/lua`
   - `/scripts`
   - `/store`
   - `/morpher`
3. Если менялись ссылки или навигация, отдельно проверь внутренние переходы
4. Если менялись SEO-файлы, проверь `robots.txt` и `sitemap.xml`

## После выкладки

1. Проверь:
   - `https://metasiberia.com/`
   - `https://metasiberia.com/faq`
   - `https://metasiberia.com/terms`
   - `https://metasiberia.com/lua`
   - `https://metasiberia.com/scripts`
   - `https://metasiberia.com/store`
   - `https://metasiberia.com/morpher`
2. Проверь, что Apache-редиректы и clean URLs работают корректно
3. Проверь HTTPS и сертификат

## Где лежат доступы

- Доступы и чувствительные детали не хранятся в tracked-документах
- Используй локальные заметки и `.secrets/`
- Операционный контекст смотри в локальном `AGENTS.md`
