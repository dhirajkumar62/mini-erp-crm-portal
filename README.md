Mini ERP + CRM Operations Portal

A full-stack Mini ERP + CRM Operations Portal for a wholesale/distribution company. The system is designed for internal teams such as Admin, Sales, Warehouse, and Accounts to manage customers, products, inventory, stock movements, and sales challans.

📌 Project Overview

This project is developed as part of the Full Stack Developer Case Study.

The objective is to demonstrate:

Full-stack application development

REST API development

PostgreSQL database design

JWT-based authentication

Role-based access control

Customer CRM management

Product and inventory management

Sales challan workflow

Validation and error handling

Responsive React UI

Deployment and documentation

🛠️ Technology Stack

Frontend

React

TypeScript / JavaScript

HTML

CSS

Responsive UI

Backend

Node.js

TypeScript

Express.js

REST APIs

JWT Authentication

Database

PostgreSQL

Prisma ORM

Deployment

Frontend: Vercel

Backend: Render

Database: Neon PostgreSQL

✨ Core Modules

1. Authentication & Roles

The application supports four required roles:

Admin

Sales

Warehouse

Accounts

JWT-based authentication is used for login and protected API access. Role-based access is enforced on the backend.

2. Customer CRM

Customer fields:

Customer name

Mobile number

Email

Business name

GST number (optional)

Customer type: Retail / Wholesale / Distributor

Address

Status: Lead / Active / Inactive

Follow-up date

Notes

Features:

Add customer

Edit customer

Search customer

View customer details

Add follow-up notes

3. Product & Inventory

Product fields:

Product name

SKU/code

Category

Unit price

Current stock

Minimum stock alert quantity

Location/warehouse

Every stock movement records:

Product

Quantity changed

Movement type: IN or OUT

Reason

Created by

Timestamp

4. Sales Challans

The sales challan workflow allows a Sales user to:

Select a customer

Add multiple products

Enter quantities

Generate a challan number automatically

Save as Draft

Confirm the challan

Statuses:

DRAFT

CONFIRMED

CANCELLED

Important business rules:

Confirming a challan reduces stock.

Stock must never become negative.

Insufficient stock returns a proper API error.

Draft challans do not reduce stock.

Challan items store product snapshot data, not only the product ID.

🏗️ Architecture

React Frontend
      │
      │ HTTPS REST API
      ▼
Node.js + Express + TypeScript
      │
      │ Prisma
      ▼
Neon PostgreSQL

Production:

React → Vercel
          ↓
Express API → Render
          ↓
PostgreSQL → Neon

The React frontend does not connect directly to PostgreSQL.

📁 Project Structure

mini-erp-crm-portal/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── utils/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── lib/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
│
├── postman/
│   └── mini-erp-crm.postman_collection.json
│
├── README.md
└── .gitignore

🔐 Role-Based Dashboards

Role

Main Focus

Admin

Overall operations, customers, products, inventory, challans

Sales

Customers, CRM follow-ups, sales challans

Warehouse

Products, stock, inventory movements

Accounts

Sales/challan operational visibility

The case study requires the four roles and role-based access; the separate dashboard layouts are an implementation choice.

🔌 REST API

Authentication

POST /api/auth/login

Customers

GET    /api/customers
POST   /api/customers
GET    /api/customers/:id
PUT    /api/customers/:id
POST   /api/customers/:id/follow-ups

Products

GET    /api/products
POST   /api/products
PUT    /api/products/:id

Inventory

GET    /api/stock/movements
POST   /api/stock/movements

Sales Challans

GET    /api/challans
POST   /api/challans
GET    /api/challans/:id
PATCH  /api/challans/:id/confirm
PATCH  /api/challans/:id/cancel

APIs should include validation, proper HTTP status codes, error messages, and search/filtering or pagination where needed.

🗄️ Database

Main entities:

User
Customer
FollowUp
Product
StockMovement
Challan
ChallanItem

Relationships:

User → Challan
User → StockMovement
User → FollowUp

Customer → FollowUp
Customer → Challan

Product → StockMovement
Product → ChallanItem

Challan → ChallanItem

