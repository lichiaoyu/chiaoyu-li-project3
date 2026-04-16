import express from "express";
import SudokuModel from "./db/model/sudoku.model.js";

const router = express.Router();

function normalizeScore(score) {
  if (!score || typeof score.username !== "string") {
    return null;
  }

  const username = score.username.trim();
  const timeMs = Number(score.timeMs);

  if (!username || !Number.isFinite(timeMs) || timeMs < 0) {
    return null;
  }

  return { username, timeMs };
}

router.get("/", async function (req, res) {
  try {
    const games = await SudokuModel.find({}, "completedBy").exec();
    const winsByUser = new Map();

    for (const game of games) {
      for (const username of game.completedBy || []) {
        if (typeof username !== "string" || !username.trim()) continue;
        winsByUser.set(username, (winsByUser.get(username) || 0) + 1);
      }
    }

    const result = Array.from(winsByUser.entries())
      .map(([username, wins]) => ({ username, wins }))
      .sort((a, b) => b.wins - a.wins || a.username.localeCompare(b.username));

    return res.json(result);
  } catch (error) {
    console.error("highscore error:", error);
    return res.status(500).json({ error: "Failed to fetch highscores" });
  }
});

router.post("/", async function (req, res) {
  try {
    const username = req.cookies.username;
    const { gameId, timeMs } = req.body;

    if (!username) {
      return res.status(401).json({ error: "Not logged in" });
    }

    if (!gameId || !Number.isFinite(timeMs) || timeMs < 0) {
      return res.status(400).json({ error: "gameId and timeMs are required" });
    }

    const game = await SudokuModel.findById(gameId).exec();

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const existingScores = (Array.isArray(game.highScores) ? game.highScores : [])
      .map(normalizeScore)
      .filter(Boolean);
    const existingIndex = existingScores.findIndex((score) => score.username === username);

    if (existingIndex >= 0) {
      if (timeMs < existingScores[existingIndex].timeMs) {
        existingScores[existingIndex].timeMs = timeMs;
      }
    } else {
      existingScores.push({ username, timeMs });
    }

    existingScores.sort((a, b) => a.timeMs - b.timeMs || a.username.localeCompare(b.username));

    game.highScores = existingScores;
    await game.save();

    return res.status(200).json({
      gameId: game._id,
      game: game.name,
      highScores: game.highScores,
    });
  } catch (error) {
    console.error("highscore update error:", error);
    return res.status(500).json({ error: "Failed to update highscore" });
  }
});

router.get("/:gameId", async function (req, res) {
  try {
    const game = await SudokuModel.findById(req.params.gameId, "name highScores").exec();

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const scores = (game.highScores || [])
      .map(normalizeScore)
      .filter(Boolean)
      .sort(
      (a, b) => a.timeMs - b.timeMs || a.username.localeCompare(b.username)
      );

    return res.json({
      gameId: game._id,
      game: game.name,
      highScores: scores,
    });
  } catch (error) {
    console.error("game highscore fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch game highscore" });
  }
});

export default router;
