import express from "express";
import bcrypt from "bcrypt";
import { createUser, findUserByUsername } from "./db/model/user.model.js";

const router = express.Router();

router.get("/isLoggedIn", (req, res) => {
  const username = req.cookies.username;

  if (!username) {
    return res.status(401).json({ error: "Not logged in" });
  }

  return res.json({ username });
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await createUser({
      username,
      passwordHash,
    });

    res.cookie("username", username, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ username });
  } catch (error) {
    return res.status(500).json({ error: "Failed to register user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.cookie("username", username, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ username });
  } catch (error) {
    return res.status(500).json({ error: "Failed to log in" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("username");
  return res.json({ ok: true });
});

export default router;
