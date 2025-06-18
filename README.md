# MediKart - A Full-Stack Pharmacy Web App

MediKart is a full-stack web application for online medicine shopping. It provides users with a seamless experience to browse, add to cart, and purchase medicines. The application includes user authentication, cart management, and payment integration.


## 🧪 Demo Video

<video src="https://github.com/user-attachments/assets/a7d2c71a-ffd6-485c-88e0-239ad1c43453" controls width="600"></video>


## Features

- User registration and authentication
- Browse and search medicines
- Add medicines to cart and manage cart items
- Secure checkout and payment processing
- Responsive and user-friendly React frontend
- RESTful API backend with Express and MongoDB

## Tech Stack

- **Frontend:** React, React Router, Context API, Vite, CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Razorpay
- **Other:** bcryptjs for password hashing, dotenv for environment variables, CORS enabled

## Installation

### Backend

1. Navigate to the backend directory:
   ```bash
   cd medikart-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `medikart-backend` directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   > Note: You may need to add a `dev` script in `package.json` to run `nodemon server.js` for development.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd medikart-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173` (default Vite port)

## Folder Structure

```
medikart-backend/
├── config/           # Database configuration
├── controllers/      # Route controllers for business logic
├── middleware/       # Express middleware (e.g., auth)
├── models/           # Mongoose models (User, Medicine, Cart)
├── routes/           # Express route definitions
├── scripts/          # Utility scripts (e.g., registerUser)
├── server.js         # Backend server entry point
├── package.json      # Backend dependencies and scripts
medikart-frontend/
├── src/
│   ├── assets/       # Images and icons
│   ├── components/   # React components and pages
│   ├── context/      # React context providers (Auth, Cart, Theme)
│   ├── App.jsx       # Main React component
│   ├── main.jsx      # React entry point
│   ├── index.css     # Global styles
├── vite.config.js    # Vite configuration
├── package.json      # Frontend dependencies and scripts
```

## API Endpoints (Backend)

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/medicines` - Get list of medicines
- `GET /api/medicines/:id` - Get medicine details
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get user cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item
- `POST /api/payment` - Process payment

## Environment Variables

- `MONGO_URI` - MongoDB connection string
- `PORT` - Backend server port (default 5000)
- `JWT_SECRET` - Secret key for JWT authentication

