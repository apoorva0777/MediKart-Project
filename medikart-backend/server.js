const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();

// CORS setup — allow only your frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
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
