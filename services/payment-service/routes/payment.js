const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
    // Assume req.body contains amount and projectId
    const { amount, projectId } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Escrow Service Fee for' + projectId,
                    },
                    unit_amount: amount, // example amount
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'your_success_url',
            cancel_url: 'your_cancel_url',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.post('/initiate-payment', async (req, res) => {
    try {
        const { milestoneId } = req.body;
    
        // Step 1: Fetch milestone details from the database
        const milestone = await prisma.milestone.findUnique({
          where: {
            id: milestoneId,
          },
        });
    
        // Step 2: Implement Stripe Connect logic to initiate payment
        // Replace the following line with your Stripe integration code
        const paymentIntent = await stripe.paymentIntents.create({
          amount: milestone.amount * 100, // Amount in cents
          currency: 'usd',
          // Other payment details...
        });
    
        // Step 3: Return the payment intent client secret to the client
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({ error: 'Unable to initiate payment' });
      }
});

router.post('/release-funds', async (req, res) => {
    try {
        const { milestoneId } = req.body;

        
        // Logic to release funds for the completed milestone
        // Step 1: Fetch milestone details from the database
        const milestone = await prisma.milestone.findUnique({
            where: {
                id: milestoneId,
            },
        });

        // Step 2: Implement Stripe Connect logic to initiate payment
        // Replace the following line with your Stripe integration code
        const paymentIntent = await stripe.paymentIntents.create({
            amount: milestone.amount * 100, // Amount in cents
            currency: 'usd',
            // Other payment details...
        });

        // Step 3: Return the payment intent client secret to the client
        res.status(200).json({ clientSecret: paymentIntent.client_secret });

        // res.status(200).send({ message: 'Funds released' });
    } catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({ error: 'Unable to initiate payment' });
    }

});

module.exports = router;
