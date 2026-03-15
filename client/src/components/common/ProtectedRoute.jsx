// src/components/common/ProtectedRoute.jsx
// This component protects pages that require login
// If user is NOT logged in → redirect to login page
// If user IS logged in → show the page

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth(); // get logged in user from context

  // if no user → send to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // if user exists → show the page
  return children;
}

export default ProtectedRoute;