"use client"
import React, { createContext, useContext, useEffect, useState } from "react";

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: "user" | "admin";
  provider: "credentials" | "google";
  createdAt: string;
  updatedAt: string;

};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/auth/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await res.json();

        if (res.ok) {
          setUser(result.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
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