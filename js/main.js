import { books } from './books.js';
import { Cart } from './cart.js';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Cart is already initialized globally in cart.js

  // Render books
  renderBooks(books);

  // Setup event listeners
  setupCategoryFilters();
  setupSearch();

  // Make functions globally accessible
  window.quickView = quickView;
  window.addToCart = addToCart;
  window.addToCartFromModal = addToCartFromModal;
  window.closeModal = closeModal;
});

// Render books to the grid
function renderBooks(booksToRender) {
  const bookGrid = document.getElementById('book-grid');

  if (booksToRender.length === 0) {
    bookGrid.innerHTML = `
      <div class="col-span-full text-center py-16">
        <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
        <h3 class="text-2xl font-bold text-gray-700 mb-2">No books found</h3>
        <p class="text-gray-500">Try adjusting your search or filter</p>
      </div>
    `;
    return;
  }

  bookGrid.innerHTML = '';

  booksToRender.forEach(book => {
    const bookCard = createBookCard(book);
    bookGrid.appendChild(bookCard);
  });
}

// Create a book card element
function createBookCard(book) {
  const card = document.createElement('div');
  card.className = 'book-card bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer';

  // Calculate discount percentage
  const discount = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  card.innerHTML = `
    <div class="relative">
      <img src="${book.coverImage}" alt="${book.title}" class="w-full h-80 object-cover" loading="lazy">
      ${discount > 0 ? `<span class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">${discount}% OFF</span>` : ''}
    </div>
    <div class="p-4">
      <h3 class="font-bold text-lg text-gray-900 mb-1 line-clamp-2">${book.title}</h3>
      <p class="text-sm text-gray-600 mb-2">${book.author}</p>
      <div class="flex items-center mb-3">
        ${generateStars(book.rating)}
        <span class="text-xs text-gray-500 ml-2">(${book.reviews.toLocaleString()})</span>
      </div>
      <div class="flex items-center justify-between mb-4">
        <div>
          <span class="text-2xl font-bold text-primary">$${book.price.toFixed(2)}</span>
          ${book.originalPrice ? `<span class="text-sm text-gray-400 line-through ml-2">$${book.originalPrice.toFixed(2)}</span>` : ''}
        </div>
      </div>
      <div class="flex gap-2">
        <button onclick="quickView(${book.id})" class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-semibold">
          Quick View
        </button>
        <button onclick="addToCart(${book.id})" class="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-semibold">
          Add to Cart
        </button>
      </div>
    </div>
  `;

  return card;
}

// Generate star rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let starsHTML = '';

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<svg class="w-4 h-4 text-yellow-400 fill-current inline-block" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
  }

  // Half star
  if (hasHalfStar) {
    starsHTML += '<svg class="w-4 h-4 text-yellow-400 fill-current inline-block" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stop-color="#FBBF24"/><stop offset="50%" stop-color="#D1D5DB"/></linearGradient></defs><path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
  }

  // Empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<svg class="w-4 h-4 text-gray-300 fill-current inline-block" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
  }

  return `<div class="flex">${starsHTML}</div>`;
}

// Quick view modal
function quickView(bookId) {
  const book = books.find(b => b.id === bookId);
  if (!book) return;

  const modal = document.getElementById('book-modal');
  const modalContent = document.getElementById('modal-content');

  // Calculate discount
  const discount = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  modalContent.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6">
      <div class="md:w-2/5">
        <div class="relative">
          <img src="${book.coverImage}" alt="${book.title}" class="w-full rounded-lg shadow-lg">
          ${discount > 0 ? `<span class="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">${discount}% OFF</span>` : ''}
        </div>
      </div>
      <div class="md:w-3/5">
        <span class="inline-block px-3 py-1 bg-blue-100 text-primary text-sm font-semibold rounded-full mb-2">${book.category}</span>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">${book.title}</h2>
        <p class="text-xl text-gray-600 mb-4">by ${book.author}</p>

        <div class="flex items-center mb-4">
          ${generateStars(book.rating)}
          <span class="text-sm text-gray-500 ml-2">${book.rating} (${book.reviews.toLocaleString()} reviews)</span>
        </div>

        <div class="mb-6">
          <span class="text-4xl font-bold text-primary">$${book.price.toFixed(2)}</span>
          ${book.originalPrice ? `<span class="text-xl text-gray-400 line-through ml-3">$${book.originalPrice.toFixed(2)}</span>` : ''}
          ${discount > 0 ? `<span class="ml-3 text-green-600 font-semibold">Save ${discount}%</span>` : ''}
        </div>

        <p class="text-gray-700 mb-6 leading-relaxed">${book.description}</p>

        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 class="font-semibold text-gray-900 mb-3">Book Details</h3>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div><span class="text-gray-600">Pages:</span> <span class="font-medium">${book.pages}</span></div>
            <div><span class="text-gray-600">Format:</span> <span class="font-medium">${book.format}</span></div>
            <div><span class="text-gray-600">Published:</span> <span class="font-medium">${new Date(book.publishedDate).toLocaleDateString()}</span></div>
            <div><span class="text-gray-600">File Size:</span> <span class="font-medium">${book.fileSize}</span></div>
          </div>
        </div>

        <button onclick="addToCartFromModal(${book.id})" class="w-full bg-primary hover:bg-blue-600 text-white font-bold px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg">
          <i class="fas fa-shopping-cart mr-2"></i>Add to Cart - $${book.price.toFixed(2)}
        </button>
      </div>
    </div>
  `;

  // Show modal with animation
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.add('opacity-100');
    modalContent.classList.add('scale-100');
  }, 10);

  // Prevent background scrolling
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  const modal = document.getElementById('book-modal');
  const modalContent = document.getElementById('modal-content');

  modal.classList.remove('opacity-100');
  modalContent.classList.remove('scale-100');

  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);

  // Restore scrolling
  document.body.style.overflow = '';
}

// Add to cart from grid
function addToCart(bookId) {
  const book = books.find(b => b.id === bookId);
  if (book && window.cart) {
    window.cart.addItem(book);
  }
}

// Add to cart from modal
function addToCartFromModal(bookId) {
  const book = books.find(b => b.id === bookId);
  if (book && window.cart) {
    window.cart.addItem(book);
    closeModal();
  }
}

// Category filtering
function setupCategoryFilters() {
  const categoryButtons = document.querySelectorAll('.category-btn');

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      // Update active state
      categoryButtons.forEach(btn => {
        btn.classList.remove('active', 'bg-primary', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
      });
      button.classList.remove('bg-gray-100', 'text-gray-700');
      button.classList.add('active', 'bg-primary', 'text-white');

      // Filter books
      if (category === 'all') {
        renderBooks(books);
      } else {
        const filtered = books.filter(book => book.category === category);
        renderBooks(filtered);
      }

      // Scroll to books section
      const booksSection = document.getElementById('books-section');
      booksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchInputMobile = document.getElementById('search-input-mobile');

  // Debounce function for better performance
  let debounceTimer;
  const debounce = (callback, delay) => {
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => callback(...args), delay);
    };
  };

  const performSearch = (query) => {
    query = query.toLowerCase().trim();

    if (query === '') {
      renderBooks(books);
      return;
    }

    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query)
    );

    renderBooks(filtered);
  };

  const debouncedSearch = debounce(performSearch, 300);

  searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });

  searchInputMobile.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });
}

// Click modal background to close
document.addEventListener('click', (e) => {
  const modal = document.getElementById('book-modal');
  if (e.target === modal) {
    closeModal();
  }
});
