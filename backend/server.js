const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ================= DB CONNECT =================
mongoose.connect(
  "mongodb://Anjali:Anjali1234@ac-jqemwpb-shard-00-00.epnjwxw.mongodb.net:27017,ac-jqemwpb-shard-00-01.epnjwxw.mongodb.net:27017,ac-jqemwpb-shard-00-02.epnjwxw.mongodb.net:27017/smart-study?ssl=true&replicaSet=atlas-iukm9z-shard-0&authSource=admin&retryWrites=true&w=majority"
)
.then(() => console.log("✅ DB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// ================= ROUTES =================
const planRoutes = require("./routes/planRoutes");
app.use("/api/plans", planRoutes);

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// ================= START SERVER =================
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});