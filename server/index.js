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
const managerStatusRoutes = require('./routes/status');
const inventoryRoutes = require('./routes/inventory');
// const viewCartRoutes = require('./routes/viewCart');
const registeredMessRoutes = require('./routes/RegisteredMess');
const allMessRoutes = require('./routes/allMess');
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
const dbURI =  process.env.MONGO_URI ||  'mongodb+srv://baxidaksh2004:dyJ7ahVnmgpOSV8M@cluster1.ifj4u.mongodb.net/mess_management'; // Use env variable or fallback
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
app.use('/api/status', managerStatusRoutes);
app.use('/api/inventory', inventoryRoutes);
// app.use('/api/cart', viewCartRoutes);
app.use('/api/mess', registeredMessRoutes);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
