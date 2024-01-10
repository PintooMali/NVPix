const { stripe } = require("../utils/stripe.js");
module.exports = async (email) => {
  const response = await stripe.customers.list({
    email: email,
  });
  if (response.data[0]) {
    const customer = await response.data[0];
    console.log("dddppp", "cu");
    if (customer) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        expand: ["data.plan.product"],
      });
      if (subscriptions.data[0]) {
        return subscriptions.data[0].plan.product;
      }
    }
  } else {
    return null;
  }
};
