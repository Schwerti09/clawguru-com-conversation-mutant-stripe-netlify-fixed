import Container from "@/components/shared/Container"

export default function AGB() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-6">AGB</h1>
        <p className="text-gray-300">
          Diese Seite stellt Informationen und Tools „as is“ bereit. Keine Garantie. Keine Haftung für Schäden aus der Nutzung, soweit gesetzlich zulässig.
        </p>
        <div className="mt-8 p-6 rounded-2xl border border-gray-800 bg-black/30 text-gray-300">
          <h2 className="text-2xl font-black mb-3">Leistungsumfang</h2>
          <p>Tools sind heuristisch und dienen der Orientierung. Für belastbare Sicherheitsbewertungen: professionelle Audits.</p>
        </div>
      </div>
    </Container>
  )
}
