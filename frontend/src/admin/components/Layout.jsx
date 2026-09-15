import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogOut, LayoutDashboard, Menu, X, UserCog } from "lucide-react";
import { useAuth } from "../AuthContext";
import { NAV_SECTIONS } from "../navConfig";

export default function Layout({ children }) {
  const { name, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkCls = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
      isActive ? "bg-forest text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  const SidebarContent = () => (
    <>
      <div className="px-4 pt-6 pb-4">
        <Link
          to="/admin"
          className="flex items-center gap-2 text-white font-display font-extrabold text-lg"
          onClick={() => setMobileOpen(false)}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-leaf" />
          Green Mind Admin
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto pb-4">
        <NavLink to="" end className={navLinkCls} onClick={() => setMobileOpen(false)}>
          <LayoutDashboard className="h-4 w-4 shrink-0" />
          Dashboard
        </NavLink>

        <div className="pt-4 pb-1 px-4 text-[11px] uppercase tracking-wider font-bold text-slate-500">
          Public page sections
        </div>

        {NAV_SECTIONS.map((s) => (
          <NavLink key={s.to} to={s.to} className={navLinkCls} onClick={() => setMobileOpen(false)}>
            <s.icon className="h-4 w-4 shrink-0" />
            <span className="flex flex-col leading-tight min-w-0">
              <span className="truncate">{s.navLabel}</span>
              <span className="text-[11px] font-normal text-slate-500 truncate">{s.publicPage}</span>
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-navy-line">
        <div className="text-xs text-slate-400 mb-1">Signed in as</div>
        <div className="text-sm font-semibold text-white mb-3 truncate">{name || "Admin"}</div>
        <NavLink
          to="account"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white/5 text-slate-200 hover:bg-white/10 transition-colors mb-2"
          onClick={() => setMobileOpen(false)}
        >
          <UserCog className="h-4 w-4" />
          Account settings
        </NavLink>
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-mist lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-72 shrink-0 bg-navy min-h-screen sticky top-0 self-start">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-navy flex items-center justify-between px-4 py-3">
        <Link to="/admin" className="flex items-center gap-2 text-white font-display font-extrabold text-base">
          <span className="h-2 w-2 rounded-full bg-leaf" />
          Green Mind Admin
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="text-white p-2"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-navy flex flex-col pt-16">
          <SidebarContent />
        </div>
      )}

      <div className="flex-1 min-w-0 pt-14 lg:pt-0">
        <main className="p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
