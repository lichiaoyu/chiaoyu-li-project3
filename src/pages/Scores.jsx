import { useEffect, useState } from "react";

export default function Scores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("/api/highscore", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setScores(data))
      .catch(() => setScores([]));
  }, []);

  return (
    <>
      <main className="main-content">
        <section className="page-section">
          <h1 className="page-title">High Scores</h1>
          <p className="page-subtitle">
            Players ranked by completed Sudoku games.
          </p>

          <div className="selection-grid">
            {scores.length === 0 ? (
              <p>No scores yet.</p>
            ) : (
              scores.map((item) => (
                <div key={item.username} className="game-card">
                  <h3>{item.username}</h3>
                  <p className="game-author">Wins: {item.wins}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Sudoku Game. All rights reserved.</p>
      </footer>
    </>
  );
}