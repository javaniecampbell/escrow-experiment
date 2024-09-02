import { Tracer } from "@opentelemetry/api";
import { Router, raw } from "express";
const router = Router();
import logger from "../utils/logger";
import { v4 } from "uuid";
import stripe from "../utils/stripe";
import c from "config";
/**
 * Endpoints for Handling Stripe Webhooks
 * @param {Tracer} tracer OpenTelemetry Tracer
 * @returns router
 */
export default ({ tracer }: { tracer: Tracer }) => {
  router.post(
    "/",
    raw({ type: "application/json" }),
    async (request, response) => {
      const sig = request.header("stripe-signature") as string;
      const requestId = request.header("x-request-id") || v4();
      logger.info("Received Webhook Event request", {
        requestId,
        path: request.path,
      });
      const span = tracer.startSpan("stripe_webhook_event", {
        attributes: { requestId },
      });

      if (process.env.STRIPE_WEBHOOK_SECRET === undefined) {
        span.addEvent("error", {
          error: "Stripe Webhook Secret is not defined",
        });
        span.setStatus({
          code: 1,
          message: "Stripe Webhook Secret is not defined",
        });
        span.end();
        response.status(500).send("Stripe Webhook Secret is not defined");
        return;
      }
      let event;
      //Ensure the integrity of the event by verifying the signature
      span.addEvent("received_webhook_event", {
        path: request.path,
        requestId,
        sig,
      });
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (e) {
        if (e instanceof Error) {
          logger.error("Error verifying webhook event", {
            error: e.message,
            requestId,
          });
          span.addEvent("error", { error: e.message });
          span.setStatus({ code: 1, message: e.message });
          span.end();
          response.status(400).send(`Webhook Error: ${e.message}`);
          return;
        }
      }
      // Handle the event
      switch (event?.type) {
        case "payment_intent.succeeded": {
          span.addEvent("payment_intent_succeeded", {
            amount: event.data.object.amount,
          });
          const paymentIntent = event.data.object;
          console.log(
            `PaymentIntent for ${paymentIntent.amount} was successful!`
          );
          // Then define and call a function to handle the successful payment intent.
          try {
            // Example: Call an API endpoint to initiate the payment process
            const response = await fetch("/api/payments/pay", {
              method: "POST",
              body: JSON.stringify({
                paymentIntentId: paymentIntent.id,
                amount: paymentIntent.amount,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!response.ok) {
              // Payment failed, display an error message
              logger.warn("Payment failed. Please try again.");
            }
            // Payment successful, display a success message
            logger.info("Payment successful!");
            span.addEvent("payment_successful", {
              amount: paymentIntent.amount,
            });
            span.setStatus({
              code: 0,
              message: "Payment successful!",
            });
            span.end();
          } catch (error) {
            logger.error("Error calling /api/payments/pay:", error);
            span.addEvent("error", {
              error: "Error calling /api/payments/pay:",
            });
            span.setStatus({
              code: 1,
              message: "Error calling /api/payments/pay:",
            });
            span.end();
            return response.status(500).send("Error processing payment");
          }

          break;
        }
        case "payment_method.attached": {
          const paymentMethod = event.data.object;
          span.addEvent("payment_method_attached", {
            paymentMethod: JSON.stringify(paymentMethod),
          });
          // Then define and call a function to handle the new payment method.
          break;
        }
        default: {
          span.addEvent("unhandled_event", { type: event?.type });
          logger.info(`Unhandled event type ${event?.type}`);
          break;
        }
      }
      span.end();
      logger.info("Webhook successfully captured", {
        requestId,
        dataSize: JSON.stringify(event).length,
      });
      // Return a 200 response to acknowledge receipt of the event
      response.json({ received: true });
    }
  );

  return router;
};
