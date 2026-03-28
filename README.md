# One9 Contact - Mobile-First Contact Management App

A lightweight, mobile-first contact management application built with **Svelte** (frontend) and **Node.js/Express** (backend) with **MongoDB** database.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Authentication](#-authentication)
- [API Documentation](#-api-documentation)
- [Frontend Design System](#frontend-design-system)
- [Development Workflow](#development-workflow)
- [Project Status](#project-status)
- [Validation Report](#validation-report)

---

## ✨ Features

- ✅ **Email-based OTP Authentication** - Secure login with one-time password
- ✅ Mobile-first responsive design
- ✅ Minimalistic UI with 3-color theme
- ✅ Create, Read, Update, Delete (CRUD) contacts
- ✅ Search functionality
- ✅ Token-based session management
- ✅ Protected API routes (authentication required)
- ✅ Component-based Svelte architecture
- ✅ RESTful API with clean code structure
- ✅ MongoDB with Mongoose
- ✅ Lightweight logging system
- ✅ Error handling & validation
- ✅ Fast performance optimization

---

## 🛠 Tech Stack

### Frontend

- **Svelte 4** - Reactive UI framework
- **Vite** - Fast build tool and dev server
- **CSS3** - Vanilla CSS with CSS variables
- **Svelte Stores** - State management

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Cookie Parser** - Cookie parsing middleware
- **node-fetch** - HTTP client for external APIs

### Authentication & Security

- **Email-based OTP** - One-Time Password login
- **Token-based Sessions** - JWT-like token system
- **Protected Routes** - Authentication middleware
- **External Mail API** - Secure OTP delivery

### Tools

- **dotenv** - Environment variable management
- **Nodemon** - Auto-restart development server

---

## 📁 Project Structure

```
one9-contact/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Reusable UI components
│   │   │   │   ├── Input.svelte
│   │   │   │   ├── Button.svelte
│   │   │   │   ├── Card.svelte
│   │   │   │   ├── Modal.svelte
│   │   │   │   ├── Table.svelte
│   │   │   │   ├── Alert.svelte
│   │   │   │   └── Dropdown.svelte
│   │   │   └── pages/           # Page components
│   │   │       ├── Header.svelte
│   │   │       ├── LoginPage.svelte      # Email-OTP login
│   │   │       ├── ContactList.svelte
│   │   │       └── ContactForm.svelte
│   │   ├── stores/              # Svelte stores
│   │   │   ├── contacts.js      # Contact state management
│   │   │   └── auth.js          # Authentication state
│   │   ├── styles/              # Global styles
│   │   │   ├── globals.css
│   │   │   └── typography.css
│   │   ├── utils/               # Utility functions
│   │   │   └── api.js
│   │   ├── App.svelte
│   │   └── main.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── svelte.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   │   └── constants.js
│   │   ├── controllers/         # Request handlers
│   │   │   ├── AuthController.js        # Authentication logic
│   │   │   └── ContactController.js
│   │   ├── services/            # Business logic
│   │   │   ├── AuthService.js          # Auth service layer
│   │   │   └── ContactService.js
│   │   ├── models/              # Mongoose schemas
│   │   │   ├── User.js                 # User & OTP schemas
│   │   │   └── Contact.js
│   │   ├── routes/              # API routes
│   │   │   ├── auth.js                 # Auth endpoints
│   │   │   └── contacts.js
│   │   ├── middleware/          # Custom middleware
│   │   │   ├── auth.js                 # Authentication middleware
│   │   │   ├── errorHandler.js
│   │   │   └── requestLogger.js
│   │   ├── logger/              # Logging system
│   │   │   └── index.js
│   │   ├── utils/               # Utility functions
│   │   │   └── validators.js
│   │   ├── helpers/             # Helper functions
│   │   │   └── response.js
│   │   └── server.js            # Application entry point
│   ├── package.json
│   └── .env.example
│
├── .gitignore
├── .env.example
├── package.json
├── PLANNING.md
└── README.md
```

---

## 📦 Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher (comes with Node.js)
- **MongoDB**: v4.0 or higher (local or Atlas)

---

## 🚀 Installation

### 1. Clone or Initialize Project

```bash
cd one9-contact
```

### 2. Install Dependencies

```bash
npm run install:all
```

This command will:

- Install backend (Node.js/Express) dependencies
- Install frontend (Svelte/Vite) dependencies with proper version resolution
- Setup the entire project automatically

**Note:** Installation uses `--legacy-peer-deps` internally to resolve Vite 5 compatibility. This is safe and doesn't affect functionality.

### 3. Setup Environment Variables

```bash
# Create .env file from example (root directory)
cp .env.example .env

# Create frontend .env (if needed)
# cp frontend/.env.example frontend/.env
```

---

## ⚙️ Configuration

### Environment Variables (`.env`)

```env
# Database
MONGODB_URI=mongodb://localhost:27017/one9-contact
DB_NAME=one9-contact

# Server
NODE_ENV=development
PORT=3000
HOST=localhost

# CORS
CORS_ORIGIN=http://localhost:5173

# API
API_PREFIX=/api/v1

# Logging
LOG_LEVEL=info
```

**Available LOG_LEVELS**: `error`, `warn`, `info`, `debug`

### Database Setup

#### Option 1: Local MongoDB

```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
# Windows: mongod.exe in MongoDB installation folder
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

#### Option 2: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get connection string
3. Update `MONGODB_URI` in `.env`

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/one9-contact
```

---

## ▶️ Running the Application

### Available npm Scripts

```bash
npm run dev              # Start backend server only (port 3000)
npm run dev:frontend    # Start frontend dev server with HMR (port 5173)
npm run build:frontend  # Build frontend for production (outputs to frontend/dist)
npm run build           # Alias for build:frontend
npm run serve           # Build frontend and serve everything from backend (port 3000)
npm start               # Alias for serve (production-like mode)
```

### Development Mode

For active development with hot module reloading:

```bash
# Terminal 1 - Start Backend (port 3000)
npm run dev

# Terminal 2 - Start Frontend Dev Server (port 5173)
npm run dev:frontend
```

**URLs:**

- Frontend: `http://localhost:5173` (with hot reload on file changes)
- Backend API: `http://localhost:3000`

### Production Build & Serve

To build and run like production:

```bash
npm run serve
# or
npm start
```

This will:

1. Build the Svelte frontend to `frontend/dist`
2. Start the backend server which serves the built frontend
3. Open your app on `http://localhost:3000`

**Note:** Backend automatically serves the built frontend from the `frontend/dist` directory and handles SPA routing.

---

## � Authentication

The application uses **Email-based OTP (One-Time Password)** authentication for secure login.

### How It Works

1. User enters their email address on the login screen
2. System sends a 6-digit OTP code to their email
3. User enters the OTP code to verify and login
4. Backend returns a session token for authenticated requests
5. Contacts can only be accessed by authenticated users

### Authentication Flow

```
Login Page (Email Input)
    ↓
POST /auth/request-otp
    ↓ [Email verification code sent]
Login Page (OTP Input)
    ↓
POST /auth/verify-otp
    ↓ [Token returned]
Main App (Contacts accessible)
    ↓
All requests include Authorization header with token
    ↓
POST /auth/logout [Optional]
```

### OTP Details

- **Code Length**: 6 digits
- **Expiration**: 10 minutes
- **Max Attempts**: 5 failed verification attempts
- **Auto-Delete**: OTP is automatically deleted from database after expiration
- **Mail Service**: Integrated with external OTP delivery API

### Environment Setup for Authentication

Update your `.env` file with mail service credentials:

```env
# Mail API Configuration
MAIL_API_URL=https://one9-mail-v2.onrender.com/api/v1
MAIL_API_KEY=your_api_key_here
```

---

## 📡 API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Request OTP

```http
POST /auth/request-otp
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response (Email Sent Successfully):**

```json
{
  "success": true,
  "message": "OTP sent successfully",
  "data": {
    "email": "user@example.com",
    "expiresIn": 600,
    "emailSent": true
  }
}
```

**Response (Email Failed):**

```json
{
  "success": true,
  "message": "OTP generated but email delivery failed",
  "data": {
    "email": "user@example.com",
    "expiresIn": 600,
    "emailSent": false,
    "warning": "We couldn't send the email. Please check the email address and try again."
  }
}
```

**Notes:**
- OTP is generated regardless of email delivery status
- `emailSent` flag indicates whether the email was successfully delivered
- `warning` field provides user guidance when email delivery fails
- Frontend should display the warning to the user
- User can still proceed to OTP entry or resend

#### Verify OTP

```http
POST /auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "email": "user@example.com"
  }
}
```

#### Get Current User

```http
GET /auth/me
Authorization: Bearer {token}
```

**Response:**

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "isVerified": true,
    "lastLogin": "2026-03-20T10:30:00.000Z"
  }
}
```

#### Logout

```http
POST /auth/logout
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Contact Endpoints

#### Get All Contacts

```http
GET /contacts
```

**Response:**

```json
{
  "success": true,
  "message": "Contacts retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1 234 567 8900",
      "notes": "VIP client",
      "isActive": true,
      "createdAt": "2026-03-20T10:30:00.000Z",
      "updatedAt": "2026-03-20T10:30:00.000Z"
    }
  ]
}
```

#### Get Contact by ID

```http
GET /contacts/:id
```

#### Create Contact

```http
POST /contacts
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1 987 654 3210",
  "notes": "Potential client"
}
```

#### Update Contact

```http
PUT /contacts/:id
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "+1 987 654 3210",
  "notes": "Confirmed client"
}
```

#### Delete Contact (Soft Delete)

```http
DELETE /contacts/:id
```

#### Search Contacts

```http
GET /contacts/search?q=john
```

**Response:** Array of matching contacts

---

## 🎨 Frontend Design System

### Color Palette

- **Black**: `#222` - Primary background
- **White**: `#ccc` - Primary text
- **Blue**: `#2962ff` - Accent color

