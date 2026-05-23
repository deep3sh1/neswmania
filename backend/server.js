require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const newsRoutes = require("./routes/newsRoutes");
const userRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/news", newsRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/notes", noteRoutes);


// Home Route
app.get("/", (req, res) => {
  res.send("NewsMania Backend Running");
});


// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


// CONNECT DATABASE
connectDB();


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});