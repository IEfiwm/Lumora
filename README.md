# راجیمو (Lumora)

پنل مدیریت هوشمند کافه **راجیمو** — رابط کاربری مدرن با تحلیل داده‌محور، ساخته‌شده با React و TanStack Start.

## فناوری‌ها

| بخش | تکنولوژی |
|-----|----------|
| فریم‌ورک | [TanStack Start](https://tanstack.com/start) + React 19 |
| مسیریابی | TanStack Router |
| استایل | Tailwind CSS v4 |
| کامپوننت‌ها | Radix UI + shadcn/ui |
| بیلد | Vite 7 |
| زبان | TypeScript |

## پیش‌نیازها

- **Node.js 22.12+** (یا حداقل 20.19+)
- **npm** 10+

## راه‌اندازی محلی

```bash
# کلون پروژه
git clone https://github.com/YOUR_USERNAME/Lumora.git
cd Lumora

# نصب وابستگی‌ها
npm install --legacy-peer-deps

# اجرای سرور توسعه
npm run dev
```

اپلیکیشن روی `http://localhost:3000` اجرا می‌شود.

## اسکریپت‌ها

| دستور | توضیح |
|-------|-------|
| `npm run dev` | اجرای محیط توسعه |
| `npm run build` | بیلد خروجی استاتیک (HTML, CSS, JS) |
| `npm run preview` | پیش‌نمایش بیلد تولید |
| `npm run lint` | بررسی کد با ESLint |
| `npm run format` | فرمت کد با Prettier |

## خروجی بیلد

پس از `npm run build`، فایل‌های استاتیک در مسیر زیر تولید می‌شوند:

```
dist/client/
├── index.html          # صفحه اصلی (SPA shell)
├── assets/             # فایل‌های CSS و JS
└── .htaccess           # قوانین Apache برای مسیریابی SPA
```

این پوشه شامل تمام فایل‌های **HTML، CSS و JS** است و مستقیماً روی هاست اشتراکی قابل آپلود است. همه مسیرها (`/dashboard`، `/insights`، `/settings`) به‌صورت سمت‌کلاینت رندر می‌شوند و `.htaccess` درخواست‌ها را به `index.html` هدایت می‌کند.

---

## CI/CD — استقرار خودکار با GitHub Actions

پروژه دو workflow دارد:

### 1. CI (`ci.yml`)

- **تریگر:** push و pull request روی `main` و `develop`
- **کارها:** lint + build
- **Runner:** `ubuntu-latest` (GitHub-hosted)

### 2. Deploy (`deploy.yml`)

- **تریگر:** push به `main` یا اجرای دستی (workflow_dispatch)
- **کارها:** build + آپلود FTP
- **Runner:** `ubuntu-latest`

### تنظیم Secrets در GitHub

به مسیر **Settings → Secrets and variables → Actions** بروید و secrets زیر را اضافه کنید:

| Secret | الزامی | توضیح | مثال |
|--------|--------|-------|------|
| `FTP_SERVER` | ✅ | آدرس سرور FTP | `ftp.example.com` |
| `FTP_USERNAME` | ✅ | نام کاربری FTP | `myuser` |
| `FTP_PASSWORD` | ✅ | رمز عبور FTP | `********` |
| `FTP_SERVER_DIR` | ✅ | مسیر مقصد روی هاست | `/public_html/` یا `/domains/example.com/public_html/` |
| `FTP_PORT` | ❌ | پورت (پیش‌فرض: 21) | `21` |
| `FTP_PROTOCOL` | ❌ | پروتکل (پیش‌فرض: ftp) | `ftp` یا `ftps` |

### فعال‌سازی استقرار

1. Secrets را در GitHub تنظیم کنید
2. به branch `main` push کنید
3. workflow **Deploy to FTP** به‌صورت خودکار اجرا می‌شود
4. فایل‌های `.output/public/` روی هاست FTP آپلود می‌شوند

وضعیت اجرا را در تب **Actions** مخزن GitHub ببینید.

### استقرار دستی

در GitHub → **Actions** → **Deploy to FTP** → **Run workflow**

---

## تنظیمات هاست (Apache)

فایل `public/.htaccess` به‌صورت خودکار در بیلد کپی می‌شود و:

- درخواست‌های 404 را به `index.html` هدایت می‌کند (مسیریابی SPA)
- کش فایل‌های استاتیک را فعال می‌کند
- فشرده‌سازی Gzip را روشن می‌کند

> **نکته:** اگر هاست شما Nginx است، باید قوانین مشابه را در config سرور تنظیم کنید:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## ساختار پروژه

```
Lumora/
├── .github/workflows/    # CI/CD pipelines
│   ├── ci.yml            # Lint + Build
│   └── deploy.yml        # Build + FTP Deploy
├── public/
│   └── .htaccess         # قوانین Apache
├── src/
│   ├── routes/           # صفحات اپلیکیشن
│   ├── components/       # کامپوننت‌های UI
│   ├── lib/              # توابع کمکی
│   └── styles.css        # استایل‌های全局
├── vite.config.ts        # تنظیمات Vite + SPA mode
└── package.json
```

## صفحات

| مسیر | توضیح |
|------|-------|
| `/` | صفحه ورود |
| `/dashboard` | داشبورد مدیریت |
| `/insights` | تحلیل و بینش |
| `/settings` | تنظیمات |

---

## عیب‌یابی CI/CD

| مشکل | راه‌حل |
|------|--------|
| بیلد fail می‌شود | Node.js 22 در workflow استفاده می‌شود؛ لاگ Actions را بررسی کنید |
| FTP اتصال برقرار نمی‌کند | `FTP_SERVER`، پورت و پروتکل (`ftp`/`ftps`) را چک کنید |
| صفحه 404 بعد از deploy | مطمئن شوید `.htaccess` آپلود شده و `mod_rewrite` روی هاست فعال است |
| مسیر اشتباه روی هاست | مقدار `FTP_SERVER_DIR` را با مسیر `public_html` هاست تطبیق دهید |