### Typography

```css
/* Defined in globals.css */
--font-big: 1.5rem;
--font-medium: 1rem;
--font-small: 0.875rem;
```

**Font Family**: Verdana

### Components

#### Input Component

```svelte
<Input
  label="Name"
  type="text"
  name="name"
  bind:value={inputValue}
  placeholder="Enter name"
  required={true}
/>
```

#### Button Component

```svelte
<Button
  text="Click Me"
  onClick={handleClick}
  disabled={false}
  className="custom-class"
/>
```

#### Card Component

```svelte
<Card title="Card Title">
  <p>Card content goes here</p>
</Card>
```

#### Modal Component

```svelte
<Modal
  show={isOpen}
  title="Modal Title"
  onClose={handleClose}
>
  <p>Modal content</p>
</Modal>
```

#### Table Component

```svelte
<Table
  items={dataArray}
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ]}
  onRowClick={handleRowClick}
/>
```

#### Alert Component

```svelte
<Alert
  message="This is a message"
  type="info|success|warning|error"
/>
```

---

## 💻 Development Workflow

### Code Organization

**Backend:**

- **Services**: Pure business logic
- **Controllers**: Route handlers, validation, response formatting
- **Routes**: Route definitions and HTTP methods
- **Models**: Database schemas
- **Middleware**: Request/response processing
- **Utils/Helpers**: Reusable utility functions

