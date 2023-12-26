const express = require('express');
const router = express.Router();

router.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    let event = request.body;

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


module.exports = router;
