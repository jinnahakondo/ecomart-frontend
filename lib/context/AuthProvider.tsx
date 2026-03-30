"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};


type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);


export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/me`, {
          method: "GET",
          credentials: "include"
        })
        const result = await res.json()
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    getUser()

  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);