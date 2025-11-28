# Wizzy Mart - Book Sales Website

A professional, modern one-page book sales website with integrated Stripe payment processing. Users can browse books, view details, add to cart, and complete purchases seamlessly.

![Wizzy Mart](https://img.shields.io/badge/Status-Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- **Modern UI/UX**: Clean, responsive design built with Tailwind CSS
- **Book Catalog**: Display 20+ books with detailed information
- **Smart Search**: Real-time search across titles, authors, and categories
- **Category Filtering**: Easy navigation through different book genres
- **Shopping Cart**: Persistent cart with quantity management
- **Stripe Integration**: Secure payment processing with Stripe Checkout
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Quick View Modal**: Preview book details without leaving the page
- **Smooth Animations**: Professional transitions and interactions

## Technology Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Payment**: Stripe Checkout (hosted payment page)
- **Backend**: Netlify Functions (serverless)
- **Hosting**: Netlify (recommended)
- **Version Control**: Git

## Project Structure

```
wizzy-mart/
├── index.html                    # Main page
├── success.html                  # Payment success page
├── css/                          # Custom styles (optional)
├── js/
│   ├── books.js                  # Book data
│   ├── cart.js                   # Shopping cart functionality
│   ├── main.js                   # Core functionality
│   └── stripe.js                 # Payment integration
├── images/
│   ├── book-covers/              # Book cover images
│   └── icons/                    # Site icons
├── netlify/
│   └── functions/
│       └── create-checkout-session.js  # Stripe checkout handler
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore file
├── netlify.toml                  # Netlify configuration
├── package.json                  # Node dependencies
└── README.md                     # This file
```

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd wizzy-mart
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Stripe

1. Create a free Stripe account at [https://stripe.com](https://stripe.com)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
3. Create products and prices in Stripe for your books

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Stripe secret key:
   ```
   STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
   URL=http://localhost:8888
   ```

3. Update `js/stripe.js` with your Stripe publishable key:
   ```javascript
   const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
   ```

### 5. Create Stripe Products

For each book in `js/books.js`, you need to:

1. Go to [Stripe Products](https://dashboard.stripe.com/test/products)
2. Click "Add product"
3. Fill in:
   - Name: Book title
   - Description: Book description
   - Price: Book price
4. Copy the **Price ID** (starts with `price_`)
5. Update the `priceId` field in `js/books.js`

### 6. Run Locally

```bash
npm run dev
```

This will start the Netlify Dev server at `http://localhost:8888`

### 7. Test the Payment

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

## Deployment to Netlify

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

4. Add environment variables in Netlify dashboard:
   - Go to Site Settings → Build & Deploy → Environment
   - Add `STRIPE_SECRET_KEY`

### Option 2: Deploy via GitHub

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: (leave empty or `.`)
6. Add environment variables:
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
7. Click "Deploy site"

## Customization

### Change Colors

Edit the Tailwind config in `index.html`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#YOUR_COLOR',
        secondary: '#YOUR_COLOR',
        accent: '#YOUR_COLOR',
      }
    }
  }
}
```

### Add More Books

Edit `js/books.js` and add more book objects to the `books` array. Make sure to:
1. Create corresponding products in Stripe
2. Update the `priceId` with the correct Stripe Price ID

### Replace Book Cover Images

- Replace the Unsplash URLs in `js/books.js` with your own images
- Or download images to `images/book-covers/` and update paths

### Customize Text

- Site name: Update "Wizzy Mart" in `index.html` and `success.html`
- Contact info: Update email and phone in the footer
- Social links: Update URLs in the footer

## Features to Add

### Phase 2 Enhancements

- [ ] User authentication and accounts
- [ ] Purchase history
- [ ] Wishlists/Favorites
- [ ] User reviews and ratings
- [ ] Admin panel to manage books
- [ ] Discount codes
- [ ] Email delivery of eBooks
- [ ] Book preview/sample chapters

## Testing Checklist

- [ ] Books display correctly
- [ ] Category filtering works
- [ ] Search functionality works
- [ ] Quick view modal opens
- [ ] Add to cart works
- [ ] Cart sidebar opens
- [ ] Quantity can be changed
- [ ] Items can be removed
- [ ] Checkout redirects to Stripe
- [ ] Success page displays
- [ ] Cart clears after payment
- [ ] Responsive on mobile
- [ ] Works on all browsers

## Troubleshooting

### Stripe checkout not working

- Check that API keys are correct
- Verify environment variables are set in Netlify
- Check browser console for errors
- Make sure Netlify Functions are deployed

### Images not loading

- Check image paths are correct
- Verify images are in the correct folder
- Check if using external URLs that they're accessible

### Cart not persisting

- Verify localStorage is enabled in browser
- Check for JavaScript errors in console

## Support

For issues and questions:
- Email: support@wizzymart.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

## License

MIT License - feel free to use this project for your own purposes.

## Credits

- Built with [Tailwind CSS](https://tailwindcss.com)
- Payments by [Stripe](https://stripe.com)
- Hosted on [Netlify](https://netlify.com)
- Icons by [Font Awesome](https://fontawesome.com)

## Roadmap

- [ ] Add user authentication
- [ ] Implement email delivery
- [ ] Add book preview feature
- [ ] Create admin dashboard
- [ ] Add analytics integration
- [ ] Implement SEO optimizations
- [ ] Add multi-language support
- [ ] Create mobile app

---

Made with ❤️ by [Your Name]
