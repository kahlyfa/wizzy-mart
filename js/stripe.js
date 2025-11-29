// Stripe Integration
// IMPORTANT: Replace 'pk_test_YOUR_PUBLISHABLE_KEY' with your actual Stripe publishable key

// Initialize Stripe (use your publishable key)
// For testing, you can use Stripe test mode keys
// TODO: Replace with your actual Stripe TEST publishable key (starts with pk_test_)
const stripe = window.Stripe ? Stripe('pk_live_51RtHBPA5bB22UqX8WPj5RNZqkfoEoz2VAOlSbUCnASJJJirnIUr0kSJo4K9UKjcrHObXKXNpE34NqTekMtz5skFh00CqwSu6jx') : null;

// Show error if Stripe is not loaded
if (!stripe) {
  console.error('Stripe.js failed to load. Please check your internet connection.');
}

// Checkout function
async function checkout() {
  // Check if cart has items
  if (!window.cart || window.cart.items.length === 0) {
    alert('Your cart is empty. Please add some books first.');
    return;
  }

  const checkoutButton = document.getElementById('checkout-button');
  checkoutButton.disabled = true;
  checkoutButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';

  try {
    // Get cart items in Stripe format
    const lineItems = window.cart.getCheckoutItems();

    // Call your backend function to create checkout session
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lineItems })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const session = await response.json();

    if (!stripe) {
      throw new Error('Stripe is not initialized');
    }

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      alert(result.error.message);
    }
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Something went wrong with checkout. Please try again.\n\nNote: Make sure you have set up Netlify Functions and added your Stripe keys.');
  } finally {
    checkoutButton.disabled = false;
    checkoutButton.innerHTML = 'Checkout';
  }
}

// Attach checkout to button when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const checkoutButton = document.getElementById('checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', checkout);
  }
});

// Handle canceled checkout
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('canceled') === 'true') {
  // Show notification that checkout was canceled
  setTimeout(() => {
    if (window.cart) {
      window.cart.showNotification('Checkout was canceled. Your items are still in your cart.');
    }
  }, 500);
}

// Export for use in other modules if needed
export { checkout };
