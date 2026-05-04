import { useState, useEffect } from "react";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [isAuth, setIsAuth]   = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuth(true);
  }, []);

  const handleLogin = () => setIsAuth(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuth(false);
  };

  if (!isAuth) {
    return (
      <ErrorBoundary>
        {showRegister ? (
          <Register onLogin={handleLogin} switchToLogin={() => setShowRegister(false)} />
        ) : (
          <Login onLogin={handleLogin} switchToRegister={() => setShowRegister(true)} />
        )}
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Home onLogout={handleLogout} />
    </ErrorBoundary>
  );
}

export default App;
