// UTech CTF Hub - Authentication (localStorage-based)
/* global CHALLENGES, slugify */

const STORAGE_KEYS = {
  users: 'ctfhub_users',
  session: 'ctfhub_session',
  solves: 'ctfhub_solves',
  quizAttempts: 'ctfhub_quiz_attempts',
  jeopardy: 'ctfhub_jeopardy'
};

// Simple hash for password storage (browser-compatible)
async function hashPassword(password) {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function getSession() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.session) || 'null');
}

function getSolves() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.solves) || '[]');
}

function saveSolves(solves) {
  localStorage.setItem(STORAGE_KEYS.solves, JSON.stringify(solves));
}

function getQuizAttempts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.quizAttempts) || '[]');
}

function saveQuizAttempts(attempts) {
  localStorage.setItem(STORAGE_KEYS.quizAttempts, JSON.stringify(attempts));
}

function getJeopardyState() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.jeopardy) || '{}');
}

function saveJeopardyState(state) {
  localStorage.setItem(STORAGE_KEYS.jeopardy, JSON.stringify(state));
}

// Seed admin user on first load
async function seedAdmin() {
  const users = getUsers();
  if (!users.find(u => u.username === 'admin')) {
    const hash = await hashPassword('admin123');
    users.push({
      id: 1,
      username: 'admin',
      email: 'admin@utech.edu.jm',
      passwordHash: hash,
      role: 'admin',
      totalPoints: 0,
      createdAt: new Date().toISOString()
    });
    saveUsers(users);
  }
}

async function registerUser(username, email, password) {
  const users = getUsers();
  if (users.find(u => u.username === username)) {
    return { success: false, error: 'Username already exists.' };
  }
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Email already registered.' };
  }
  const hash = await hashPassword(password);
  const newUser = {
    id: Date.now(),
    username,
    email,
    passwordHash: hash,
    role: 'student',
    totalPoints: 0,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  saveUsers(users);
  return { success: true };
}

async function loginUser(username, password) {
  const users = getUsers();
  const user = users.find(u => u.username === username);
  if (!user) return { success: false, error: 'Invalid username or password.' };
  const hash = await hashPassword(password);
  if (hash !== user.passwordHash) return { success: false, error: 'Invalid username or password.' };
  const session = { userId: user.id, username: user.username, role: user.role };
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
  return { success: true, session };
}

function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.session);
}

function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  const users = getUsers();
  return users.find(u => u.id === session.userId) || null;
}

function updateUserPoints(userId, pointsDelta) {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  if (user) {
    user.totalPoints = Math.max(0, (user.totalPoints || 0) + pointsDelta);
    saveUsers(users);
  }
}

function getUserSolvedChallengeIds(userId) {
  return getSolves().filter(s => s.userId === userId).map(s => s.challengeId);
}

function addSolve(userId, challengeId, pointsAwarded, usedHint) {
  const solves = getSolves();
  solves.push({ userId, challengeId, pointsAwarded, usedHint, solvedAt: new Date().toISOString() });
  saveSolves(solves);
}

function removeSolve(userId, challengeId) {
  const solves = getSolves().filter(s => !(s.userId === userId && s.challengeId === challengeId));
  saveSolves(solves);
}

function getSolveForUser(userId, challengeId) {
  return getSolves().find(s => s.userId === userId && s.challengeId === challengeId) || null;
}

function getScoreboard() {
  const users = getUsers().filter(u => u.role === 'student');
  const solves = getSolves();
  return users
    .map(u => ({
      ...u,
      solveCount: solves.filter(s => s.userId === u.id).length
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints);
}

// ── Challenge CRUD ──────────────────────────────────────────────────────────
// The 18 built-in challenges always come from data.js (window.CHALLENGES).
// Admin changes (adds, edits, deletes, visibility) are stored as a small
// overlay in localStorage — so the defaults can NEVER go missing.

const OVERLAY_KEY = 'ctfhub_admin_overlay';

function _getOverlay() {
  const raw = localStorage.getItem(OVERLAY_KEY);
  return raw ? JSON.parse(raw) : { added: [], edited: {}, deleted: [], hidden: [] };
}

function _saveOverlay(o) {
  localStorage.setItem(OVERLAY_KEY, JSON.stringify(o));
}

function getChallenges() {
  const defaults = (CHALLENGES || []).map(c => ({ ...c }));
  const o = _getOverlay();

  // Apply to default challenges
  let result = defaults
    .filter(c => !o.deleted.includes(c.id))
    .map(c => {
      const edit = o.edited[c.id];
      const base = edit ? { ...c, ...edit } : { ...c };
      base.isEnabled = !o.hidden.includes(c.id);
      return base;
    });

  // Append admin-created challenges
  result = result.concat(o.added);
  return result;
}

function addChallenge(data) {
  const o = _getOverlay();
  const ch = { ...data, id: Date.now(), slug: slugify(data.title), isEnabled: true };
  o.added.push(ch);
  _saveOverlay(o);
  return ch;
}

function updateChallenge(id, data) {
  const o = _getOverlay();
  const isDefault = (CHALLENGES || []).some(c => c.id === id);
  if (isDefault) {
    o.edited[id] = { ...data, slug: slugify(data.title) };
  } else {
    const idx = o.added.findIndex(c => c.id === id);
    if (idx !== -1) o.added[idx] = { ...o.added[idx], ...data, slug: slugify(data.title) };
  }
  _saveOverlay(o);
  return true;
}

function toggleChallenge(id) {
  const o = _getOverlay();
  const isDefault = (CHALLENGES || []).some(c => c.id === id);
  let nowEnabled;
  if (isDefault) {
    if (o.hidden.includes(id)) {
      o.hidden = o.hidden.filter(x => x !== id);
      nowEnabled = true;
    } else {
      o.hidden.push(id);
      nowEnabled = false;
    }
  } else {
    const idx = o.added.findIndex(c => c.id === id);
    if (idx !== -1) {
      o.added[idx].isEnabled = !o.added[idx].isEnabled;
      nowEnabled = o.added[idx].isEnabled;
    }
  }
  _saveOverlay(o);
  return nowEnabled;
}

function deleteChallenge(id) {
  const o = _getOverlay();
  const isDefault = (CHALLENGES || []).some(c => c.id === id);
  if (isDefault) {
    if (!o.deleted.includes(id)) o.deleted.push(id);
  } else {
    o.added = o.added.filter(c => c.id !== id);
  }
  _saveOverlay(o);
  saveSolves(getSolves().filter(s => s.challengeId !== id));
}

function restoreDefaultChallenges() {
  _saveOverlay({ added: [], edited: {}, deleted: [], hidden: [] });
}

// ── Path helpers ─────────────────────────────────────────────────────────────

function _pathPrefix() {
  const path = window.location.pathname;
  if (path.includes('/training/') || path.includes('/admin/')) return '../';
  return '';
}

function requireLogin(redirectTo) {
  const session = getSession();
  if (!session) {
    const dest = redirectTo || window.location.href;
    window.location.href = _pathPrefix() + 'login.html?next=' + encodeURIComponent(dest);
    return false;
  }
  return true;
}

function requireAdmin() {
  const session = getSession();
  if (!session || session.role !== 'admin') {
    window.location.href = _pathPrefix() + 'index.html';
    return false;
  }
  return true;
}
