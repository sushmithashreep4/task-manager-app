import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, message: "" };

  static getDerivedStateFromError(err) {
    return { hasError: true, message: err.message };
  }

  componentDidCatch(err, info) {
    console.error("ErrorBoundary caught:", err, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={s.wrap}>
          <div style={s.box}>
            <div style={s.icon}>⚠</div>
            <h2 style={s.title}>Something went wrong</h2>
            <p style={s.msg}>{this.state.message || "An unexpected error occurred."}</p>
            <button style={s.btn} onClick={() => window.location.reload()}>
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const s = {
  wrap: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#060608", padding: "20px"
  },
  box: {
    textAlign: "center", maxWidth: "420px",
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: "20px", padding: "48px 36px"
  },
  icon:  { fontSize: "40px", marginBottom: "16px" },
  title: { fontSize: "20px", fontWeight: "700", color: "#fff", marginBottom: "10px" },
  msg:   { fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "28px", lineHeight: "1.6" },
  btn:   {
    padding: "12px 28px", background: "linear-gradient(135deg,#c9a84c,#a88a3d)",
    border: "none", borderRadius: "12px", color: "#0a0a0f",
    fontSize: "14px", fontWeight: "700", cursor: "pointer"
  }
};
