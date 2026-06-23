const express = require("express");
const cors = require("cors");
const connectDB=require ("./config/db");
const authRoutes=require("./routes/authRoutes");
require("dotenv").config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Blog API Running");
});

const PORT = process.env.PORT || 5000;

app.use("/api/auth",authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});