const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());


const bookRoutes = require('./routes/Bookroutes');
app.use('/books', bookRoutes);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB connected successfully'))
  .catch(err => console.error(' MongoDB connection failed:', err.message));


app.get('/', (req, res) => {
  res.send(' Welcome to the Book Store API!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
