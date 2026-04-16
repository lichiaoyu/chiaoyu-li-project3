import crypto from "crypto";
import {
  clearSessionToken,
  findUserBySessionToken,
} from "./api/db/model/user.model.js";

const SESSION_COOKIE_NAME = "sessionToken";
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_MS,
  };
}

export async function getAuthenticatedUser(req) {
  const sessionToken = req.cookies[SESSION_COOKIE_NAME];

  if (!sessionToken) {
    return null;
  }

  return findUserBySessionToken(sessionToken);
}

export async function getAuthenticatedUsername(req) {
  const user = await getAuthenticatedUser(req);
  return user?.username || null;
}

export function setSessionCookie(res, sessionToken) {
  res.cookie(SESSION_COOKIE_NAME, sessionToken, getSessionCookieOptions());
}

export async function clearSession(res, req) {
  const sessionToken = req.cookies[SESSION_COOKIE_NAME];

  if (sessionToken) {
    await clearSessionToken(sessionToken);
  }

  res.clearCookie(SESSION_COOKIE_NAME, getSessionCookieOptions());
  res.clearCookie("username");
}
