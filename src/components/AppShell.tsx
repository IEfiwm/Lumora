import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

const navItems = [
  { to: "/dashboard", label: "داشبورد", icon: "dashboard" },
  { to: "/insights", label: "تحلیل هوشمند", icon: "auto_awesome" },
  { to: "/settings", label: "تنظیمات", icon: "settings" },
] as const;

export function AppShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  const { location } = useRouterState();
  const pathname = location.pathname;
  const [open, setOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const w = open ? 280 : 84;

  return (
    <div className="min-h-screen relative">
      {/* Sidebar */}
      <aside
        style={{ width: w }}
        className="fixed right-0 top-0 h-screen z-40 border-l border-border bg-surface-1/70 backdrop-blur-xl transition-[width] duration-300 ease-out flex flex-col"
      >
        {/* Brand */}
        <div className="px-5 pt-6 pb-4 flex flex-row items-center gap-3">
          <div className="relative w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
               style={{ background: "var(--gradient-gold)" }}>
            <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1", fontSize: 22 }}>
              local_cafe
            </span>
          </div>
          {open && (
            <div className="text-right overflow-hidden">
              <h1 className="text-[20px] font-extrabold gold-text leading-tight">راجیمو</h1>
              <p className="text-[11px] text-on-surface-variant whitespace-nowrap">مدیریت هوشمند کافه</p>
            </div>
          )}
        </div>

        <div className="hairline mx-5 my-3" />

        {/* Nav */}
        <nav className="flex-1 px-3 mt-2 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={
                  "relative flex flex-row items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group " +
                  (active
                    ? "text-on-primary"
                    : "text-on-surface-variant hover:text-foreground hover:bg-surface-2")
                }
              >
                {active && (
                  <span
                    className="absolute inset-0 rounded-xl -z-0"
                    style={{
                      background: "var(--gradient-gold)",
                      boxShadow: "0 12px 30px -12px rgba(201,168,76,0.55)",
                    }}
                  />
                )}
                <span
                  className="material-symbols-outlined relative z-10 shrink-0"
                  style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0", fontSize: 22 }}
                >
                  {item.icon}
                </span>
                {open && (
                  <span className="text-[14px] font-medium relative z-10 whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User card */}
        {open && (
          <div className="mx-3 mb-3 p-4 rounded-2xl glass">
            <div className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center text-foreground font-bold">
                ر
              </div>
              <div className="text-right">
                <p className="text-[13px] font-semibold">کافه رنسانس</p>
                <p className="text-[11px] text-on-surface-variant">پلن طلایی</p>
              </div>
            </div>
          </div>
        )}

        {/* Collapse + logout */}
        <div className="px-3 pb-5 space-y-1">
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full flex flex-row items-center justify-center gap-2 py-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-2 transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              {open ? "chevron_right" : "chevron_left"}
            </span>
            {open && <span className="text-[12px]">جمع کردن</span>}
          </button>
          <Link
            to="/"
            className="w-full flex flex-row items-center gap-3 px-3 py-3 rounded-xl text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>logout</span>
            {open && <span className="text-[13px]">خروج</span>}
          </Link>
        </div>
      </aside>

      {/* Top bar */}
      <header
        style={{ right: w, left: 0 }}
        className={
          "fixed top-0 z-30 h-20 flex flex-row justify-between items-center px-8 transition-all duration-300 " +
          (scrolled
            ? "bg-surface-1/80 backdrop-blur-xl border-b border-border shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
            : "bg-transparent border-b border-transparent")
        }
      >
        <div className="text-right">
          {eyebrow && (
            <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-data mb-1">
              {eyebrow}
            </p>
          )}
          <h2 className="text-[22px] md:text-[26px] font-display font-extrabold text-foreground">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-11 px-4 rounded-full glass flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>search</span>
            <span className="text-[12px]">جستجو…</span>
          </button>
          <button className="h-11 w-11 rounded-full glass flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors relative">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>notifications</span>
            <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-primary shadow-[0_0_0_3px_var(--color-surface)]" />
          </button>
          <div className="h-11 px-3 rounded-full glass-strong flex flex-row items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald flex items-center justify-center font-bold text-[12px]">ر</div>
            <span className="text-[12px] text-foreground hidden md:inline">کافه رنسانس</span>
          </div>
        </div>
      </header>

      <main style={{ marginRight: w }} className="pt-28 px-8 pb-16 transition-[margin] duration-300">
        {children}
      </main>
    </div>
  );
}
