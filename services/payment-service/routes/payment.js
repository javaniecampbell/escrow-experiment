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
                      name: 'Escrow Service Fee for'+ projectId,
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
    const { milestoneId } = req.body;
    // Logic to create Stripe Checkout session for the milestone payment
    res.status(200).send({ sessionId: session.id });
});

router.post('/release-funds', async (req, res) => {
    const { milestoneId } = req.body;
    // Logic to release funds for the completed milestone
    res.status(200).send({ message: 'Funds released' });
});

module.exports = router;
