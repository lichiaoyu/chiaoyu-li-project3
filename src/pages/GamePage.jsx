import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGame } from "../state/GameContext.jsx";
import Timer from "../components/Timer.jsx";
import GameControls from "../components/GameControls.jsx";
import Board from "../components/Board.jsx";

export default function GamePage({ user }) {
  const { gameId } = useParams();
  const { state, dispatch } = useGame();

  const loadedKeyRef = useRef(null);
  const previousStatusRef = useRef("idle");

  useEffect(() => {
    loadedKeyRef.current = null;

    async function fetchGame() {
      const res = await fetch(`/api/sudoku/${gameId}`, {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        const boardForUser =
          user && data.progressByUser && data.progressByUser[user]
            ? data.progressByUser[user]
            : data.puzzle;

        const gameForUser = {
          ...data,
          currentState: boardForUser,
        };

        dispatch({ type: "LOAD_GAME_FROM_API", game: gameForUser });
        loadedKeyRef.current = `${gameId}:${user || "guest"}`;
      }
    }

    fetchGame();
  }, [gameId, dispatch, user]);

  useEffect(() => {
    const currentKey = `${gameId}:${user || "guest"}`;

    if (!user) return;
    if (!gameId || state.status === "idle" || !state.board.length) return;
    if (loadedKeyRef.current !== currentKey) return;

    async function saveProgress() {
      try {
        const boardToSave = state.board.map((row) =>
          row.map((cell) => cell.value ?? 0)
        );

        await fetch(`/api/sudoku/${gameId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: user,
            currentState: boardToSave,
          }),
        });
      } catch (error) {
        console.error("Failed to save game progress:", error);
      }
    }

    saveProgress();
  }, [gameId, user, state.board, state.status]);

  useEffect(() => {
    const currentKey = `${gameId}:${user || "guest"}`;

    if (!gameId || !user) return;
    if (state.status !== "won") return;
    if (loadedKeyRef.current !== currentKey) return;

    async function markCompleted() {
      try {
        const boardToSave = state.board.map((row) =>
          row.map((cell) => cell.value ?? 0)
        );

        const completed = Array.from(
          new Set([...(state.completedBy || []), user])
        );

        await fetch(`/api/sudoku/${gameId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: user,
            currentState: boardToSave,
            completedBy: completed,
          }),
        });
      } catch (error) {
        console.error("Failed to mark completed:", error);
      }
    }

    markCompleted();
  }, [gameId, user, state.status, state.board, state.completedBy]);

  useEffect(() => {
    const currentKey = `${gameId}:${user || "guest"}`;
    const previousStatus = previousStatusRef.current;
    previousStatusRef.current = state.status;

    if (!gameId || !user) return;
    if (previousStatus !== "playing") return;
    if (state.status !== "won") return;
    if (state.elapsedMs <= 0) return;
    if (loadedKeyRef.current !== currentKey) return;

    async function submitHighscore() {
      try {
        await fetch("/api/highscore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            gameId,
            username: user,
            timeMs: state.elapsedMs,
          }),
        });
      } catch (error) {
        console.error("Failed to submit highscore:", error);
      }
    }

    submitHighscore();
  }, [gameId, user, state.status, state.elapsedMs]);

  if (state.status === "idle") {
    return (
      <main className="main-content">
        <p>Loading...</p>
      </main>
    );
  }

  const title =
    state.mode === "easy" ? "Easy Sudoku (6×6)" : "Normal Sudoku (9×9)";
  const subtitle =
    state.mode === "easy"
      ? "Half the board is pre-filled. Use numbers 1–6."
      : "28–30 clues. Use numbers 1–9. Best times are tracked as highscores.";

  const userCompleted =
    !!user &&
    (
      state.status === "won" ||
      (Array.isArray(state.completedBy) && state.completedBy.includes(user))
    );

  return (
    <>
      <main className="main-content">
        <section className="page-section">
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{subtitle}</p>

          <div className="feature-card game-card-wrap">
            <Timer />

            {userCompleted && (
              <p className="congrats">Congratulations! Puzzle solved.</p>
            )}

            <Board board={state.board} size={state.size} user={user} />
            <GameControls user={user} />

            <p style={{ marginTop: 4 }}>
              Tip: Click a cell and use your keyboard to enter a number.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Sudoku Game. All rights reserved.</p>
      </footer>
    </>
  );
}
