# Quick Start Guide

Get the One9 Contact app running in 5 minutes!

## Prerequisites

- Node.js v16+
- MongoDB (local or Atlas)
- npm v7+

## 1. Setup Environment

```bash
# Create .env file
cp .env.example .env

# Edit .env with your MongoDB connection
# For local: MONGODB_URI=mongodb://localhost:27017/one9-contact
# For Atlas: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/one9-contact

# Add mail API credentials for authentication
# MAIL_API_URL=https://one9-mail-v2.onrender.com/api/v1
# MAIL_API_KEY=your_api_key_here
```

## 2. Install Dependencies

```bash
npm run install:all
```

This will:

- Install backend dependencies
- Install frontend dependencies with proper version resolution (using --legacy-peer-deps)
- Resolve the Vite 5 / Svelte plugin compatibility automatically

## 3. Start Development

**Option A: Separate Terminals (Hot Module Reload)**

```bash
# Terminal 1 - Backend on port 3000
npm run dev

# Terminal 2 - Frontend on port 5173 (with HMR)
npm run dev:frontend
```

**Option B: Build & Serve (Production-like)**

```bash
# Build frontend and serve with backend
npm run serve
# or
npm start
```

## 4. Access the App

### Development Mode

- **Frontend**: http://localhost:5173 (with hot reload)
- **Backend API**: http://localhost:3000/api/v1

### Production Mode

- **App**: http://localhost:3000 (frontend served from backend)
- **Backend API**: http://localhost:3000/api/v1

## 5. Login to the App

1. Enter your email address on the login screen
2. Check your email for the 6-digit OTP code
3. Enter the OTP to verify and login
4. Access your contacts

## Production Build

```bash
npm run build        # Build frontend only
npm start            # Build + serve with backend
npm run serve        # Build + serve (same as start)
```

Access at: http://localhost:3000

---

## Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

→ Start MongoDB: `mongod` or use MongoDB Atlas connection string

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3000
```

→ Change PORT in `.env` or kill process: `lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill`

### Dependencies Not Installing

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install && cd frontend && npm install
```

### Frontend Not Connecting to Backend

→ Check CORS_ORIGIN in `.env` matches frontend URL

---

## Next Steps

1. Review the [README.md](README.md) for full documentation
2. Check [PLANNING.md](PLANNING.md) for architecture overview
3. Create your first contact!
