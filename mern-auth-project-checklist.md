# MERN Advanced Authentication Project Checklist

This checklist guides you through building a secure, full-stack authentication system using the MERN stack (MongoDB, Express.js, React, Node.js). The project includes user signup, login, email verification, password reset, and a protected dashboard, with a focus on security and user experience. Each item includes a detailed description to help you implement the functionality from scratch.

## Project Overview

**Objective:** Create a secure authentication system with a responsive frontend and robust backend.

**Tech Stack:**
- **MongoDB:** Store user data and authentication tokens.
- **Express.js:** Handle API routes for authentication and user management.
- **React:** Build a user-friendly interface for signup, login, email verification, and more.
- **Node.js:** Manage server-side logic and email services.
- **Additional Tools:** JWT for authentication, bcrypt for password hashing, Mailtrap (or similar) for email services, Tailwind CSS (optional) for styling.

## Backend Setup

### 1. Initialize Node.js Project

**Task:** Set up a Node.js project.

**Description:** Create a new directory for your project, initialize a Node.js project with npm init -y, and install essential dependencies.

**Dependencies:**
- express: For building RESTful APIs.
- mongoose: For MongoDB object modeling.
- jsonwebtoken: For JWT-based authentication.
- bcryptjs: For password hashing.
- nodemailer: For sending emails (or use a service like Mailtrap).
- dotenv: For environment variable management.

**Implementation:**
- Run npm init -y to create package.json.
- Install dependencies: npm install express mongoose jsonwebtoken bcryptjs nodemailer dotenv.
- Create a project structure with folders like server/, routes/, models/, and controllers/.

**Output:** A package.json file and installed dependencies.

### 2. Configure Environment Variables

**Task:** Set up a .env file for sensitive configurations.

**Description:** Store sensitive data like MongoDB URI, JWT secret, and email service credentials securely.

