const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add a user
router.post('/', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// Delete a user
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

router.post('/login', async (req, res) => {
  const { name, pass } = req.body;
  try {
    const user = await User.findOne({ name, pass });
    if (user) {
      res.json({ success: true, city: user.city, name: user.name });
    } else {
//      res.status(401).json({ success: false, message: 'Invalid credentials' });
	res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router;
