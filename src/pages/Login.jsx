export default function Login({ setToken }) {

  const handleLogin = () => {
    setToken("1234");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#0f172a"
    }}>
      <div style={{
        background: "#1e293b",
        padding: 40,
        borderRadius: 12,
        textAlign: "center"
      }}>
        <h2 style={{ color: "white" }}>💳 Fraud System</h2>
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 30px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}