import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== verifyPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();

      let data = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = { error: text };
      }

      if (!res.ok) {
        alert(data.error || "Register failed");
        return;
      }

      setUser(data.username);
      navigate("/games");
    } catch (error) {
      console.error("register error:", error);
      alert("Something went wrong while registering.");
    }
  }

  return (
    <>
      <main className="main-content">
        <section className="page-section">
          <h1 className="page-title">Register</h1>
          <p className="page-subtitle">Create an account to save and play Sudoku games.</p>

          <div className="feature-card form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Username
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>

                <label>
                  Verify Password
                  <input
                    type="password"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                  />
                </label>

                <button
                  type="submit"
                  className="cta-button"
                  disabled={!username || !password || !verifyPassword}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Sudoku Game. All rights reserved.</p>
      </footer>
    </>
  );
}