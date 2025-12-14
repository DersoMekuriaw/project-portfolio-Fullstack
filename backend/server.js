require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
// const projectRoutes = require("./routes/projects");

const app = express();


// ------------------------------
// 1. CORS setup
// ------------------------------
app.use(cors());

// ------------------------------
// 2. Body parsers
// ------------------------------
app.use(express.json());

// ------------------------------
// 3. Routes
// ------------------------------
app.use("/api/auth", authRoutes);

// ------------------------------
// 4. Connect DB + start server
// ------------------------------
connectDB(process.env.MONGO_URI);

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
