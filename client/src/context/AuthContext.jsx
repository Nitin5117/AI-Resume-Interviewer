import { createContext, useEffect, useState } from "react";
import { getProfile } from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const response = await getProfile(token);

      setUser(response.data);
    } catch (error) {
      console.error(error);

      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (jwtToken, userData) => {
    localStorage.setItem("token", jwtToken);

    setToken(jwtToken);

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