**Frontend:**

- **Components**: Reusable UI elements
- **Pages**: Full page components
- **Stores**: Svelte reactive stores
- **Utils**: Helper functions and API client
- **Styles**: CSS with CSS variables

### Adding a New Feature

#### Backend

1. Create model in `backend/src/models/`
2. Create service in `backend/src/services/`
3. Create controller in `backend/src/controllers/`
4. Create routes in `backend/src/routes/`
5. Update `backend/src/server.js` to include routes

#### Frontend

1. Create components in `backend/src/components/`
2. Create store if needed in `backend/src/stores/`
3. Create page in `backend/src/components/pages/`
4. Update `App.svelte` to include page

### Logging

```javascript
import { logger } from "./logger/index.js";

logger.info("Info message");
logger.warn("Warning message");
logger.error("Error message", { key: "value" });
logger.debug("Debug message");
logger.http("GET", "/api/contacts", 200, 45); // method, url, status, duration
```

### Building & Deployment

```bash
# Build frontend
npm run build:frontend

# Start production server
npm run start
```

---

## 📊 Project Status

### Completed

- ✅ Project planning and structure
- ✅ Backend setup (Express, MongoDB, Mongoose)
- ✅ API endpoints (CRUD operations)
- ✅ Frontend setup (Svelte, Vite)
- ✅ Reusable components
- ✅ Logging system
- ✅ Error handling
- ✅ Styling system
- ✅ State management
- ✅ **Email-based OTP Authentication**
- ✅ **Protected API routes**
- ✅ **Token-based session management**

### TODO

- [ ] Form validation enhancements
- [ ] Pagination for contact list
- [ ] Advanced search filters
- [ ] Bulk operations
- [ ] Export/Import functionality
- [ ] Unit & integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

---

## ✅ Validation Report

A comprehensive validation report verifying all components is available:

📄 **[VALIDATION_REPORT.md](VALIDATION_REPORT.md)**

This document includes:

- ✅ Complete feature checklist
- ✅ Security validation results
- ✅ Build & deployment testing
- ✅ Performance metrics
- ✅ Functional testing results
- ✅ Code quality summary
- ✅ Deployment readiness assessment

**Quick Summary**: All systems are operational and production-ready. ✨

---

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit PR with description

## 📝 License

ISC

---

## 📞 Support

For issues or questions, please refer to the PLANNING.md for architecture details.

---

**Last Updated**: March 20, 2026
