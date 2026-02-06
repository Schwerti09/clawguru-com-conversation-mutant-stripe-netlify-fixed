import Container from "@/components/shared/Container"

export default function Datenschutz() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-6">Datenschutzerklärung</h1>
        <p className="text-gray-300">
          Kurzfassung: Wir speichern keine Eingaben aus Checks dauerhaft. Server-Logs können technisch notwendige Metadaten enthalten.
          Wenn du uns per Mail kontaktierst, verarbeiten wir die Daten zur Bearbeitung deiner Anfrage.
        </p>
        <div className="mt-8 p-6 rounded-2xl border border-gray-800 bg-black/30 text-gray-300">
          <h2 className="text-2xl font-black mb-3">Cookies</h2>
          <p>Aktuell setzen wir kein Tracking voraus. Wenn du später Analytics nutzt, ergänze diese Seite entsprechend.</p>
        </div>
      </div>
    </Container>
  )
}
