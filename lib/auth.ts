// Authentication system with persistent login

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  registeredAt: string;
  lastLogin: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

const STORAGE_KEY = 'nexyon_auth';
const TOKEN_KEY = 'nexyon_token';

// Mock database of users
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@nexyon.com': {
    password: 'admin123',
    user: {
      id: 'admin_001',
      name: 'Administrador',
      email: 'admin@nexyon.com',
      role: 'admin',
      registeredAt: new Date('2024-01-01').toISOString(),
      lastLogin: new Date().toISOString(),
    },
  },
  'user@nexyon.com': {
    password: 'user123',
    user: {
      id: 'user_001',
      name: 'Usuário Padrão',
      email: 'user@nexyon.com',
      role: 'user',
      registeredAt: new Date('2024-01-15').toISOString(),
      lastLogin: new Date().toISOString(),
    },
  },
};

// Load auth state from localStorage
export function loadAuthState(): AuthState {
  if (typeof window === 'undefined') {
    return { user: null, isAuthenticated: false, token: null };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const token = localStorage.getItem(TOKEN_KEY);

    if (stored && token) {
      const auth = JSON.parse(stored);
      return {
        ...auth,
        token,
      };
    }
  } catch {
    // Invalid stored data
  }

  return { user: null, isAuthenticated: false, token: null };
}

// Save auth state to localStorage
export function saveAuthState(user: User, token: string) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, isAuthenticated: true }));
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    console.error('Failed to save auth state');
  }
}

// Clear auth state
export function clearAuthState() {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    console.error('Failed to clear auth state');
  }
}

// Login user
export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const userRecord = mockUsers[email];

  if (!userRecord || userRecord.password !== password) {
    return { success: false, error: 'Email ou senha inválidos' };
  }

  const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const user = {
    ...userRecord.user,
    lastLogin: new Date().toISOString(),
  };

  saveAuthState(user, token);

  return { success: true, user };
}

// Register new user
export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (mockUsers[email]) {
    return { success: false, error: 'Email já cadastrado' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Senha deve ter pelo menos 6 caracteres' };
  }

  const newUser: User = {
    id: `user_${Date.now()}`,
    name,
    email,
    role: 'user',
    registeredAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };

  mockUsers[email] = {
    password,
    user: newUser,
  };

  const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  saveAuthState(newUser, token);

  return { success: true, user: newUser };
}

// Get all registered users (admin only)
export function getAllUsers(): User[] {
  return Object.values(mockUsers).map((record) => record.user);
}

// Logout user
export function logoutUser() {
  clearAuthState();
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const auth = loadAuthState();
  return auth.isAuthenticated && auth.user !== null;
}

// Get current user
export function getCurrentUser(): User | null {
  const auth = loadAuthState();
  return auth.user || null;
}

// Check if current user is admin
export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.role === 'admin';
}
