import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "../components/AppShell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "داشبورد — راجیمو" },
      { name: "description", content: "تحلیل بنتو عملکرد هفتگی کافه" },
    ],
  }),
  component: DashboardPage,
});

const days = [
  { label: "ش", h: 60, v: "4.2" },
  { label: "ی", h: 75, v: "4.5" },
  { label: "د", h: 40, v: "3.8" },
  { label: "س", h: 90, v: "4.8", peak: true },
  { label: "چ", h: 65, v: "4.3" },
  { label: "پ", h: 85, v: "4.7", peak: true },
  { label: "ج", h: 95, v: "4.9", peak: true },
];

const complaints = [
  { type: "تأخیر در ارسال", pct: 42, trend: "+12%", up: true },
  { type: "دمای نامناسب", pct: 28, trend: "−5%", up: false },
  { type: "اشتباه در سفارش", pct: 15, trend: "ثابت", flat: true },
  { type: "بسته‌بندی معیوب", pct: 15, trend: "−8%", up: false },
];

const maxComplaint = Math.max(...complaints.map((c) => c.pct));

const compare = [
  { kpi: "میانگین امتیاز", us: 4.4, pct: 88, them: 4.1, good: true },
  { kpi: "رضایت ارسال", us: 3.2, pct: 65, them: 3.8, good: false },
  { kpi: "کیفیت بسته‌بندی", us: 4.6, pct: 92, them: 4.2, good: true },
  { kpi: "رضایت قیمت", us: 4.0, pct: 80, them: 3.9, good: true },
];

const topItems = [
  { name: "آیس لاته", pct: 32, sat: 94, color: "#c9a84c" },
  { name: "اسپرسو سینگل", pct: 24, sat: 97, color: "#e6c97a" },
  { name: "کیک هویج", pct: 18, sat: 82, color: "#34d399" },
  { name: "پنینی مرغ", pct: 14, sat: 68, color: "#ef4d4d" },
  { name: "دمنوش آرامش", pct: 12, sat: 90, color: "#0d7a5f" },
];

function Card({
  className = "",
  children,
  glow = false,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  glow?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={
        "relative rounded-[28px] border border-border bg-surface-1/60 backdrop-blur-xl p-6 overflow-hidden " +
        className
      }
      style={{ ...(glow ? { boxShadow: "var(--shadow-luxe)" } : {}), ...style }}
    >
      {children}
    </div>
  );
}

