import { useState } from "react";
import axios from "axios";

export default function Register({ onLogin, switchToLogin }) {
  const [form, setForm]     = useState({ username: "", email: "", password: "", confirm: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const validate = () => {
    if (!form.username || !form.email || !form.password || !form.confirm)
      return "All fields are required";
    if (form.username.length < 2)
      return "Username must be at least 2 characters";
    if (!/\S+@\S+\.\S+/.test(form.email))
      return "Enter a valid email address";
    if (form.password.length < 6)
      return "Password must be at least 6 characters";
    if (form.password !== form.confirm)
      return "Passwords do not match";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username: form.username,
        email:    form.email,
        password: form.password
      });
      setVerified(true);
      setTimeout(() => {
        localStorage.setItem("token",    res.data.token);
        localStorage.setItem("username", res.data.username);
        onLogin(res.data.username);
      }, 1800);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (verified) {
    return (
      <div style={s.page}>
        <div style={s.card}>
          <div style={s.verifiedWrap}>
            <div style={s.verifiedTick}>✓</div>
            <h2 style={s.verifiedTitle}>Account Verified!</h2>
            <p style={s.verifiedSub}>Welcome aboard. Redirecting you to the dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <img
          src="https://ibots.in/wp-content/uploads/2025/03/Ibots-Logo-2048x827.png"
          alt="iBots"
          style={s.logo}
        />
        <div style={s.titleWrap}>
          <h1 style={s.title}>Create account</h1>
          <p style={s.sub}>Join Task Manager Pro today</p>
        </div>

        {error && <div style={s.errorBox}>⚠ {error}</div>}

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Username</label>
            <input
              placeholder="Choose a username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              style={s.input}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={s.input}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input
              type="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={s.input}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={e => setForm({ ...form, confirm: e.target.value })}
              style={s.input}
            />
          </div>
          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={s.switchText}>
          Already have an account?{" "}
          <span onClick={switchToLogin} style={s.switchLink}>Sign in</span>
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
  form:  { display: "flex", flexDirection: "column", gap: "18px" },
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
  switchLink: { color: "#c9a84c", fontWeight: "600", cursor: "pointer" },
  verifiedWrap: { textAlign: "center", padding: "20px 0" },
  verifiedTick: {
    width: 72, height: 72, borderRadius: "50%",
    background: "linear-gradient(135deg,#10b981,#059669)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "36px", color: "#fff", fontWeight: "800",
    margin: "0 auto 24px",
    boxShadow: "0 0 40px rgba(16,185,129,0.4)",
    animation: "tickPulse 1.4s ease-in-out infinite"
  },
  verifiedTitle: { fontSize: "24px", fontWeight: "800", color: "#fff", marginBottom: "10px" },
  verifiedSub:   { fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6" }
};
