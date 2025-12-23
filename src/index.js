const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connection");

dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ success: true, message: "API is running!" });
});

// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/users', require('./routes/users.routes'));
// app.use('/api/analytics', require('./routes/analytics.routes'));

// app.use(require('./middleware/error.middleware'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
