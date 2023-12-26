var express = require('express');
var router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  try {
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
              price_data: {
                  currency: 'usd',
                  product_data: {
                      name: 'Escrow Service Fee',
                  },
                  unit_amount: 2000, // example amount
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

module.exports = router;
