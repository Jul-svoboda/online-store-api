# Online Store Platform (Full-Stack Application)

Full-stack e-commerce platform with authentication, product management, and admin dashboard.

The system includes role-based access (currently unified as ADMIN for demonstration purposes), REST API backend, and reactive frontend state management using MobX.

## Tech Stack

### Frontend
- React
- MobX (state management)
- Axios
- JavaScript

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- bcrypt

## Live Demo

Frontend:

[Live](https://online-store-api-frontend.onrender.com/) | [GitHub](https://github.com/Jul-svoboda/online-store-api-frontend.git)

Backend API:

[Live](https://online-store-api-n0ix.onrender.com) | [GitHub](https://github.com/Jul-svoboda/online-store-api.git)

## Architecture

- MVC-style backend architecture
- All Sequelize models and relationships are defined in a single module
- Business logic is handled within controllers
- No dedicated service layer (logic is centralized in controllers)
- Frontend handles all rendering and UI state using MobX

## Role System

- Currently, all users are assigned ADMIN role by default
- This is an intentional design decision for demonstration purposes to showcase admin panel functionality

Future improvement:
- Separation of USER and ADMIN roles
- Access control per role

## Features

- User registration and authentication
- Admin dashboard for full CRUD operations
- Product catalog with filtering and pagination
- Brand and category (type) management
- File upload support for product images
- REST API integration
- Image upload and storage via Cloudinary (external cloud storage)

## Media Storage

Product images are stored using Cloudinary cloud storage.

- Images are uploaded via backend using express-fileupload
- Stored externally instead of local filesystem
- Prevents data loss on server restarts (stateless backend)

## API Documentation

### Auth
POST /api/user/registration  
POST /api/user/login  

### Items
GET /api/item  
POST /api/item (admin)  

### Types
GET /api/type  

### Brands
GET /api/brand  

### Example Request

POST /api/user/registration

Body:
{
  "email": "test@mail.com",
  "password": "123456"
}

## In Development

- Shopping cart system
- Product rating system
- Role-based access control (USER / ADMIN separation)

## Deployment

- Backend: hosted on [Render](https://render.com/): https://online-store-api-n0ix.onrender.com
- Frontend: deployed as static site [Render](https://render.com/): https://online-store-api-frontend.onrender.com/
- Database: PostgreSQL instance on  [Render](https://render.com/)
