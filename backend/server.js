const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todos-db';


app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);


mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Connection error', err));


app.use('/todos', todoRoutes);
app.use('/auth', authRoutes);


app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ message: 'Internal server error', error: error.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`To-Do app server with MongoDB listening at http://localhost:${PORT}`);
});