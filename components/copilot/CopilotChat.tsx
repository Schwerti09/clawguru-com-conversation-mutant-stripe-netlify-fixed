'use client'

import { useEffect, useMemo, useRef, useState } from "react"
import BuyButton from "@/components/commerce/BuyButton"
import { hash10 } from "@/lib/utils"

type ChatMsg = { id: string; role: "user" | "assistant"; content: string }
type ServerResp = {
  reply: string
  followups: string[]
  actions: Array<{ label: string; href?: string; command?: string }>
  confidence: "low" | "medium" | "high"
}

const START: ChatMsg[] = [
  {
    id: "a0",
    role: "assistant",
    content:
      "Ich bin ClawGuru Copilot. Sag mir **was läuft wo** (Stack/Provider) + **Ziel** (security/uptime/costs).\n\nOder paste direkt ein Log-Excerpt (10–30 Zeilen)."
  }
]

function bubble(role: ChatMsg["role"]) {
  return role === "assistant"
    ? "bg-gray-900/50 border-gray-800"
    : "bg-brand-cyan/10 border-brand-cyan/25"
}

export default function CopilotChat() {
  const [msgs, setMsgs] = useState<ChatMsg[]>(START)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [followups, setFollowups] = useState<string[]>([
    "Ich glaube ich bin exposed",
    "Ich will WebSocket härten",
    "Ich will Kosten senken",
    "Hier ist docker-compose"
  ])
  const [actions, setActions] = useState<ServerResp["actions"]>([])
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [msgs.length, loading])

  async function send(text: string) {
    const t = text.trim()
    if (!t) return
    setLoading(true)
    setActions([])
    setMsgs((m) => [...m, { id: hash10("u:" + Date.now() + t), role: "user", content: t }])
    setInput("")
    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: t })
      })
      const data = (await res.json()) as ServerResp
      setMsgs((m) => [...m, { id: hash10("a:" + Date.now()), role: "assistant", content: data.reply }])
      setFollowups(data.followups || [])
      setActions(data.actions || [])
    } catch {
      setMsgs((m) => [
        ...m,
        { id: hash10("a:err:" + Date.now()), role: "assistant", content: "Fehler. Versuch’s nochmal – oder nutze Tools/Notfall-Guide." }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-6">
      <div className="rounded-2xl border border-gray-800 bg-black/30 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
          <div>
            <div className="font-black">Copilot</div>
            <div className="text-xs text-gray-400">Konversationsmodus · Prioritäten · Runbooks</div>
          </div>
          <a className="text-xs text-gray-400 hover:text-brand-cyan" href="/security/notfall-leitfaden">Notfall?</a>
        </div>

        
        <div className="px-5 py-4 border-b border-gray-800 bg-black/20">
          <div className="text-xs uppercase tracking-widest text-gray-500">Scenario Launchpad</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              "Ich glaube ich bin exposed: Ziel = Schaden stoppen. Stack: ____ Provider: ____",
              "Hardening Sprint: Ziel = 30min Baseline. Stack: ____",
              "Kostenexplosion seit gestern. Bitte Root Cause + Kill-Switches.",
              "WebSocket unsicher? Bitte Origin/Token Binding Pattern für ____",
              "Deploy-Downtime. Bitte Rollback/Healthcheck Blueprint."
            ].map((t) => (
              <button key={t} onClick={() => send(t)} className="px-3 py-2 rounded-xl text-sm border border-gray-800 bg-black/30 hover:bg-black/40">
                {t.split(":")[0]}
              </button>
            ))}
          </div>
        </div>

<div className="p-5 space-y-4 max-h-[62vh] overflow-auto">
          {msgs.map((m) => (
            <div key={m.id} className={"p-4 rounded-2xl border whitespace-pre-wrap " + bubble(m.role)}>
              <div className="text-xs text-gray-500 mb-2">{m.role === "assistant" ? "ClawGuru" : "Du"}</div>
              <div className="text-gray-100">{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="p-4 rounded-2xl border border-gray-800 bg-gray-900/40 text-sm text-gray-300">
              Denke… (rule-engine + optional LLM falls aktiviert)
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="p-5 border-t border-gray-800 bg-gray-950/60">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Schreib hier… (z.B. 'ich glaube ich bin exposed')"
              className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan"
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              className="px-5 py-3 rounded-xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90 disabled:opacity-50"
            >
              Senden
            </button>
          </div>

          {followups.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {followups.slice(0, 6).map((f) => (
                <button
                  key={f}
                  onClick={() => send(f)}
                  className="px-3 py-2 rounded-xl text-sm border border-gray-800 bg-black/30 hover:bg-black/40"
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <aside className="space-y-4">
        <div className="p-5 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-black shadow-glow2">
          <div className="font-black text-lg">Quick Actions</div>
          <div className="text-sm text-gray-300 mt-2">
            Das Ziel ist nicht „reden“. Das Ziel ist: <strong>sauberer Betrieb</strong>.
          </div>

          <div className="mt-4 grid gap-2">
            <a className="px-4 py-2 rounded-xl bg-brand-red/10 border border-brand-red/30 hover:bg-brand-red/15 font-bold text-center" href="/security/notfall-leitfaden">
              Notfall-Runbook
            </a>
            <a className="px-4 py-2 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 hover:bg-brand-cyan/25 font-bold text-center" href="/tools">
              Config Validator
            </a>
            <a className="px-4 py-2 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 font-bold text-center" href="/academy">
              30-Min Hardening Sprint
            </a>
            <a className="px-4 py-2 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 font-bold text-center" href="/intel">
              Intel Feed
            </a>
          </div>
        
        <div className="p-5 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-950/70 to-blue-950/30">
          <div className="font-black text-lg">Pro Kits (Stripe)</div>
          <div className="text-sm text-gray-300 mt-2">
            Wenn du schneller bist als der nächste Incident: hol dir Assets statt scrollen.
          </div>

          <div className="mt-4 grid gap-3">
            <div className="p-4 rounded-2xl border border-gray-800 bg-black/30">
              <div className="font-black">Hardening Sprint Pack</div>
              <div className="text-xs text-gray-400 mt-1">€19 · Runbook + Templates</div>
              <div className="mt-3">
                <BuyButton product="sprint" label="Sprint Pack kaufen" className="w-full px-4 py-3 rounded-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90" />
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-gray-800 bg-black/30">
              <div className="font-black">Incident Kit Pro</div>
              <div className="text-xs text-gray-400 mt-1">€79 · Wenn es brennt</div>
              <div className="mt-3">
                <BuyButton product="incident" label="Incident Kit holen" className="w-full px-4 py-3 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90" />
              </div>
            </div>

            <a href="/pricing" className="text-sm text-cyan-300 underline hover:text-cyan-200 text-center">Details & Bundle Ideen →</a>
          </div>
        </div>

</div>

        {actions.length > 0 && (
          <div className="p-5 rounded-2xl border border-gray-800 bg-black/30">
            <div className="font-black mb-3">Links</div>
            <div className="grid gap-2">
              {actions.map((a) => (
                <a key={a.label} href={a.href || "#"} className="px-4 py-2 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40">
                  {a.label}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="p-5 rounded-2xl border border-gray-800 bg-black/30">
          <div className="font-black">Optional: LLM Mode</div>
          <div className="text-sm text-gray-400 mt-2">
            Setze <code className="text-gray-200">OPENAI_API_KEY</code> (und optional <code className="text-gray-200">OPENAI_BASE_URL</code>)
            als Env, dann kann der Copilot zusätzlich generativ antworten. Ohne Keys läuft alles rule-based.
          </div>
        </div>
      </aside>
    </div>
  )
}
