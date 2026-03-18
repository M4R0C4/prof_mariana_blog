import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '@/api/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // REIDRATAÇÃO: Verifica se já existe um usuário logado ao abrir o app
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authService.getMe();
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token'); // Token inválido/expirado
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (username, password) => {
    const { data } = await authService.login(username, password);
    localStorage.setItem('token', data.access_token);
    // Após salvar o token, buscamos os dados do usuário
    const userResponse = await authService.getMe();
    setUser(userResponse.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, authenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o uso nos componentes
export const useAuth = () => useContext(AuthContext);