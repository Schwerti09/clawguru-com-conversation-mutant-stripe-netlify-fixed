# ClawGuru – Institution Edition (Vercel + Netlify)

**Next.js 14.2.21** pinned (Netlify CVE gate safe), React 18.2.

## Run locally
```bash
npm install
npm run dev
```

## Deploy
### Vercel
Import the repo → default Next settings.

### Netlify
- Build: `npm run build`
- Publish: `.next`
- Plugin: `@netlify/plugin-nextjs` (configured in `netlify.toml`)

## Optional: LLM Mode (Copilot)
Set env vars:
- `OPENAI_API_KEY` (required)
- `OPENAI_BASE_URL` (optional; OpenAI-compatible)
- `OPENAI_MODEL` (optional; default: gpt-4o-mini)

If no key is set, Copilot works rule-based.

## What’s inside (the “conversation monster” part)
- `/copilot` full chat UI + followups + actions
- `/intel` curated incident feed + filters
- `/academy` 30-minute hardening sprint with progress (localStorage)
- `/vault` knowledge base + search
- Tools + Runbook + Pillar Page

No accounts. No dark patterns. High retention through real utility.

## Deploy (Vercel + Netlify)

### Node Version (wichtig)
Dieses Repo pinnt Node auf **20.x**.

- **Netlify:** `netlify.toml` setzt `NODE_VERSION = "20"` (damit keine Überraschungen mit Node 22+ passieren).
- **Vercel:** nutzt automatisch `engines.node` aus `package.json` (oder du stellst es im Vercel UI explizit auf 20).

### Netlify Extensions
Dieses Projekt braucht **keine** Netlify Extensions.
Falls du irgendwo `[[extensions]] package = "neon"` drin hattest: **entfernen** (oder korrekt als `@netlify/neon` setzen, wenn du es wirklich brauchst).


## Stripe Checkout (Digital Goods)
Alles läuft über Stripe Checkout Sessions.

### Benötigte Env Vars
- `STRIPE_SECRET_KEY` (Stripe → Developers → API keys → Secret key)
- `STRIPE_PRICE_SPRINT` (Price ID für Hardening Sprint Pack)
- `STRIPE_PRICE_INCIDENT` (Price ID für Incident Kit Pro)
- optional: `NEXT_PUBLIC_SITE_URL` (z.B. https://clawguru.com) – falls Deploy-Origins zicken

### Flow
1) User klickt BuyButton → `/api/stripe/checkout` → Stripe Checkout URL
2) Stripe redirect → `/success?session_id=...`
3) `/api/stripe/verify` verifiziert Zahlung und zeigt erlaubte Downloads
4) Downloads laufen über `/api/download` (Server prüft session_id + line items)

### Digital Goods austauschen
Ersetze die Files in `/private_downloads/`:
- `sprint-pack.pdf`
- `incident-kit.zip`

Die Dateien sind **nicht** öffentlich über `/public` erreichbar.
