const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ================= DB CONNECT =================

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// ================= ROUTES =================

const planRoutes = require("./routes/planRoutes");
app.use("/api/plans", planRoutes);

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.send("Smart Study Planner API Working ✅");
});

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});