import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

// A password <Input> with a show/hide toggle (eye icon) on the right side.
// `iconClassName` lets callers adjust the icon color for dark backgrounds
// (see Login.jsx), and any other props pass straight through to <Input>.
export default function PasswordInput({
  className = "",
  iconClassName = "text-slate-400 hover:text-slate-600",
  ...rest
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input type={visible ? "text" : "password"} className={`pr-10 ${className}`} {...rest} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
        aria-label={visible ? "Hide password" : "Show password"}
        className={`absolute inset-y-0 right-0 flex items-center px-3 ${iconClassName}`}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
