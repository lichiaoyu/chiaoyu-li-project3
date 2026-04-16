import heroImg from "../assets/images/sudoku-grid.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <main className="main-content">
        <section className="hero">
          <h1>Welcome to Sudoku</h1>
          <p>Whisk away the noise, find focus in the grid.</p>

          <img
            src={heroImg}
            alt="Sudoku puzzle with matcha decorations"
            className="hero-image"
          />

          <Link to="/games" className="cta-button">
            Start Playing
          </Link>
        </section>

        <section className="features">
          <h2>Why You&apos;ll Keep Coming Back</h2>

          <div className="features-grid">
            <div className="feature-card">
              <h3>Pick Your Puzzle Mood</h3>
              <p>Go for a breezy 6×6 board or dive into a trickier 9×9 challenge.</p>
            </div>

            <div className="feature-card">
              <h3>Race the Clock</h3>
              <p>Keep an eye on your time and see how fast you can finish each board.</p>
            </div>

            <div className="feature-card">
              <h3>Climb the Leaderboard</h3>
              <p>Post your best runs and find out how your puzzle skills stack up.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Sudoku Game. All rights reserved.</p>
      </footer>
    </>
  );
}
