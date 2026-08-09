# Northstar Ops — Mini ERP + CRM

A role-aware operations portal for a wholesale/distribution company. It covers customer CRM, inventory and stock movements, and a sales-challan workflow that automatically deducts stock on confirmation.

## Stack and architecture

- **Client:** React, TypeScript, Vite, responsive CSS
- **API:** Node.js, Express 5, TypeScript, Zod validation, JWT bearer authentication
- **Database design:** PostgreSQL schema in [`server/database/schema.sql`](server/database/schema.sql); a Docker Compose service is included.
- **Current demo storage:** seeded in-memory data, so the submission can be run immediately without database credentials. PostgreSQL migrations document the production data model and transaction boundaries required for persistence.

The API owns business rules. In production, challan confirmation should run in one database transaction: lock selected product rows, verify stock, insert snapshot rows and movements, decrement inventory, then commit. The demo API mirrors those checks atomically in its process state.

## Run locally

Prerequisites: Node 20+ (Docker is optional).

```bash
# terminal 1
cd server
cp .env.example .env
npm install
npm run dev

# terminal 2
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal (normally `http://localhost:5173`). The UI calls `http://localhost:4000` by default; set `VITE_API_URL` if the API is hosted elsewhere.

To start PostgreSQL and load the schema:

```bash
docker compose up -d postgres
```

Set `DATABASE_URL=postgresql://erp:erp@localhost:5432/mini_erp` in `server/.env` when connecting the persistence layer.

## Demo credentials

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@acme.test` | `admin123` |
| Sales | `sales@acme.test` | `sales123` |
| Warehouse | `warehouse@acme.test` | `warehouse123` |
| Accounts | `accounts@acme.test` | `accounts123` |

## API

Import [`postman_collection.json`](postman_collection.json) into Postman. Main routes are `POST /auth/login`, `POST /auth/register`, `GET/POST/PUT /customers`, `GET /customers/:id`, `POST /customers/:id/follow-ups`, `GET/POST/PUT /products`, `GET/POST /stock/movements`, and `GET/POST /challans` with `GET /challans/:id`, `PATCH /challans/:id/confirm`, and `PATCH /challans/:id/cancel`.

Customer lists accept `search`, `page`, and `limit` query parameters and return `{ data, pagination }`. Registration validates the name, email, role, and an 8+ character password, stores a bcrypt hash, and returns a JWT plus a safe user profile.

All protected routes require `Authorization: Bearer <token>`. The API returns `400` for bad input, `401` for missing/invalid authentication, `403` for role violations, `404` for missing records, `409` for duplicate SKUs, and `422` when a stock deduction would go negative.

## Deployment

Build the client with `npm run build` and host `client/dist` on Vercel, Netlify, or Render Static Sites. Deploy the Express service as a Render/Railway web service with `npm run start`, set `JWT_SECRET`, `PORT`, `VITE_API_URL`, and `DATABASE_URL` as platform secrets, and provision PostgreSQL through Neon/Supabase/Render. Restrict CORS to the frontend origin in production and rotate JWT secrets per environment.

## Known limitations

- Persistence wiring is intentionally represented by the supplied PostgreSQL schema; this evaluation demo resets seeded data when the API restarts.
- PDF invoice export, images/S3, audit logs, and automated test coverage are natural next steps.
