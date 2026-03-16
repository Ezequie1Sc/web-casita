import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      // Aquí iría la comprobación de autenticación con Firebase
      // const currentUser = await authService.getCurrentUser();
      // setUser(currentUser);
      
      // Datos de ejemplo mientras tanto
      const mockUser: User = {
        id: 'user1',
        name: 'María González',
        email: 'maria@email.com',
        photoURL: 'https://ui-avatars.com/api/?name=Maria+Gonzalez&background=cb8e6b&color=fff'
      };
      setUser(mockUser);
    } catch (err) {
      setError('Error al verificar autenticación');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      // Aquí iría el login con Google
      // await authService.loginWithGoogle();
      await checkAuth();
    } catch (err) {
      setError('Error al iniciar sesión');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // Aquí iría el logout
      // await authService.logout();
      setUser(null);
    } catch (err) {
      setError('Error al cerrar sesión');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout
  };
};