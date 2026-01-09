const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const createSession = async (productsList, orderId) => {
    try {
        const session = await stripe.checkout.sessions.create({
            client_reference_id: orderId,
            line_items: productsList,
            mode: 'payment',
            success_url: `http://localhost:3000/`
        });
        return session;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create stripe session');
    }
};

const constructEvent = async (payload, signature) => {
    try {
        const event = await stripe.webhooks.constructEvent(payload, signature, endpointSecret);
        return event;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to construct stripe event');
    }
};

module.exports = {
    createSession,
    constructEvent
};