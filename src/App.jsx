import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  const login = (value) => {
    localStorage.setItem("token", value);
    setToken(value);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/" /> : <Login setToken={login} />}
      />
      <Route
        path="/"
        element={token ? <Dashboard logout={logout} /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;