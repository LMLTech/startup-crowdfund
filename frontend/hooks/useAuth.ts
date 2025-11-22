import { useState, useEffect } from 'react';
import { authAPI, LoginRequest, RegisterRequest, AuthResponse } from '../services/api';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Failed to parse saved user:', err);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      // In development, use mock data
      if (import.meta.env.MODE === 'development' && !import.meta.env.VITE_API_BASE_URL) {
        // Mock login
        const mockUsers = [
          { id: 1, email: 'admin@test.com', password: 'admin@123', name: 'Admin User', role: 'admin' },
          { id: 2, email: 'cva@test.com', password: 'cva123', name: 'CVA Member', role: 'cva' },
          { id: 3, email: 'investor@test.com', password: '123456', name: 'Nhà Đầu Tư', role: 'investor' },
          { id: 4, email: 'startup@test.com', password: '123456', name: 'Founder', role: 'startup', company: 'Startup ABC' },
        ];

        const user = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password);
        
        if (!user) {
          throw new Error('Email hoặc mật khẩu không đúng');
        }

        const authResponse: AuthResponse = {
          ...user,
          token: 'mock-jwt-token-' + user.id,
        };

        setCurrentUser(authResponse);
        localStorage.setItem('currentUser', JSON.stringify(authResponse));
        setLoading(false);
        return authResponse;
      }

      // Real API call
      const response = await authAPI.login(credentials);
      setCurrentUser(response);
      localStorage.setItem('currentUser', JSON.stringify(response));
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại');
      setLoading(false);
      throw err;
    }
  };

  const register = async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      // In development, use mock data
      if (import.meta.env.MODE === 'development' && !import.meta.env.VITE_API_BASE_URL) {
        // Mock registration
        const newUser: AuthResponse = {
          id: Date.now(),
          email: data.email,
          name: data.name,
          role: data.role,
          company: data.company,
          phone: data.phone,
          token: 'mock-jwt-token-' + Date.now(),
        };

        setCurrentUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setLoading(false);
        return newUser;
      }

      // Real API call
      const response = await authAPI.register(data);
      setCurrentUser(response);
      localStorage.setItem('currentUser', JSON.stringify(response));
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại');
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const getCurrentUser = async () => {
    if (!currentUser) return null;
    
    try {
      // In development with mock, return cached user
      if (import.meta.env.MODE === 'development' && !import.meta.env.VITE_API_BASE_URL) {
        return currentUser;
      }

      // Real API call to refresh user data
      const response = await authAPI.getCurrentUser();
      setCurrentUser(response);
      localStorage.setItem('currentUser', JSON.stringify(response));
      return response;
    } catch (err: any) {
      console.error('Failed to get current user:', err);
      return currentUser;
    }
  };

  return {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    getCurrentUser,
    isAuthenticated: !!currentUser,
  };
};
