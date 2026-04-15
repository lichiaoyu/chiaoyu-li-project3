import express from "express";
import UserModel from "./db/model/user.model.js";
import SudokuModel from "./db/model/sudoku.model.js";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const users = await UserModel.find({}, "username").exec();
    const games = await SudokuModel.find({}, "completedBy").exec();

    const winMap = {};

    for (const user of users) {
      winMap[user.username] = 0;
    }

    for (const game of games) {
      for (const username of game.completedBy || []) {
        if (winMap[username] !== undefined) {
          winMap[username] += 1;
        }
      }
    }

    const result = Object.entries(winMap)
      .map(([username, wins]) => ({ username, wins }))
      .filter((item) => item.wins > 0)
      .sort((a, b) => b.wins - a.wins || a.username.localeCompare(b.username));

    return res.json(result);
  } catch (error) {
    console.error("highscore error:", error);
    return res.status(500).json({ error: "Failed to fetch highscores" });
  }
});

router.post("/", async function (req, res) {
  return res.json({ ok: true });
});

router.get("/:gameId", async function (req, res) {
  try {
    const game = await SudokuModel.findById(req.params.gameId).exec();

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    return res.json({
      gameId: game._id,
      completedBy: game.completedBy || [],
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch game highscore" });
  }
});

export default router;