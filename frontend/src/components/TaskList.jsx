import TaskItem from "./TaskItem";

export default function TaskList({ tasks, fetchTasks }) {
  if (tasks.length === 0) {
    return (
      <div style={s.empty}>
        <div style={s.emptyIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="1"/>
            <line x1="9" y1="12" x2="15" y2="12"/>
            <line x1="9" y1="16" x2="13" y2="16"/>
          </svg>
        </div>
        <p style={s.emptyTitle}>No tasks found</p>
        <p style={s.emptySub}>Create a new task or adjust your search filters</p>
      </div>
    );
  }

  return (
    <div>
      <div style={s.listHeader}>
        <span style={s.listTitle}>Active Tasks</span>
        <span style={s.listCount}>{tasks.length} {tasks.length === 1 ? "task" : "tasks"}</span>
      </div>
      <div style={s.grid}>
        {tasks.map(t => <TaskItem key={t._id} task={t} fetchTasks={fetchTasks} />)}
      </div>
    </div>
  );
}

const s = {
  listHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" },
  listTitle:  { fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.7)" },
  listCount:  {
    padding: "4px 12px", background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px",
    fontSize: "12px", fontWeight: "600", color: "rgba(255,255,255,0.4)"
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "16px" },
  empty: {
    textAlign: "center", padding: "80px 20px",
    background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.07)",
    borderRadius: "20px"
  },
  emptyIcon:  { marginBottom: "20px" },
  emptyTitle: { fontSize: "18px", fontWeight: "700", color: "rgba(255,255,255,0.4)", marginBottom: "8px" },
  emptySub:   { fontSize: "14px", color: "rgba(255,255,255,0.2)" }
};
