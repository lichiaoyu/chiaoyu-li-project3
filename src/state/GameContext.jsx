import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { validateBoard, isCompleteAndValid } from "../sudoku/validate.js";
import { findHintCell } from "../sudoku/hint.js";

const GameContext = createContext(null);

const initialState = {
  gameId: null,
  mode: null,          // "easy" | "normal"
  size: null,          // 6 | 9
  boxRows: null,       // 2 or 3
  boxCols: null,       // 3
  board: [],
  originalBoard: [],
  solution: [],
  createdBy: null,
  completedBy: [],
  selected: null,      // { r, c } | null
  hint: null,          // { r, c } | null
  startedAt: null,
  elapsedMs: 0,
  status: "idle",      // "idle" | "playing" | "won"
};

function deepClone(x) {
  return JSON.parse(JSON.stringify(x));
}

function toCellBoard(currentState, puzzle) {
  return currentState.map((row, r) =>
    row.map((value, c) => ({
      value: value === 0 ? null : value,
      fixed: puzzle[r][c] !== 0,
      incorrect: false,
    }))
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_GAME_FROM_API": {
      const game = action.game;

      const size = game.difficulty === "EASY" ? 6 : 9;
      const boxRows = game.difficulty === "EASY" ? 2 : 3;
      const boxCols = 3;

      const currentBoard = toCellBoard(game.currentState, game.puzzle);
      const puzzleBoard = toCellBoard(game.puzzle, game.puzzle);

      const validated = validateBoard(
        currentBoard,
        size,
        boxRows,
        boxCols
      );

      const won = isCompleteAndValid(validated);

      return {
        ...state,
        gameId: game._id,
        mode: game.difficulty.toLowerCase(),
        size,
        boxRows,
        boxCols,
        board: validated,
        originalBoard: deepClone(puzzleBoard),
        solution: deepClone(game.solution),
        createdBy: game.createdBy,
        completedBy: game.completedBy || [],
        selected: null,
        hint: null,
        startedAt: Date.now(),
        elapsedMs: 0,
        status: won ? "won" : "playing",
      };
    }

    case "RESET": {
      if (state.status === "idle") return state;

      const board = deepClone(state.originalBoard);

      return {
        ...state,
        board,
        selected: null,
        hint: null,
        startedAt: Date.now(),
        elapsedMs: 0,
        status: "playing",
      };
    }

    case "SELECT_CELL": {
      return {
        ...state,
        selected: action.pos,
        hint: null,
      };
    }

    case "TICK": {
      if (state.status !== "playing" || !state.startedAt) return state;

      return {
        ...state,
        elapsedMs: Date.now() - state.startedAt,
      };
    }

    case "SET_CELL_VALUE": {
      if (state.status !== "playing") return state;

      const { r, c, value } = action;
      const cell = state.board?.[r]?.[c];

      if (!cell || cell.fixed) return state;

      const next = deepClone(state.board);

      if (value !== null) {
        if (!Number.isInteger(value) || value < 1 || value > state.size) {
          return state;
        }
      }

      next[r][c].value = value;

      const validated = validateBoard(
        next,
        state.size,
        state.boxRows,
        state.boxCols
      );

      const won = isCompleteAndValid(validated);

      return {
        ...state,
        board: validated,
        hint: null,
        status: won ? "won" : "playing",
      };
    }

    case "HINT": {
      if (state.status !== "playing") return state;

      const pos = findHintCell(
        state.board,
        state.size,
        state.boxRows,
        state.boxCols
      );

      return {
        ...state,
        hint: pos,
      };
    }

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 250);

    return () => clearInterval(id);
  }, []);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used within GameProvider");
  }
  return ctx;
}