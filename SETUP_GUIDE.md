# Quick Setup Guide - Wizzy Mart

This guide will help you get your book store up and running in 15 minutes.

## Prerequisites

- Node.js installed (v14 or higher)
- A Stripe account (free to create)
- Basic knowledge of command line

## Step-by-Step Setup

### Step 1: Install Dependencies (2 minutes)

Open your terminal in the project folder and run:

```bash
npm install
```

### Step 2: Set Up Stripe Account (5 minutes)

1. **Create Stripe Account**
   - Go to https://stripe.com
   - Click "Start now" and create a free account
   - Verify your email

2. **Get API Keys**
   - Go to https://dashboard.stripe.com/test/apikeys
   - You'll see two keys:
     - Publishable key (starts with `pk_test_`)
     - Secret key (starts with `sk_test_`) - Click "Reveal test key"
   - Copy both keys

3. **Create Your First Product**
   - Go to https://dashboard.stripe.com/test/products
   - Click "Add product"
   - Enter:
     - Name: "The Psychology of Money"
     - Price: 14.99 USD
     - Click "Save product"
   - Click on the price you just created
   - Copy the **Price ID** (starts with `price_`)

### Step 3: Configure Environment Variables (2 minutes)

1. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Stripe secret key:
   ```
   STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY_HERE
   URL=http://localhost:8888
   ```

3. Open `js/stripe.js` and replace the publishable key (line 6):
   ```javascript
   const stripe = Stripe('pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY_HERE');
   ```

### Step 4: Update Book Price IDs (3 minutes)

Open `js/books.js` and update the first book's `priceId` with the one you copied from Stripe:

```javascript
{
  id: 1,
  title: "The Psychology of Money",
  // ... other fields ...
  priceId: "price_YOUR_ACTUAL_PRICE_ID_HERE"
}
```

For now, you can use the same Price ID for all books (just for testing). Later, you'll create separate products for each book.

### Step 5: Run the Development Server (1 minute)

```bash
npm run dev
```

Open your browser and go to: http://localhost:8888

### Step 6: Test the Website (2 minutes)

1. Browse the books
2. Click "Add to Cart" on any book
3. Open the cart (click cart icon)
4. Click "Checkout"
5. Use Stripe test card:
   - Card number: `4242 4242 4242 4242`
   - Expiry: `12/34` (any future date)
   - CVC: `123` (any 3 digits)
   - ZIP: `12345` (any 5 digits)
6. Complete the payment
7. You should see the success page!

## Next Steps

### Add All Your Books to Stripe

For each book in `js/books.js`:

1. Go to Stripe Products
2. Create a new product with the book's details
3. Copy the Price ID
4. Update the `priceId` in `js/books.js`

### Customize Your Store

1. **Change Colors**: Edit `tailwind.config` in `index.html`
2. **Update Text**: Change "Wizzy Mart" to your store name
3. **Replace Images**: Add your book cover images
4. **Update Contact Info**: Add your email and social links

### Deploy to Production

When you're ready to go live:

1. **Switch to Live Mode in Stripe**
   - Go to Stripe Dashboard
   - Toggle from "Test mode" to "Live mode"
   - Get your live API keys
   - Create products again in live mode

2. **Deploy to Netlify**
   ```bash
   netlify login
   netlify init
   netlify deploy --prod
   ```

3. **Add Environment Variables in Netlify**
   - Go to your site settings
   - Add `STRIPE_SECRET_KEY` with your LIVE secret key

4. **Update Publishable Key**
   - Update `js/stripe.js` with your LIVE publishable key

## Common Issues

### "Stripe is not defined"
- Make sure you have internet connection (Stripe loads from CDN)
- Check browser console for errors

### "No such price"
- Make sure you copied the correct Price ID from Stripe
- Verify you're in the same mode (test/live) in both Stripe and your code

### Checkout not working
- Check that environment variables are set correctly
- Make sure Netlify Functions are running (`npm run dev`)
- Check browser console for errors

### Cart not saving
- Clear browser cache and localStorage
- Check for JavaScript errors in console

## Support

Need help? Check these resources:

- **Stripe Documentation**: https://stripe.com/docs
- **Netlify Documentation**: https://docs.netlify.com
- **Tailwind CSS Docs**: https://tailwindcss.com/docs

## Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] Stripe account created
- [ ] API keys obtained
- [ ] At least one product created in Stripe
- [ ] `.env` file created with secret key
- [ ] `js/stripe.js` updated with publishable key
- [ ] Price ID updated in `js/books.js`
- [ ] Dev server running (`npm run dev`)
- [ ] Test purchase completed successfully

Once all items are checked, you're ready to customize and deploy!

---

Happy selling! 📚
