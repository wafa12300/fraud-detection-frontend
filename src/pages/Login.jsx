import { useState } from "react";

export default function Login({ setToken }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    // ✅ بسيط — تنجم تبدل الـ credentials
    if (email === "admin@mail.com" && password === "admin123") {
      setToken("1234");
    } else {
      setError("❌ Invalid email or password");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #0f172a, #1e293b)"
    }}>
      <div style={{
        background: "#1e293b",
        padding: 40,
        borderRadius: 16,
        textAlign: "center",
        width: 360,
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
      }}>
        <h2 style={{ color: "white", marginBottom: 8 }}>💳 Fraud System</h2>
        <p style={{ color: "#94a3b8", marginBottom: 30 }}>Sign in to your account</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            marginBottom: 12,
            borderRadius: 8,
            border: "1px solid #334155",
            background: "#0f172a",
            color: "white",
            fontSize: 14,
            boxSizing: "border-box"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          style={{
            width: "100%",
            padding: "12px 16px",
            marginBottom: 20,
            borderRadius: 8,
            border: "1px solid #334155",
            background: "#0f172a",
            color: "white",
            fontSize: 14,
            boxSizing: "border-box"
          }}
        />

        {error && (
          <p style={{ color: "#f87171", marginBottom: 16, fontSize: 14 }}>
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
            fontWeight: "bold"
          }}
        >
          🔐 Login
        </button>

        <p style={{ color: "#475569", marginTop: 20, fontSize: 12 }}>
          admin@fraud.com / admin123
        </p>
      </div>
    </div>
  );
}