import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../components/AppShell";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "تحلیل هوشمند — راجیمو" },
      { name: "description", content: "بینش‌ها و توصیه‌های AI برای کافه" },
    ],
  }),
  component: InsightsPage,
});

const status = [
  { icon: "mood", label: "رضایت کلی", title: "بالا", sub: "4.8 / 5", tone: "gold" },
  { icon: "verified", label: "نقطه قوت", title: "کیفیت نوشیدنی", sub: "تداوم در طعم", tone: "emerald" },
  { icon: "warning", label: "نقطه ضعف", title: "زمان ارسال", sub: "25 دقیقه بیش از رقبا", tone: "error" },
  { icon: "bolt", label: "ریسک امروز", title: "افت 18 تا 20", sub: "ترافیک سفارش‌ها", tone: "warn" },
];

const toneMap: Record<string, { ring: string; chip: string; icon: string }> = {
  gold:    { ring: "from-primary/40", chip: "bg-primary/10 text-primary", icon: "text-primary" },
  emerald: { ring: "from-emerald-glow/40", chip: "bg-emerald-deep/40 text-emerald-glow", icon: "text-emerald-glow" },
  error:   { ring: "from-error/40", chip: "bg-error/10 text-error", icon: "text-error" },
  warn:    { ring: "from-warning/40", chip: "bg-warning/10 text-warning", icon: "text-warning" },
};

const priorities = [
  { n: "1", title: "کاهش زمان ارسال", desc: "استفاده از پیک اختصاصی در ساعات پیک", impact: "+9% رضایت" },
  { n: "2", title: "بهبود بسته‌بندی سرد", desc: "استفاده از هولدرهای دوجداره جدید", impact: "+6% کیفیت" },
  { n: "3", title: "حذف آیتم کم‌رضایت", desc: "آیتم «دمنوش تابستانی» با امتیاز 2.3", impact: "−4% شکایت" },
];

