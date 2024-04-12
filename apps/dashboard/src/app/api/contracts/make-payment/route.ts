export const dynamic = 'force-dynamic';

export async function POST(req: Request) {

    // get the id for the contract to be paid for from the request body
    const body = await req.json();
    const contractId = body.contractId;

    // fetch the contract to be paid for

    // extract the amount to be paid from the contract

    // create a checkout session for the contract

    const res = await fetch('http://payment-service/api/payments/create-checkout-session', { body: JSON.stringify({ "amount": 3.00, "projectId": 1 }), method: 'POST' });

    let data;
    if (res.ok) {
        data = await res.json();
        return Response.redirect(data.url);
    }
    Response.json({ error: 'Error creating checkout session' });
}