function DashboardPage() {
  const [period, setPeriod] = useState<"سالانه" | "ماهانه" | "هفتگی">("هفتگی");

  return (
    <AppShell eyebrow="Live Dashboard" title="تحلیل هوشمند عملکرد">
      {/* Bento grid */}
      <div className="grid grid-cols-12 auto-rows-[minmax(160px,auto)] gap-4 md:gap-5">
        {/* Hero — overall score */}
        <Card glow className="col-span-12 lg:col-span-7 row-span-2"
              >
          <div className="absolute inset-0 -z-0 opacity-60"
               style={{ background: "var(--gradient-glow)" }} />
          <div className="absolute -right-24 -bottom-24 w-72 h-72 rounded-full opacity-25 blur-3xl"
               style={{ background: "var(--gradient-gold)" }} />

          <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex flex-row items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <h3 className="text-[15px] font-semibold">میانگین امتیاز هفتگی</h3>
            </div>
            <div className="flex self-start bg-surface-2/60 rounded-full p-1 gap-1 text-[11px]">
              {(["سالانه", "ماهانه", "هفتگی"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setPeriod(l)}
                  className={
                    "px-3 py-1.5 rounded-full transition-colors " +
                    (period === l
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-on-surface-variant hover:text-foreground")
                  }
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col sm:flex-row sm:items-end gap-6">
            <div className="shrink-0">
              <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-data">Score</p>
              <p className="font-data text-[72px] leading-none font-bold gold-text mt-1">4.7</p>
              <p className="text-[12px] text-on-surface-variant mt-2">از 5 — رشد 8% نسبت به هفته قبل</p>
            </div>

            <div className="flex-1 h-48 flex items-end justify-between gap-2 pr-0 sm:pr-4">
              {days.map((d) => (
                <div
                  key={d.label}
                  className="group flex-1 flex flex-col items-center justify-end gap-2 h-full cursor-default"
                  title={`${d.label} — امتیاز ${d.v}`}
                >
                  <div className="text-[10px] font-data font-bold text-foreground opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {d.v}
                  </div>
                  <div className="relative w-full flex justify-center">
                    <div
                      className="w-3.5 rounded-full transition-all duration-500 group-hover:w-5"
                      style={{
                        height: `${d.h * 1.6}px`,
                        background: d.peak
                          ? "linear-gradient(180deg, #e6c97a, #c9a84c)"
                          : "linear-gradient(180deg, #34d399, #0d7a5f)",
                        boxShadow: d.peak ? "0 0 24px rgba(201,168,76,0.4)" : "none",
                      }}
                    />
                  </div>
                  <span className="text-[11px] text-on-surface-variant transition-colors group-hover:text-foreground">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Revenue stat */}
        <Card className="col-span-12 sm:col-span-6 lg:col-span-5">
          <div className="flex flex-row items-start justify-between mb-4">
            <div className="flex flex-row items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>trending_up</span>
              <h3 className="text-[14px] font-semibold">پتانسیل رشد</h3>
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase font-data text-emerald-glow bg-emerald-deep/40 px-2 py-1 rounded-full">live</span>
          </div>
          <p className="font-data text-[44px] leading-none font-bold gold-text" dir="ltr">+14.2%</p>
          <p className="text-[12px] text-on-surface-variant mt-2">با اجرای پیشنهادات هفتگی AI</p>
          <div className="mt-5 h-2 rounded-full bg-surface-2 overflow-hidden">
            <div className="h-full rounded-full transition-[width] duration-500" style={{ width: "62%", background: "var(--gradient-gold)" }} />
          </div>
          <p className="text-[10px] text-on-surface-variant mt-2 text-right">62% از هدف فصلی</p>
        </Card>

        {/* Signals card */}
        <Card className="col-span-12 sm:col-span-6 lg:col-span-5">
          <div className="flex flex-row items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>signal_cellular_alt</span>
            <h3 className="text-[14px] font-semibold">سیگنال‌های امروز</h3>
          </div>
          <div className="space-y-3">
            <div className="flex flex-row items-center justify-between p-3 rounded-2xl bg-surface-2/60 border-s-2 border-error/60">
              <div className="text-right">
                <p className="text-[11px] text-on-surface-variant">افزایش شکایات</p>
                <p className="font-data text-[18px] font-bold" dir="ltr">18:00 – 20:00</p>
              </div>
              <span className="material-symbols-outlined text-error shrink-0">warning</span>
            </div>
            <div className="flex flex-row items-center justify-between p-3 rounded-2xl bg-surface-2/60 border-s-2 border-warning/60">
              <div className="text-right">
                <p className="text-[11px] text-on-surface-variant">افت کیفیت</p>
                <p className="font-data text-[18px] font-bold" dir="ltr">19:00 – 21:00</p>
              </div>
              <span className="material-symbols-outlined text-warning shrink-0">schedule</span>
            </div>
          </div>
        </Card>

        {/* Complaints table */}
        <Card className="col-span-12 lg:col-span-5">
          <div className="flex flex-row items-center justify-between mb-5">
            <div className="flex flex-row items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>report_problem</span>
              <h3 className="text-[14px] font-semibold">دسته‌بندی شکایات</h3>
            </div>
            <span className="text-[11px] text-on-surface-variant">30 روز اخیر</span>
          </div>
          <div className="space-y-3">
            {complaints.map((c) => (
              <div key={c.type} className="space-y-2">
                <div className="flex flex-row justify-between items-center">
                  <span className="text-[13px]">{c.type}</span>
                  <div className="flex items-center gap-3">
                    <span className={"text-[11px] font-data " + (c.flat ? "text-on-surface-variant" : c.up ? "text-error" : "text-emerald-glow")}>
                      {c.trend}
                    </span>
                    <span className="font-data text-[13px] font-bold">{c.pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
                  <div className="h-full rounded-full transition-[width] duration-500"
                       style={{
                         width: `${(c.pct / maxComplaint) * 100}%`,
                         background: c.up ? "linear-gradient(90deg, #ef4d4d, #f5c451)" : "var(--gradient-gold)",
                       }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Compare with rivals */}
        <Card className="col-span-12 lg:col-span-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div className="flex flex-row items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>compare_arrows</span>
              <h3 className="text-[14px] font-semibold">مقایسه با رقبا</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <select className="bg-surface-2/60 border border-border rounded-full text-[11px] px-3 py-1.5 focus:ring-1 focus:ring-primary outline-none text-foreground">
                <option>کافه گراف</option>
                <option>کافه لمیز</option>
              </select>
              <select className="bg-surface-2/60 border border-border rounded-full text-[11px] px-3 py-1.5 focus:ring-1 focus:ring-primary outline-none text-foreground">
                <option>فصل جاری</option>
                <option>ماه قبل</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4 mb-4 text-[10px] text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-full" style={{ background: "var(--gradient-gold)" }} />
              شما
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-px h-3 bg-on-surface-variant/60" />
              میانگین رقیب
            </span>
          </div>

          <div className="space-y-5">
            {compare.map((r) => (
              <div key={r.kpi} className="space-y-2">
                <div className="flex flex-row items-center justify-between gap-3">
                  <span className="text-[13px] text-on-surface-variant">{r.kpi}</span>
                  <div className="flex items-center gap-3 font-data text-[12px]">
                    <span className="text-on-surface-variant">رقیب {r.them}</span>
                    <span className={"font-bold " + (r.good ? "gold-text" : "text-error")}>شما {r.us}</span>
                  </div>
                </div>
                <div className="h-2.5 rounded-full bg-surface-2 overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-[width] duration-500"
                    style={{
                      width: `${r.pct}%`,
                      background: r.good ? "var(--gradient-gold)" : "linear-gradient(90deg, #ef4d4d, #f5c451)",
                    }}
                  />
                  <div
                    className="absolute top-0 h-full w-0.5 bg-foreground/50"
                    style={{ right: `${(r.them / 5) * 100}%` }}
                    title={`میانگین رقیب: ${r.them}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top items radial */}
        <Card glow className="col-span-12 lg:col-span-7">
          <div className="flex flex-row items-center justify-between mb-6">
            <div className="flex flex-row items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>leaderboard</span>
              <h3 className="text-[14px] font-semibold">آیتم‌های پرفروش</h3>
            </div>
            <button className="text-[11px] text-primary hover:underline">مشاهده همه</button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative w-48 h-48 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                {(() => {
                  const C = 2 * Math.PI * 42;
                  const gap = 3;
                  let acc = 0;
                  return topItems.map((it) => {
                    const len = Math.max(0, (it.pct / 100) * C - gap);
                    const el = (
                      <circle
                        key={it.name}
                        cx="50"
                        cy="50"
                        r="42"
                        fill="transparent"
                        stroke={it.color}
                        strokeWidth="10"
                        strokeDasharray={`${len} ${C}`}
                        strokeDashoffset={-acc}
                        strokeLinecap="round"
                      />
                    );
                    acc += len + gap;
                    return el;
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="font-data text-[36px] font-bold gold-text leading-none">5</p>
                <p className="text-[11px] text-on-surface-variant mt-1">آیتم برتر</p>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-3 px-3 mb-2 text-[10px] text-on-surface-variant">
                <span className="text-right">آیتم</span>
                <span className="w-12 text-center">فروش</span>
                <span className="w-12 text-center">رضایت</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {topItems.map((it) => (
                  <div
                    key={it.name}
                    className="flex flex-row items-center justify-between p-3 rounded-2xl bg-surface-2/60 hover:bg-surface-2 border border-transparent hover:border-primary/20 transition-all"
                  >
                    <div className="flex flex-row items-center gap-3 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: it.color, boxShadow: `0 0 12px ${it.color}80` }}
                      />
                      <span className="text-[13px] truncate">{it.name}</span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 font-data text-[11px]">
                      <span className="text-on-surface-variant w-10 text-center">{it.pct}%</span>
                      <span
                        className={
                          "font-bold w-10 text-center " +
                          (it.sat >= 90 ? "text-emerald-glow" : it.sat >= 80 ? "text-warning" : "text-error")
                        }
                      >
                        {it.sat}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* CTA / Summary */}
        <Card className="col-span-12 lg:col-span-5 overflow-hidden"
              style={{ background: "linear-gradient(150deg, #064e3b 0%, #0d7a5f 100%)" }}>
          <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full opacity-30 blur-3xl"
               style={{ background: "var(--gradient-gold)" }} />
          <div className="relative">
            <span className="text-[11px] tracking-[0.3em] uppercase font-data text-primary">AI Briefing</span>
            <h3 className="text-[22px] font-extrabold font-display mt-2 leading-snug">
              3 پیشنهاد طلایی هفته آماده‌اند.
            </h3>
            <p className="text-[13px] text-on-surface-variant mt-3 leading-relaxed">
              با اجرای آن‌ها می‌توانید زمان ارسال را 20% کاهش دهید و رضایت مشتری را 9% افزایش دهید.
            </p>
            <a href="/insights"
               className="inline-flex items-center gap-2 mt-6 px-5 h-11 rounded-full text-[13px] font-bold text-on-primary"
               style={{ background: "var(--gradient-gold)" }}>
              مشاهده گزارش هوشمند
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
            </a>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
