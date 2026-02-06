"use client"

import { useMemo } from "react"

export default function ShareScore({ target, score, vulnerable }: { target: string; score: number; vulnerable: boolean }) {
  const shareUrl = useMemo(() => {
    const params = new URLSearchParams({ target, score: String(score), vulnerable: vulnerable ? "1" : "0" })
    return `/score?${params.toString()}`
  }, [target, score, vulnerable])

  const tweet = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://clawguru.com"
    const full = `${origin}${shareUrl}`
    const txt = `Mein Claw Security Score: ${score}/100 — geprüft via @clawguru`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(txt)}&url=${encodeURIComponent(full)}`
    return url
  }, [shareUrl, score])

  async function copy() {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : ""
      await navigator.clipboard.writeText(`${origin}${shareUrl}`)
    } catch {}
  }

  async function nativeShare() {
    const txt = `Mein Claw Security Score: ${score}/100 — geprüft via ClawGuru`
    // @ts-ignore
    if (navigator.share) {
      try {
        // @ts-ignore
        const origin = typeof window !== "undefined" ? window.location.origin : ""
        await navigator.share({ title: "Claw Security Score", text: txt, url: `${origin}${shareUrl}` })
      } catch {}
    } else {
      await copy()
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={nativeShare} className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 font-bold text-white transition-colors">
        Teilen
      </button>
      <button onClick={copy} className="px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 transition-colors">
        Link kopieren
      </button>
      <a
        href={tweet}
        target="_blank"
        rel="noreferrer"
        className="px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 transition-colors"
      >
        Tweet
      </a>
    </div>
  )
}
