import { AlertTriangle, Loader2 } from "lucide-react";

export function ErrorBanner({ message, className = "" }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className={`flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm ${className}`}
    >
      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export function Spinner({ label = "Loading…", className = "" }) {
  return (
    <div className={`flex items-center gap-2 text-sm text-slate-500 py-10 justify-center ${className}`}>
      <Loader2 className="h-4 w-4 animate-spin" />
      {label}
    </div>
  );
}

export function EmptyState({ children, className = "" }) {
  return (
    <div className={`text-sm text-slate-500 border border-dashed border-slate-300 rounded-xl px-4 py-8 text-center ${className}`}>
      {children}
    </div>
  );
}
