import Container from "@/components/shared/Container"
import CTAButton from "@/components/marketing/CTAButton"
import BuyButton from "@/components/commerce/BuyButton"
import { PRODUCTS, SERVICE } from "@/lib/constants"

export const metadata = {
  title: "Downloads | ClawGuru",
  description: "Kostenlose Runbooks & Templates + bezahlte Pro-Kits für Hardening, Incident Response und OpenClaw Ops."
}

export default function DownloadsPage() {
  return (
    <Container>
      <div className="py-16 max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black mb-3">Downloads</h1>
          <p className="text-gray-400 text-lg">
            Keine Kurse. Keine Theorie. Nur Dinge, die du heute anwenden kannst – Runbooks, Checklisten, Templates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Launch Pack */}
          <div className="rounded-3xl border border-gray-800 bg-gray-950/60 p-6">
            <div className="text-sm text-brand-cyan font-bold mb-2">FREE</div>
            <h2 className="text-2xl font-black mb-2">{PRODUCTS.launchPack.title}</h2>
            <p className="text-gray-400 mb-5">{PRODUCTS.launchPack.description}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <CTAButton
                href={PRODUCTS.launchPack.downloadUrl}
                label="PDF herunterladen"
                variant="primary"
                size="lg"
              />
              <CTAButton
                href="/check"
                label="Erst Security-Score prüfen"
                variant="outline"
                size="lg"
              />
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Tipp: Nimm dieses PDF als Lead Magnet. Danach führst du in den Sprint/Incident-Kauf.
            </div>
          </div>

          {/* Paid packs */}
          <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-950/70 to-blue-950/30 p-6">
            <div className="text-sm text-orange-300 font-bold mb-2">PRO</div>
            <h2 className="text-2xl font-black mb-2">{PRODUCTS.sprintPack.title}</h2>
            <p className="text-gray-400 mb-5">{PRODUCTS.sprintPack.description}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <BuyButton product="sprint" label={`Kaufen (${PRODUCTS.sprintPack.price})`} />
              <BuyButton product="incident" label={`Incident Kit (${PRODUCTS.incidentKit.price})`} className="px-6 py-3 rounded-2xl font-bold border border-gray-700 hover:border-gray-500 text-gray-200" />
            </div>

            <div className="mt-6 border-t border-gray-800 pt-5">
              <h3 className="font-bold mb-2">Kein Bock auf DIY?</h3>
              <p className="text-gray-400 mb-4">
                Überwacht, gepatcht, gewartet: <strong>{SERVICE.managedFromPrice}</strong>.
              </p>
              <CTAButton
                href={SERVICE.managedHref}
                label="Managed OpenClaw starten"
                variant="primary"
                size="md"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-4">
          {PRODUCTS.quickLinks.map((q) => (
            <a
              key={q.href}
              href={q.href}
              className="rounded-2xl border border-gray-800 bg-gray-950/40 p-4 hover:bg-gray-950/70 transition-colors"
            >
              <div className="font-bold mb-1">{q.title}</div>
              <div className="text-sm text-gray-400">{q.desc}</div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-sm text-gray-500">
          Hinweis: Affiliate-Links sind als solche gekennzeichnet. Sie finanzieren kostenlose Tools & Inhalte.
        </div>
      </div>
    </Container>
  )
}
