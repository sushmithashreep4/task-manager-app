import { useState } from "react";
import api from "../api";

export default function TaskItem({ task, fetchTasks }) {
  const [editing, setEditing]   = useState(false);
  const [editForm, setEditForm] = useState({ staffName: task.staffName, task: task.task, dateTime: task.dateTime });
  const [error, setError]       = useState("");

  const toggleStatus = async () => {
    try {
      await api.put(`/${task._id}`, { ...task, status: task.status === "Pending" ? "Completed" : "Pending" });
      fetchTasks();
    } catch {
      setError("Failed to update status.");
    }
  };

  const deleteTask = async () => {
    if (window.confirm("Remove this task permanently?")) {
      try {
        await api.delete(`/${task._id}`);
        fetchTasks();
      } catch {
        setError("Failed to delete task.");
      }
    }
  };

  const saveEdit = async () => {
    try {
      await api.put(`/${task._id}`, { ...task, ...editForm });
      setEditing(false);
      setError("");
      fetchTasks();
    } catch {
      setError("Failed to save changes.");
    }
  };

  const isPending = task.status === "Pending";

  return (
    <div style={s.card}>
      {error && <div style={s.cardError}>⚠ {error}</div>}
      {/* top bar */}
      <div style={s.topBar}>
        <span style={{ ...s.badge, ...(isPending ? s.badgePending : s.badgeDone) }}>
          <span style={s.badgeDot(isPending ? "#f59e0b" : "#10b981")} />
          {isPending ? "Pending" : "Completed"}
        </span>
        <div style={s.actions}>
          <button onClick={() => setEditing(!editing)} style={s.iconBtn} title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button onClick={deleteTask} style={s.iconBtnRed} title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      </div>

      {editing ? (
        <div style={s.editWrap}>
          <input value={editForm.staffName} onChange={e => setEditForm({...editForm, staffName: e.target.value})} style={s.editInput} placeholder="Staff Name" />
          <input value={editForm.task}      onChange={e => setEditForm({...editForm, task: e.target.value})}      style={s.editInput} placeholder="Task" />
          <input type="datetime-local" value={editForm.dateTime?.slice(0,16)} onChange={e => setEditForm({...editForm, dateTime: e.target.value})} style={{...s.editInput, colorScheme:"dark"}} />
          <div style={s.editBtns}>
            <button onClick={saveEdit}          style={s.saveBtn}>Save Changes</button>
            <button onClick={() => setEditing(false)} style={s.cancelBtn}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div style={s.staffName}>{task.staffName}</div>
          <div style={s.taskText}>{task.task}</div>
          <div style={s.meta}>
            <span style={s.metaItem}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {new Date(task.dateTime).toLocaleString("en-US", { month:"short", day:"numeric", year:"numeric", hour:"2-digit", minute:"2-digit" })}
            </span>
          </div>
          <button onClick={toggleStatus} style={isPending ? s.completeBtn : s.revertBtn}>
            {!isPending && <span style={s.blinkTick}>✓</span>}
            {isPending ? "Mark Complete" : "Revert to Pending"}
          </button>
        </>
      )}
    </div>
  );
}

const s = {
  card: {
    background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "18px", padding: "24px",
    display: "flex", flexDirection: "column", gap: "14px",
    backdropFilter: "blur(20px)", transition: "border-color 0.2s, transform 0.2s",
    animation: "fadeInUp 0.4s ease"
  },
  cardError: {
    padding: "8px 14px", background: "rgba(239,68,68,0.08)",
    border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px",
    fontSize: "12px", color: "#f87171", fontWeight: "500"
  },
  topBar:   { display: "flex", justifyContent: "space-between", alignItems: "center" },
  badge:    { display: "flex", alignItems: "center", gap: "7px", padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" },
  badgePending: { background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" },
  badgeDone:    { background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" },
  badgeDot: (c) => ({ width: 6, height: 6, borderRadius: "50%", background: c }),
  actions:  { display: "flex", gap: "8px" },
  iconBtn:  {
    display:"flex", alignItems:"center", justifyContent:"center",
    width: 32, height: 32, background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px",
    color: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s"
  },
  iconBtnRed: {
    display:"flex", alignItems:"center", justifyContent:"center",
    width: 32, height: 32, background: "rgba(239,68,68,0.08)",
    border: "1px solid rgba(239,68,68,0.15)", borderRadius: "8px",
    color: "#ef4444", cursor: "pointer", transition: "all 0.2s"
  },
  staffName: { fontSize: "18px", fontWeight: "700", color: "#fff" },
  taskText:  { fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6" },
  meta:      { display: "flex", gap: "16px" },
  metaItem:  { display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255,255,255,0.3)", fontWeight: "500" },
  completeBtn: {
    padding: "10px 18px", background: "linear-gradient(135deg,#c9a84c,#a88a3d)",
    border: "none", borderRadius: "10px", color: "#0a0a0f",
    fontSize: "13px", fontWeight: "700", cursor: "pointer",
    boxShadow: "0 4px 16px rgba(201,168,76,0.2)", transition: "all 0.2s"
  },
  revertBtn: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "10px 18px", background: "rgba(16,185,129,0.06)",
    border: "1px solid rgba(16,185,129,0.2)", borderRadius: "10px",
    color: "rgba(255,255,255,0.45)", fontSize: "13px", fontWeight: "600",
    cursor: "pointer", transition: "all 0.2s"
  },
  blinkTick: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: 18, height: 18, borderRadius: "50%",
    background: "#10b981", color: "#fff",
    fontSize: "11px", fontWeight: "800", lineHeight: 1,
    animation: "tickPulse 1.4s ease-in-out infinite",
    flexShrink: 0
  },
  editWrap:  { display: "flex", flexDirection: "column", gap: "10px" },
  editInput: {
    padding: "11px 14px", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(201,168,76,0.25)", borderRadius: "10px",
    color: "#f0f0f5", fontSize: "14px", outline: "none"
  },
  editBtns:  { display: "flex", gap: "10px", marginTop: "4px" },
  saveBtn:   {
    flex: 1, padding: "11px", background: "linear-gradient(135deg,#c9a84c,#a88a3d)",
    border: "none", borderRadius: "10px", color: "#0a0a0f", fontWeight: "700", cursor: "pointer"
  },
  cancelBtn: {
    flex: 1, padding: "11px", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px",
    color: "rgba(255,255,255,0.5)", fontWeight: "600", cursor: "pointer"
  }
};
