const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/project');

const app = express();

// Connect to Database
connectDB();

// CORS Configuration
const allowedOrigins = [
  'https://ravibhushan.vercel.app',
  'https://www.ravibhushan.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ========== API ROUTES (MUST BE BEFORE STATIC FILES) ==========
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// ========== SERVE REACT FRONTEND ==========
// Serve static files from React build folder
const distPath = path.join(__dirname, '../portfolio_frontend/dist');
app.use(express.static(distPath));

// Fallback route for client-side routing
// This must be AFTER API routes and static files
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error Handler (at the very end)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend served from: ${distPath}`);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});
