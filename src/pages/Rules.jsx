export default function Rules() {
  return (
    <>
      <main className="main-content">
        <section className="hero">
          <h1>Rules</h1>
          <p>Sudoku is all about placing each number once in every row, column, and box without repeats.</p>
        </section>

        <section className="features">
          <h2>How to Play</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Rows and Columns</h3>
              <p>Each row and each column must have every number once.</p>
            </div>
            <div className="feature-card">
              <h3>Boxes</h3>
              <p>Each box must also have every number once.</p>
              <p>Easy is 6×6 with 2×3 boxes. Normal is 9×9 with 3×3 boxes.</p>
            </div>
            <div className="feature-card">
              <h3>Wrong Moves</h3>
              <p>If a number breaks the rules, the cell turns red.</p>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="rules-card credits-card">
            <h2>About This Game</h2>
            <p>
              Made by <span className="author-name">Chiao-Yu Li</span>
            </p>

            <p className="contact-links">
              Email:
              <a href="mailto:sudoku@gamemail.com" className="contact-link">sudoku@gamemail.com</a>
              <br />
              GitHub:
              <a href="https://github.com/lichiaoyu/chiaoyu-li-project3" className="contact-link">github.com/lichiaoyu/sudoku-project3</a>
              <br />
              LinkedIn:
              <a href="https://www.linkedin.com/in/sudokugame/" className="contact-link">linkedin.com/in/sudokugame</a>
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
