import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);
  

  // REGISTER USER
  const register = async (userData) => {
    try {
      const res = await axios.post("http://localhost:5000/register", userData);

      if (res.data.success) {
        return { success: true };
      } else {
        return { success: false, error: res.data.error };
      }
    } catch (err) {
      return { success: false, error: "Server error" };
    }
  };

  
  // LOGIN USER
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: res.data.error };
      }
    } catch (err) {
      return { success: false, error: "Server error" };
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ register, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
