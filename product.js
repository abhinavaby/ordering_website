/* ============================================================
   FeastHub – product.js  (product.html only)
   Handles: Product Detail Page — loads data, qty, addToCart
   ============================================================ */

// ─── DOM References ───────────────────────────────────────────
const detailSkeleton     = document.getElementById('detail-skeleton');
const detailContent      = document.getElementById('detail-content');
const navUserName        = document.getElementById('nav-user-name');
const navAvatarLetter    = document.getElementById('user-avatar-letter');
const detailImg          = document.getElementById('detail-img');
const detailImgBg        = document.getElementById('detail-img-bg');
const detailImgContainer = document.getElementById('detail-img-container');
const detailBadge        = document.getElementById('detail-badge');
const detailCategory     = document.getElementById('detail-category');
const detailTitle        = document.getElementById('detail-title');
const metaTime           = document.getElementById('meta-time');
const metaCalories       = document.getElementById('meta-calories');
const metaRating         = document.getElementById('meta-rating');
const detailDescription  = document.getElementById('detail-description');
const ingredientsList    = document.getElementById('detail-ingredients-list');
const detailPriceEl      = document.getElementById('detail-price');
const qtyDisplay         = document.getElementById('qty-display');
const qtyDecrease        = document.getElementById('qty-decrease');
const qtyIncrease        = document.getElementById('qty-increase');
const orderBtn           = document.getElementById('order-btn');
const orderToast         = document.getElementById('order-toast');

// ─── Load user from localStorage ─────────────────────────────
function loadUser() {
  const saved = localStorage.getItem('fh_user');
  if (saved) {
    const { name } = JSON.parse(saved);
    if (navUserName)     navUserName.textContent     = name || 'Guest';
    if (navAvatarLetter) navAvatarLetter.textContent = (name || 'G').charAt(0).toUpperCase();
  }
}

// ─── Quantity State ───────────────────────────────────────────
let qty = 1;
let currentProduct = null;

function updatePriceDisplay() {
  if (!currentProduct || !detailPriceEl) return;
  detailPriceEl.textContent = `$${(currentProduct.price * qty).toFixed(2)}`;
}

qtyDecrease?.addEventListener('click', () => {
  if (qty > 1) { qty--; qtyDisplay.textContent = qty; updatePriceDisplay(); }
});

qtyIncrease?.addEventListener('click', () => {
  if (qty < 20) { qty++; qtyDisplay.textContent = qty; updatePriceDisplay(); }
});

// ─── Order Button → Add to Cart ───────────────────────────────
orderBtn?.addEventListener('click', () => {
  if (!currentProduct) return;

  // addToCart is defined in cart.js (loaded before this script)
  addToCart(currentProduct, qty);

  // Visual feedback
  orderToast?.classList.remove('hidden');
  orderBtn.textContent = '✅ Added to Cart!';
  orderBtn.style.background = 'linear-gradient(135deg, hsl(145,60%,35%), hsl(145,60%,25%))';
  orderBtn.disabled = true;

  // Open cart sidebar
  openCart();

  setTimeout(() => {
    orderToast?.classList.add('hidden');
    orderBtn.textContent = 'Add to Cart 🛒';
    orderBtn.style.background = '';
    orderBtn.disabled = false;
  }, 2500);
});

// ─── Detect Slow Network ──────────────────────────────────────
function isSlowNetwork() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!conn) return false;
  return conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g' || conn.saveData;
}

// ─── Load & Render Product Detail ────────────────────────────
function loadProduct() {
  const params    = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id'), 10);
  const products  = JSON.parse(localStorage.getItem('fh_products') || '[]');
  const product   = products.find(p => p.id === productId);

  const delay = isSlowNetwork() ? 2500 : 700;

  setTimeout(() => {
    if (!product) {
      if (detailSkeleton) detailSkeleton.innerHTML = `
        <div style="text-align:center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size:3rem; margin-bottom:16px;">🍽️</div>
          <h2 style="margin-bottom:8px; color:var(--text);">Product not found</h2>
          <p>This item may have been removed. <a href="index.html" style="color:var(--primary-light)">← Back to menu</a></p>
        </div>
      `;
      return;
    }

    currentProduct = product;
    document.title = `${product.name} – FeastHub`;

    // Populate fields
    if (detailBadge)        detailBadge.textContent      = product.badge;
    if (detailCategory)     detailCategory.textContent   = product.category;
    if (detailTitle)        detailTitle.textContent       = product.name;
    if (metaTime)           metaTime.textContent          = `⏱ ${product.time}`;
    if (metaCalories)       metaCalories.textContent      = `🔥 ${product.calories}`;
    if (metaRating)         metaRating.textContent        = `⭐ ${product.rating}`;
    if (detailDescription)  detailDescription.textContent = product.description;

    // Image or emoji gradient
    if (product.image) {
      if (detailImg) { detailImg.src = product.image; detailImg.alt = product.name; }
      if (detailImgBg) detailImgBg.style.background = product.gradient;
    } else {
      if (detailImg) detailImg.style.display = 'none';
      if (detailImgContainer) {
        detailImgContainer.style.background       = product.gradient;
        detailImgContainer.style.display          = 'flex';
        detailImgContainer.style.alignItems       = 'center';
        detailImgContainer.style.justifyContent   = 'center';
        detailImgContainer.insertAdjacentHTML('afterbegin',
          `<span style="font-size:7rem;user-select:none;">${product.emoji}</span>`
        );
      }
      if (detailImgBg) detailImgBg.style.background = product.gradient;
    }

    // Ingredients
    if (ingredientsList) {
      ingredientsList.innerHTML = product.ingredients.map(i => `<li>${i}</li>`).join('');
    }

    // Initial price
    updatePriceDisplay();

    // Show content
    detailSkeleton?.classList.add('hidden');
    detailContent?.classList.remove('hidden');

  }, delay);
}

// ─── Boot ─────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  loadUser();
  loadProduct();
});
