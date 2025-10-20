# ⚡ Быстрая настройка GitHub + Vercel

## 1. Создайте репозиторий на GitHub:
1. Перейдите на https://github.com/new
2. Название: `metasiberia_site_oficial`
3. Описание: `Official Metasiberia website`
4. **НЕ добавляйте** README, .gitignore, лицензию
5. Нажмите "Create repository"

## 2. Выполните команды (замените YOUR_USERNAME):

```bash
git remote add origin https://github.com/YOUR_USERNAME/metasiberia_site_oficial.git
git branch -M main
git push -u origin main
```

## 3. Подключите к Vercel:
1. https://vercel.com/dashboard → "New Project"
2. "Import Git Repository" → выберите `metasiberia_site_oficial`
3. "Import" → "Deploy"

## ✅ Готово!
- Сайт: `https://metasiberia_site_oficial.vercel.app`
- Автодеплой при каждом push в main
- Все настройки уже готовы в `vercel.json`
