# 🔐 Authentication System

Authentication backend and client implementing user lifecycle management, token-based sessions, email-driven verification, and role-safe protected access across the application.

##  Features

- 🔒 **Secure Authentication** - JWT-based authentication with HTTP-only cookies
- ✉️ **Email Verification** - 6-digit OTP verification system
- 🔑 **Password Reset** - Secure password reset via email link
- 🛡️ **Protected Routes** - Client-side route protection
- 📱 **Responsive Design** - Mobile-friendly interface with Tailwind CSS
- 🔐 **Password Strength Meter** - Real-time password strength validation

## 🚀 Tech Stack

### Frontend

- **React 19** 
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Resend** - Email service

## 📋 Prerequisites

- Node.js (v20.19.0 or higher)
- MongoDB database
- Resend API key for email functionality

## ⚙️ Installation

### Clone the repository
```bash
git clone https://github.com/Rohit025005/Auth-api.git
cd Auth-api
```

### Install backend dependencies
```bash
npm install
```

### Install frontend dependencies
```bash
cd frontend
npm install
cd ..
```

### Set up environment variables

Create a `.env` file in the root directory:
```env
# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Email Service
RESEND_API_TOKEN=your_resend_api_token

# Server Configuration
PORT=5500
NODE_ENV=development

# Client URL
CLIENT_URL=http://localhost:5173

```

##  Running the Application


Start the backend server:
```bash
npm start
```

Server runs on `http://localhost:5500`

Start the frontend development server:
```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`



## 📁 Project Structure
```
Auth-api/
├── backend/
│   ├── config/
│   │   └── env.js              # Environment configuration
│   ├── controller/
│   │   └── authController.js   # Authentication logic
│   ├── db/
│   │   └── db.js              # Database connection
│   ├── mailTrap/
│   │   ├── emails.js          # Email sending functions
│   │   ├── emailTemplate.js   # Email templates
│   │   └── mailTrapConfig.js  # Email service config
│   ├── middleware/
│   │   └── verifyToken.js     # JWT verification
│   ├── models/
│   │   └── userModel.js       # User schema
│   ├── route/
│   │   └── authRoute.js       # API routes
│   └── utils/
│       └── generateTokenAndSetCookies.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FloatingShape.jsx
│   │   │   ├── Input.jsx
│   │   │   └── passwordStrengthMeter.jsx
│   │   ├── pages/
│   │   │   ├── DashBoardPage.jsx
│   │   │   ├── emailVerificationPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   ├── logInPage.jsx
│   │   │   ├── ResetPasswordpage.jsx
│   │   │   └── signUpPage.jsx
│   │   ├── store/
│   │   │   └── authStore.js   # Zustand store
│   │   ├── utils/
│   │   │   └── date.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── server.js
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication Routes

- `POST /api/auth/sign-up` - Register new user
- `POST /api/auth/verify-email` - Verify email with OTP
- `POST /api/auth/log-in` - User login
- `POST /api/auth/log-out` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/check-auth` - Check authentication status

## 🔐 Security Features

- Password hashing with bcrypt
- JWT tokens stored in HTTP-only cookies
- CORS configuration
- Token expiration (1 day for JWT, 1 hour for reset tokens)
- Email verification required
- Password strength validation
- Protected API routes

## 📧 Email Templates

The system includes pre-built email templates for:

- Email verification (6-digit OTP)
- Welcome email
- Password reset request
- Password reset confirmation

## 🛣️ Route Protection

The application implements route protection:

- **Protected Routes** - Require authentication and email verification
- **Redirect Authenticated Users** - Logged-in users are redirected from auth pages

