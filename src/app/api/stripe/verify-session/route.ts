import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Recupera a sessão do Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verifica se a sessão foi completada com sucesso
    if (session.payment_status === "paid" && session.status === "complete") {
      return NextResponse.json({
        success: true,
        session: {
          id: session.id,
          customerEmail: session.customer_details?.email,
          paymentStatus: session.payment_status,
          subscriptionId: session.subscription,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment not completed",
        paymentStatus: session.payment_status,
        status: session.status,
      });
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    return NextResponse.json(
      { error: "Error verifying session" },
      { status: 500 }
    );
  }
}
