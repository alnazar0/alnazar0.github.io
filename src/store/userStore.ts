import { create } from 'zustand';
import { User, Language } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  setPreferredLanguage: (language: Language) => void;
}

type StoredUser = User & { password: string };

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useUserStore = create<UserState>((set, get) => ({
  user: loadFromStorage('user'),
  isAuthenticated: !!loadFromStorage('user'),

  login: async (email: string, password: string) => {
    const storedUsers = loadFromStorage<Record<string, StoredUser>>('users') || {};
    const user = Object.values(storedUsers).find(u => u.email === email && u.password === password);
    
    if (user) {
      const userWithoutPassword: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        vip: user.vip,
        joinDate: user.joinDate,
        preferredLanguage: user.preferredLanguage
      };
      set({ user: userWithoutPassword, isAuthenticated: true });
      saveToStorage('user', userWithoutPassword);
      return true;
    }
    return false;
  },

  register: async (name: string, email: string, password: string) => {
    const storedUsers = loadFromStorage<Record<string, StoredUser>>('users') || {};
    
    if (Object.values(storedUsers).some(u => u.email === email)) {
      return false;
    }

    const newUser: StoredUser = {
      id: generateId(),
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      vip: false,
      joinDate: Date.now(),
      preferredLanguage: 'en',
      password
    };

    storedUsers[newUser.id] = newUser;
    saveToStorage('users', storedUsers);

    const userWithoutPassword: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      vip: newUser.vip,
      joinDate: newUser.joinDate,
      preferredLanguage: newUser.preferredLanguage
    };
    set({ user: userWithoutPassword, isAuthenticated: true });
    saveToStorage('user', userWithoutPassword);
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('linguaflow_user');
  },

  updateProfile: (data: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser: User = { ...currentUser, ...data };
      set({ user: updatedUser });
      saveToStorage('user', updatedUser);
      
      const storedUsers = loadFromStorage<Record<string, StoredUser>>('users') || {};
      if (storedUsers[updatedUser.id]) {
        storedUsers[updatedUser.id] = { ...storedUsers[updatedUser.id], ...data };
        saveToStorage('users', storedUsers);
      }
    }
  },

  setPreferredLanguage: (language: Language) => {
    get().updateProfile({ preferredLanguage: language });
  }
}));
