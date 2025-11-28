// Netlify Function for creating Stripe Checkout Session
// This function runs on the server side, keeping your Stripe secret key secure

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the request body
    const { lineItems } = JSON.parse(event.body);

    // Validate that lineItems exist
    if (!lineItems || lineItems.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No items in cart' })
      };
    }

    // Get the site URL from environment or use a default
    const siteUrl = process.env.URL || 'http://localhost:8888';

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${siteUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?canceled=true`,
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'NG', 'AU', 'DE', 'FR', 'IT', 'ES']
      },
      // Optional: Add metadata for tracking
      metadata: {
        order_source: 'wizzy_mart'
      },
      // Optional: Enable automatic tax calculation (requires Stripe Tax setup)
      // automatic_tax: { enabled: true },
    });

    // Return the session ID
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: session.id })
    };

  } catch (error) {
    console.error('Error creating checkout session:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: error.message || 'Failed to create checkout session'
      })
    };
  }
};