⚙️ Environment Variables

Backend

Create backend/.env:

PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

Do not commit .env to GitHub.

Create .env.example:

PORT=
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=
NODE_ENV=

Frontend

For Vite:

VITE_API_URL=http://localhost:5000

Production:

VITE_API_URL=https://your-backend.onrender.com

🚀 Local Development

Prerequisites

Node.js

npm

Git

A local PostgreSQL installation is not required when using a hosted PostgreSQL database such as Neon.

1. Clone

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd mini-erp-crm-portal

2. Backend

cd backend
npm install

Create .env, then run:

npx prisma migrate dev
npx prisma generate
npm run dev

3. Frontend

Open another terminal:

cd frontend
npm install
npm run dev

☁️ Deployment

Frontend — Vercel

Deploy the frontend directory.

Set:

VITE_API_URL=https://your-backend.onrender.com

Backend — Render

Deploy the backend directory as a Web Service.

Set:

DATABASE_URL=your_neon_postgresql_connection_string
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production

Database — Neon

The PostgreSQL connection string is stored only in the backend environment variables.

React → Render API → Neon PostgreSQL

🧪 Testing Checklist

Authentication

Valid login

Invalid login

JWT-protected routes

Role-based access

Customers

Add customer

Edit customer

Search customer

View customer details

Add follow-up note

Products

Add product

Edit product

Search/filter products

Inventory

Stock IN

Stock OUT

Movement history

Low-stock alert

Challans

Create Draft challan

Add multiple products

Confirm challan

Cancel challan

Automatic challan number

Verify stock reduction

Test insufficient stock

Prevent negative stock

📮 Postman

Include the Postman collection at:

postman/mini-erp-crm.postman_collection.json

Recommended flow:

Login
  ↓
Create Customer
  ↓
Create Product
  ↓
Stock IN
  ↓
Create Draft Challan
  ↓
Confirm Challan
  ↓
Verify Stock Reduction
  ↓
Test Insufficient Stock
  ↓
View Stock Movements

🔑 Test Credentials

Replace these placeholders before submission:

Role

Email

Password

Admin

<ADMIN_EMAIL>

<ADMIN_PASSWORD>

Sales

<SALES_EMAIL>

<SALES_PASSWORD>

Warehouse

<WAREHOUSE_EMAIL>

<WAREHOUSE_PASSWORD>

Accounts

<ACCOUNTS_EMAIL>

<ACCOUNTS_PASSWORD>

Do not commit real production passwords or secrets.

🌐 Live URLs

Frontend

https://your-frontend.vercel.app

Backend

https://your-backend.onrender.com

GitHub

https://github.com/<USERNAME>/mini-erp-crm-portal

📸 Screen Recording

The case study requires a screen recording demonstrating how the solution was approached and completed.

Recommended flow:

Explain the problem and architecture.

Show the project structure.

Show the database/schema.

Run the application.

Login with a test role.

Create a customer.

Add a follow-up.

Create a product.

Add stock.

Create a sales challan.

Add multiple products.

Confirm the challan.

Show stock reduction.

Demonstrate the insufficient-stock error.

Show Postman API testing.

Show deployed application.

📋 Submission Checklist

GitHub repository link

Live frontend URL

Live backend API URL

Test login credentials for all roles

Postman collection / API documentation

README with setup and deployment instructions

Architecture explanation

Known limitations / incomplete parts

Screen recording

Google Form submission

🎁 Optional Bonus Features

The case study identifies these as bonus features:

Docker setup

GitHub Actions deployment

Export invoice as PDF

Upload product image to AWS S3

AWS deployment

Complete mandatory requirements before working on bonus features.

⚠️ Known Limitations

Document any incomplete or intentionally simplified functionality here before submission.

Examples:

Advanced accounting workflows are outside the mandatory scope.

Advanced analytics may be limited.

Additional permissions can be added in future versions.

Bonus features may not be implemented if time is limited.

👨‍💻 Author

Dhiraj Kumar

Full Stack Developer

📄 Case Study Reference

This project follows the requirements provided in the Full Stack Developer Case Study — Mini ERP + CRM Operations Portal.
