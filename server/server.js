const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/WorldCityUser', {
//mongoose.connect('mongodb://localhost:27017/WorldCityUser', { //-- localhost is not supported by some versions of node.js or MongoDB
//mongoose.connect('mongodb://mongo:27017/WorldCityUser', {     // this is version for docker container mongo
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
