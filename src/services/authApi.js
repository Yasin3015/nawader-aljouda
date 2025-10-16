// Simple mock auth API using localStorage
export const AUTH_STORAGE_KEY = "mock_auth_users";

function getUsers() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
}

export async function signup({ email, password }) {
  const users = getUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    throw new Error("Email already registered");
  }
  const user = { id: crypto.randomUUID(), email, password };
  users.push(user);
  saveUsers(users);
  return { id: user.id, email: user.email };
}

export async function login({ email, password }) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) {
    throw new Error("Invalid email or password");
  }
  return { id: user.id, email: user.email };
}

export function seedMockUser() {
  const users = getUsers();
  if (!users.length) {
    users.push({ id: "demo", email: "demo@example.com", password: "Password123" });
    saveUsers(users);
  }
}


