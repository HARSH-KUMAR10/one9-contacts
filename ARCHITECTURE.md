# Architecture Overview

Complete architecture explanation for One9 Contact application.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT BROWSER                         │
│                  (Desktop/Mobile/Tablet)                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP/HTTPS
                     │ (REST API)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (Svelte/Vite)                    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │          Components (Reusable UI)                  │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐           │    │
│  │  │  Input   │ │ Button   │ │  Table   │           │    │
│  │  └──────────┘ └──────────┘ └──────────┘           │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐           │    │
│  │  │  Modal   │ │  Card    │ │  Alert   │           │    │
│  │  └──────────┘ └──────────┘ └──────────┘           │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Pages (Full Screen Views)                │    │
│  │  ┌──────────────────────────────────────────────┐  │    │
│  │  │          Header / Layout                     │  │    │
│  │  │  ContactList  │  ContactForm  │  ContactAdd  │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │      Stores (Svelte Reactive State)                │    │
│  │  • contacts (array of contacts)                    │    │
│  │  • currentContact (selected contact)               │    │
│  │  • loading (loading state)                         │    │
│  │  • error (error messages)                          │    │
│  │  • success (success messages)                      │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │      Utils (API Client, Helpers)                   │    │
│  │  • apiClient (API calls)                           │    │
│  │  • formatters & validators                         │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │      Styles (Global & Typography)                  │    │
│  │  • Color theme (#222, #ccc, #2962ff)              │    │
│  │  • Font sizes (Big, Medium, Small)                 │    │
│  │  • Responsive design (Mobile-first)                │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────┬────────────────────────────────────────┘
                     │
                     │ JSON over HTTP
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                BACKEND (Node.js/Express)                    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │            Express Server (Port 3000)              │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Middleware (Request Processing)            │    │
│  │  • CORS (Cross-Origin Resource Sharing)            │    │
│  │  • JSON Parser                                     │    │
│  │  • Request Logger                                  │    │
│  │  • Error Handler                                   │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Routes (API Endpoints)                     │    │
│  │  GET    /contacts         (Get all)               │    │
│  │  GET    /contacts/:id     (Get one)               │    │
│  │  POST   /contacts         (Create)                │    │
│  │  PUT    /contacts/:id     (Update)                │    │
│  │  DELETE /contacts/:id     (Delete)                │    │
│  │  GET    /contacts/search  (Search)                │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │      Controllers (Request Handlers)                │    │
│  │  ContactController                                 │    │
│  │  • Validations                                     │    │
│  │  • Response formatting                             │    │
│  │  • Error handling                                  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │      Services (Business Logic)                     │    │
│  │  ContactService                                    │    │
│  │  • Database operations                             │    │
│  │  • Data processing                                 │    │
│  │  • Business rules                                  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │      Utils & Helpers                               │    │
│  │  • validators (email, phone, etc)                  │    │
│  │  • response helpers                                │    │
│  │  • error handlers                                  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │      Logger (Logging System)                       │    │
│  │  • Console output (real-time)                      │    │
│  │  • File logging (persistent)                       │    │
│  │  • Log levels (error, warn, info, debug)           │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────┬────────────────────────────────────────┘
                     │
                     │ Mongoose ODM
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                 DATABASE (MongoDB)                          │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Collections (Tables)                     │    │
│  │  • contacts (contact documents)                    │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Indexes (Query Optimization)             │    │
│  │  • name: 1                                         │    │
│  │  • email: 1                                        │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Authentication Architecture

### OTP-Based Login Flow

The application uses email-based One-Time Password (OTP) for secure authentication.

```
Step 1: Request OTP
┌────────────────────────────────────────┐
│ User enters email                       │
│ Frontend: POST /auth/request-otp        │
│ Backend validates email format          │
│ Generates 6-digit OTP code             │
│ Calls external mail API to send OTP    │
│ Stores OTP in MongoDB (10 min expiry)  │
│ Returns: { success: true, email }      │
└────────────────────────────────────────┘

Step 2: Verify OTP
┌────────────────────────────────────────┐
│ User enters OTP from email             │
│ Frontend: POST /auth/verify-otp         │
│ Backend validates OTP against stored   │
│ Checks: code match, not expired,       │
│   attempts < 5                         │
│ Generates session token                │
│ Clears OTP from database               │
│ Returns: { token, email }              │
└────────────────────────────────────────┘

Step 3: Access Protected Routes
┌────────────────────────────────────────┐
│ Token stored in localStorage           │
│ All API calls include:                 │
│   Authorization: Bearer {token}        │
│ Backend authMiddleware validates       │
│ Allows access to contacts routes       │
│ GET /auth/me returns current user      │
└────────────────────────────────────────┘

Step 4: Logout
┌────────────────────────────────────────┐
│ User clicks logout                     │
│ Frontend: POST /auth/logout             │
│ Frontend clears localStorage           │
│ Shows LoginPage                        │
└────────────────────────────────────────┘
```

### Authentication Data Models

**User Model:**

```
_id: ObjectId
email: String (unique, indexed)
isVerified: Boolean
lastLogin: Date
isActive: Boolean
createdAt: Date
updatedAt: Date
```

**OTP Model:**

```
_id: ObjectId
email: String (indexed)
otp: String (6 digits)
attempts: Number (0-5)
expiresAt: Date (TTL index - auto-delete)
createdAt: Date
```

### Authentication Middleware

**Protected Route Pattern:**

```javascript
// Router
router.get("/protected-endpoint", authMiddleware, controller);

// authMiddleware checks:
// 1. Authorization header OR auth_token cookie
// 2. Validates token format
// 3. Retrieves user from database
// 4. If valid: attaches user to req.user
// 5. If invalid: returns 401 Unauthorized
```

---

## Data Flow

### Create Contact Flow

```
1. User fills form in ContactForm component
   ↓
2. Form submission event triggered
   ↓
3. Frontend calls apiClient.post('/contacts', data)
   ↓
4. HTTP POST request sent to backend
   ↓
5. Express middleware processes request
   ↓
6. ContactController.create() receives request
   ↓
7. Validates input (name, email required)
   ↓
8. ContactService.createContact() saves to MongoDB
   ↓
9. Response sent back with new contact data
   ↓
10. Frontend updates contacts store
   ↓
11. UI re-renders with new contact
```

### Search Contacts Flow

```
1. User types in search box
   ↓
2. Search query captured
   ↓
3. Frontend calls apiClient.get('/contacts/search?q=query')
   ↓
4. HTTP GET with query parameter sent
   ↓
5. Backend routes to search endpoint
   ↓
6. ContactService searches MongoDB with regex
   ↓
7. Returns matching contacts
   ↓
8. Frontend updates contacts store
   ↓
9. UI updates with search results
```

---

## Component Hierarchy

```
App (Root, with auth routing)
│
├─ IF not authenticated:
│  └── LoginPage
│      ├── Input (Email step)
│      ├── Input (OTP step)
│      ├── Button (Request OTP)
│      ├── Button (Verify OTP)
│      └── Button (Resend)
│
├─ IF authenticated:
│  ├── Header (with Logout button)
│  │   ├── Button (Add Contact)
│  │   └── Button (Logout)
│  ├── ContactForm (Modal)
│  │   ├── Input (Name)
│  │   ├── Input (Email)
│  │   ├── Input (Phone)
│  │   ├── Input (Notes)
│  │   └── Button (Save/Cancel)
│  └── ContactList
│      ├── Alert (if error)
│      └── Table
│          └── ContactRow (each)
```

---

## State Management

### Svelte Stores

```javascript
// contacts.js
contacts; // Array of all contacts
currentContact; // Selected contact for editing
loading; // Loading state
error; // Error messages
success; // Success messages

// auth.js
isAuthenticated; // Boolean, logged in or not
user; // User object (email, etc)
token; // Session token
email; // Current user email
```

**Store Pattern:**

```javascript
import { writable } from "svelte/store";

export const contacts = writable([]);
export const auth = writable({
  isAuthenticated: false,
  token: null,
  email: null,
});

// In components:
$contacts; // Subscribe and use
contacts.set([]); // Update store
contacts.update(fn); // Transform store
```

---

## Backend Structure

### Separation of Concerns

| Layer             | Responsibility                                   | Example                                  |
| ----------------- | ------------------------------------------------ | ---------------------------------------- |
| **Routes**        | Define HTTP endpoints                            | GET /contacts, POST /auth/request-otp    |
| **Controllers**   | Handle requests, validate input, format response | Extract data, call service               |
| **Services**      | Business logic, database operations              | Query MongoDB, process data, generateOTP |
| **Models**        | Data schema definition                           | Contact, User, OTP schemas               |
| **Middleware**    | Cross-cutting concerns                           | Logging, error handling, CORS, auth      |
| **Utils/Helpers** | Reusable functions                               | validators, response helpers             |
| **Logger**        | Application logging                              | console + file logs                      |

### Authentication Files

**Routes:**

- `routes/auth.js` - POST /auth/request-otp, POST /auth/verify-otp, POST /auth/logout, GET /auth/me

**Controllers:**

- `controllers/AuthController.js` - Handles OTP request/verification, mail API integration

**Services:**

- `services/AuthService.js` - generateOTP, verifyOTP, generateToken, getCurrentUser, logout

**Models:**

- `models/User.js` - User and OTP database schemas

**Middleware:**

- `middleware/auth.js` - authMiddleware (validates token), optionalAuth

### Example Request Flow

```
HTTP Request
    ↓
Express Middleware (CORS, JSON parsing)
    ↓
Request Logger Middleware
    ↓
Routes (Match /contacts/:id)
    ↓
ContactController (Validate, prepare response)
    ↓
ContactService (Query MongoDB)
    ↓
MongoDB (Return data)
    ↓
ContactService (Process/format data)
    ↓
ContactController (Format response)
    ↓
Response Middleware
    ↓
HTTP Response
```

---

## Frontend Structure

### Component Organization

**Common Components** (Reusable, single-purpose):

- Input - Text/Phone/Email inputs
- Button - Action buttons
- Card - Container with title
- Modal - Popup dialogs
- Table - Data display
- Alert - Messages
- Dropdown - Select lists

**Page Components** (Full screen views):

- Header - App header with navigation
- ContactList - Display all contacts
- ContactForm - Create/Edit form

**Stores** (Reactive state):

- contacts.js - All contact-related state

**Utils** (Helper functions):

- api.js - API client for backend communication

**Styles** (Design system):

- globals.css - Colors, spacing, variables
- typography.css - Font sizes and classes

---

## Database Schema

### Contact Collection

```
{
  _id: ObjectId,
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 234 567 8900",
  notes: "VIP client",
  isActive: true,
  createdAt: ISODate("2026-03-20T10:30:00.000Z"),
  updatedAt: ISODate("2026-03-20T10:30:00.000Z")
}
```

**Indexes:**

- email: unique lookup
- name: display and search
- createdAt: sorting

---

## Authentication & Security (Future)

Current implementation has no authentication. For production:

1. Add JWT tokens
2. Hash passwords with bcrypt
3. Validate CORS origins
4. Rate limiting
5. Input sanitization
6. SQL injection prevention (built-in with Mongoose)

---

## Deployment Architecture

### Development

```
Frontend (Vite Dev Server :5173) ←→ Backend (Node :3000) ←→ MongoDB (Local)
```

### Production

```
Frontend (Built dist/) ←→ Backend (Node :3000) serves static + API ←→ MongoDB (Cloud/Local)
```

Backend uses `express.static()` to serve built frontend files.

---

## Performance Considerations

### Frontend

- Svelte compiles to minimal JS
- CSS scoped to components
- Lazy loading for routes
- Efficient store updates

### Backend

- Database indexes on frequently queried fields
- Response caching (future)
- Pagination support (future)
- Lightweight logging

### Database

- Indexed fields for fast queries
- Soft deletes for data retention
- Timestamps for ordering

---

## Scalability Path

### Current (MVP)

- Single Node.js server
- MongoDB local or Atlas
- Simple in-memory stores

### Phase 2

- Redis for caching
- Pagination/filtering
- Advanced search with Elasticsearch (optional)
- JWT authentication

### Phase 3

- Load balancing
- Database replication
- CDN for static files
- API rate limiting

---

**Last Updated**: March 20, 2026
