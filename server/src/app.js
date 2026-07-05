const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(cors());
// app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Interview Platform API is running",
  });
});
app.use(errorMiddleware);

module.exports = app;
