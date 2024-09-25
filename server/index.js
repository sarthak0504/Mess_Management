// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { config } = require('dotenv');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./db');

const app = express();
app.use(cors());


config();

app.use(bodyParser.json({ limit: '50mb' }));

// Increase the limit for URL-encoded requests
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


mongoose.connect('mongodb+srv://baxidaksh2004:dyJ7ahVnmgpOSV8M@cluster1.ifj4u.mongodb.net/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


app.use(cookieParser())

// Routes
app.get("/", (req,res)=>{
  res.json("Welcome to the mess backend");
});



// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});