import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "../components/AppShell";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "تنظیمات — راجیمو" },
      { name: "description", content: "تنظیمات حساب کاربری راجیمو" },
    ],
  }),
  component: SettingsPage,
});

function PwdField({ id, label, hint }: { id: string; label: string; hint?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-right text-[12px] text-on-surface-variant">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder="••••••••"
          className="w-full h-13 py-3.5 px-4 bg-surface-2/60 border border-border rounded-2xl text-right outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all"
        />
        <button type="button" onClick={() => setShow(v => !v)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
            {show ? "visibility" : "visibility_off"}
          </span>
        </button>
      </div>
      {hint && <p className="text-[11px] text-on-surface-variant text-right">{hint}</p>}
    </div>
  );
}

function SettingsPage() {
  return (
    <AppShell eyebrow="Account" title="تنظیمات حساب">
      <div className="grid lg:grid-cols-[260px_1fr] gap-8 max-w-5xl mx-auto">
        {/* Side nav */}
        <aside className="space-y-1">
          {[
            { icon: "lock_reset", label: "امنیت", active: true },
            { icon: "person", label: "پروفایل" },
            { icon: "notifications", label: "اعلان‌ها" },
            { icon: "credit_card", label: "اشتراک" },
            { icon: "api", label: "ادغام‌ها" },
          ].map((it) => (
            <button key={it.label}
                    className={"w-full flex flex-row items-center gap-3 px-4 py-3 rounded-2xl transition-all " +
                      (it.active ? "bg-surface-1 border border-primary/30 text-primary"
                                  : "text-on-surface-variant hover:bg-surface-1 hover:text-foreground")}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: it.active ? "'FILL' 1" : "'FILL' 0" }}>
                {it.icon}
              </span>
              <span className="text-[13px]">{it.label}</span>
            </button>
          ))}
        </aside>

        {/* Main */}
        <div className="space-y-6">
          <section className="rounded-[28px] border border-border bg-surface-1/60 backdrop-blur-xl p-8">
            <div className="flex flex-row items-center gap-3 mb-7 pb-5 border-b border-border">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{ background: "var(--gradient-gold)" }}>
                <span className="material-symbols-outlined text-on-primary" style={{ fontSize: 20 }}>lock_reset</span>
              </div>
              <div className="text-right">
                <h3 className="text-[17px] font-semibold">تغییر رمز عبور</h3>
                <p className="text-[12px] text-on-surface-variant">حداقل 8 کاراکتر شامل حروف و اعداد</p>
              </div>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <PwdField id="current-pwd" label="رمز عبور فعلی" />
              <PwdField id="new-pwd" label="رمز عبور جدید" hint="حداقل 8 کاراکتر، ترکیبی از حروف و اعداد." />
              <PwdField id="confirm-pwd" label="تکرار رمز عبور جدید" />

              <div className="pt-3 flex flex-row gap-3">
                <button type="submit"
                        className="h-12 px-7 rounded-2xl font-bold text-[13px] text-on-primary transition-transform active:scale-[0.98]"
                        style={{ background: "var(--gradient-gold)", boxShadow: "0 15px 35px -15px rgba(201,168,76,0.5)" }}>
                  ذخیره تغییرات
                </button>
                <button type="button"
                        className="h-12 px-6 rounded-2xl text-[13px] text-on-surface-variant border border-border hover:text-foreground hover:bg-surface-2 transition-colors">
                  انصراف
                </button>
              </div>
            </form>
          </section>

          {/* Two-factor */}
          <section className="rounded-[28px] border border-border bg-surface-1/60 backdrop-blur-xl p-6 flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-deep/40 flex items-center justify-center text-emerald-glow">
                <span className="material-symbols-outlined">shield_lock</span>
              </div>
              <div className="text-right">
                <h4 className="text-[15px] font-semibold">ورود دومرحله‌ای</h4>
                <p className="text-[12px] text-on-surface-variant">حفاظت بیشتر با کد یکبارمصرف</p>
              </div>
            </div>
            <button className="relative w-12 h-7 rounded-full bg-emerald" aria-label="toggle">
              <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-foreground transition-all" />
            </button>
          </section>

          {/* Danger */}
          <section className="rounded-[28px] border border-error/30 bg-error-container/20 p-6 flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-error/15 flex items-center justify-center text-error">
                <span className="material-symbols-outlined">delete_forever</span>
              </div>
              <div className="text-right">
                <h4 className="text-[15px] font-bold text-error">حذف حساب کاربری</h4>
                <p className="text-[12px] text-on-surface-variant">با حذف حساب، تمامی داده‌های شما برای همیشه پاک می‌شود.</p>
              </div>
            </div>
            <button className="h-10 px-4 rounded-xl border border-error text-error text-[12px] hover:bg-error hover:text-on-error transition-all">
              درخواست حذف
            </button>
          </section>
        </div>
      </div>

      <button className="fixed bottom-8 left-8 z-50 w-14 h-14 rounded-full text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              style={{ background: "var(--gradient-gold)", boxShadow: "0 20px 40px -10px rgba(201,168,76,0.5)" }}>
        <span className="material-symbols-outlined">support_agent</span>
      </button>
    </AppShell>
  );
}
