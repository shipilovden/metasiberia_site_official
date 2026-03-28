# GitHub Setup

GitHub для этого проекта используется как репозиторий исходников.

## Важно

- GitHub не является каналом автоматического прод-деплоя
- Продакшен для этого проекта находится на REG.RU
- Push в GitHub сам по себе не публикует сайт

## Базовая настройка

```bash
git remote add origin https://github.com/YOUR_USERNAME/metasiberia_site_official.git
git branch -M main
git push -u origin main
```

## Рекомендуемый поток

1. Меняешь файлы локально
2. Проверяешь сайт через `npm run dev`
3. Коммитишь изменения в GitHub
4. Отдельно выкладываешь статические файлы на REG.RU

## Что не делать

- Не использовать старые legacy-инструкции деплоя
- Не считать GitHub источником автодеплоя для `metasiberia.com`
