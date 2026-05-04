import { useState } from "react";
import api from "../api";

export default function TaskForm({ fetchTasks }) {
  const [form, setForm]      = useState({ staffName: "", task: "", dateTime: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");
  const [fieldErr, setFieldErr] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.staffName.trim())       errs.staffName = "Staff name is required";
    else if (form.staffName.trim().length < 2) errs.staffName = "Name must be at least 2 characters";
    if (!form.task.trim())            errs.task = "Task description is required";
    else if (form.task.trim().length < 5)      errs.task = "Description must be at least 5 characters";
    if (!form.dateTime)               errs.dateTime = "Date & time is required";
    else if (new Date(form.dateTime) < new Date()) errs.dateTime = "Date must be in the future";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErr(errs); return; }
    setFieldErr({});
    setLoading(true);
    try {
      await api.post("/", form);
      setForm({ staffName: "", task: "", dateTime: "" });
      setSuccess(true);
      setError("");
      setTimeout(() => setSuccess(false), 2500);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>New Task</h2>
          <p style={s.sub}>Assign a task to a team member</p>
        </div>
        {success && <div style={s.toast}>✓ Task created successfully</div>}
        {error  && <div style={s.toastError}>✕ {error}</div>}
      </div>

      <form onSubmit={handleSubmit} style={s.form}>
        <div style={s.field}>
          <label style={s.label}>Staff Member</label>
          <input
            placeholder="e.g. John Smith"
            value={form.staffName}
            onChange={e => setForm({ ...form, staffName: e.target.value })}
            style={{...s.input, ...(fieldErr.staffName ? s.inputErr : {})}}
          />
          {fieldErr.staffName && <span style={s.fieldErrMsg}>{fieldErr.staffName}</span>}
        </div>
        <div style={{...s.field, gridColumn: "span 2"}}>
          <label style={s.label}>Task Description</label>
          <input
            placeholder="Describe what needs to be done..."
            value={form.task}
            onChange={e => setForm({ ...form, task: e.target.value })}
            style={{...s.input, ...(fieldErr.task ? s.inputErr : {})}}
          />
          {fieldErr.task && <span style={s.fieldErrMsg}>{fieldErr.task}</span>}
        </div>
        <div style={s.field}>
          <label style={s.label}>Due Date & Time</label>
          <input
            type="datetime-local"
            value={form.dateTime}
            onChange={e => setForm({ ...form, dateTime: e.target.value })}
            style={{...s.input, ...(fieldErr.dateTime ? s.inputErr : {}), colorScheme: "dark"}}
          />
          {fieldErr.dateTime && <span style={s.fieldErrMsg}>{fieldErr.dateTime}</span>}
        </div>
        <div style={s.field}>
          <label style={s.label}>&nbsp;</label>
          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? <span style={s.spinner}>●</span> : "＋ Assign Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

const s = {
  wrap: {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px", padding: "32px 36px",
    marginBottom: "28px", backdropFilter: "blur(20px)"
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" },
  title:  { fontSize: "18px", fontWeight: "700", color: "#fff", marginBottom: "4px" },
  sub:    { fontSize: "13px", color: "rgba(255,255,255,0.35)" },
  toast:  {
    padding: "10px 18px", background: "rgba(16,185,129,0.12)",
    border: "1px solid rgba(16,185,129,0.3)", borderRadius: "10px",
    fontSize: "13px", fontWeight: "600", color: "#10b981"
  },
  toastError: {
    padding: "10px 18px", background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.25)", borderRadius: "10px",
    fontSize: "13px", fontWeight: "600", color: "#f87171"
  },
  inputErr:    { borderColor: "rgba(239,68,68,0.5) !important" },
  fieldErrMsg: { fontSize: "11px", color: "#f87171", fontWeight: "500", marginTop: "-4px" },
  form:   { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  field:  { display: "flex", flexDirection: "column", gap: "8px" },
  label:  { fontSize: "12px", fontWeight: "600", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.8px" },
  input:  {
    padding: "13px 16px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px", color: "#f0f0f5", fontSize: "14px",
    outline: "none", transition: "all 0.2s", width: "100%"
  },
  btn: {
    padding: "13px 24px", width: "100%",
    background: "linear-gradient(135deg,#c9a84c,#a88a3d)",
    border: "none", borderRadius: "12px",
    color: "#0a0a0f", fontSize: "14px", fontWeight: "700",
    cursor: "pointer", letterSpacing: "0.3px",
    boxShadow: "0 4px 24px rgba(201,168,76,0.25)", transition: "all 0.2s"
  },
  spinner: { animation: "pulse 1s infinite" }
};
