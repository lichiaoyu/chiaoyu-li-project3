import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userApi from "./backend/api/user.api.js";
import sudokuApi from "./backend/api/sudoku.api.js";
import highscoreApi from "./backend/api/highscore.api.js";

const app = express();
const PORT = 8000;
const MONGODB_URL = "mongodb://127.0.0.1:27017/sudoku-project3";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/highscore", highscoreApi);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/user", userApi);
app.use("/api/sudoku", sudokuApi);

app.post("/api/logout", (req, res) => {
  res.clearCookie("username");
  res.json({ ok: true });
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });