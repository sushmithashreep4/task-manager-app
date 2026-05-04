import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin, switchToRegister }) {
  const [form, setForm]   = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Both fields are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token",    res.data.token);
      localStorage.setItem("username", res.data.username);
      onLogin(res.data.username);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <img
          src="https://ibots.in/wp-content/uploads/2025/03/Ibots-Logo-2048x827.png"
          alt="iBots"
          style={s.logo}
        />
        <div style={s.titleWrap}>
          <h1 style={s.title}>Welcome back</h1>
          <p style={s.sub}>Sign in to your Task Manager account</p>
        </div>

        {error && <div style={s.errorBox}>⚠ {error}</div>}

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Username</label>
            <input
              placeholder="Enter your username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              style={s.input}
              autoComplete="username"
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={s.input}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={s.switchText}>
          Don't have an account?{" "}
          <span onClick={switchToRegister} style={s.switchLink}>Create one</span>
        </p>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#060608", padding: "20px"
  },
  card: {
    width: "100%", maxWidth: "420px",
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)",
    borderRadius: "24px", padding: "48px 40px",
    backdropFilter: "blur(20px)", boxShadow: "0 24px 64px rgba(0,0,0,0.4)"
  },
  logo: {
    height: "32px", width: "auto", filter: "brightness(0) invert(1)",
    display: "block", margin: "0 auto 32px"
  },
  titleWrap: { textAlign: "center", marginBottom: "32px" },
  title: { fontSize: "26px", fontWeight: "800", color: "#fff", marginBottom: "8px" },
  sub:   { fontSize: "14px", color: "rgba(255,255,255,0.4)" },
  errorBox: {
    padding: "12px 16px", marginBottom: "20px",
    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: "10px", fontSize: "13px", color: "#f87171", fontWeight: "500"
  },
  form:  { display: "flex", flexDirection: "column", gap: "20px" },
  field: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "12px", fontWeight: "600", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.8px" },
  input: {
    padding: "13px 16px", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px",
    color: "#f0f0f5", fontSize: "14px", outline: "none", transition: "all 0.2s"
  },
  btn: {
    padding: "14px", marginTop: "8px",
    background: "linear-gradient(135deg,#c9a84c,#a88a3d)",
    border: "none", borderRadius: "12px", color: "#0a0a0f",
    fontSize: "15px", fontWeight: "700", cursor: "pointer",
    boxShadow: "0 4px 24px rgba(201,168,76,0.3)", transition: "all 0.2s"
  },
  switchText: { textAlign: "center", marginTop: "24px", fontSize: "13px", color: "rgba(255,255,255,0.35)" },
  switchLink: { color: "#c9a84c", fontWeight: "600", cursor: "pointer" }
};
