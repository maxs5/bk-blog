# BK Blog

Полноценное fullstack SPA-приложение блога:
- `frontend` — клиент на React
- `backend` — API на Express + MongoDB

## Стек
- Frontend: React, Redux, React Router, styled-components
- Backend: Node.js, Express, Mongoose, JWT (авторизация через cookie)
- База данных: MongoDB (Atlas или локальная)

## Структура проекта
- `frontend/` — клиентская часть
- `backend/` — серверная часть
- `backend/routes/` — роуты (`user.js`, `post.js`, `index.js`)

## Роутинг API и SPA
Бэкенд настроен так, чтобы корректно работать с SPA:
- все API-эндпоинты находятся под префиксом `/api`
- все не-API запросы возвращают `frontend/build/index.html`

Это позволяет открывать и обновлять URL вроде `/login` и `/posts/:id` без ошибки 404 после сборки фронтенда.
