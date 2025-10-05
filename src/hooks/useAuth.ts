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
          setUser(null);
          setLoading(false);
          return;
        }

        const token = authCookie.split('=')[1].trim();
        
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }
        
        // Decode JWT token without verification for client-side use
        // Note: For sensitive data, make an API call to verify the token
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded JWT payload:', payload);
        
        // Handle both old and new token formats
        const userId = payload.userId || payload.id;
        const userEmail = payload.email;
        const userRole = payload.role;
        
        if (!userId || !userEmail || !userRole) {
          console.error('Invalid token payload:', payload);
          throw new Error('Invalid token structure');
        }
        
        // For better user experience, we might want to fetch additional user details from API
        // But for now, we'll use what we have from the token
        setUser({
          id: userId,
          role: userRole,
          work_email: userEmail,
          email: userEmail,
          // Set a default company name if available in token
          company_name: payload.company_name || undefined,
          name: payload.name || undefined,
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=lax';
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
      await fetch('/api/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear client-side state regardless of API call result
      document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=lax';
      setUser(null);
      
      // Redirect to login or home page
      window.location.href = '/login';
    }
  };

  return { user, loading, logout };
}