import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import path from "path"
import fs from "fs/promises"

export const runtime = "nodejs"

function fileForKey(key: string) {
  if (key === "sprint-pack") return { filename: "sprint-pack.pdf", type: "application/pdf" }
  if (key === "incident-kit") return { filename: "incident-kit.zip", type: "application/zip" }
  return null
}

async function sessionAllows(session_id: string, key: string) {
  const session = await stripe.checkout.sessions.retrieve(session_id)
  if (session.payment_status !== "paid") return false
  const lineItems = await stripe.checkout.sessions.listLineItems(session_id, { expand: ["data.price"] })
  const sprint = process.env.STRIPE_PRICE_SPRINT
  const incident = process.env.STRIPE_PRICE_INCIDENT
  const ids = new Set((lineItems.data as any[]).map((li) => li?.price?.id).filter(Boolean))
  if (key === "sprint-pack" && sprint && ids.has(sprint)) return true
  if (key === "incident-kit" && incident && ids.has(incident)) return true
  return false
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key") || ""
  const session_id = req.nextUrl.searchParams.get("session_id") || ""
  const f = fileForKey(key)
  if (!f) return NextResponse.json({ error: "Invalid key" }, { status: 400 })
  if (!session_id) return NextResponse.json({ error: "Missing session_id" }, { status: 400 })

  try {
    const ok = await sessionAllows(session_id, key)
    if (!ok) return NextResponse.json({ error: "Not authorized" }, { status: 403 })

    const full = path.join(process.cwd(), "private_downloads", f.filename)
    const data = await fs.readFile(full)
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": f.type,
        "Content-Disposition": `attachment; filename="${f.filename}"`,
        "Cache-Control": "private, no-store"
      }
    })
  } catch {
    return NextResponse.json({ error: "Download failed" }, { status: 500 })
  }
}
