const { Tracer } = require('@opentelemetry/api');
const express = require('express');
const router = express.Router();
/**
 * Endpoints for Handling Stripe Webhooks
 * @param {Tracer} tracer OpenTelemetry Tracer 
 * @returns router
 */
module.exports = ({ tracer }) => {
    router.post('/', express.raw({ type: 'application/json' }), (request, response) => {
        let event = request.body;
        //TODO: Ensure the integrity of the event by verifying the signature
        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
                // Then define and call a function to handle the successful payment intent.
                break;
            case 'payment_method.attached':
                const paymentMethod = event.data.object;
                // Then define and call a function to handle the new payment method.
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send();
    });


    return router;
};
