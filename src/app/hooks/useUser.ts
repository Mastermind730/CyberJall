"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id?: string;
  name?: string;
  email?: string;
  company_name?: string;
  work_email?: string;
  contact?: string;
  role?: "provider" | "customer" | "admin";
  validatedCompanyId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  avatarUrl?: string;
}

export interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasCompany: boolean;
  companyLoading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
  checkCompanyProfile: () => Promise<void>;
  clearAuthState: () => void;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompany, setHasCompany] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const router = useRouter();

  // Helper function to get user initials
  const getInitials = useCallback((name?: string, email?: string): string => {
    if (name && name.length > 0) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email && email.length > 0) {
      return email[0].toUpperCase();
    }
    return "U";
  }, []);

  // Clear all authentication state
  const clearAuthState = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    setHasCompany(false);
    setIsLoading(false);

    // Try to clear any client-side accessible cookies
    try {
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + window.location.hostname;
      });
    } catch (error) {
      console.error("Error clearing cookies:", error);
    }
  }, []);

  // Check if provider has company profile
  const checkCompanyProfile = useCallback(async () => {
    if (!user || user.role !== "provider") return;
    
    setCompanyLoading(true);
    try {
      const response = await fetch("/api/getCompany", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setHasCompany(data.hasCompany || false);
      } else if (response.status === 401) {
        // Token invalid, clear auth state
        clearAuthState();
      } else {
        setHasCompany(false);
      }
    } catch (error) {
      console.error("Error checking company profile:", error);
      setHasCompany(false);
    } finally {
      setCompanyLoading(false);
    }
  }, [user, clearAuthState]);

  // Verify authentication status with server
  const verifyAuthStatus = useCallback(async (userData: User) => {
    console.log("useUser: Verifying auth status for:", userData);
    try {
      const response = await fetch("/api/getCompany", {
        method: "GET",
        credentials: "include",
      });

      console.log("useUser: Auth verification response status:", response.status);

      if (response.ok) {
        // Token is valid, set user data
        console.log("useUser: Auth verification successful, setting user");
        setUser(userData);
        // Check if provider has company profile
        if (userData.role === "provider") {
          const data = await response.json();
          setHasCompany(data.hasCompany || false);
        }
      } else if (response.status === 401) {
        // Token is invalid, clear everything
        console.log("useUser: Auth verification failed - 401, clearing auth state");
        clearAuthState();
      }
    } catch (error) {
      console.error("useUser: Auth verification failed:", error);
      // On network error, assume auth is invalid for security
      clearAuthState();
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthState]);

  // Initialize user from localStorage
  useEffect(() => {
    const initializeUser = async () => {
      console.log("useUser: Initializing user...");
      try {
        const userStr = localStorage.getItem("user");
        console.log("useUser: localStorage user:", userStr);
        if (userStr) {
          const userData = JSON.parse(userStr);
          console.log("useUser: Parsed user data:", userData);
          await verifyAuthStatus(userData);
        } else {
          console.log("useUser: No user in localStorage, checking server auth");
          // Even if no localStorage data, check if there's a valid JWT token
          await checkServerAuth();
        }
      } catch (error) {
        console.error("useUser: Error initializing user:", error);
        clearAuthState();
      }
    };

    initializeUser();
  }, [verifyAuthStatus, clearAuthState]);

  // Check server authentication without localStorage data
  const checkServerAuth = async () => {
    try {
      const response = await fetch("/api/me", {
        method: "GET",
        credentials: "include",
      });

      console.log("useUser: Server auth check response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("useUser: Got user data from server:", data.user);
        setUser(data.user);
        
        // Also store in localStorage for next time
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Check company profile for providers
        if (data.user.role === "provider") {
          const companyResponse = await fetch("/api/getCompany", {
            method: "GET",
            credentials: "include",
          });
          if (companyResponse.ok) {
            const companyData = await companyResponse.json();
            setHasCompany(companyData.hasCompany || false);
          }
        }
      } else {
        console.log("useUser: No valid server authentication");
      }
    } catch (error) {
      console.error("useUser: Server auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Check company profile for providers
    if (userData.role === "provider") {
      checkCompanyProfile();
    }
  }, [checkCompanyProfile]);

  // Logout function
  const logout = useCallback(async () => {
    console.log("Logout initiated");
    
    try {
      // Call the logout API to clear server-side auth cookies
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        console.log("Logout API successful");
      } else {
        console.error("Logout API failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      clearAuthState();
      
      console.log("Client state cleared, redirecting to login");
      
      // Force a complete page reload to ensure all cached state is cleared
      window.location.href = "/login";
    }
  }, [clearAuthState]);

  // Update user data
  const updateUser = useCallback((userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }, [user]);

  // Refresh user data from server
  const refreshUser = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      await verifyAuthStatus(user);
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  }, [user, verifyAuthStatus]);

  // Computed values
  const isAuthenticated = !!user;

  return {
    user,
    isLoading,
    isAuthenticated,
    hasCompany,
    companyLoading,
    login,
    logout,
    updateUser,
    refreshUser,
    checkCompanyProfile,
    clearAuthState,
  };
}