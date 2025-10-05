import { useState, useEffect } from 'react';

interface User {
  id: string;
  role: string;
  company_name?: string;
  work_email: string;
  name?: string;
  email?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get token from cookies
        const cookies = document.cookie.split(';');
        const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth_token='));
        
        if (!authCookie) {
          setLoading(false);
          return;
        }

        const token = authCookie.split('=')[1];
        
        // Decode JWT token without verification for client-side use
        // Note: For sensitive data, make an API call to verify the token
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        setUser({
          id: payload.id as string,
          role: payload.role as string,
          work_email: payload.email as string,
          email: payload.email as string,
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading };
}