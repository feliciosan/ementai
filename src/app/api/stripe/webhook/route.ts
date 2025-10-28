import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

// Initialize Firebase Admin (only if not already initialized)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`Webhook signature verification failed.`, error.message);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode === "subscription" && session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const customer = (await stripe.customers.retrieve(
      session.customer as string
    )) as Stripe.Customer;

    if (customer.email) {
      await updateCompanySubscription(
        customer.email,
        subscription,
        subscription.status as
          | "active"
          | "canceled"
          | "past_due"
          | "unpaid"
          | "incomplete"
      );
    }
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customer = (await stripe.customers.retrieve(
    subscription.customer as string
  )) as Stripe.Customer;

  if (customer.email) {
    await updateCompanySubscription(
      customer.email,
      subscription,
      subscription.status as
        | "active"
        | "canceled"
        | "past_due"
        | "unpaid"
        | "incomplete"
    );
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customer = (await stripe.customers.retrieve(
    subscription.customer as string
  )) as Stripe.Customer;

  if (customer.email) {
    await updateCompanySubscription(customer.email, subscription, "canceled");
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  interface InvoiceWithSubscription extends Stripe.Invoice {
    subscription?: string;
  }

  const invoiceWithSub = invoice as InvoiceWithSubscription;
  if (invoiceWithSub.subscription) {
    const subscription = await stripe.subscriptions.retrieve(
      invoiceWithSub.subscription
    );
    const customer = (await stripe.customers.retrieve(
      subscription.customer as string
    )) as Stripe.Customer;

    if (customer.email) {
      await updateCompanySubscription(customer.email, subscription, "past_due");
    }
  }
}

async function updateCompanySubscription(
  email: string,
  subscription: Stripe.Subscription,
  status: "active" | "canceled" | "past_due" | "unpaid" | "incomplete"
) {
  try {
    // Query company by email
    const companiesSnapshot = await db
      .collection("companies")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (companiesSnapshot.empty) {
      console.error(`No company found with email: ${email}`);
      return;
    }

    const companyDoc = companiesSnapshot.docs[0];

    const subscriptionData = {
      status,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCustomerId: subscription.customer as string,
      cancelAtPeriodEnd: subscription.cancel_at_period_end || false,
      currentPeriodEnd: subscription.cancel_at,
    };

    await companyDoc.ref.update({
      subscription: subscriptionData,
      updatedAt: new Date(),
    });

    console.log(`Updated subscription for company: ${companyDoc.id}`);
  } catch (error) {
    console.error("Error updating company subscription:", error);
    throw error;
  }
}
