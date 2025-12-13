const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// CORS Configuration
const corsOptions = {
  origin: "https://faculty-development-program-workshop-inx0.onrender.com",
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/records', require('./routes/records'));
app.use('/api/projects', require('./routes/projects')); // ADD THIS LINE

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'FDP & Workshop Management API',
    version: '1.0.0',
    endpoints: {
      records: '/api/records',
      stats: '/api/records/stats/summary',
      projects: '/api/projects'  // ADD THIS
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}`);
  console.log(`🌐 Accepting requests from: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});
