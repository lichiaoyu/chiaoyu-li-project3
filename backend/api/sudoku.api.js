import express from "express";
import SudokuModel, {
  insertSudoku,
  getAllSudokus,
  findSudokuById,
  deleteSudokuById,
} from "./db/model/sudoku.model.js";

const router = express.Router();

const COLOR_WORDS = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Purple",
  "Pink",
  "Brown",
  "Black",
  "White",
  "Gray",
  "Silver",
  "Gold",
  "Amber",
  "Aqua",
  "Azure",
  "Beige",
  "Bronze",
  "Coral",
  "Cream",
  "Crimson",
  "Cyan",
  "Denim",
  "Emerald",
  "Fuchsia",
  "Indigo",
  "Ivory",
  "Jade",
  "Khaki",
  "Lavender",
  "Lilac",
  "Lime",
  "Magenta",
  "Maroon",
  "Mint",
  "Navy",
  "Olive",
  "Peach",
  "Pearl",
  "Plum",
  "Rose",
  "Ruby",
  "Rust",
  "Saffron",
  "Salmon",
  "Scarlet",
  "Tan",
  "Teal",
  "Turquoise",
  "Violet",
];

const COLOR_MODIFIERS = [
  "Soft",
  "Light",
  "Deep",
  "Bright",
  "Pale",
  "Warm",
  "Cool",
  "Rich",
  "Dark",
  "Muted",
  "Fresh",
  "Clear",
  "Bold",
  "Dusty",
  "Glossy",
  "Matte",
  "Icy",
  "Sunny",
  "Golden",
  "Rosy",
  "Berry",
  "Honey",
  "Smoky",
  "Velvet",
  "Frosted",
  "Pastel",
];

function buildWordBank() {
  const bank = new Set(COLOR_WORDS);

  for (const modifier of COLOR_MODIFIERS) {
    for (const color of COLOR_WORDS) {
      bank.add(`${modifier} ${color}`);
    }
  }

  for (const firstColor of COLOR_WORDS) {
    for (const secondColor of COLOR_WORDS) {
      if (firstColor !== secondColor) {
        bank.add(`${firstColor} ${secondColor}`);
      }
    }
  }

  return Array.from(bank);
}

const WORD_BANK = buildWordBank();

