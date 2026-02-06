import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

type Product = "sprint" | "incident"
type Body = { product?: Product }

function getOrigin(req: NextRequest) {
  return (
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Body
    const product = body.product

    const priceSprint = process.env.STRIPE_PRICE_SPRINT
    const priceIncident = process.env.STRIPE_PRICE_INCIDENT

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 })
    }
    if (!priceSprint || !priceIncident) {
      return NextResponse.json(
        { error: "Missing STRIPE_PRICE_SPRINT / STRIPE_PRICE_INCIDENT" },
        { status: 500 }
      )
    }

    // Narrow type explicitly so Stripe typings never see `undefined`.
    if (product !== "sprint" && product !== "incident") {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 })
    }

    const origin = getOrigin(req)
    const price = product === "incident" ? priceIncident : priceSprint

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      allow_promotion_codes: true,
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=1`,
      metadata: { product }
    })

    return NextResponse.json({ url: session.url })
  } catch (e) {
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}
