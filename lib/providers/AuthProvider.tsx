"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../types/user";


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

  // console.log(user)

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
        // console.log("result form auth provider", result)

        if (res.ok) {
          setUser(result.data);
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