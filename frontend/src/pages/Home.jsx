import { useEffect, useState } from "react";
import api from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks]   = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [error, setError]   = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/");
      setTasks(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load tasks. Please check your connection.");
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const total     = tasks.length;
  const pending   = tasks.filter(t => t.status === "Pending").length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const rate      = total ? Math.round((completed / total) * 100) : 0;

  const filtered = tasks
    .filter(t => filter === "All" || t.status === filter)
    .filter(t =>
      t.staffName.toLowerCase().includes(search.toLowerCase()) ||
      t.task.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div style={s.page}>

      {/* ── NAVBAR ── */}
      <nav style={s.navbar}>
        <div style={s.navLeft}>
          <div style={s.navDot} />
          <span style={s.navBrand}>WorkFlow</span>
          <span style={s.navDivider}>|</span>
          <span style={s.navSub}>Task Management System</span>
        </div>
        <img
          src="https://ibots.in/wp-content/uploads/2025/03/Ibots-Logo-2048x827.png"
          alt="iBots"
          style={s.logo}
        />
      </nav>

      {/* ── ERROR BANNER ── */}
      {error && (
        <div style={s.errorBanner}>
          <span>⚠ {error}</span>
          <button onClick={fetchTasks} style={s.retryBtn}>Retry</button>
        </div>
      )}

      {/* ── HERO ── */}
      <div style={s.hero}>
        <div style={s.heroTag}>Enterprise Dashboard</div>
        <h1 style={s.heroTitle}>Manage Tasks,<br /><span style={s.heroAccent}>Deliver Results.</span></h1>
        <p style={s.heroSub}>Streamline your team's workflow with real-time task tracking and intelligent insights.</p>
      </div>

      {/* ── STATS ── */}
      <div style={s.statsRow}>
        {[
          { label: "Total Tasks",    value: total,     color: "#6366f1", bg: "rgba(99,102,241,0.1)",  border: "rgba(99,102,241,0.2)",  icon: "◈" },
          { label: "Pending",        value: pending,   color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.2)",  icon: "◷" },
          { label: "Completed",      value: completed, color: "#10b981", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.2)",  icon: "◉" },
          { label: "Completion Rate",value: `${rate}%`,color: "#c9a84c", bg: "rgba(201,168,76,0.1)",  border: "rgba(201,168,76,0.2)",  icon: "◎" },
        ].map(stat => (
          <div key={stat.label} style={{...s.statCard, background: stat.bg, borderColor: stat.border}}>
            <div style={{...s.statIcon, color: stat.color}}>{stat.icon}</div>
            <div style={{...s.statVal, color: stat.color}}>{stat.value}</div>
            <div style={s.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── FORM ── */}
      <TaskForm fetchTasks={fetchTasks} />

      {/* ── CONTROLS ── */}
      <div style={s.controls}>
        <div style={s.searchWrap}>
          <span style={s.searchIcon}>⌕</span>
          <input
            type="text"
            placeholder="Search by staff name or task..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={s.searchInput}
          />
        </div>
        <div style={s.filters}>
          {["All", "Pending", "Completed"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ ...s.filterBtn, ...(filter === f ? s.filterActive : {}) }}
            >
              {f}
              <span style={{...s.filterCount, ...(filter === f ? s.filterCountActive : {})}}>
                {f === "All" ? total : f === "Pending" ? pending : completed}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── LIST ── */}
      <TaskList tasks={filtered} fetchTasks={fetchTasks} />

      {/* ── FOOTER ── */}
      <div style={s.footer}>
        <span>Powered by</span>
        <img
          src="https://ibots.in/wp-content/uploads/2025/03/Ibots-Logo-2048x827.png"
          alt="iBots"
          style={s.footerLogo}
        />
      </div>
    </div>
  );
}

const s = {
  page: { maxWidth: "1280px", margin: "0 auto", padding: "0 28px 60px" },

  /* navbar */
  navbar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "20px 0", marginBottom: "60px",
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  },
  navLeft:    { display: "flex", alignItems: "center", gap: "12px" },
  navDot:     { width: 8, height: 8, borderRadius: "50%", background: "#c9a84c", boxShadow: "0 0 8px #c9a84c" },
  navBrand:   { fontSize: "16px", fontWeight: "700", color: "#fff", letterSpacing: "0.5px" },
  navDivider: { color: "rgba(255,255,255,0.2)", fontSize: "18px" },
  navSub:     { fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: "400" },
  logo:       { height: "36px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" },

  /* hero */
  hero:      { textAlign: "center", marginBottom: "60px", animation: "fadeInUp 0.6s ease" },
  heroTag:   {
    display: "inline-block", padding: "6px 18px", marginBottom: "20px",
    background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
    borderRadius: "20px", fontSize: "12px", fontWeight: "600",
    color: "#818cf8", letterSpacing: "1px", textTransform: "uppercase"
  },
  heroTitle: { fontSize: "clamp(36px,5vw,64px)", fontWeight: "800", lineHeight: "1.15", marginBottom: "18px", color: "#fff" },
  heroAccent:{ background: "linear-gradient(135deg,#c9a84c,#f4e5a1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroSub:   { fontSize: "17px", color: "rgba(255,255,255,0.45)", maxWidth: "520px", margin: "0 auto", lineHeight: "1.7" },

  /* stats */
  statsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "16px", marginBottom: "40px" },
  statCard: {
    padding: "28px 24px", borderRadius: "16px", border: "1px solid",
    display: "flex", flexDirection: "column", gap: "6px",
    transition: "transform 0.2s ease"
  },
  statIcon:  { fontSize: "22px", marginBottom: "4px" },
  statVal:   { fontSize: "38px", fontWeight: "800", lineHeight: "1" },
  statLabel: { fontSize: "13px", color: "rgba(255,255,255,0.45)", fontWeight: "500", marginTop: "4px" },

  /* controls */
  controls:    { display: "flex", gap: "14px", marginBottom: "28px", flexWrap: "wrap", alignItems: "center" },
  searchWrap:  { flex: 1, minWidth: "260px", position: "relative" },
  searchIcon:  { position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "rgba(255,255,255,0.3)" },
  searchInput: {
    width: "100%", padding: "13px 18px 13px 46px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px", color: "#f0f0f5", fontSize: "14px", outline: "none", transition: "all 0.2s"
  },
  filters:     { display: "flex", gap: "8px" },
  filterBtn:   {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "12px 20px", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px",
    color: "rgba(255,255,255,0.55)", fontSize: "13px", fontWeight: "600",
    cursor: "pointer", transition: "all 0.2s ease"
  },
  filterActive: {
    background: "rgba(201,168,76,0.12)", borderColor: "rgba(201,168,76,0.35)",
    color: "#c9a84c"
  },
  filterCount: {
    padding: "2px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: "700",
    background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)"
  },
  filterCountActive: { background: "rgba(201,168,76,0.2)", color: "#c9a84c" },

  errorBanner: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "14px 20px", marginBottom: "24px",
    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: "12px", fontSize: "14px", color: "#f87171"
  },
  retryBtn: {
    padding: "6px 16px", background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px",
    color: "#f87171", fontSize: "13px", fontWeight: "600", cursor: "pointer"
  },
  /* footer */
  footer: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
    marginTop: "60px", paddingTop: "30px", borderTop: "1px solid rgba(255,255,255,0.06)",
    fontSize: "13px", color: "rgba(255,255,255,0.25)"
  },
  footerLogo: { height: "20px", width: "auto", filter: "brightness(0) invert(1)", opacity: 0.4 }
};
