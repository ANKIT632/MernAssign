const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');


app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern-crud').then((res) => {console.log('Connected to MongoDB')}).catch((err) => {console.log('Error connecting to MongoDB')});

// Define User schema and model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  address:String 
});

const User = mongoose.model('User', UserSchema);


app.use(express.json());

// Create (POST)
app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
 return res.json(savedUser);
});

// Read (GET)
app.get('/users', async (req, res) => {
  const users = await User.find();
 return res.json(users);
});

// Update (PUT)
app.put('/users/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
 return res.json(updatedUser);
});

// Delete (DELETE)
app.delete('/users/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
 return res.json(deletedUser);
});

// Start server
app.listen(9002, () => console.log('Server started on port 9002'));