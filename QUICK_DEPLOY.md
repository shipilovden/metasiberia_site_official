# 🚀 Быстрый деплой Metasiberia на Vercel

## Вариант 1: Через веб-интерфейс (Самый простой)

### Шаг 1: Подготовьте репозиторий
```bash
git init
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Шаг 2: Деплой через Vercel Dashboard
1. Идите на [vercel.com](https://vercel.com)
2. Нажмите **"New Project"**
3. Подключите ваш GitHub репозиторий
4. Настройки:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./`
   - **Build Command:** (оставить пустым)
   - **Output Directory:** (оставить пустым)
5. Нажмите **"Deploy"**

## Вариант 2: Через Vercel CLI

### Установка Vercel CLI
```bash
npm install -g vercel
```

### Авторизация
```bash
vercel login
```

### Деплой
```bash
vercel --prod
```

## ✅ Что уже готово

- ✅ `vercel.json` - полная конфигурация
- ✅ `package.json` - метаданные проекта  
- ✅ `api/404.js` - обработка ошибок
- ✅ Все маршруты настроены
- ✅ Редиректы настроены
- ✅ Кэширование настроено
- ✅ Безопасность настроена

## 🌐 После деплоя проверьте

- [ ] Главная: `https://your-domain.vercel.app/`
- [ ] FAQ: `https://your-domain.vercel.app/faq`
- [ ] Terms: `https://your-domain.vercel.app/terms`
- [ ] Lua: `https://your-domain.vercel.app/lua`
- [ ] Scripts: `https://your-domain.vercel.app/scripts`
- [ ] Store: `https://your-domain.vercel.app/store`
- [ ] Morpher: `https://your-domain.vercel.app/morpher`
- [ ] 404 страница: `https://your-domain.vercel.app/nonexistent`

## 🎯 Готово!

Ваш сайт Metasiberia готов к деплою! 🚀

**Время деплоя:** ~2-3 минуты
**Сложность:** Очень простая
**Результат:** Полнофункциональный сайт на Vercel
