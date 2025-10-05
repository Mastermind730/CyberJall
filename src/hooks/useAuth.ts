import { useState, useEffect } from 'react';
import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

interface User {
  id: string;
  role: string;
  company_name?: string;
  work_email: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
}

const secret = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_JWT_SECRET || "fallback-secret-key"
);

// Helper function to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue || null;
  }
  return null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async (request: NextRequest) => {
      try {
        // Get token directly from cookies like middleware does
          const token = request.cookies.get("auth_token")?.value;

        // const token = getCookie('auth_token');
        console.log(token);
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Verify token and get payload directly
        const { payload } = await jwtVerify(token, secret);
        console.log('Token payload:', payload);
        
        // Handle both old and new token formats
        const userId = payload.userId || payload.id;
        const userEmail = payload.email;
        const userRole = payload.role;
        
        if (!userId || !userEmail || !userRole) {
          console.error('Invalid token payload:', payload);
          setUser(null);
          setLoading(false);
          return;
        }
        
        setUser({
          id: userId as string,
          role: userRole as string,
          work_email: userEmail as string,
          email: userEmail as string,
          company_name: payload.company_name as string || undefined,
          name: payload.name as string || undefined,
          avatarUrl: payload.avatarUrl as string || undefined,
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      // Call logout API to clear server-side session
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        console.log('Logout successful');
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear client-side state regardless of API call result
      setUser(null);
      
      // Redirect to login or home page
      window.location.href = '/login';
    }
  };

  return { user, loading, logout };
}