# 🚗 Car Shop

A full-stack web application for listing and purchasing cars.

The application allows sellers to publish cars for sale and buyers to purchase them. It includes authentication, car listings, and a simple purchase workflow.

The project consists of:

- **Django REST backend**
- **React + TypeScript frontend**
- **PostgreSQL database**
- **Playwright E2E testing**
- **Dockerized development environment**

---

## 🚀 Features

- Create and list cars for sale
- Purchase cars
- Car status management (`available` / `sold`)
- Clean REST API
- Seller authentication using **JWT**
- Form validation using **Zod**
- Automated **unit tests + integration tests + E2E tests**
- Database **seed data on first migration**
- Fully **dockerized setup**

---

## ⚙️ Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- PostgreSQL
- SimpleJWT authentication

### Frontend
- React
- TypeScript
- Vite
- React Hook Form
- Material UI
- Zod schema validation

### Testing
- Django unit and integration tests
- Frontend schema tests
- Playwright E2E tests

### Infrastructure
- Docker
- Docker Compose

---

## 📖 Setup Guide

### 🐳 Running the Full Stack with Docker

#### Prerequisites

Install:

- **Docker**
- **Docker Compose**

#### 1️⃣ Clone the repository

```sh
git clone https://github.com/dmozhaev/car-shop.git
cd car-shop
```

#### 2️⃣ Start everything
```sh
docker-compose up --build
```
Services started:

| Service       | Port           |
| ------------- |:-------------:|
| frontend     | 5173 |
| backend   | 8000 |
| postgres | internal |

Application will be available at:
```sh
http://localhost:5173
```

### 🖥️ Running Locally (Backend + Frontend without Docker)

#### Prerequisites

Install:

- **Python 3.12+**
- **Node.js 20+**
- **PostgreSQL** (optional if using Docker DB)

Mac/Linux users should use:

- python3
- pip3

---

#### 1️⃣ Clone the repository

```sh
git clone https://github.com/dmozhaev/car-shop.git
cd car-shop
```

#### 2️⃣ Start database (Docker)

If you want only database in Docker:

```sh
docker-compose -f docker-compose.db.yml up -d
```

PostgreSQL will run on:

```sh
localhost:5433
```

#### 3️⃣ Backend setup

```sh
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Run migrations:
```sh
python manage.py migrate
```

Start server:
```sh
python manage.py runserver
```
Backend runs on:
```sh
http://localhost:8000
```

#### 4️⃣ Frontend setup
```sh
cd frontend
npm install
npm run dev
```
Frontend runs on:
```sh
http://localhost:5173
```

## 🧪 Running Tests

### Backend tests (unit and integration)

Make sure backend is up and running before executing the integration tests.
```sh
cd backend
python manage.py test
```

### Frontend schema tests

Frontend form validation schemas are tested separately.
```sh
cd frontend
npm run test
```

### Playwright E2E tests
Headless mode: 
```sh
cd e2e
npx playwright test
```
Run with UI:
```sh
npx playwright test:ui
```
Tests cover following areas:

- user login
- car creation
- car listing
- car purchase

### 🗄️ Database Seeding

On first migration the project automatically seeds the database with:

- 10 car manufacturers
- 1 default seller (username: seller@test.com / password: StrongPass123!)
- 20 random cars

This allows developers to start the project with sample data immediately.

### 🔑 Authentication

Authentication uses JWT tokens.

Login endpoint:
```sh
POST /api/login
```
Example request:
```sh
{
"email": "seller@test.com",
"password": "password"
}
```
Response:
```sh
{
"access": "jwt-token"
}
```
Use token in requests:
```sh
Authorization: Bearer <token>
```

## 📡 API Overview

Base URL:

http://localhost:8000/api

Example endpoints:

| Method | Endpoint           | Description  |
|--------|:-------------:| -----:|
| GET    | /carlist | List available cars |
| POST   | /cars      |   Create car listing |
| GET    | /cars/{id}     |   Get car details |
| POST   | /cars/{id}/buy      |   Purchase car |
| POST   | /login      |   Login seller |

## 📜 License
This project is licensed under the MIT License.

## 👤 Author
Dmitry Mozhaev
