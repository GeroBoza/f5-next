"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ApiService } from "@/lib/apiService";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  userId: string | null;
  login: ({ email, password }: Record<string, string>) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();

  const login = async (data: Record<string, string>) => {
    const res = await ApiService.login(data);

    if (res.data.auth === true) {
      setToken(res.data.token);
      setUserId(res.data.userId);
      localStorage.setItem("jwt-f5-token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      router.push("/players");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.clear();
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
