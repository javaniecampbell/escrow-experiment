import { Tracer } from '@opentelemetry/api';
import { Router, raw } from 'express';
const router = Router();
import logger from '../utils/logger';
import { v4 } from 'uuid';
/**
 * Endpoints for Handling Stripe Webhooks
 * @param {Tracer} tracer OpenTelemetry Tracer 
 * @returns router
 */
export default ({ tracer }) => {
    router.post('/', raw({ type: 'application/json' }), (request, response) => {
        const requestId = request.header('x-request-id') || v4();
        logger.info('Received Webhook Event request', { requestId, path: request.path });

        const span = tracer.startSpan('stripe_webhook_event', { attributes: { requestId } });
        let event = request.body;
        //TODO: Ensure the integrity of the event by verifying the signature
        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded': {
                span.addEvent('payment_intent_succeeded', { amount: event.data.object.amount })
                const paymentIntent = event.data.object;
                console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
                // Then define and call a function to handle the successful payment intent.
                break;
            }
            case 'payment_method.attached': {
                span.addEvent('payment_method_attached', { paymentMethod: event.data.object })
                const paymentMethod = event.data.object;
                // Then define and call a function to handle the new payment method.
                break;
            }
            default: {
                span.addEvent('unhandled_event', { type: event.type });
                logger.info(`Unhandled event type ${event.type}`);
                break;
            }
        }
        span.end();
        logger.info('Webhook successfully captured', { requestId, dataSize: event.length });
        // Return a 200 response to acknowledge receipt of the event
        response.send();
    });


    return router;
};
