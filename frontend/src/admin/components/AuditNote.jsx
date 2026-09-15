import { formatDate } from "../lib/colors";

// "Who touched what and when" — a hard requirement since 3 admins share these accounts.
export default function AuditNote({ item, className = "" }) {
  if (!item) return null;
  const editor = item.updated_by || item.created_by;
  const when = item.updated_at || item.created_at;
  if (!editor && !when) return null;

  const wasEdited = item.updated_by && item.updated_by !== item.created_by;

  return (
    <p className={`text-xs text-slate-400 ${className}`}>
      {wasEdited ? "Last edited by " : "Created by "}
      <span className="font-medium text-slate-500">{editor || "unknown"}</span>
      {when ? ` on ${formatDate(when)}` : ""}
      {wasEdited && item.created_by && (
        <span className="text-slate-400"> · originally created by {item.created_by}</span>
      )}
    </p>
  );
}
