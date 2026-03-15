// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute"; // ← import it

// pages
import LandingPage        from "./pages/LandingPage";
import LoginPage          from "./pages/LoginPage";
import RegisterPage       from "./pages/RegisterPage";
import ProfilePage        from "./pages/ProfilePage";
import DashboardPage      from "./pages/DashboardPage";
import BrowseProjectsPage from "./pages/BrowseProjectsPage";
import CreateProjectPage  from "./pages/CreateProjectPage";
import ProjectDetailPage  from "./pages/ProjectDetailPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* public pages - anyone can visit */}
          <Route path="/"         element={<LandingPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/browse"   element={<BrowseProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />

          {/* protected pages - only logged in users */}
          <Route path="/profile" element={
            <ProtectedRoute><ProfilePage /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
          <Route path="/create-project" element={
            <ProtectedRoute><CreateProjectPage /></ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