**Implementation:**
- Create a .env file in the project root.
- Add variables:
  - MONGO_URI: Your MongoDB connection string (e.g., from MongoDB Atlas).
  - PORT: Server port (e.g., 5000).
  - JWT_SECRET: A random string for signing JWT tokens.
  - NODE_ENV: Set to development or production.
  - MAIL_SERVICE_TOKEN: Token for email service (e.g., Mailtrap token).
  - MAIL_SERVICE_ENDPOINT: Email service API endpoint (e.g., https://send.api.mailtrap.io/).
  - CLIENT_URL: Frontend URL (e.g., http://localhost:5173).
- Use dotenv to load these variables in your Node.js app.

**Output:** A .env file and code to load environment variables (e.g., require('dotenv').config() in server.js).

### 3. Set Up MongoDB Database

**Task:** Connect to MongoDB and create a user schema.

**Description:** Establish a connection to a MongoDB database and define a user model with fields for authentication.

**Implementation:**
- Create a models/User.js file.
- Define a Mongoose schema with fields:
  - email: String, required, unique, validated as an email.
  - password: String, required, hashed using bcrypt.
  - isVerified: Boolean, default false, for email verification status.
  - verificationToken: String, for email verification.
  - resetPasswordToken: String, for password reset.
  - resetPasswordExpires: Date, for token expiration.
- Connect to MongoDB in server.js using mongoose.connect(process.env.MONGO_URI).

**Output:** A User model and a connected MongoDB database.

### 4. Create Express Server

**Task:** Set up an Express server with middleware.

**Description:** Build the backend server to handle API requests and responses.

**Implementation:**
- Create server.js and initialize Express.
- Add middleware:
  - express.json(): Parse JSON request bodies.
  - cors: Enable CORS for frontend communication.
  - Custom error handling middleware for consistent error responses.
- Set up a basic route (e.g., GET /api/health to check server status).
- Start the server on the specified port (e.g., 5000).

**Output:** A running Express server accessible at http://localhost:5000.

## Backend Routes and Controllers

### 5. Signup Endpoint

**Task:** Create a POST /api/auth/signup endpoint.

**Description:** Allow users to register with an email and password, generating a verification token and sending a verification email.

**Implementation:**
- Create routes/auth.js and controllers/authController.js.
- Validate request body (email, password).
- Check if the email already exists in the database.
- Hash the password using bcryptjs.
- Generate a unique verification token (e.g., using crypto.randomBytes).
- Save the user to MongoDB with isVerified: false and verificationToken.
- Send a verification email with a link (e.g., ${process.env.CLIENT_URL}/verify-email?token=token).
- Return a success message and user ID.

**Output:** A functional signup endpoint that saves a user and sends a verification email.

### 6. Email Verification Endpoint

**Task:** Create a GET /api/auth/verify-email endpoint.

**Description:** Verify a user's email using a token sent in the verification email.

**Implementation:**
- Extract the verification token from the query parameter.
- Find the user by verificationToken in the database.
- If found, set isVerified: true and clear verificationToken.
- Return a success message or error if the token is invalid/expired.

**Output:** An endpoint that verifies a user's email and updates their status.

### 7. Login Endpoint

**Task:** Create a POST /api/auth/login endpoint.

**Description:** Authenticate users with email and password, issuing a JWT token upon successful login.

**Implementation:**
- Validate request body (email, password).
- Find the user by email and check if isVerified: true.
- Compare the provided password with the hashed password using bcryptjs.
- If valid, generate a JWT token with jsonwebtoken (e.g., jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' })).
- Return the JWT token and user details (e.g., email, ID).

**Output:** A login endpoint that returns a JWT token for authenticated users.

### 8. Forgot Password Endpoint

**Task:** Create a POST /api/auth/forgot-password endpoint.

**Description:** Allow users to request a password reset by sending a reset link to their email.

**Implementation:**
- Validate the email in the request body.
- Find the user by email.
- Generate a reset token and expiration time (e.g., 1 hour from now).
- Save resetPasswordToken and resetPasswordExpires to the user.
- Send a reset email with a link (e.g., ${process.env.CLIENT_URL}/reset-password?token=token).
- Return a success message.

**Output:** An endpoint that sends a password reset email.

### 9. Reset Password Endpoint

**Task:** Create a POST /api/auth/reset-password endpoint.

**Description:** Allow users to reset their password using a token.

**Implementation:**
- Extract the reset token and new password from the request body.
- Find the user by resetPasswordToken and check if resetPasswordExpires is valid.
- Hash the new password and update the user's password.
- Clear resetPasswordToken and resetPasswordExpires.
- Return a success message.

**Output:** An endpoint that resets a user's password securely.

### 10. Check Auth Endpoint

**Task:** Create a GET /api/auth/check-auth endpoint.

**Description:** Verify if a user is authenticated using their JWT token.

**Implementation:**
- Create middleware to verify JWT tokens (e.g., jwt.verify(token, JWT_SECRET)).
- Extract the token from the Authorization header (Bearer token).
- If valid, return user details (e.g., email, ID); otherwise, return an error.

**Output:** A protected endpoint to check authentication status.

### 11. Logout Endpoint

**Task:** Create a POST /api/auth/logout endpoint.

**Description:** Invalidate the user's session (client-side token handling).

**Implementation:**
- Since JWT is stateless, inform the client to remove the token.
- Return a success message.

**Output:** An endpoint that signals the client to clear the JWT token.

### 12. Email Service Integration

**Task:** Set up an email service for verification and password reset emails.

**Description:** Use a service like Mailtrap or Nodemailer to send emails with dynamic templates.

**Implementation:**
- Configure Nodemailer with your email service credentials (e.g., Mailtrap SMTP or API).
- Create reusable email templates for:
  - Welcome email (sent on signup).
  - Verification email (with verification link).
  - Password reset email (with reset link).
- Use HTML templates with placeholders for dynamic data (e.g., user's name, token).
- Test email sending in development using Mailtrap.

**Output:** A functioning email service for sending verification and reset emails.

## Frontend Setup

### 13. Initialize React Project

**Task:** Set up a React project with Vite or Create React App.

**Description:** Create a frontend application to interact with the backend APIs.

**Implementation:**
- Run npm create vite@latest or npx create-react-app to initialize the project.
- Install dependencies:
  - axios: For API requests.
  - react-router-dom: For client-side routing.
  - tailwindcss (optional): For styling.
- Set up a project structure with folders like src/pages/, src/components/, and src/utils/.

**Output:** A running React app accessible at http://localhost:5173.

### 14. Signup Page UI

**Task:** Create a signup page with a form.

**Description:** Build a responsive form for users to enter their email and password.

**Components:**
- Input: A reusable input field component with validation feedback.
- PasswordStrengthMeter: A component to display password strength (e.g., weak, medium, strong).
- LoadingSpinner: A spinner for form submission states.

**Implementation:**
- Create src/pages/SignupPage.jsx.
- Design a form with email and password fields.
- Add client-side validation (e.g., email format, password length).
- Use Tailwind CSS or custom styles for responsiveness.
- Handle form submission with axios to call the signup endpoint.

**Output:** A signup page that submits data to the backend.

### 15. Login Page UI

**Task:** Create a login page with a form.

**Description:** Build a form for users to log in with their email and password.

**Components:**
- Reuse Input and LoadingSpinner components.

**Implementation:**
- Create src/pages/LoginPage.jsx.
- Design a form with email and password fields.
- Add a "Forgot Password" link.
- Handle form submission with axios to call the login endpoint.
- Store the JWT token in localStorage or cookies.

**Output:** A login page that authenticates users and stores tokens.

### 16. Email Verification Page UI

**Task:** Create a page to handle email verification.

**Description:** Display a message or form for users to verify their email via a token.

**Components:**
- LoadingSpinner: For loading states during verification.

**Implementation:**
- Create src/pages/EmailVerificationPage.jsx.
- Extract the verification token from the URL query (e.g., using useSearchParams from react-router-dom).
- Call the verify-email endpoint with axios.
- Display success or error messages.

**Output:** A page that verifies emails and redirects users.

### 17. Forgot Password Page UI

**Task:** Create a page for password reset requests.

**Description:** Allow users to enter their email to receive a password reset link.

**Components:**
- Reuse Input and LoadingSpinner components.

**Implementation:**
- Create src/pages/ForgotPasswordPage.jsx.
- Design a form with an email field.
- Call the forgot-password endpoint with axios.
- Show a success message upon email submission.

**Output:** A page for initiating password resets.

### 18. Reset Password Page UI

**Task:** Create a page to reset passwords.

**Description:** Allow users to enter a new password using a reset token.

**Components:**
- Reuse Input, PasswordStrengthMeter, and LoadingSpinner components.

**Implementation:**
- Create src/pages/ResetPasswordPage.jsx.
- Extract the reset token from the URL query.
- Design a form with password and confirm password fields.
- Call the reset-password endpoint with axios.
- Display success or error messages.

**Output:** A page for resetting passwords securely.

### 19. Dashboard Page UI

**Task:** Create a protected dashboard page.

**Description:** Display a welcome message and user details for authenticated users.

**Components:**
- FloatingShape: A decorative component for visual appeal (optional).

**Implementation:**
- Create src/pages/DashboardPage.jsx.
- Check authentication status using the check-auth endpoint.
- Redirect unauthenticated users to the login page.
- Display user details (e.g., email) and a logout button.

**Output:** A protected dashboard accessible only to authenticated users.

### 20. Route Protection

**Task:** Protect frontend routes for authenticated users.

**Description:** Ensure only authenticated users can access certain pages (e.g., dashboard).

**Implementation:**
- Create a ProtectedRoute component using react-router-dom.
- Check for a valid JWT token in localStorage or cookies.
- Call the check-auth endpoint to verify token validity.
- Redirect to the login page if authentication fails.

**Output:** Protected routes that restrict access to authenticated users.

## Deployment

### 21. Backend Deployment

**Task:** Deploy the backend to a platform like Heroku, Render, or Vercel.

**Description:** Make the backend APIs accessible online.

**Implementation:**
- Update NODE_ENV to production in .env.
- Configure the platform to use your MongoDB URI and other environment variables.
- Build the backend with npm run build (if applicable).
- Deploy using the platform's CLI or Git integration.

**Output:** A deployed backend with accessible API endpoints.

### 22. Frontend Deployment

**Task:** Deploy the frontend to a platform like Vercel or Netlify.

**Description:** Host the React app online for user access.

**Implementation:**
- Build the frontend with npm run build.
- Configure the platform to use the build output (dist/ or build/).
- Set environment variables for API URLs (e.g., backend URL).
- Deploy using the platform's CLI or Git integration.

**Output:** A deployed React app accessible via a public URL.

## Additional Features

### 23. Password Strength Validation

**Task:** Implement password strength validation on signup and reset password.

**Description:** Provide visual feedback on password strength to enhance security.

**Implementation:**
- In PasswordStrengthMeter, calculate strength based on criteria (e.g., length, uppercase, numbers, special characters).
- Display a progress bar or text (e.g., "Weak", "Medium", "Strong").
- Enforce minimum requirements on the backend (e.g., 8 characters, mixed case).

**Output:** A password strength meter that guides users to create secure passwords.

### 24. Responsive Design

**Task:** Ensure the frontend is responsive across devices.

**Description:** Make the UI adaptable to desktops, tablets, and mobile devices.

**Implementation:**
- Use Tailwind CSS or media queries for responsive layouts.
- Test the UI on different screen sizes using browser developer tools.
- Ensure forms and buttons are touch-friendly for mobile users.

**Output:** A responsive frontend that works on all devices.

## Testing and Validation

### 25. Test Endpoints

**Task:** Test all backend endpoints using Postman or a similar tool.

**Description:** Verify that each API endpoint works as expected.

**Implementation:**
- Test signup, login, email verification, forgot password, reset password, and check-auth endpoints.
- Check edge cases (e.g., invalid email, expired token).
- Validate response status codes and messages.

**Output:** A fully tested backend API.

### 26. Test Frontend Functionality

**Task:** Test all frontend pages and components.

**Description:** Ensure the UI interacts correctly with the backend.

**Implementation:**
- Test form submissions (signup, login, forgot password, reset password).
- Verify route protection and redirects.
- Check email verification flow and dashboard access.

**Output:** A fully functional frontend integrated with the backend.

## Final Steps

### 27. Documentation

**Task:** Document the project in a README.md file.

**Description:** Provide instructions for setting up and running the project.

**Implementation:**
- Describe the project, tech stack, and features.
- Include setup instructions (e.g., .env configuration, npm run commands).
- Add a link to a demo (if deployed) and screenshots.

**Output:** A comprehensive README.md file.

### 28. Code Review and Optimization

**Task:** Review and optimize the codebase.

**Description:** Ensure the code is clean, modular, and efficient.

**Implementation:**
- Refactor repetitive code into reusable functions/components.
- Add comments to explain complex logic.
- Optimize database queries and API responses.

**Output:** A clean and maintainable codebase.

## Notes

- **Security:** Always hash passwords, validate inputs, and use HTTPS in production.
- **Scalability:** Design the database schema to handle future features (e.g., user profiles).
- **Learning Goals:** Focus on understanding JWT, email integration, and route protection.
- **Originality:** Customize the UI design, add unique features (e.g., two-factor authentication), or modify the email templates to make the project your own.