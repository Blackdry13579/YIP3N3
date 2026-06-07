import React, { createContext, useContext, useState } from 'react';
import { AppUser, mockUser } from '../lib/mockData';

interface AuthContextType {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login — remplace par supabase.auth.signInWithPassword
    if (email === 'patron@yip3n3.com' && password === '123456') {
      setUser(mockUser);
      return true;
    }
    if (email === 'serveur@yip3n3.com' && password === '123456') {
      setUser({ id: '2', email, role: 'serveur', full_name: 'Dockyname' });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
