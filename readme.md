# Project Setup and Configuration

This repository contains the setup for both the backend and frontend applications, which are built using different technologies and stacks. Below is a step-by-step guide for running the MySQL database container, configuring the environment variables, and setting up both the backend and frontend components.

## Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (for backend)
- [PNPM](https://pnpm.io/) / [Yarn](https://yarnpkg.com/) / [NPM](https://www.npmjs.com/) (for package management)
- [MySQL 8.x](https://dev.mysql.com/downloads/mysql/)

## Running MySQL Container

### Run MySQL Container

To start the MySQL container, use the following command:

```bash
docker run -d \
 --name mysql \
 -e MYSQL_ROOT_PASSWORD=password \
 -e MYSQL_DATABASE=myapp \
 -p 3306:3306 \
 mysql:8
```

This command will:

- Run a detached MySQL container with the name `mysql`.
- Set the root password as `password`.
- Create a database named `myapp`.
- Map port `3306` on your local machine to the container's port.

### Check if Container is Running

To ensure the MySQL container is running, use:

```bash
docker ps
```

### Check MySQL Logs

If you need to troubleshoot, check the logs of the MySQL container with:

```bash
docker logs mysql
```

## Backend Configuration

The backend is built using the following technologies:

- **NestJS** (Backend framework)
- **Drizzle** (ORM)
- **MySQL** (Database)
- **SWAGGER** (API Documentation)
- **JWT (JSON Web Token)** (Authentication)
- **Axios** (HTTP client)
- **TypeORM** (ORM)
- **Class-Transformer & Class-Validator** (Data transformation & validation)
- **Date-Fns** (Date manipulation)
- **PDF-LIB** (PDF generation)
- **Qrcode** (QR code generation)

### Backend `.env` Configuration

Create a `.env` file in your backend project directory and add the following environment variables:

```env
# Application Configuration
PORT=3300

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=myapp
DB_PORT=3306

# JWT Configuration
JWT_SECRET=d149dddf3273706fa2f40ace27b108de21b61b29fd2755f7c070b03ceb82beef
JWT_TOKEN_AUDIENCE=localhost:5173
JWT_TOKEN_ISSUER=localhost:5173
JWT_ACCESS_TOKEN_TTL=3600
JWT_REFRESH_TOKEN_TTL=86400
```

### Backend Setup

Install the backend dependencies:

```bash
pnpm install
# or
yarn install
# or
npm install
```

Start the backend server:

```bash
pnpm stard:dev
```

The backend should now be accessible at [http://localhost:3300](http://localhost:3300).

## Frontend Configuration

The frontend is built using the following technologies:

- **React.js (Vite)** (Frontend framework)
- **TanStack Query** (Data fetching)
- **TailwindCSS** (Styling)
- **Shadcn** (UI components)
- **Axios** (HTTP client)
- **Zod** (Validation)
- **Sonner** (Notifications)
- **Js-Cookie** (Cookie management)

### Frontend `.env` Configuration

Create a `.env` file in your frontend project directory and add the following environment variable:

```env
VITE_API_ENDPOINT=http://localhost:3300/api
```

This points to your backend API for API calls.

### Frontend Setup

Install the frontend dependencies:

```bash
pnpm install
# or
yarn install
# or
npm install
```

Start the frontend development server:

```bash
pnpm run dev
```

The frontend should now be accessible at [http://localhost:5173](http://localhost:5173).

## Database Migrations and Seeding

The backend project uses Drizzle ORM for database schema management and migrations. Below are the available scripts for generating migrations, applying them, and seeding the database with initial data.

### Generate Migrations

This script generates database migrations based on your schema definitions using drizzle-kit.

```bash
pnpm run generate # or yarn generate or npm run generate
```

### Apply Migrations

This script applies the generated migrations to the database.

```bash
pnpm run migrate # or yarn migrate or npm run migrate
```

### Seed Database

This script seeds the database with initial data.

```bash
pnpm run seed # or yarn seed or npm run seed
```

### 4. Drizzle Studio

Drizzle Studio is a visual database tool that allows you to explore and modify your database schema. It provides a user-friendly interface for managing your database schema, including creating tables, columns, and relationships.

```bash
pnpm run studio # or yarn studio or npm run studio
```

## Swagger Documentation

Swagger is a documentation generation tool that allows you to document your API endpoints. It provides a user-friendly interface for generating documentation from your API endpoints.

The swagger endpoint is available at [http://localhost:3300/api/docs](http://localhost:3300/api/docs).

## Sceenshots

#### Home Page

![Frontend: Homepage](https://raw.githubusercontent.com/heymmusttech/markoub-pos/refs/heads/main/screenshots/screencapture-localhost-5173-2025-02-25-20_25_48.png)

#### SignIn Page

![Frontend: SignIn](https://raw.githubusercontent.com/heymmusttech/markoub-pos/refs/heads/main/screenshots/screencapture-localhost-5173-login-2025-02-25-20_26_05.png)

#### SEARH TRIPS PAGE

![Frontend: Search Trip (Vendor)](https://raw.githubusercontent.com/heymmusttech/markoub-pos/refs/heads/main/screenshots/screencapture-localhost-5173-vendor-search-2025-02-25-20_26_31.png)

#### BOOKING TICKETS (SEAT)

![Frontend: Booking Ticket {seat} (Vendor)](https://raw.githubusercontent.com/heymmusttech/markoub-pos/refs/heads/main/screenshots/screencapture-localhost-5173-vendor-booking-8-2025-02-25-20_28_56.png)

#### CONFIRM BOOKED TICKET

![Frontend: Confirm Sale (Vendor)](https://raw.githubusercontent.com/heymmusttech/markoub-pos/refs/heads/main/screenshots/screencapture-localhost-5173-vendor-checkout-11-2025-02-25-20_29_03.png)

#### GENERATE PDF TICKET DOANLOAD/PRINT

![Frontend: Download/Print Ticket (Vendor)](https://raw.githubusercontent.com/heymmusttech/markoub-pos/refs/heads/main/screenshots/screencapture-localhost-5173-vendor-checkout-11-2025-02-25-20_29_11.png)

#### VIEW PAST SOLD TIKCETS

![Frontend: Past Sales {tickets} (Vendor)](https://raw.githubusercontent.com/heymmusttech/markoub-pos/refs/heads/main/screenshots/screencapture-localhost-5173-vendor-sold-tickets-2025-02-25-20_30_15.png)

#### SALES RECORDS OVERVIEW

![Frontend: Sales Records (Admin)](https://raw.githubusercontent.com/heymmusttech/markoub-pos/refs/heads/main/screenshots/screencapture-localhost-5173-dashboard-2025-02-25-20_30_32.png)

#### TRIPS LIST

![Frontend: Strips List (Admin)](https://raw.githubusercontent.com/heymmusttech/markoub-pos/refs/heads/main/screenshots/screencapture-localhost-5173-dashboard-trips-2025-02-25-20_30_39.png)

#### ADD/CREATE TRIP

![Frontend: Add Trip (Admin)](https://raw.githubusercontent.com/heymmusttech/markoub-pos/refs/heads/main/screenshots/screencapture-localhost-5173-dashboard-trips-add-2025-02-25-20_31_21.png)
