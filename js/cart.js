// Shopping Cart Class
export class Cart {
  constructor() {
    this.items = this.loadCart();
    this.updateCartUI();
  }

  // Load cart from localStorage
  loadCart() {
    const saved = localStorage.getItem('bookCart');
    return saved ? JSON.parse(saved) : [];
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem('bookCart', JSON.stringify(this.items));
  }

  // Add item to cart
  addItem(book) {
    const existing = this.items.find(item => item.id === book.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        coverImage: book.coverImage,
        priceId: book.priceId,
        quantity: 1
      });
    }

    this.saveCart();
    this.updateCartUI();
    this.showNotification(`"${book.title}" added to cart!`);
  }

  // Remove item from cart
  removeItem(bookId) {
    this.items = this.items.filter(item => item.id !== bookId);
    this.saveCart();
    this.updateCartUI();
    this.showNotification('Item removed from cart');
  }

  // Update quantity
  updateQuantity(bookId, change) {
    const item = this.items.find(item => item.id === bookId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
      this.removeItem(bookId);
    } else {
      this.saveCart();
      this.updateCartUI();
    }
  }

  // Get cart total
  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Get item count
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  // Update cart UI
  updateCartUI() {
    this.updateCartBadge();
    this.renderCartItems();
    this.updateCartSummary();
  }

  // Update cart badge
  updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const count = this.getItemCount();

    if (count > 0) {
      badge.textContent = count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  // Render cart items
  renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');

    if (this.items.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="text-center py-12">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <p class="text-gray-500 text-lg">Your cart is empty</p>
          <p class="text-gray-400 text-sm mt-2">Add some books to get started!</p>
        </div>
      `;
      return;
    }

    cartItemsContainer.innerHTML = this.items.map(item => `
      <div class="flex gap-4 py-4 border-b border-gray-200">
        <img src="${item.coverImage}" alt="${item.title}" class="w-20 h-28 object-cover rounded shadow">
        <div class="flex-1">
          <h4 class="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">${item.title}</h4>
          <p class="text-xs text-gray-500 mb-2">${item.author}</p>
          <p class="text-lg font-bold text-primary">$${item.price.toFixed(2)}</p>
        </div>
        <div class="flex flex-col items-end justify-between">
          <button onclick="cart.removeItem(${item.id})" class="text-gray-400 hover:text-red-500 transition" aria-label="Remove item">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <div class="flex items-center gap-2 bg-gray-100 rounded-lg">
            <button onclick="cart.updateQuantity(${item.id}, -1)" class="px-3 py-1 hover:bg-gray-200 rounded-l-lg transition" aria-label="Decrease quantity">-</button>
            <span class="px-3 py-1 font-semibold">${item.quantity}</span>
            <button onclick="cart.updateQuantity(${item.id}, 1)" class="px-3 py-1 hover:bg-gray-200 rounded-r-lg transition" aria-label="Increase quantity">+</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Update cart summary
  updateCartSummary() {
    const subtotal = this.getTotal();
    const tax = subtotal * 0.1; // 10% tax (adjust as needed)
    const total = subtotal + tax;

    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
  }

  // Show notification
  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      notification.style.transition = 'all 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Toggle cart sidebar
  toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');

    if (cartSidebar.classList.contains('translate-x-full')) {
      cartSidebar.classList.remove('translate-x-full');
      cartOverlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      cartSidebar.classList.add('translate-x-full');
      cartOverlay.classList.add('hidden');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }

  // Prepare checkout (returns Stripe line items)
  getCheckoutItems() {
    return this.items.map(item => ({
      price: item.priceId, // Stripe Price ID
      quantity: item.quantity
    }));
  }

  // Clear cart
  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartUI();
  }

  // Get total items value
  getTotalValue() {
    return this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
}

// Make cart globally accessible
window.cart = new Cart();
