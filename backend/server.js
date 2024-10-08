const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');

const placeRoutes = require('./routes/placeRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const pdfRoutes = require('./routes/pdfRoutes'); 

connectDB();  

const app = express();

app.use(cors({
  allowedOrigins: ['https://github.com/prernamittal/voygr', 'http://github.com/prernamittal/voygr']
}));  
app.use(express.json());  

// Routes
app.use('/api/places', placeRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api', pdfRoutes);  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
