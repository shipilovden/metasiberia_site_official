# 🚀 Настройка GitHub репозитория

## Шаги для создания репозитория на GitHub:

### 1. Создание репозитория на GitHub.com
1. Перейдите на https://github.com/new
2. Заполните форму:
   - **Repository name:** `metasiberia_site_oficial`
   - **Description:** `Official Metasiberia website - Static site built with Tilda and deployed on Vercel`
   - **Visibility:** Public
   - **НЕ добавляйте** README, .gitignore или лицензию
3. Нажмите "Create repository"

### 2. Подключение локального репозитория к GitHub
После создания репозитория выполните команды:

```bash
# Добавить удаленный репозиторий (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/metasiberia_site_oficial.git

# Переименовать ветку в main
git branch -M main

# Отправить код на GitHub
git push -u origin main
```

### 3. Подключение к Vercel
1. Перейдите на https://vercel.com/dashboard
2. Нажмите "New Project"
3. Выберите "Import Git Repository"
4. Найдите и выберите `metasiberia_site_oficial`
5. Нажмите "Import"
6. Vercel автоматически определит настройки из `vercel.json`
7. Нажмите "Deploy"

### 4. Настройка автоматического деплоя
После подключения к Vercel:
- Каждый push в main ветку будет автоматически деплоить сайт
- Vercel будет использовать настройки из `vercel.json`
- Сайт будет доступен по адресу: `https://metasiberia_site_oficial.vercel.app`

## 📁 Структура проекта:
```
metasiberia_site_oficial/
├── page62281087.html          # Главная страница
├── page62442585.html          # FAQ
├── page63809043.html          # Terms
├── page63810393.html          # Lua
├── page63811825.html          # Scripts
├── page63813121.html          # Store
├── page64026745.html          # Header
├── page64026811.html          # Footer
├── page64027043.html          # Error 404
├── page64103135.html          # Morpher
├── vercel.json                # Конфигурация Vercel
├── package.json               # Метаданные проекта
├── README.md                  # Описание проекта
├── DEPLOY.md                  # Инструкции по деплою
├── QUICK_DEPLOY.md            # Быстрый деплой
├── deploy.sh                  # Скрипт автоматического деплоя
├── .gitignore                 # Git исключения
├── htaccess                   # Apache конфигурация
├── sitemap.xml                # Карта сайта
├── robots.txt                 # Правила для роботов
├── 404.html                   # Страница ошибки
├── css/                       # CSS файлы
├── js/                        # JavaScript файлы
├── images/                    # Изображения
├── files/                     # Дополнительные файлы
└── api/                       # API функции
```

## 🔧 Команды для работы с проектом:

```bash
# Клонирование репозитория
git clone https://github.com/YOUR_USERNAME/metasiberia_site_oficial.git
cd metasiberia_site_oficial

# Установка зависимостей
npm install

# Локальный запуск
npm start

# Деплой на Vercel
npm run deploy
# или
vercel --prod
```

## 📝 Примечания:
- Все HTML файлы обновлены (удален пункт "News" из меню)
- Настроены чистые URL через `vercel.json`
- Готов к автоматическому деплою через Vercel
- Поддерживает все функции оригинального сайта
