import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NewTransaction from "./pages/NewTransaction";

function App() {
  const [token, setToken] = useState(null);
//AZERTY
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login setToken={setToken} />} />

        <Route
          path="/dashboard"
          element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/login" />}
        />

        <Route
          path="/new-transaction"
          element={token ? <NewTransaction /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;