function InsightsPage() {
  return (
    <AppShell eyebrow="AI Insights" title="مشاوره هوشمند راجیمو">
      {/* Hero */}
      <section className="relative rounded-[24px] md:rounded-[32px] overflow-hidden p-6 md:p-10 mb-8 border border-border"
               style={{ background: "linear-gradient(135deg, #07140e 0%, #064e3b 60%, #0d7a5f 110%)" }}>
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full opacity-30 blur-3xl"
             style={{ background: "var(--gradient-gold)" }} />
        <span className="material-symbols-outlined absolute -bottom-16 -right-10 text-primary opacity-10"
              style={{ fontSize: 280 }}>insights</span>

        <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div className="text-right">
            <div className="inline-flex flex-row items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] tracking-[0.3em] uppercase font-data text-primary mb-5">
              <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              توصیه‌های هوش مصنوعی
            </div>
            <h2 className="font-display text-[28px] md:text-[40px] leading-[1.2] font-extrabold mb-5">
              بهینه‌سازی عملیات کافه با <span className="gold-text">داده‌های زنده</span>.
            </h2>
            <p className="text-[15px] text-on-surface-variant max-w-xl leading-relaxed">
              راجیمو با بررسی الگوهای رفتاری مشتریان و مقایسه با رقبای منطقه، مسیرهای سودآور جدیدی را برای شما کشف کرده است.
            </p>
          </div>

          <div className="relative rounded-3xl glass-strong p-7 text-right">
            <p className="text-[11px] tracking-[0.3em] uppercase font-data text-primary">پتانسیل رشد</p>
            <p className="font-data text-[64px] leading-none font-bold gold-text mt-2" dir="ltr">+14.2%</p>
            <p className="text-[13px] text-on-surface-variant mt-2">با اجرای پیشنهادهای هفته جاری</p>
            <div className="mt-5 h-1.5 rounded-full bg-surface-2 overflow-hidden">
              <div className="h-full" style={{ width: "62%", background: "var(--gradient-gold)" }} />
            </div>
            <div className="flex justify-between mt-3 text-[11px] text-on-surface-variant font-data">
              <span>پایه</span><span>هدف فصل</span>
            </div>
          </div>
        </div>
      </section>

      {/* Status bento */}
      <h3 className="text-[14px] tracking-[0.3em] uppercase font-data text-primary mb-4">وضعیت فعلی</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
        {status.map((s) => {
          const t = toneMap[s.tone];
          return (
            <div key={s.label} className="relative rounded-[24px] md:rounded-[28px] border border-border bg-surface-1/60 backdrop-blur-xl p-5 md:p-6 overflow-hidden flex flex-col min-h-[148px]">
              <div className={`absolute -top-16 -left-16 w-40 h-40 rounded-full blur-3xl bg-gradient-to-br ${t.ring} to-transparent opacity-60`} />
              <div className="relative flex items-start justify-between mb-6">
                <span className={`text-[10px] font-data tracking-widest uppercase px-2 py-1 rounded-full ${t.chip}`}>
                  {s.label}
                </span>
                <span className={`material-symbols-outlined ${t.icon}`} style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}>
                  {s.icon}
                </span>
              </div>
              <p className="text-right text-[16px] md:text-[18px] font-bold text-foreground mt-auto">{s.title}</p>
              <p className="text-right text-[12px] text-on-surface-variant mt-1">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Priorities + Summary */}
      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        <section className="rounded-[28px] border border-border bg-surface-1/60 backdrop-blur-xl p-7">
          <div className="flex flex-row items-center justify-between mb-6">
            <div className="flex flex-row items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>flag</span>
              <h3 className="text-[15px] font-semibold">اولویت‌های هفته</h3>
            </div>
            <span className="text-[11px] text-on-surface-variant">3 مورد</span>
          </div>
          <div className="space-y-3">
            {priorities.map((p) => (
              <div key={p.n} className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-surface-2/60 hover:bg-surface-2 border border-transparent hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-data font-bold text-[18px] text-on-primary shrink-0 self-start sm:self-auto"
                     style={{ background: "var(--gradient-gold)" }}>
                  {p.n}
                </div>
                <div className="flex-1 text-right min-w-0">
                  <p className="text-[15px] font-semibold">{p.title}</p>
                  <p className="text-[12px] text-on-surface-variant mt-0.5 leading-relaxed">{p.desc}</p>
                </div>
                <span className="text-[11px] font-data text-emerald-glow bg-emerald-deep/40 px-2.5 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
                  {p.impact}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-surface-1/60 backdrop-blur-xl p-7">
          <div className="flex flex-row items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>summarize</span>
            <h3 className="text-[15px] font-semibold">خلاصه گزارش هفتگی</h3>
          </div>
          <ul className="space-y-5">
            <li className="flex flex-row items-start gap-3 text-right">
              <span className="material-symbols-outlined text-error mt-0.5 shrink-0" style={{ fontSize: 20 }}>trending_up</span>
              <p className="text-[14px] leading-relaxed">شکایات نوشیدنی <span className="font-data font-bold text-error">27%</span> افزایش یافت — نیازمند بازنگری مواد اولیه است.</p>
            </li>
            <li className="flex flex-row items-start gap-3 text-right">
              <span className="material-symbols-outlined text-emerald-glow mt-0.5 shrink-0" style={{ fontSize: 20 }}>visibility</span>
              <p className="text-[14px] leading-relaxed">رقیب اصلی شما در بسته‌بندی <span className="text-emerald-glow font-bold">ضعیف‌تر</span> عمل کرده — این نقطه قوت شماست.</p>
            </li>
            <li className="flex flex-row items-start gap-3 text-right">
              <span className="material-symbols-outlined text-primary mt-0.5 shrink-0" style={{ fontSize: 20 }}>lightbulb</span>
              <p className="text-[14px] leading-relaxed">فرصت رشد در سفارش‌های شبانه (پس از <span className="font-data font-bold">23:00</span>) قابل توجه است.</p>
            </li>
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
