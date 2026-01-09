const stripeService = require('../../services/stripe');

const handleWebhook = async (req, res) => {
  const payload = req.body;
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = await stripeService.constructEvent(payload, signature);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log(session.client_reference_id);

      // TODO: if session payment_status is paid, update order status to completed/ paid
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return res.status(200).end();
};

module.exports = {
    handleWebhook,
};