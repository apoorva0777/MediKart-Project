const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Configure CORS with regex-based origin check
app.use(cors({
  origin: function(origin, callback) {
    console.log(`🔎 CORS request from origin: ${origin}`);
    
    // Allow requests with no origin (e.g., server-to-server, curl)
    if (!origin) return callback(null, true);

    const allowedProduction = /^https:\/\/medikart-project(\-[\w\d]+)?\.vercel\.app$/; // main + previews
    const localhostPattern = /^http:\/\/localhost:5173$/;                              // local dev

    if (allowedProduction.test(origin) || localhostPattern.test(origin)) {
      return callback(null, true);
    }

    console.error(`❌ CORS blocked request from origin: ${origin}`);
    return callback(new Error('CORS policy does not allow access from the specified origin.'), false);
  },
  credentials: true, // Allow cookies/auth headers if needed
}));

// Middleware
app.use(express.json());

// Routes
const cartRoutes = require('./routes/cartRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/cart', cartRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('✅ MediKart Backend is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
