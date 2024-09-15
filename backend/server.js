const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');

const placeRoutes = require('./routes/placeRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');

connectDB();  // Connect to MongoDB

const app = express();

app.use(cors());  // Enable CORS
app.use(express.json());  // Middleware to parse JSON requests

// Routes
app.use('/api/places', placeRoutes);
app.use('/api/itinerary', itineraryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
