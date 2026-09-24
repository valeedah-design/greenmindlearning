# Green Mind Learning

Marketing website and content admin for Green Mind Learning, an e-learning platform teaching sustainability and ESG skills through simulation-based training.

## Stack

- **Frontend** — React (Create React App + CRACO), Tailwind CSS, Radix UI/shadcn components, React Router. Includes the public marketing site and an authenticated `/admin` panel for managing content.
- **Backend** — FastAPI (Python), running as async serverless functions.
- **Database** — MongoDB (via Motor), hosted on MongoDB Atlas.
- **File storage** — Vercel Blob, for admin-uploaded images (course thumbnails, carousel images, trusted-by logos).
- **Hosting** — Vercel, deployed as two separate services (frontend and backend) per the root `vercel.json`.

## Repository layout

```
frontend/   React app — public site + admin panel (frontend/src/admin)
backend/    FastAPI app — routers, models, auth, MongoDB access
vercel.json Monorepo service config: routes /api/* to the backend, everything else to the frontend
```

## Local development

**Frontend**
```
cd frontend
yarn install
yarn start
```
Requires a `.env` in `frontend/` with `REACT_APP_BACKEND_URL` pointing at a running backend.

**Backend**
```
cd backend
pip install -r requirements.txt
uvicorn server:app --reload
```
Requires a `.env` in `backend/` with `MONGO_URL`, `DB_NAME`, `JWT_SECRET`, and `CORS_ORIGINS`.

## Deployment

The frontend and backend are deployed as two separate Vercel projects, both pointed at this same repository (Root Directory set to `frontend/` and `backend/` respectively). Key backend environment variables: `MONGO_URL`, `DB_NAME`, `JWT_SECRET`, `CORS_ORIGINS`, `RECOVERY_CODE` (admin password recovery), and `BLOB_READ_WRITE_TOKEN` (added automatically when a Vercel Blob store is connected to the backend project).

## Admin panel

Available at `/admin` on the live site. Manages Learning Materials, Industry Insights, Testimonials, Trusted-by logos, and Pricing FAQ content, all of which the public pages fetch from the backend API. Admin accounts support password recovery via a shared recovery code (see `RECOVERY_CODE` above).
