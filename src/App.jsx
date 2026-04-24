import { useState } from "react";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import NewTransaction from "./pages/NewTransaction";
import Clients from "./pages/Clients";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function App() {

  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {

      case "dashboard":
        return <Dashboard />;

      case "transaction":
        return <NewTransaction />;

      case "clients":
        return <Clients />;

      case "analytics":
        return <Analytics />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: "flex" }}>

      <Sidebar setPage={setPage} />

      <div style={{ flex: 1, padding: 20 }}>
        {renderPage()}
      </div>

    </div>
  );
}