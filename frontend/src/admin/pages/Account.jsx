import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "../AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ErrorBanner } from "../components/Feedback";

export default function Account() {
  const { username, changeCredentials } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Enter your current password to confirm this change.");
      return;
    }
    if (!newUsername.trim() && !newPassword) {
      setError("Enter a new username and/or a new password.");
      return;
    }
    if (newPassword && newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      setError("New password and confirmation don't match.");
      return;
    }

    setSubmitting(true);
    const res = await changeCredentials({
      currentPassword,
      newUsername: newUsername.trim() || undefined,
      newPassword: newPassword || undefined,
    });
    setSubmitting(false);

    if (res.ok) {
      setSuccess("Your account has been updated.");
      setCurrentPassword("");
      setNewUsername("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setError(res.error);
    }
  };

  return (
    <div data-testid="admin-account-page">
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">Account settings</h1>
      <p className="mt-1.5 text-sm text-slate-500">
        Signed in as <span className="font-semibold text-ink">{username}</span>. Change your own username
        and/or password below — this doesn't affect the other two admin accounts.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 max-w-md space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
        noValidate
      >
        <div>
          <Label htmlFor="account-new-username">New username</Label>
          <Input
            id="account-new-username"
            autoComplete="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="mt-1.5"
            placeholder={`Leave blank to keep "${username}"`}
            data-testid="account-new-username-input"
          />
        </div>

        <div>
          <Label htmlFor="account-new-password">New password</Label>
          <Input
            id="account-new-password"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1.5"
            placeholder="Leave blank to keep current password"
            data-testid="account-new-password-input"
          />
        </div>

        {newPassword && (
          <div>
            <Label htmlFor="account-confirm-password">Confirm new password</Label>
            <Input
              id="account-confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1.5"
              placeholder="••••••••"
              data-testid="account-confirm-password-input"
            />
          </div>
        )}

        <div className="border-t border-slate-100 pt-5">
          <Label htmlFor="account-current-password">Current password</Label>
          <Input
            id="account-current-password"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1.5"
            placeholder="Required to confirm any change"
            data-testid="account-current-password-input"
          />
        </div>

        {error && <ErrorBanner message={error} />}
        {success && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-xl border border-forest/30 bg-forest-light px-4 py-3 text-sm font-semibold text-forest-dark"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {success}
          </div>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-forest hover:bg-forest-dark text-white h-10"
          data-testid="account-save-button"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save changes"}
        </Button>
      </form>
    </div>
  );
}
