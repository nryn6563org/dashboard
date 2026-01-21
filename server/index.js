require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const widgetRoutes = require('./routes/widgets');
app.use('/api/widgets', widgetRoutes);

app.get('/', (req, res) => {
  res.send('Dashboard API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
