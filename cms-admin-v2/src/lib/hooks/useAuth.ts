/**
 * Authentication hook for managing user state.
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import type { User, LoginRequest } from '@/types/auth';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from storage on mount
    const storedUser = authApi.getStoredUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    const response = await authApi.login(credentials);
    authApi.saveAuth(response.token, response.user);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    authApi.clearAuth();
    setUser(null);
    router.push('/login');
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}
