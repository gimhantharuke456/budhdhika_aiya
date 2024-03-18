require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

//route imports
const userRoutes = require("./routes/user.routes");
const studentProfileRoutes = require("./routes/studentProfile.routes");
const courseRoutes = require("./routes/course.routes");
const markingRoutes = require("./routes/marking.routes");
const lectureMaterialRoutes = require("./routes/lectureMaterial.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const paymentRoutes = require("./routes/payment.routes");
const feedbackRoutes = require("./routes/feedback.routes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/studentProfiles", studentProfileRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/markings", markingRoutes);
app.use("/api/lectureMaterials", lectureMaterialRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/feedbacks", feedbackRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Replace PORT with your preferred port number
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
