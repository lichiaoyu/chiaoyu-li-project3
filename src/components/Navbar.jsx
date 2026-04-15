import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <NavLink to="/" className="logo-link">
            Sudoku
          </NavLink>
        </div>

        <ul className="navbar-menu">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <span>Home</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/games" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <span>Play</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/rules" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <span>Rules</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/scores" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <span>High Scores</span>
            </NavLink>
          </li>

          {!user ? (
            <>
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                  <span>Login</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/register" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                  <span>Register</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <span className="nav-link nav-username">
                  Hello, {user}
                </span>
              </li>

              <li className="nav-item">
                <button type="button" className="cta-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}