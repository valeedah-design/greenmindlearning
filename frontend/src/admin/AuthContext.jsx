import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api, { getErrorMessage } from "./api";

const TOKEN_KEY = "gml_admin_token";
const NAME_KEY = "gml_admin_name";
const USERNAME_KEY = "gml_admin_username";

function readStorage(key) {
  try {
    return localStorage.getItem(key) || "";
  } catch (e) {
    return "";
  }
}

function writeStorage(key, value) {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch (e) {
    // ignore — storage may be unavailable
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readStorage(TOKEN_KEY));
  const [name, setName] = useState(() => readStorage(NAME_KEY));
  const [username, setUsername] = useState(() => readStorage(USERNAME_KEY));
  // `checking` is true until we've verified any stored token on mount, so
  // ProtectedRoute doesn't flash-redirect to /login before verification finishes.
  const [checking, setChecking] = useState(true);

  const logout = useCallback(() => {
    setToken("");
    setName("");
    setUsername("");
    writeStorage(TOKEN_KEY, "");
    writeStorage(NAME_KEY, "");
    writeStorage(USERNAME_KEY, "");
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function verifyExistingToken() {
      const existing = readStorage(TOKEN_KEY);
      if (!existing) {
        setChecking(false);
        return;
      }
      try {
        const res = await api.get("/auth/me");
        if (cancelled) return;
        setName(res.data?.name || "");
        setUsername(res.data?.username || "");
        writeStorage(NAME_KEY, res.data?.name || "");
        writeStorage(USERNAME_KEY, res.data?.username || "");
      } catch (err) {
        // Token invalid or expired — clear it so the user is sent to login.
        if (!cancelled) logout();
      } finally {
        if (!cancelled) setChecking(false);
      }
    }

    verifyExistingToken();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (usernameInput, password) => {
    try {
      const res = await api.post("/auth/login", { username: usernameInput, password });
      const { access_token, name: n, username: u } = res.data || {};
      setToken(access_token || "");
      setName(n || "");
      setUsername(u || usernameInput);
      writeStorage(TOKEN_KEY, access_token || "");
      writeStorage(NAME_KEY, n || "");
      writeStorage(USERNAME_KEY, u || usernameInput);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: getErrorMessage(err, "Invalid username or password.") };
    }
  }, []);

  // Change the signed-in admin's own username and/or password. Either field
  // is optional — pass only what should change. On success this rotates the
  // token (it's tied to the username) so the session stays valid.
  const changeCredentials = useCallback(async ({ currentPassword, newUsername, newPassword }) => {
    try {
      const res = await api.patch("/auth/change-credentials", {
        current_password: currentPassword,
        new_username: newUsername || undefined,
        new_password: newPassword || undefined,
      });
      const { access_token, name: n, username: u } = res.data || {};
      setToken(access_token || "");
      setName(n || "");
      setUsername(u || "");
      writeStorage(TOKEN_KEY, access_token || "");
      writeStorage(NAME_KEY, n || "");
      writeStorage(USERNAME_KEY, u || "");
      return { ok: true };
    } catch (err) {
      return { ok: false, error: getErrorMessage(err, "Could not update your account. Please try again.") };
    }
  }, []);


  // Reset a forgotten password using the shared recovery code, without
  // needing the old password. Does NOT sign the user in on success — they
  // land back on the login form with their new password so they can log
  // in normally (keeps this consistent with a "did that actually work?"
  // flow rather than silently swapping sessions).
  const recoverPassword = useCallback(async ({ username: usernameInput, recoveryCode, newPassword }) => {
    try {
      await api.post("/auth/recover-password", {
        username: usernameInput,
        recovery_code: recoveryCode,
        new_password: newPassword,
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: getErrorMessage(err, "Could not reset the password. Please try again.") };
    }
  }, []);

  const value = {
    token,
    name,
    username,
    isAuthenticated: !!token,
    checking,
    login,
    logout,
    changeCredentials,
    recoverPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export default AuthContext;
