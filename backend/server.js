const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/contacts', require('./routes/contactRoutes'));
app.use('/api/v1/interactions', require('./routes/interactionRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
