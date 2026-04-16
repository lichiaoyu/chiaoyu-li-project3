import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Games({ user }) {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/sudoku", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch(() => setGames([]));
  }, []);

  async function handleCreateGame(difficulty) {
    const res = await fetch("/api/sudoku", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ difficulty }),
    });

    const data = await res.json();

    if (res.ok) {
      navigate(`/game/${data.gameId}`);
    } else {
      alert(data.error || "Failed to create game");
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <>
      <main className="main-content">
        <section className="page-section">
          <h1 className="page-title">Game Selection</h1>
          <p className="page-subtitle">
            Create a new puzzle or choose an existing one.
          </p>

          <div className="button-group">
            <button
              className="cta-button"
              onClick={() => handleCreateGame("EASY")}
              disabled={!user}
            >
              Create Easy Game
            </button>
            <button
              className="cta-button"
              onClick={() => handleCreateGame("NORMAL")}
              disabled={!user}
            >
              Create Normal Game
            </button>
          </div>

          <div className="selection-grid">
            {games.map((game) => (
              <button
                key={game._id}
                className="game-card"
                onClick={() => navigate(`/game/${game._id}`)}
              >
                <h3>{game.name}</h3>
                <p className="game-author">Difficulty: {game.difficulty}</p>
                <p className="game-author">Creator: {game.createdBy}</p>
                <p className="game-author">
                  Created: {formatDate(game.createdAt)}
                </p>
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Sudoku Game. All rights reserved.</p>
      </footer>
    </>
  );
}
