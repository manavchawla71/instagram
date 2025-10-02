import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

function ProtectedRoute({ children }) {
  const username = window.localStorage.getItem("username");
  if (!username) {
    window.location.replace("/");
    return null;
  }
  return children;
}

function RootRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const username = window.localStorage.getItem("username");
    if (username) {
      navigate("/dashboard", { replace: true });
    }
    // else stay on login page
  }, [navigate]);
  return <LoginPage />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
