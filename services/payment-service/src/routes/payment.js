import { Tracer } from '@opentelemetry/api';
import { config } from 'dotenv';
import { Router } from 'express';
const router = Router();

if (process.env.NODE_ENV !== 'production') {
    config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
/**
 * Endpoints for Payment management
 * @param {Tracer} tracer OpenTelemetry Tracer
 * @returns 
 */
export default ({ tracer }) => {
    router.post("/create-checkout-session", async (req, res) => {
        // Assume req.body contains amount and projectId
        const { amount, projectId } = req.body;
        try {
            const origin =
                req.headers.origin ?? req.hostname ?? "http://localhost:3000";

            const productName = projectId === undefined
                ? ""
                : projectId ?? "Project";
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name:
                                    "Escrow Service Fee for " + productName,
                            },
                            unit_amount: (amount ?? 100) * 100, // example amount
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}&project=${projectId}`,
                cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}&project=${projectId}`,
                // success_url: `${req.protocol}://${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}&project=${projectId}`,
                // cancel_url: `${req.protocol}://${origin}/cancel?session_id={CHECKOUT_SESSION_ID}&project=${projectId}`,
            });
            if (Boolean(process.env.SHOULD_REDIRECT_PAYMENT_SESSION) === true) {
                res.redirect(303, session.url);
            } else {
                res.json({ id: session.id, url: session.url });
            }
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

            // Step 1: Update the milestone status in the database to "completed"
            const updatedMilestone = await prisma.milestone.update({
                where: {
                    id: milestoneId,
                },
                data: {
                    status: 'completed',
                },
            });

            // Step 2: Implement logic to release funds to the service provider
            // Replace the following line with your funds release logic
            const fundsReleased = true;

            if (fundsReleased) {
                res.status(200).json({ message: 'Funds released successfully' });
            } else {
                res.status(500).json({ error: 'Unable to release funds' });
            }
        } catch (error) {
            console.error('Error releasing funds:', error);
            res.status(500).json({ error: 'Unable to release funds' });
        }
    });

    return router;
};
