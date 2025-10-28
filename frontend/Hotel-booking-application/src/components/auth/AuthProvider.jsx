import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage if still logged in
    const token = localStorage.getItem("token");
    if (token) {
      setUser({
        id: localStorage.getItem("userId"),
        email: localStorage.getItem("userEmail"),
        roles: JSON.parse(localStorage.getItem("userRoles") || "[]"),
        token
      });
    }
  }, []);

  const handleLogin = (data) => {
    // data = response from backend login
    localStorage.setItem("userId", data.id);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userRoles", JSON.stringify(data.roles));
    localStorage.setItem("token", data.token);

    setUser({
      id: data.id,
      email: data.email,
      roles: data.roles,
      token: data.token
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRoles");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
