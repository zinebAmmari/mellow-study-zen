require("dotenv").config({
  path: require("path").resolve(__dirname, "..", ".env.server"),
});
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", dataRoutes);

// Health
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
