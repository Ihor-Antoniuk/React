const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost:27017/WorldCityUser', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());//to allow access to data
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/users', userRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
