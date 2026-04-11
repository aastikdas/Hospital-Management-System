# Hospital Management System 2

Full-stack hospital management platform with:
- Patient-facing web app (booking appointments, sending messages)
- Admin dashboard (manage doctors, appointments, and messages)
- Node.js + Express backend API with MongoDB

## Tech Stack

- Backend: Node.js, Express, MongoDB (Mongoose), JWT, Cloudinary
- Frontend: React + Vite + Axios
- Dashboard: React + Vite + Axios

## Project Structure

```text
.
|- backend/     # API server
|- frontend/    # Patient/client app
|- dashboard/   # Admin dashboard
`- Readme.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB connection string
- Cloudinary account (for doctor avatar upload)

## 1) Clone and Install

```bash
git clone <your-repo-url>
cd "Hospital Management System 2"

cd backend && npm install
cd ../frontend && npm install
cd ../dashboard && npm install
```

## 2) Environment Variables

Create these files:
- `backend/.env`
- `frontend/.env`
- `dashboard/.env`

### backend/.env

Important: keep these variable names exactly as written (some are intentionally misspelled because the code expects those exact keys).

```env
PORT=8000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<dbName>

FRONTEND_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:5174

JWT_SECRECT_KEY=your_jwt_secret
JWT_EXPRIRES=7d
COOKIE_EXPIRES=7

COULDINARY_CLOUD_NAME=your_cloud_name
COULDINAR_API_KEY=your_api_key
COULDINAR_API_SECRET=your_api_secret
```

### frontend/.env

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### dashboard/.env

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## 3) Run the Apps (3 Terminals)

Terminal 1 (Backend):

```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):

```bash
cd frontend
npm run dev
```

Terminal 3 (Dashboard):

```bash
cd dashboard
npm run dev
```

Default local URLs:
- Backend API: http://localhost:8000
- Frontend: shown by Vite (usually http://localhost:5173)
- Dashboard: shown by Vite (usually http://localhost:5174 if 5173 is already used)

## API Route Overview

Base URL: `/api/v1`

### User Routes
- `POST /user/patient/register`
- `POST /user/login`
- `POST /user/admin/addnew` (admin auth)
- `POST /user/doctor/adddoctor` (admin auth)
- `GET /user/doctors`
- `GET /user/admin/me` (admin auth)
- `GET /user/patient/me` (patient auth)
- `GET /user/admin/logout` (admin auth)
- `GET /user/patient/logout` (patient auth)

### Appointment Routes
- `POST /appointment/post` (patient auth)
- `GET /appointment/all` (admin auth)
- `PUT /appointment/update/:id` (admin auth)
- `DELETE /appointment/delete/:id` (admin auth)

### Message Routes
- `POST /message/send`
- `GET /message/allmessages` (admin auth)

## Available Scripts

### backend
- `npm run dev` - start with nodemon
- `npm start` - start with node

### frontend
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

### dashboard
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Common Issues

- CORS error:
	- Verify `FRONTEND_URL` and `DASHBOARD_URL` match the actual Vite URLs.
- 401/Authentication issues:
	- Ensure backend is running and cookies are enabled (`withCredentials: true` is already configured in axios).
- Mongo connection failure:
	- Recheck `MONGO_URI` and database network access.
- Doctor image upload fails:
	- Recheck Cloudinary credentials and exact env key spellings.

## Git Workflow (Suggested)

```bash
git checkout -b feature/<short-name>
git add .
git commit -m "feat: <what you changed>"
git push -u origin feature/<short-name>
```

Then open a Pull Request to `main`.