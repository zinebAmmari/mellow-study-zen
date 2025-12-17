import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI, setAuthToken } from "@/lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user && user.accessToken) setAuthToken(user.accessToken);
  }, [user]);

  const register = async ({ name, email, password }) => {
    const res = await authAPI.register({ name, email, password });
    const { accessToken, refreshToken, user: u } = res.data;
    const stored = { ...u, accessToken, refreshToken };
    localStorage.setItem("user", JSON.stringify(stored));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setAuthToken(accessToken);
    setUser(stored);
    return stored;
  };

  const login = async ({ email, password }) => {
    const res = await authAPI.login({ email, password });
    const { accessToken, refreshToken, user: u } = res.data;
    const stored = { ...u, accessToken, refreshToken };
    localStorage.setItem("user", JSON.stringify(stored));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setAuthToken(accessToken);
    setUser(stored);
    return stored;
  };

  const logout = async () => {
    try {
      const current =
        user || JSON.parse(localStorage.getItem("user") || "null");
      if (current && current.id) {
        await authAPI.logout({ userId: current.id });
      }
    } catch (e) {
      // ignore
    }
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
