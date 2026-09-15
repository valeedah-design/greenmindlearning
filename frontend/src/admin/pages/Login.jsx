import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "../AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ErrorBanner } from "../components/Feedback";
import PasswordInput from "../components/PasswordInput";

const darkPasswordClassName =
  "mt-1.5 bg-navy border-navy-line text-white placeholder:text-slate-500 focus-visible:ring-forest";
const darkIconClassName = "text-slate-500 hover:text-slate-300";

export default function Login() {
  const { login, isAuthenticated, checking } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // "login" is the normal sign-in form; "recover" is the forgot-password form.
  const [mode, setMode] = useState("login");

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

        {mode === "login" ? (
          <>
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
                <PasswordInput
                  id="admin-password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={darkPasswordClassName}
                  iconClassName={darkIconClassName}
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

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setMode("recover");
                }}
                className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-200"
                data-testid="admin-forgot-password-link"
              >
                Forgot password?
              </button>
            </form>
          </>
        ) : (
          <RecoverForm onBackToLogin={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}

function RecoverForm({ onBackToLogin }) {
  const { recoverPassword } = useAuth();

  const [username, setUsername] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !recoveryCode || !newPassword) {
      setError("Please fill in every field.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation don't match.");
      return;
    }

    setSubmitting(true);
    const res = await recoverPassword({ username: username.trim(), recoveryCode, newPassword });
    setSubmitting(false);

    if (res.ok) {
      setSuccess(true);
    } else {
      setError(res.error);
    }
  };

  if (success) {
    return (
      <div>
        <p className="text-sm text-slate-400 mb-6">Password reset</p>
        <div
          role="status"
          className="flex items-start gap-2 rounded-xl border border-forest/30 bg-forest/10 px-4 py-3 text-sm font-semibold text-leaf mb-6"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
          Your password has been reset. You can log in with it now.
        </div>
        <Button
          type="button"
          onClick={onBackToLogin}
          className="w-full bg-forest hover:bg-forest-dark text-white h-10"
          data-testid="recover-back-to-login"
        >
          Back to login
        </Button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-slate-400 mb-6">
        Reset your password using the shared recovery code. Ask the site owner if you don't have it.
      </p>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="recover-username" className="text-slate-300">
            Username
          </Label>
          <Input
            id="recover-username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1.5 bg-navy border-navy-line text-white placeholder:text-slate-500 focus-visible:ring-forest"
            placeholder="Your admin username"
            data-testid="recover-username-input"
          />
        </div>
        <div>
          <Label htmlFor="recover-code" className="text-slate-300">
            Recovery code
          </Label>
          <PasswordInput
            id="recover-code"
            value={recoveryCode}
            onChange={(e) => setRecoveryCode(e.target.value)}
            className={darkPasswordClassName}
            iconClassName={darkIconClassName}
            placeholder="Shared recovery code"
            data-testid="recover-code-input"
          />
        </div>
        <div>
          <Label htmlFor="recover-new-password" className="text-slate-300">
            New password
          </Label>
          <PasswordInput
            id="recover-new-password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={darkPasswordClassName}
            iconClassName={darkIconClassName}
            placeholder="At least 8 characters"
            data-testid="recover-new-password-input"
          />
        </div>
        <div>
          <Label htmlFor="recover-confirm-password" className="text-slate-300">
            Confirm new password
          </Label>
          <PasswordInput
            id="recover-confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={darkPasswordClassName}
            iconClassName={darkIconClassName}
            placeholder="Repeat the new password"
            data-testid="recover-confirm-password-input"
          />
        </div>

        {error && <ErrorBanner message={error} className="bg-red-950/40 border-red-900 text-red-300" />}

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-forest hover:bg-forest-dark text-white h-10"
          data-testid="recover-submit"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reset password"}
        </Button>

        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-200"
          data-testid="recover-cancel"
        >
          Back to login
        </button>
      </form>
    </div>
  );
}
