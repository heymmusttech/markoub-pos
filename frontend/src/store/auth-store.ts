import { User } from '@/interfaces';
import { create } from 'zustand';



interface AuthState {
  user: User | null;
  role: string | null;
  isLoggedIn: boolean | null;
  login: (user: User, role: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  role: localStorage.getItem('role') || null,
  isLoggedIn: !!localStorage.getItem('isLoggedIn'),

  login: (user, role) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', role);
    localStorage.setItem('isLoggedIn', 'true');
    set({ user, role });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('isLoggedIn');
    set({ user: null, role: null });
  }
}));

export default useAuthStore;
