import express from "express";
import SudokuModel, {
  insertSudoku,
  getAllSudokus,
  findSudokuById,
  deleteSudokuById,
} from "./db/model/sudoku.model.js";

const router = express.Router();

const WORDS = [
  "Coconut", "Red", "House", "Apple", "River", "Moon", "Forest", "Sunny",
  "Cloud", "Tiger", "Peach", "Garden", "Silver", "Maple", "Ocean", "Berry",
  "Golden", "Pine", "Snow", "Willow", "Star", "Honey", "Mango", "Stone",
  "Breeze", "Jade", "Cherry", "Coral", "Dawn", "Falcon", "Glacier", "Hazel",
  "Ivy", "Juniper", "Kiwi", "Lagoon", "Meadow", "Nova", "Olive", "Pearl",
  "Quartz", "Rose", "Sage", "Topaz", "Umber", "Velvet", "Wave", "Yarrow",
  "Zephyr", "Amber", "Blossom", "Cedar", "Drift", "Echo", "Frost", "Grove",
  "Harbor", "Indigo", "Lotus", "Marble", "Nectar", "Orchid", "Petal", "Raven",
  "Spruce", "Thistle", "Vale", "Wren", "Aspen", "Birch", "Clover", "Dune",
  "Elm", "Fern", "Ginger", "Hollow", "Iris", "Lemon", "Misty", "Noble",
  "Opal", "Plum", "Robin", "Shore", "Tulip", "Violet", "Walnut", "Yuzu"
];

const EASY_BANK = [
  {
    puzzle: [
      [1, 0, 0, 4, 0, 6],
      [0, 5, 6, 0, 2, 0],
      [2, 0, 4, 5, 0, 1],
      [0, 6, 1, 0, 3, 0],
      [3, 0, 5, 6, 0, 2],
      [0, 1, 0, 3, 4, 0],
    ],
    solution: [
      [1, 2, 3, 4, 5, 6],
      [4, 5, 6, 1, 2, 3],
      [2, 3, 4, 5, 6, 1],
      [5, 6, 1, 2, 3, 4],
      [3, 4, 5, 6, 1, 2],
      [6, 1, 2, 3, 4, 5],
    ],
  },
  {
    puzzle: [
      [0, 2, 0, 4, 5, 0],
      [4, 0, 6, 0, 2, 3],
      [0, 3, 4, 5, 0, 1],
      [5, 6, 0, 2, 3, 0],
      [0, 4, 5, 0, 1, 2],
      [6, 0, 2, 3, 0, 5],
    ],
    solution: [
      [1, 2, 3, 4, 5, 6],
      [4, 5, 6, 1, 2, 3],
      [2, 3, 4, 5, 6, 1],
      [5, 6, 1, 2, 3, 4],
      [3, 4, 5, 6, 1, 2],
      [6, 1, 2, 3, 4, 5],
    ],
  },
  {
    puzzle: [
      [1, 0, 3, 0, 5, 6],
      [0, 5, 0, 1, 0, 3],
      [2, 3, 0, 5, 6, 0],
      [0, 6, 1, 0, 3, 4],
      [3, 0, 5, 6, 0, 2],
      [6, 1, 0, 3, 4, 0],
    ],
    solution: [
      [1, 2, 3, 4, 5, 6],
      [4, 5, 6, 1, 2, 3],
      [2, 3, 4, 5, 6, 1],
      [5, 6, 1, 2, 3, 4],
      [3, 4, 5, 6, 1, 2],
      [6, 1, 2, 3, 4, 5],
    ],
  },
];