const EASY_SEEDS = [
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

const NORMAL_SEEDS = [
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

function remapDigits(board, digitMap) {
  return board.map((row) => row.map((value) => (value === 0 ? 0 : digitMap[value])));
}

function reorderRows(board, rowOrder) {
  return rowOrder.map((index) => board[index].slice());
}

function reorderCols(board, colOrder) {
  return board.map((row) => colOrder.map((index) => row[index]));
}

function buildAxisOrder(groupSize, groupOrder, withinGroupOrder) {
  const order = [];

  for (const groupIndex of groupOrder) {
    for (const offset of withinGroupOrder[groupIndex]) {
      order.push(groupIndex * groupSize + offset);
    }
  }

  return order;
}

function applyVariant(seed, variant, config) {
  const digitMap = Object.fromEntries(
    variant.digits.map((digit, index) => [index + 1, digit])
  );

  const rowOrder = buildAxisOrder(
    config.rowGroupSize,
    variant.rowGroups,
    variant.rowsInGroup
  );
  const colOrder = buildAxisOrder(
    config.colGroupSize,
    variant.colGroups,
    variant.colsInGroup
  );

  return {
    puzzle: reorderCols(
      reorderRows(remapDigits(seed.puzzle, digitMap), rowOrder),
      colOrder
    ),
    solution: reorderCols(
      reorderRows(remapDigits(seed.solution, digitMap), rowOrder),
      colOrder
    ),
  };
}

function expandBank(seeds, config, variants) {
  return seeds.flatMap((seed) => variants.map((variant) => applyVariant(seed, variant, config)));
}

const EASY_VARIANTS = [
  {
    digits: [1, 2, 3, 4, 5, 6],
    rowGroups: [0, 1, 2],
    rowsInGroup: [[0, 1], [0, 1], [0, 1]],
    colGroups: [0, 1],
    colsInGroup: [[0, 1, 2], [0, 1, 2]],
  },
  {
    digits: [2, 3, 4, 5, 6, 1],
    rowGroups: [1, 2, 0],
    rowsInGroup: [[1, 0], [0, 1], [1, 0]],
    colGroups: [1, 0],
    colsInGroup: [[2, 0, 1], [1, 2, 0]],
  },
  {
    digits: [3, 4, 5, 6, 1, 2],
    rowGroups: [2, 0, 1],
    rowsInGroup: [[0, 1], [1, 0], [1, 0]],
    colGroups: [0, 1],
    colsInGroup: [[1, 2, 0], [2, 0, 1]],
  },
  {
    digits: [4, 5, 6, 1, 2, 3],
    rowGroups: [0, 2, 1],
    rowsInGroup: [[1, 0], [1, 0], [0, 1]],
    colGroups: [1, 0],
    colsInGroup: [[0, 2, 1], [0, 1, 2]],
  },
  {
    digits: [5, 6, 1, 2, 3, 4],
    rowGroups: [1, 0, 2],
    rowsInGroup: [[0, 1], [1, 0], [0, 1]],
    colGroups: [0, 1],
    colsInGroup: [[2, 1, 0], [1, 0, 2]],
  },
  {
    digits: [6, 1, 2, 3, 4, 5],
    rowGroups: [2, 1, 0],
    rowsInGroup: [[1, 0], [0, 1], [1, 0]],
    colGroups: [1, 0],
    colsInGroup: [[1, 0, 2], [2, 1, 0]],
  },
];

const NORMAL_VARIANTS = [
  {
    digits: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    rowGroups: [0, 1, 2],
    rowsInGroup: [[0, 1, 2], [0, 1, 2], [0, 1, 2]],
    colGroups: [0, 1, 2],
    colsInGroup: [[0, 1, 2], [0, 1, 2], [0, 1, 2]],
  },
  {
    digits: [2, 3, 4, 5, 6, 7, 8, 9, 1],
    rowGroups: [1, 2, 0],
    rowsInGroup: [[1, 2, 0], [2, 0, 1], [0, 2, 1]],
    colGroups: [2, 0, 1],
    colsInGroup: [[2, 0, 1], [1, 2, 0], [0, 2, 1]],
  },
  {
    digits: [3, 4, 5, 6, 7, 8, 9, 1, 2],
    rowGroups: [2, 0, 1],
    rowsInGroup: [[2, 1, 0], [1, 0, 2], [0, 2, 1]],
    colGroups: [1, 2, 0],
    colsInGroup: [[1, 0, 2], [2, 1, 0], [0, 1, 2]],
  },
  {
    digits: [4, 5, 6, 7, 8, 9, 1, 2, 3],
    rowGroups: [0, 2, 1],
    rowsInGroup: [[2, 0, 1], [1, 0, 2], [2, 1, 0]],
    colGroups: [0, 2, 1],
    colsInGroup: [[1, 2, 0], [0, 2, 1], [2, 1, 0]],
  },
  {
    digits: [5, 6, 7, 8, 9, 1, 2, 3, 4],
    rowGroups: [1, 0, 2],
    rowsInGroup: [[0, 2, 1], [2, 1, 0], [1, 0, 2]],
    colGroups: [2, 1, 0],
    colsInGroup: [[0, 1, 2], [2, 0, 1], [1, 2, 0]],
  },
  {
    digits: [6, 7, 8, 9, 1, 2, 3, 4, 5],
    rowGroups: [2, 1, 0],
    rowsInGroup: [[1, 0, 2], [0, 2, 1], [2, 1, 0]],
    colGroups: [1, 0, 2],
    colsInGroup: [[2, 1, 0], [0, 1, 2], [1, 0, 2]],
  },
];

const EASY_BANK = expandBank(
  EASY_SEEDS,
  { rowGroupSize: 2, colGroupSize: 3 },
  EASY_VARIANTS
);
const NORMAL_BANK = expandBank(
  NORMAL_SEEDS,
  { rowGroupSize: 3, colGroupSize: 3 },
  NORMAL_VARIANTS
);

function deepClone(x) {
  return JSON.parse(JSON.stringify(x));
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUniqueName() {
  const used = new Set();

  while (used.size < 3) {
    used.add(randomItem(WORD_BANK));
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

    const summaries = games.map((game) => ({
      _id: game._id,
      name: game.name,
      createdAt: game.createdAt,
      difficulty: game.difficulty,
      createdBy: game.createdBy,
    }));

    return res.json(summaries);
  } catch (error) {
    console.error("sudoku list error:", error);
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
    console.error("sudoku fetch error:", error);
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
      highScores: [],
      progressByUser: {
        [username]: chosen.puzzle,
      },
    });

    return res.status(201).json({ gameId: newGame._id });
  } catch (error) {
    console.error("sudoku create error:", error);
    return res.status(500).json({ error: "Failed to create sudoku game" });
  }
});

// PUT /api/sudoku/:gameId
router.put("/:gameId", async function (req, res) {
  try {
    const username = req.cookies.username;
    const { currentState, completedBy } = req.body;

    if (!username) {
      return res.status(401).json({ error: "Not logged in" });
    }

    const updateData = {};

    if (currentState) {
      updateData[`progressByUser.${username}`] = currentState;
    }

    if (completedBy) {
      const nextCompletedBy = Array.isArray(completedBy)
        ? Array.from(new Set([...completedBy, username]))
        : [username];
      updateData.completedBy = nextCompletedBy;
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
    console.error("sudoku update error:", error);
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
    console.error("sudoku delete error:", error);
    return res.status(500).json({ error: "Failed to delete sudoku game" });
  }
});

export default router;
