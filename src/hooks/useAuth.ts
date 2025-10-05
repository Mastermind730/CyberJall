import { useState, useEffect } from 'react';

interface User {
  id: string;
  role: string;
  company_name?: string;
  work_email: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Make API request to verify authentication
        // This will automatically include cookies in the request
        const response = await fetch('/api/debug/auth', {
          method: 'GET',
          credentials: 'include', // Important: include cookies in request
        });

        if (!response.ok) {
          setUser(null);
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log('Auth API response:', data);

        if (!data.hasToken) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Now make a request to get user details using the token
        const userResponse = await fetch('/api/debug/token', {
          method: 'GET',
          credentials: 'include',
        });
        console.log(userResponse);

        if (!userResponse.ok) {
          setUser(null);
          setLoading(false);
          return;
        }

        const userData = await userResponse.json();
        console.log('User data response:', userData);

        if (!userData.success || !userData.payload) {
          setUser(null);
          setLoading(false);
          return;
        }

        const payload = userData.payload;
        
        // Handle both old and new token formats
        const userId = payload.userId || payload.id;
        const userEmail = payload.email;
        const userRole = payload.role;
        
        if (!userId || !userEmail || !userRole) {
          console.error('Invalid token payload:', payload);
          throw new Error('Invalid token structure');
        }
        
        setUser({
          id: userId,
          role: userRole,
          work_email: userEmail,
          email: userEmail,
          company_name: payload.company_name || undefined,
          name: payload.name || undefined,
          avatarUrl: payload.avatarUrl || undefined,
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
        credentials: 'include', // Include cookies for logout
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