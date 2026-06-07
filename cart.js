/* ============================================================
   FeastHub – cart.js
   Shared cart engine: works on both index.html & product.html
   ============================================================ */

// ─── EmailJS Config ───────────────────────────────────────────
// ⚠️  EmailJS credentials are loaded from env.js for local secret management
const EMAILJS_PUBLIC_KEY = window.EMAILJS_PUBLIC_KEY || '';
const EMAILJS_SERVICE_ID = window.EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = window.EMAILJS_TEMPLATE_ID || '';

const DELIVERY_FEE = 2.99;

// ─── Initialize EmailJS ───────────────────────────────────────
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ─── Cart State ───────────────────────────────────────────────
function getCart() {
  try { return JSON.parse(localStorage.getItem('fh_cart') || '[]'); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('fh_cart', JSON.stringify(cart));
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

// ─── Add Item to Cart ─────────────────────────────────────────
function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, 20);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      image: product.image || null,
      qty,
    });
  }
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

// ─── Remove Item from Cart ────────────────────────────────────
function removeFromCart(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

// ─── Update Item Quantity in Cart ─────────────────────────────
function updateCartQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, Math.min(item.qty + delta, 20));
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

// ─── Update Badge Count ───────────────────────────────────────
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = getCartCount();
  if (count > 0) {
    badge.textContent = count > 99 ? '99+' : count;
    badge.classList.remove('hidden');
    badge.classList.add('badge-pop');
    setTimeout(() => badge.classList.remove('badge-pop'), 300);
  } else {
    badge.classList.add('hidden');
  }
}

// ─── Render Cart Sidebar ──────────────────────────────────────
function renderCart() {
  const cart = getCart();
  const itemsList = document.getElementById('cart-items-list');
  const emptyState = document.getElementById('cart-empty');
  const footer = document.getElementById('cart-footer');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');

  if (!itemsList) return;

  itemsList.innerHTML = '';

  if (cart.length === 0) {
    emptyState?.classList.remove('hidden');
    footer?.classList.add('hidden');
    return;
  }

  emptyState?.classList.add('hidden');
  footer?.classList.remove('hidden');

  cart.forEach(item => {
    const thumbHtml = item.image
      ? `<img src="${item.image}" alt="${item.name}" class="cart-item-thumb" />`
      : `<div class="cart-item-thumb cart-item-emoji-thumb">${item.emoji}</div>`;

    const el = document.createElement('div');
    el.className = 'cart-item';
    el.id = `cart-item-${item.id}`;
    el.innerHTML = `
      ${thumbHtml}
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-unit-price">$${item.price.toFixed(2)} each</p>
        <div class="cart-item-controls">
          <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, -1)" aria-label="Decrease">−</button>
          <span class="cart-qty-val">${item.qty}</span>
          <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, 1)" aria-label="Increase">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-total">$${(item.price * item.qty).toFixed(2)}</span>
        <button class="cart-remove-btn" onclick="removeFromCart(${item.id})" aria-label="Remove ${item.name}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
      </div>
    `;
    itemsList.appendChild(el);
  });

  // Totals
  const subtotal = getCartSubtotal();
  const total = subtotal + DELIVERY_FEE;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// ─── Open / Close Cart ────────────────────────────────────────
function openCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  sidebar?.classList.add('cart-open');
  overlay?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  sidebar?.classList.remove('cart-open');
  overlay?.classList.add('hidden');
  document.body.style.overflow = '';
}

// ─── Build Email Order Summary ────────────────────────────────
function buildOrderSummary(cart) {
  const lines = cart.map(item =>
    `• ${item.name} x${item.qty} — $${(item.price * item.qty).toFixed(2)}`
  );
  const subtotal = getCartSubtotal();
  const total = subtotal + DELIVERY_FEE;
  return [
    '═══════════════════════════',
    '       ORDER SUMMARY       ',
    '═══════════════════════════',
    ...lines,
    '───────────────────────────',
    `Subtotal:     $${subtotal.toFixed(2)}`,
    `Delivery Fee: $${DELIVERY_FEE.toFixed(2)}`,
    `TOTAL:        $${total.toFixed(2)}`,
    '═══════════════════════════',
  ].join('\n');
}

// ─── Checkout via EmailJS ─────────────────────────────────────
async function checkout() {
  const cart = getCart();
  if (cart.length === 0) return;

  const user = JSON.parse(localStorage.getItem('fh_user') || '{}');
  const checkoutBtn = document.getElementById('checkout-btn');
  const checkoutText = document.getElementById('checkout-btn-text');
  const checkoutSpinner = document.getElementById('checkout-spinner');
  const checkoutStatus = document.getElementById('checkout-status');

  // Loading state
  checkoutText?.classList.add('hidden');
  checkoutSpinner?.classList.remove('hidden');
  if (checkoutBtn) checkoutBtn.disabled = true;
  if (checkoutStatus) {
    checkoutStatus.className = 'form-status hidden';
  }

  const orderSummary = buildOrderSummary(cart);
  const subtotal = getCartSubtotal();
  const total = subtotal + DELIVERY_FEE;

  // Build HTML-friendly item list for email
  const itemsHtml = cart.map(item =>
    `${item.name} × ${item.qty} — $${(item.price * item.qty).toFixed(2)}`
  ).join('\n');

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      user_name: user.name || 'Guest',
      user_email: user.email || '',
      order_items: itemsHtml,
      order_summary: orderSummary,
      subtotal: `$${subtotal.toFixed(2)}`,
      delivery_fee: `$${DELIVERY_FEE.toFixed(2)}`,
      order_total: `$${total.toFixed(2)}`,
      order_date: new Date().toLocaleString(),
    });

    // Clear cart
    saveCart([]);
    renderCart();
    updateCartBadge();

    if (checkoutStatus) {
      checkoutStatus.textContent = '🎉 Order placed! Check your email for confirmation.';
      checkoutStatus.className = 'form-status success';
    }

    // Close cart after short delay
    setTimeout(closeCart, 3500);

  } catch (err) {
    console.error('EmailJS error:', err);
    if (checkoutStatus) {
      checkoutStatus.textContent = '⚠️ Could not send email. Please check your EmailJS config.';
      checkoutStatus.className = 'form-status error-msg';
    }
  } finally {
    checkoutText?.classList.remove('hidden');
    checkoutSpinner?.classList.add('hidden');
    if (checkoutBtn) checkoutBtn.disabled = false;
    checkoutStatus?.classList.remove('hidden');
  }
}

// ─── Wire Up Cart Events (runs on both pages) ─────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Toggle button
  document.getElementById('cart-toggle-btn')?.addEventListener('click', openCart);

  // Close button & overlay
  document.getElementById('cart-close-btn')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

  // Checkout
  document.getElementById('checkout-btn')?.addEventListener('click', checkout);

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCart();
  });

  // Init badge & render cart
  updateCartBadge();
  renderCart();
});
