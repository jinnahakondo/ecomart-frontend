"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../types/user";

const CACHE_KEY = "auth_cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

type CachedAuth = {
  user: IUser | null;
  timestamp: number;
};

type AuthContextType = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { user: cachedUser, timestamp }: CachedAuth = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            setUser(cachedUser);
            setLoading(false);
            return;
          }
        }

        // Fetch from API
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/auth/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await res.json();

        if (res.ok) {
          setUser(result.data);
          // Cache the result
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ user: result.data, timestamp: Date.now() })
          );
        } else {
          setUser(null);
          localStorage.removeItem(CACHE_KEY);
        }
      } catch (error) {
        setUser(null);
        localStorage.removeItem(CACHE_KEY);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
