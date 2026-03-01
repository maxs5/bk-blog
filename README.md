# BK Blog

Fullstack SPA blog project:
- `frontend` - React client
- `backend` - Express + MongoDB API

## Stack
- Frontend: React, Redux, React Router, styled-components
- Backend: Node.js, Express, Mongoose, JWT (cookie auth)
- DB: MongoDB (Atlas or local)

## Project Structure
- `frontend/` - client app
- `backend/` - API server
- `backend/routes/` - route modules (`user.js`, `post.js`, `index.js`)

## API + SPA Routing
Backend is configured for SPA fallback and API prefix:
- all API endpoints are under `/api`
- non-API routes return `frontend/build/index.html`

This allows direct refresh/open for routes like `/login`, `/posts/:id` after production build.

## Environment Variables (backend/.env)
Example:

```env
DB_CONNECTION_STRING=mongodb://127.0.0.1:27017/bk-blog
DB_CONNECTION_STRING_ATLAS=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/bk-blog?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_long_secret
```

Notes:
- app tries Atlas first (if configured), then falls back to local MongoDB
- `.env` is ignored by git

## Local Development

### 1) Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2) Start backend

```bash
cd backend
npm run dev
```

Backend default: `http://localhost:3001`

### 3) Start frontend

```bash
cd frontend
npm start
```

Frontend default: `http://localhost:3000`

Frontend proxy is configured to backend in `frontend/package.json`.

## Production Build + Backend Serve

```bash
cd frontend
npm run build

cd ../backend
npm run dev
```

Backend serves static files from `frontend/build` and handles SPA fallback routes.

## Common Troubleshooting
- `Invalid token` on public pages: check auth middleware scope in user routes.
- Atlas DNS errors (`querySrv ENODATA`): verify copied cluster host, DNS settings, and Atlas network access.
- `EADDRINUSE` on `3001`: stop previous node process using this port.

## Security Note
If DB credentials were exposed during setup, rotate MongoDB user password in Atlas immediately.
