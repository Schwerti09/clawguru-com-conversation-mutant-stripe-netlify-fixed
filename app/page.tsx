import Container from "@/components/shared/Container"
import HeroInstitution from "@/components/marketing/HeroInstitution"
import HeroSecurityCheck from "@/components/marketing/HeroSecurityCheck"
import SectionTitle from "@/components/shared/SectionTitle"
import IntelPreview from "@/components/pages/IntelPreview"
import CopilotPreview from "@/components/pages/CopilotPreview"
import AffiliateComparison from "@/components/marketing/AffiliateComparison"
import FAQ from "@/components/marketing/FAQ"
import TransparencyWidget from "@/components/marketing/TransparencyWidget"
import BuyButton from "@/components/commerce/BuyButton"
import { COMMUNITY } from "@/lib/constants"

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Speichert ClawGuru meine Eingaben?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Nein. Wir speichern keine Targets/Checks persistent. Technisch notwendige Server-Logs können Metadaten enthalten."
        }
      },
      {
        "@type": "Question",
        name: "Ist der Security-Check ein Audit?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Nein. Der Check ist heuristisch (kein Portscan/kein Audit). Für belastbare Aussagen: Config/Logs prüfen oder professionellen Review durchführen."
        }
      },
      {
        "@type": "Question",
        name: "Was ist der häufigste Fehler bei OpenClaw/Moltbot?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Öffentliche Exposition + schwache Defaults (Origin/Token/Firewall). Diese Kombi ist der Klassiker."
        }
      },
      {
        "@type": "Question",
        name: "Wozu der Copilot?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Er macht aus Kontext eine Reihenfolge: Symptome → Ursache → Runbook → Tools. Damit du nicht im Noise versinkst."
        }
      }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="border-b border-gray-800 bg-gradient-to-b from-gray-950 to-black">
        <Container>
          <HeroInstitution />
        </Container>
      </section>

      <section className="py-14 border-b border-gray-800 bg-gradient-to-b from-black to-gray-950">
        <Container>
          <HeroSecurityCheck />
        </Container>
      </section>

      <section className="py-16 border-b border-gray-800">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-gray-800 bg-black/30">
              <div className="text-xs uppercase tracking-widest text-gray-400">E-A-T</div>
              <div className="mt-2 text-2xl font-black">Team & Methodik</div>
              <p className="mt-3 text-gray-300 text-sm">
                Warum unsere Empfehlungen nicht „Content“, sondern reproduzierbare Ops sind.
              </p>
              <a className="mt-5 inline-flex text-cyan-300 underline hover:text-cyan-200" href="/ueber-uns">
                Über uns →
              </a>
            </div>

            <div className="p-6 rounded-3xl border border-gray-800 bg-black/30">
              <div className="text-xs uppercase tracking-widest text-gray-400">Proof</div>
              <div className="mt-2 text-2xl font-black">Case Studies</div>
              <p className="mt-3 text-gray-300 text-sm">
                Anonymisierte Muster: Symptome → Ursache → Fix. Weniger Meinung, mehr Schritte.
              </p>
              <a className="mt-5 inline-flex text-cyan-300 underline hover:text-cyan-200" href="/case-studies">
                Cases ansehen →
              </a>
            </div>

            <div className="p-6 rounded-3xl border border-gray-800 bg-black/30">
              <div className="text-xs uppercase tracking-widest text-gray-400">Community</div>
              <div className="mt-2 text-2xl font-black">Discord Ops-Room</div>
              <p className="mt-3 text-gray-300 text-sm">
                Fragen rein, Runbooks raus. (Moderiert. Keine Screenshots mit Keys. Bitte.)
              </p>
              <a
                className="mt-5 inline-flex text-cyan-300 underline hover:text-cyan-200"
                href={COMMUNITY.discordInvite}
                target="_blank"
                rel="noreferrer"
              >
                Discord öffnen →
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <SectionTitle
                kicker="Conversation Engine"
                title="Copilot: Konversation → Runbook"
                subtitle="Nicht Chat um des Chats willen. Du bringst Kontext, wir bringen Reihenfolge. Ergebnis: Maßnahmen, Links, Sprint."
              />
              <CopilotPreview />
            </div>
            <div>
              <SectionTitle
                kicker="Kuratierte Muster"
                title="Intel Feed"
                subtitle="Klassische Fehlerklassen, die immer wieder passieren. Schnell filterbar, direkt verlinkt auf Tools/Runbooks."
              />
              <IntelPreview />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 border-y border-gray-800 bg-gradient-to-r from-gray-950 to-blue-950/30">
        <Container>
          <SectionTitle
            kicker="Kosten / Provider"
            title="Pragmatischer Hosting-Vergleich"
            subtitle="Nicht „bester Anbieter“. Sondern: stabile Baselines, wenn du produktiv sein willst."
          />
          
      {/* Pro Kits */}
      <section className="py-16 border-t border-gray-900/60">
        <Container>
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="p-8 rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-950/70 to-blue-950/30">
              <div className="text-xs uppercase tracking-widest text-gray-400">Stripe · Digital Goods</div>
              <h2 className="mt-2 text-3xl md:text-4xl font-black">Pro Kits, die aus „Panik“ wieder Betrieb machen</h2>
              <p className="mt-4 text-gray-300 max-w-xl">
                PDFs sind nett. Aber was sich verkauft sind <strong>Assets</strong>: Runbooks + Templates + ZIPs, die du direkt in Produktion ziehen kannst.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <BuyButton product="sprint" label="Hardening Sprint Pack (€19)" />
                <BuyButton product="incident" label="Incident Kit Pro (€79)" className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90" />
                <a href="/pricing" className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
                  Details →
                </a>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                Nach jedem Security-Check sitzt der passende CTA direkt im Ergebnis. Kein Rätselraten.
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-gray-800 bg-black/25">
              <div className="font-black text-xl">Warum das wirkt</div>
              <ul className="mt-4 space-y-3 text-sm text-gray-200">
                <li><span className="text-cyan-300 font-bold">•</span> “Outcome” statt Infotainment: du bekommst Reihenfolge + Templates.</li>
                <li><span className="text-cyan-300 font-bold">•</span> Copilot macht daraus ein persönliches Runbook für deinen Stack.</li>
                <li><span className="text-cyan-300 font-bold">•</span> Shareable Security Score bringt viralen Traffic.</li>
              </ul>

              <div className="mt-6 p-4 rounded-2xl border border-gray-800 bg-black/30">
                <div className="text-sm text-gray-400">Sofortstart</div>
                <div className="mt-1 font-black">1) Check → 2) Runbook → 3) Kit → 4) Re-Check</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

              <AffiliateComparison />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <SectionTitle
                kicker="FAQ"
                title="Kurz. Hart. Hilfreich."
                subtitle="Einige Fragen kommen immer. Hier sind die Antworten."
              />
              <FAQ />
            </div>

            <div className="p-8 rounded-2xl border border-gray-800 bg-black/30">
              <div className="text-xs uppercase tracking-widest text-brand-cyan/80">Next best step</div>
              <div className="mt-2 text-3xl font-black">Hardening Sprint</div>
              <p className="mt-3 text-gray-300">
                30 Minuten. Kein Kurs. Keine Anmeldung. Nur eine Sprint-Checklist mit Fortschritt.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  className="px-6 py-3 rounded-xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90 shadow-glow2"
                  href="/academy"
                >
                  Sprint starten
                </a>
                <a
                  className="px-6 py-3 rounded-xl border border-gray-700 bg-gray-900/40 hover:bg-gray-900 font-bold"
                  href="/security/notfall-leitfaden"
                >
                  Notfall-Runbook
                </a>
              </div>
              <div className="mt-6 p-4 rounded-2xl border border-gray-800 bg-black/25 text-sm text-gray-400">
                Tipp: Institution entsteht durch Wiederkehr: Intel → Copilot → Sprint → Vault → Lagebericht.
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TransparencyWidget />
    </>
  )
}
