import Stripe from 'stripe'; // Import the Stripe library

const stripeApiKey = 'your_stripe_api_key'; // Replace with your Stripe API key

const stripeClient = new Stripe(stripeApiKey,{});

export default stripeClient;