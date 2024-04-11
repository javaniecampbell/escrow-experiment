export const dynamic = 'force-dynamic';

async function POST(req: Request) {
    const res = await fetch('http://payment-service/api/requests/create', { body: JSON.stringify({ "amount": 3.00, "projectId": 1 }), method: 'POST' });

    let data;
    if (res.ok) {
        data = await res.json();
        return Response.redirect(data.url);
    }
    Response.json({ error: 'Error creating checkout session' });
}