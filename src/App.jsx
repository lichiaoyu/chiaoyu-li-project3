import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { GameProvider } from "./state/GameContext.jsx";

import Home from "./pages/Home.jsx";
import Games from "./pages/Games.jsx";
import GamePage from "./pages/GamePage.jsx";
import Rules from "./pages/Rules.jsx";
import Scores from "./pages/Scores.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user/isLoggedIn", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        setUser(data?.username || null);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <BrowserRouter>
      <GameProvider>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games user={user} />} />
          <Route path="/game/:gameId" element={<GamePage user={user} />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}