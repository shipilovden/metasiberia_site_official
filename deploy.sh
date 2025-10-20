#!/bin/bash

# Скрипт для быстрого деплоя на Vercel
# Использование: ./deploy.sh

echo "🚀 Подготовка к деплою Metasiberia на Vercel..."

# Проверяем наличие Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI не установлен. Устанавливаем..."
    npm install -g vercel
fi

# Проверяем авторизацию
echo "🔐 Проверяем авторизацию в Vercel..."
if ! vercel whoami &> /dev/null; then
    echo "❌ Не авторизованы в Vercel. Выполняем авторизацию..."
    vercel login
fi

# Инициализируем Git если нужно
if [ ! -d ".git" ]; then
    echo "📦 Инициализируем Git репозиторий..."
    git init
    git add .
    git commit -m "Initial commit for Vercel deployment"
fi

# Деплой
echo "🚀 Запускаем деплой..."
vercel --prod

echo "✅ Деплой завершен!"
echo "🌐 Ваш сайт доступен по адресу, который показал Vercel"
echo "📖 Подробные инструкции в DEPLOY.md"
