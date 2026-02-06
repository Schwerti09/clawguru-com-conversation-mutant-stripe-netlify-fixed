import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import BuyButton from "@/components/commerce/BuyButton"
import { SERVICE } from "@/lib/constants"

export const metadata = {
  title: "Pricing | ClawGuru",
  description: "Hardening Sprint Pack, Incident Kit Pro und Managed OpenClaw – alles über Stripe Checkout."
}

function Card({
  title,
  price,
  desc,
  bullets,
  children,
  accent
}: {
  title: string
  price: string
  desc: string
  bullets: string[]
  children: React.ReactNode
  accent?: string
}) {
  return (
    <div className={"p-7 rounded-3xl border border-gray-800 bg-black/30 " + (accent || "")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-black">{title}</div>
          <div className="text-gray-400 mt-2">{desc}</div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-white">{price}</div>
          <div className="text-xs text-gray-500 mt-1">einmalig</div>
        </div>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-gray-200">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="text-cyan-300 font-bold">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">{children}</div>
    </div>
  )
}

export default function PricingPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const canceled = typeof searchParams?.canceled === "string" ? searchParams?.canceled : ""
  return (
    <Container>
      <div className="py-16 max-w-6xl mx-auto">
        <SectionTitle
          kicker="Stripe Checkout"
          title="Pro Kits & Managed"
          subtitle="Outcome-Produkte: Runbooks + Templates + Assets. Keine Theorie. Keine Kurse."
        />

        {canceled ? (
          <div className="mt-6 p-4 rounded-2xl border border-gray-800 bg-black/30 text-gray-300">
            Checkout abgebrochen. Kein Stress. Du kannst jederzeit wieder starten.
          </div>
        ) : null}

        <div className="mt-10 grid lg:grid-cols-2 gap-6 items-start">
          <Card
            title="Hardening Sprint Pack"
            price="€19"
            desc="30–60 Minuten. Baseline-Hardening, Copy/Paste Snippets, Checklisten, klare Reihenfolge."
            bullets={[
              "Sprint-Checklist (30 min) + Abhak-Flow",
              "Firewall deny-by-default Templates",
              "Key Rotation Mini-Runbook",
              "Origin/WS Hardening Snippets",
              "Monitoring Quick Setup"
            ]}
          >
            <div className="flex flex-wrap gap-3">
              <BuyButton product="sprint" label="Jetzt kaufen" />
              <a href="/academy" className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
                Erst Sprint ansehen →
              </a>
            </div>
          </Card>

          <Card
            title="Incident Kit Pro"
            price="€79"
            desc="Wenn es brennt: Incident Response, Rotation, WAF, Forensik-Checkliste, Stabilisierung."
            bullets={[
              "Incident Timeline + Prioritäten",
              "Rotation-Runbooks (API/Telegram/etc.)",
              "Cloudflare/WAF Baseline",
              "Cost Spike Kill-Switches",
              "Post-Incident Hardening Plan"
            ]}
            accent="bg-gradient-to-br from-gray-950/70 to-blue-950/30"
          >
            <div className="flex flex-wrap gap-3">
              <BuyButton product="incident" label="Incident Kit holen" />
              <a href="/security/notfall-leitfaden" className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
                Notfall-Runbook →
              </a>
            </div>
          </Card>
        </div>

        <div className="mt-8 p-7 rounded-3xl border border-gray-800 bg-black/25">
          <div className="text-xs uppercase tracking-widest text-gray-400">Keine Lust auf DIY?</div>
          <div className="mt-2 text-3xl font-black">{SERVICE.managedName}</div>
          <p className="mt-3 text-gray-300 max-w-3xl">
            Überwacht, gepatcht, gewartet. Du bekommst ein sauberes Setup + laufenden Betrieb – ohne dein Leben in Logs zu verschwenden.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a href={SERVICE.managedHref} className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90">
              Managed starten ({SERVICE.managedFromPrice})
            </a>
            <a href="/check" className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
              Erst Score prüfen →
            </a>
          </div>
        </div>

        <div className="mt-10 text-sm text-gray-500">
          Hinweis: Für Checkout Sessions brauchst du <code className="text-gray-200">STRIPE_SECRET_KEY</code>, <code className="text-gray-200">STRIPE_PRICE_SPRINT</code>, <code className="text-gray-200">STRIPE_PRICE_INCIDENT</code>.
        </div>
      </div>
    </Container>
  )
}
