import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import userApi from "./backend/api/user.api.js";
import sudokuApi from "./backend/api/sudoku.api.js";
import highscoreApi from "./backend/api/highscore.api.js";

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URL =
  process.env.MONGO || "mongodb://127.0.0.1:27017/sudoku-project3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/user", userApi);
app.use("/api/sudoku", sudokuApi);
app.use("/api/highscore", highscoreApi);

const frontendDir = path.join(__dirname, "dist");
app.use(express.static(frontendDir));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
