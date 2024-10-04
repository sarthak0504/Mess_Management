// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
const userRoute = require('./routes/userRoute'); // Ensure this path is correct
const managerRoute = require('./routes/managerRoute'); // Ensure this path is correct
const messStatusRoutes = require('./routes/messStatusRoutes');
// Initialize express app
const app = express();

// Load environment variables from .env file
config();

// Middleware setup
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Connect to MongoDB
const dbURI = 'mongodb+srv://baxidaksh2004:dyJ7ahVnmgpOSV8M@cluster1.ifj4u.mongodb.net'; // Use env variable or fallback
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Default route
app.get("/", (req, res) => {
  res.json("Welcome to the mess backend");
});

// Register routes
app.use('/api/user', userRoute);
app.use('/api/manager', managerRoute);
app.use('/api/messStatus', messStatusRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