const NORMAL_BANK = [
  {
    puzzle: [
      [5, 3, 0, 6, 7, 0, 9, 1, 0],
      [6, 0, 2, 1, 0, 5, 3, 0, 8],
      [0, 9, 8, 0, 4, 2, 0, 6, 7],
      [8, 5, 0, 7, 6, 0, 4, 2, 0],
      [4, 0, 6, 8, 0, 3, 7, 0, 1],
      [0, 1, 3, 0, 2, 4, 0, 5, 6],
      [9, 6, 0, 5, 3, 0, 2, 8, 0],
      [2, 0, 7, 4, 0, 9, 6, 0, 5],
      [0, 4, 5, 0, 8, 6, 0, 7, 9],
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
  },
  {
    puzzle: [
      [5, 0, 4, 6, 0, 8, 9, 1, 0],
      [0, 7, 2, 1, 9, 0, 3, 0, 8],
      [1, 9, 0, 3, 4, 2, 0, 6, 7],
      [8, 5, 9, 0, 6, 1, 4, 0, 3],
      [4, 0, 6, 8, 5, 0, 7, 9, 1],
      [7, 1, 0, 9, 2, 4, 0, 5, 6],
      [0, 6, 1, 5, 0, 7, 2, 8, 4],
      [2, 8, 7, 0, 1, 9, 6, 0, 5],
      [3, 4, 0, 2, 8, 6, 1, 7, 0],
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
  },
  {
    puzzle: [
      [0, 3, 4, 0, 7, 8, 9, 0, 2],
      [6, 7, 0, 1, 9, 5, 0, 4, 8],
      [1, 0, 8, 3, 0, 2, 5, 6, 0],
      [8, 5, 9, 7, 6, 0, 4, 2, 3],
      [0, 2, 6, 8, 5, 3, 7, 0, 1],
      [7, 1, 3, 0, 2, 4, 8, 5, 6],
      [9, 6, 0, 5, 3, 7, 0, 8, 4],
      [2, 8, 7, 4, 0, 9, 6, 3, 0],
      [3, 0, 5, 2, 8, 0, 1, 7, 9],
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
  },
];

function deepClone(x) {
  return JSON.parse(JSON.stringify(x));
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUniqueName() {
  const used = new Set();
  while (used.size < 3) {
    used.add(randomItem(WORDS));
  }
  return Array.from(used).join(" ");
}

async function generateUnusedName() {
  let name = generateUniqueName();

  while (await SudokuModel.exists({ name })) {
    name = generateUniqueName();
  }

  return name;
}

// GET /api/sudoku
router.get("/", async function (req, res) {
  try {
    const games = await getAllSudokus();
    return res.json(games);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch sudoku games" });
  }
});

// GET /api/sudoku/:gameId
router.get("/:gameId", async function (req, res) {
  try {
    const game = await findSudokuById(req.params.gameId);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    return res.json(game);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch sudoku game" });
  }
});

// POST /api/sudoku
router.post("/", async function (req, res) {
  try {
    const username = req.cookies.username;
    if (!username) {
      return res.status(401).json({ error: "Not logged in" });
    }

    const { difficulty } = req.body;
    if (!difficulty || !["EASY", "NORMAL"].includes(difficulty)) {
      return res.status(400).json({ error: "Invalid difficulty" });
    }

    const bank = difficulty === "EASY" ? EASY_BANK : NORMAL_BANK;
    const chosen = deepClone(randomItem(bank));

    const name = await generateUnusedName();

    const newGame = await insertSudoku({
      name,
      difficulty,
      createdBy: username,
      puzzle: chosen.puzzle,
      solution: chosen.solution,
      currentState: chosen.puzzle,
      completedBy: [],
      progressByUser: {
        [username]: chosen.puzzle,
      },
    });

    return res.status(201).json({ gameId: newGame._id });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create sudoku game" });
  }
});

// PUT /api/sudoku/:gameId
router.put("/:gameId", async function (req, res) {
  try {
    const { username, currentState, completedBy } = req.body;

    const updateData = {};

    if (username && currentState) {
      updateData[`progressByUser.${username}`] = currentState;
    }

    if (completedBy) {
      updateData.completedBy = completedBy;
    }

    const updatedGame = await SudokuModel.findByIdAndUpdate(
      req.params.gameId,
      { $set: updateData },
      { new: true }
    ).exec();

    if (!updatedGame) {
      return res.status(404).json({ error: "Game not found" });
    }

    return res.json(updatedGame);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update sudoku game" });
  }
});

// DELETE /api/sudoku/:gameId
router.delete("/:gameId", async function (req, res) {
  try {
    const deletedGame = await deleteSudokuById(req.params.gameId);

    if (!deletedGame) {
      return res.status(404).json({ error: "Game not found" });
    }

    return res.json({ message: "Game deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete sudoku game" });
  }
});

export default router;