// AuthContext.jsx
// This file gives the whole app access to the logged-in user's data
// Without this, you'd have to pass user data as props to every single page

import { createContext, useContext, useState } from "react";

// Step 1: create an empty context (like an empty box)
const AuthContext = createContext();

export function AuthProvider({ children }) {

  // user = null means not logged in
  // user = { id, name, email } means logged in
  const [user, setUser] = useState(() => {
    // check localStorage on page load
    // so user stays logged in even after refreshing the page
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // called after successful login
  function login(userData, jwtToken) {
    setUser(userData);
    setToken(jwtToken);
    // save to localStorage so it survives page refresh
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  }

  // called when user clicks logout
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    // Step 2: wrap children with the context provider
    // now every page inside can access user, token, login, logout
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Step 3: custom hook so any component can use the context easily
// Usage in any page: const { user, login, logout } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}