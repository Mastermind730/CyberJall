import { useState, useEffect } from 'react';
import { jwtVerify } from 'jose';

interface User {
  id: string;
  role: string;
  company_name?: string;
  work_email: string;
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
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || '');
        
        const { payload } = await jwtVerify(token, secret);
        
        setUser({
          id: payload.userId as string,
          role: payload.role as string,
          company_name: payload.company_name as string,
          work_email: payload.work_email as string,
        });
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading };
}