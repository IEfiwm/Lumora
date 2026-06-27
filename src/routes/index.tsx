import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ورود — راجیمو" },
      { name: "description", content: "ورود به پنل مدیریت هوشمند کافه راجیمو" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
             style={{ background: "radial-gradient(circle, #0d7a5f, transparent 70%)" }} />
        <div className="absolute -bottom-40 -left-24 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
             style={{ background: "radial-gradient(circle, #c9a84c, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04]"
             style={{
               backgroundImage: "radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)",
               backgroundSize: "32px 32px",
             }} />
      </div>

      <main className="relative w-full max-w-[1080px] grid md:grid-cols-[1.05fr_1fr] glass-strong rounded-[36px] overflow-hidden shadow-[0_60px_120px_-40px_rgba(0,0,0,0.7)]">
        {/* Brand panel */}
        <div className="hidden md:flex relative flex-col justify-between p-12 overflow-hidden"
             style={{ background: "linear-gradient(160deg, #0b1f16 0%, #064e3b 60%, #0d7a5f 110%)" }}>
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-30 blur-3xl"
               style={{ background: "var(--gradient-gold)" }} />
          <div className="relative">
            <div className="flex flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                   style={{ background: "var(--gradient-gold)" }}>
                <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_cafe
                </span>
              </div>
              <div className="text-right">
                <h1 className="text-[28px] font-extrabold gold-text leading-tight">راجیمو</h1>
                <p className="text-[12px] text-on-surface-variant">Premium Cafe Intelligence</p>
              </div>
            </div>
          </div>

          <div className="relative text-right space-y-6">
            <p className="text-[11px] tracking-[0.4em] text-primary uppercase font-data">Suite v4.0</p>
            <h2 className="text-[44px] leading-[1.15] font-extrabold font-display text-foreground">
              تجربه‌ای <span className="gold-text">لوکس</span> از مدیریت هوشمند کافه.
            </h2>
            <p className="text-[15px] text-on-surface-variant leading-relaxed max-w-md mr-0">
              تحلیل داده‌محور، تصمیم‌گیری آنی، و رشد پایدار با موتور توصیه‌گر هوش مصنوعی راجیمو.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-6">
              {[
                { k: "+14.2%", v: "رشد درآمد" },
                { k: "4.8", v: "میانگین امتیاز" },
                { k: "24/7", v: "پایش زنده" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl p-4 glass text-right">
                  <p className="font-data text-[18px] font-bold gold-text">{s.k}</p>
                  <p className="text-[11px] text-on-surface-variant mt-1">{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-row items-center justify-between text-[11px] text-on-surface-variant">
            <span>© 1404 راجیمو</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              <span>سرویس فعال</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col justify-center p-10 md:p-14 bg-surface-1/60">
          <header className="mb-10 text-right">
            <p className="text-[11px] tracking-[0.3em] uppercase font-data text-primary mb-3">ورود امن</p>
            <h1 className="text-[34px] leading-tight font-extrabold font-display mb-3">خوش آمدید</h1>
            <p className="text-[14px] text-on-surface-variant">برای ورود به پنل مدیریتی، اطلاعات حساب خود را وارد کنید.</p>
          </header>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }}>
            <div className="space-y-2">
              <label className="block text-[12px] text-on-surface-variant pr-1">نام کاربری</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: 20 }}>person</span>
                <input
                  type="text"
                  placeholder="username"
                  className="w-full pr-12 pl-4 h-14 bg-surface-2/60 border border-border rounded-2xl text-[14px] outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[12px] text-on-surface-variant pr-1">رمز عبور</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: 20 }}>lock</span>
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pr-12 pl-12 h-14 bg-surface-2/60 border border-border rounded-2xl text-[14px] outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all"
                />
                <button type="button" onClick={() => setShowPwd(v => !v)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary">
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                    {showPwd ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border bg-surface-2 text-primary focus:ring-primary" />
                <span className="text-[12px] text-on-surface-variant">مرا به خاطر بسپار</span>
              </label>
              <a href="#" className="text-[12px] text-primary hover:underline">فراموشی رمز عبور</a>
            </div>

            <button
              type="submit"
              className="w-full h-14 rounded-2xl text-[15px] font-bold text-on-primary mt-2 transition-transform active:scale-[0.98] hover:brightness-110"
              style={{ background: "var(--gradient-gold)", boxShadow: "0 20px 40px -15px rgba(201,168,76,0.5)" }}
            >
              ورود به سیستم
            </button>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex-1 hairline" />
              <span className="text-[11px] text-on-surface-variant">یا</span>
              <div className="flex-1 hairline" />
            </div>

            <button type="button" className="w-full h-12 rounded-2xl glass flex items-center justify-center gap-2 text-[13px] text-foreground hover:border-primary/40 transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>qr_code_2</span>
              ورود با کد یکبارمصرف
            </button>
          </form>

          <footer className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-on-surface-variant">
              حسابی ندارید؟{" "}
              <Link to="/dashboard" className="text-primary font-bold">درخواست دموی سیستم</Link>
            </p>
            <a href="#" className="flex items-center gap-2 text-[12px] text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>support_agent</span>
              پشتیبانی
            </a>
          </footer>
        </div>
      </main>
    </div>
  );
}
