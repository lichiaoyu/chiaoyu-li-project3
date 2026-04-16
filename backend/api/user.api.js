import express from "express";
import bcrypt from "bcrypt";
import {
  createUser,
  findUserByUsername,
  updateUserSessionToken,
} from "./db/model/user.model.js";
import {
  clearSession,
  generateSessionToken,
  getAuthenticatedUser,
  setSessionCookie,
} from "../auth.js";

const router = express.Router();

router.get("/isLoggedIn", async (req, res) => {
  const user = await getAuthenticatedUser(req);

  if (!user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  return res.json({ username: user.username });
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

    const user = await createUser({
      username,
      passwordHash,
    });

    const sessionToken = generateSessionToken();
    await updateUserSessionToken(user._id, sessionToken);
    setSessionCookie(res, sessionToken);

    return res.status(201).json({ username });
  } catch (error) {
    console.error("register error:", error);
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

    const sessionToken = generateSessionToken();
    await updateUserSessionToken(user._id, sessionToken);
    setSessionCookie(res, sessionToken);

    return res.json({ username });
  } catch (error) {
    console.error("login error:", error);
    return res.status(500).json({ error: "Failed to log in" });
  }
});

router.post("/logout", async (req, res) => {
  await clearSession(res, req);
  return res.json({ ok: true });
});

export default router;
