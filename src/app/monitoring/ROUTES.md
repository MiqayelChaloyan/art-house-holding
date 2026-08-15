# ART HOUSE Monitoring Routes

Internal analytics dashboard for **arthouse.am**. These routes are **not** part of the public multilingual website and are excluded from locale middleware.

## Why does `/monitoring` exist?

ART HOUSE runs a **self-hosted analytics system** (no Google Analytics / PostHog). The monitoring area gives authorized staff a private dashboard to review:

- Page views and visitors
- CTA / button clicks
- Form conversion actions
- Device breakdown and activity patterns

All data is stored in **Sanity CMS**. This route is the read-only visualization layer for that data.

---

## Public routes

Monitoring is **not** under locale prefixes (`/am`, `/en`, `/ru`). Use the root paths below.

**Allowed hosts:** `localhost:3000`, `localhost:3001`, `https://arthouse.am`

| Route | Purpose | Auth |
|-------|---------|------|
| `/monitoring` | Analytics dashboard (charts, tables, KPI cards) | **Required** — redirects to `/monitoring/auth` if not logged in |
| `/monitoring/auth` | Login form (username + password from Sanity `monitoringSettings`) | Public (login page only) |
| `/monitoring/login` | Legacy URL | Redirects → `/monitoring/auth` |

**Locale-prefixed URLs redirect automatically:**

- `/am/monitoring` → `/monitoring`
- `/am/monitoring/login` → `/monitoring/login` → `/monitoring/auth`
- Same for `/en/` and `/ru/`

### Auth flow

1. User opens `/monitoring` without a session → redirected to `/monitoring/auth`
2. User submits credentials → `POST /api/monitoring/auth/login`
3. Backend loads `monitoringSettings` from Sanity, verifies bcrypt hash
4. On success: HttpOnly signed cookie (`monitoring_session`), redirect to `/monitoring`
5. Logout: `POST /api/monitoring/auth/logout` → cookie cleared → `/monitoring/auth`

**Credentials are managed only in Sanity Studio** (`/admin` → MONITORING → Monitoring Settings). There is no password change page on the website.

---

## API routes

| Route | Purpose | Auth |
|-------|---------|------|
| `POST /api/analytics/collect` | Ingest page views / clicks / form events from the website | Public (validated payload only; no secrets returned) |
| `POST /api/monitoring/auth/login` | Create monitoring session | Public + CSRF header + rate limit |
| `POST /api/monitoring/auth/logout` | Destroy monitoring session | Public |
| `GET/POST /api/cron/cleanup-analytics` | Delete `analyticsEvent` docs older than 30 days | `CRON_SECRET` header |

---

## Sanity Studio (`/admin`)

| Document type | Created by | Deleted by |
|---------------|------------|------------|
| `analyticsEvent` | Website tracking (automatic) | Cron after 30 days, or manual delete in Studio |
| `monitoringSettings` | Admin (singleton `monitoringSettings.main`) | Not deletable from Studio |

---

## Environment variables (monitoring)

| Variable | Required | Purpose |
|----------|----------|---------|
| `MONITORING_SESSION_SECRET` | Yes | Signs HttpOnly session JWT (min 32 chars) |
| `SANITY_API_WRITE_TOKEN` | Yes | Write analytics events |
| `CRON_SECRET` | Yes | Protects cleanup cron endpoint |

**Not used:** `MONITORING_USERNAME`, `MONITORING_PASSWORD` — credentials live in Sanity only.

---

## Security notes

- Passwords stored as **bcrypt hashes** in Sanity (`passwordHash`); plain text never persisted
- `/monitoring` is `noindex` and excluded from sitemap
- Session cookie: HttpOnly, Secure in production, SameSite=Lax
- Login rate limit: 5 attempts per 15 minutes per IP
