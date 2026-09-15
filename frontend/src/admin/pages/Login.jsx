import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ErrorBanner } from "../components/Feedback";

export default function Login() {
  const { login, isAuthenticated, checking } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!checking && isAuthenticated) {
    const dest = location.state?.from?.pathname || "/admin";
    return <Navigate to={dest} replace />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password) {
      setError("Please enter both a username and password.");
      return;
    }
    setSubmitting(true);
    const res = await login(username.trim(), password);
    setSubmitting(false);
    if (res.ok) {
      navigate("/admin", { replace: true });
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm bg-navy-card border border-navy-line rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-leaf" />
          <span className="font-display font-extrabold text-white text-lg">Green Mind Admin</span>
        </div>
        <p className="text-sm text-slate-400 mb-6">Staff sign-in — internal use only.</p>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="admin-username" className="text-slate-300">
              Username
            </Label>
            <Input
              id="admin-username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 bg-navy border-navy-line text-white placeholder:text-slate-500 focus-visible:ring-forest"
              placeholder="e.g. admin1"
              data-testid="admin-username-input"
            />
          </div>
          <div>
            <Label htmlFor="admin-password" className="text-slate-300">
              Password
            </Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 bg-navy border-navy-line text-white placeholder:text-slate-500 focus-visible:ring-forest"
              placeholder="••••••••"
              data-testid="admin-password-input"
            />
          </div>

          {error && (
            <ErrorBanner message={error} className="bg-red-950/40 border-red-900 text-red-300" />
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-forest hover:bg-forest-dark text-white h-10"
            data-testid="admin-login-submit"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
