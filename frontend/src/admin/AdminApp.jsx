import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Materials from "./pages/Materials";
import Insights from "./pages/Insights";
import Testimonials from "./pages/Testimonials";
import TrustedBy from "./pages/TrustedBy";
import Faq from "./pages/Faq";
import Account from "./pages/Account";

// Mounted by the parent router at "/admin/*" — every route below is relative
// to that prefix (e.g. "materials" resolves to "/admin/materials").
export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="materials" element={<Materials />} />
          <Route path="insights" element={<Insights />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="trusted-by" element={<TrustedBy />} />
          <Route path="faq" element={<Faq />} />
          <Route path="account" element={<Account />} />
        </Route>

        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </AuthProvider>
  );
}
