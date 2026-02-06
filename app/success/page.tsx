import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

function allowedDownloadsFromLineItems(lineItems: any[]): string[] {
  const sprint = process.env.STRIPE_PRICE_SPRINT
  const incident = process.env.STRIPE_PRICE_INCIDENT
  const ids = new Set(lineItems.map((li) => li?.price?.id).filter(Boolean))
  const out: string[] = []
  if (sprint && ids.has(sprint)) out.push("sprint-pack")
  if (incident && ids.has(incident)) out.push("incident-kit")
  return out
}

export default async function SuccessPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const session_id = typeof searchParams?.session_id === "string" ? searchParams?.session_id : ""
  if (!session_id) {
    return (
      <Container>
        <div className="py-16 max-w-3xl mx-auto">
          <SectionTitle kicker="Checkout" title="Zahlung bestätigen" subtitle="Es fehlt eine session_id. Nutze den Link aus Stripe." />
          <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/30 text-gray-300">
            Kein <code className="text-gray-200">session_id</code> gefunden.
          </div>
        </div>
      </Container>
    )
  }

  let paid = false
  let email: string | null = null
  let allowed: string[] = []

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id, { expand: ["data.price"] })
    paid = session.payment_status === "paid"
    email = session.customer_details?.email || null
    allowed = paid ? allowedDownloadsFromLineItems(lineItems.data as any[]) : []
  } catch {
    paid = false
  }

  const sprintHref = allowed.includes("sprint-pack")
    ? `/api/download?key=sprint-pack&session_id=${encodeURIComponent(session_id)}`
    : null
  const incidentHref = allowed.includes("incident-kit")
    ? `/api/download?key=incident-kit&session_id=${encodeURIComponent(session_id)}`
    : null

  return (
    <Container>
      <div className="py-16 max-w-3xl mx-auto">
        <SectionTitle kicker="Checkout" title={paid ? "Zahlung bestätigt" : "Noch nicht bestätigt"} subtitle="Du bist drin. Hol dir deine Assets und mach’s jetzt sauber." />

        {paid ? (
          <>
            <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/30">
              <div className="text-sm text-gray-400">Receipt</div>
              <div className="mt-1 text-lg font-black text-white">{email || "—"}</div>
              <div className="mt-3 text-gray-300">
                Downloads sind an diese Checkout-Session gebunden.
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {sprintHref ? (
                <a className="px-6 py-4 rounded-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-center" href={sprintHref}>
                  Hardening Sprint Pack herunterladen
                </a>
              ) : null}

              {incidentHref ? (
                <a className="px-6 py-4 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90 text-center" href={incidentHref}>
                  Incident Kit Pro herunterladen
                </a>
              ) : null}

              <a className="px-6 py-4 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 text-center" href="/copilot">
                Jetzt Copilot starten → (Runbook anwenden)
              </a>
            </div>

            <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/25 text-gray-300">
              <div className="font-black">Nächster Move (2 Minuten)</div>
              <ol className="mt-3 list-decimal pl-6 space-y-2 text-sm">
                <li>Security-Score checken (Target/Domain)</li>
                <li>Copilot: „Gib mir ein Runbook für meinen Stack“</li>
                <li>Sprint/Kit anwenden + Re-Check</li>
              </ol>
            </div>
          </>
        ) : (
          <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/30 text-gray-300">
            Zahlung nicht bestätigt oder Session ungültig. Wenn du gerade bezahlt hast, warte kurz und lade neu.
          </div>
        )}
      </div>
    </Container>
  )
}
