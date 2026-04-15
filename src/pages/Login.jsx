import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

async function handleSubmit(e) {
  e.preventDefault();

  try {
    console.log("trying login...");

    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    console.log("status:", res.status);

    const text = await res.text();
    console.log("raw response:", text);

    let data = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }

    if (!res.ok) {
      alert(data.error || "Login failed");
      return;
    }

    setUser(data.username);
    navigate("/games");
  } catch (error) {
    console.error("login error:", error);
    alert("Something went wrong while logging in.");
  }
}
  return (
    <>
      <main className="main-content">
        <section className="page-section">
          <h1 className="page-title">Login</h1>
          <p className="page-subtitle">Sign in to create and play Sudoku games.</p>

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

                <button
                  type="submit"
                  className="cta-button"
                  disabled={!username || !password}
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