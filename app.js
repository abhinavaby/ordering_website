/* ============================================================
   FeastHub – app.js  (index.html only)
   Handles: Splash → User Modal → Product Grid with Add-to-Cart
   ============================================================ */

// ─── Product Data (10 Items) ─────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: 'Gourmet Beef Burger',
    category: 'Burgers',
    tag: '🔥 Bestseller',
    badge: '⭐ Popular',
    price: 14.99,
    image: 'images/burger.png',
    emoji: '🍔',
    gradient: 'linear-gradient(135deg, hsl(30,70%,25%), hsl(20,80%,18%))',
    shortDesc: 'Juicy beef patty with caramelised onions & special sauce.',
    description: 'A premium hand-pressed 200g beef patty, flame-grilled to perfection. Topped with caramelised onions, crisp iceberg lettuce, vine-ripened tomato, melted aged cheddar, and our signature secret sauce — all nestled in a toasted sesame brioche bun.',
    ingredients: ['Beef Patty', 'Sesame Bun', 'Cheddar Cheese', 'Lettuce', 'Tomato', 'Onion', 'Special Sauce', 'Pickles'],
    time: '15 mins', calories: '720 kcal', rating: '4.9',
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    category: 'Pizzas',
    tag: '🍕 Classic',
    badge: '❤️ Fan Fav',
    price: 18.49,
    image: 'images/pizza.png',
    emoji: '🍕',
    gradient: 'linear-gradient(135deg, hsl(10,70%,22%), hsl(0,60%,16%))',
    shortDesc: 'Stone-baked with generous pepperoni & mozzarella.',
    description: 'Our wood-fired Neapolitan-style crust layered with house-made San Marzano tomato sauce, generous slices of spicy pepperoni, and a blanket of premium buffalo mozzarella. Finished with fresh basil and a drizzle of extra-virgin olive oil.',
    ingredients: ['Pizza Dough', 'San Marzano Sauce', 'Pepperoni', 'Mozzarella', 'Basil', 'Olive Oil', 'Oregano'],
    time: '22 mins', calories: '890 kcal', rating: '4.8',
  },
  {
    id: 3,
    name: 'Crispy Chicken Wings',
    category: 'Starters',
    tag: '🌶 Spicy',
    badge: '🔥 Hot',
    price: 12.99,
    image: 'images/wings.png',
    emoji: '🍗',
    gradient: 'linear-gradient(135deg, hsl(35,75%,22%), hsl(25,80%,15%))',
    shortDesc: 'Double-fried wings with smoky buffalo glaze & ranch dip.',
    description: 'Jumbo chicken wings double-fried for maximum crunch. Tossed in our house-made smoky buffalo glaze — a perfect balance of heat, tang, and butter. Served with a cooling blue cheese or ranch dip and fresh celery sticks.',
    ingredients: ['Chicken Wings', 'Buffalo Sauce', 'Butter', 'Garlic', 'Cayenne', 'Ranch Dip', 'Celery'],
    time: '20 mins', calories: '580 kcal', rating: '4.7',
  },
  {
    id: 4,
    name: 'Sushi Deluxe Platter',
    category: 'Japanese',
    tag: '🎌 Premium',
    badge: '✨ New',
    price: 26.99,
    image: 'images/sushi.png',
    emoji: '🍣',
    gradient: 'linear-gradient(135deg, hsl(180,50%,15%), hsl(200,60%,10%))',
    shortDesc: 'Fresh nigiri & rolls with salmon, tuna, and avocado.',
    description: 'A curated platter of 16 pieces featuring fresh salmon nigiri, bluefin tuna, silky scallop, and our signature dragon rolls with avocado and unagi. Served with pickled ginger, premium wasabi, and aged soy sauce.',
    ingredients: ['Salmon', 'Tuna', 'Scallop', 'Sushi Rice', 'Nori', 'Avocado', 'Unagi', 'Wasabi', 'Soy Sauce'],
    time: '10 mins', calories: '420 kcal', rating: '4.9',
  },
  {
    id: 5,
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    tag: '🍫 Indulgent',
    badge: "🌟 Chef's Pick",
    price: 9.99,
    image: 'images/lava_cake.png',
    emoji: '🍰',
    gradient: 'linear-gradient(135deg, hsl(20,50%,14%), hsl(15,60%,10%))',
    shortDesc: 'Warm dark chocolate cake with molten centre & vanilla ice cream.',
    description: 'A warm Valrhona dark chocolate fondant with a perfectly molten centre. Dusted with cocoa powder and served with a quenelle of Madagascan vanilla bean ice cream.',
    ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Flour', 'Sugar', 'Vanilla Ice Cream', 'Cocoa Powder'],
    time: '18 mins', calories: '540 kcal', rating: '4.9',
  },
  {
    id: 6,
    name: 'Fettuccine Carbonara',
    category: 'Pasta',
    tag: '🇮🇹 Italian',
    badge: '🍝 Comfort',
    price: 16.49,
    image: null,
    emoji: '🍝',
    gradient: 'linear-gradient(135deg, hsl(45,60%,20%), hsl(35,65%,14%))',
    shortDesc: 'Silky egg pasta with crispy guanciale & aged pecorino.',
    description: 'Authentic Roman carbonara made with al dente fettuccine, slow-crisped guanciale, free-range egg yolks, and a generous shower of aged Pecorino Romano.',
    ingredients: ['Fettuccine', 'Guanciale', 'Egg Yolks', 'Pecorino Romano', 'Black Pepper', 'Pasta Water'],
    time: '25 mins', calories: '720 kcal', rating: '4.7',
  },
  {
    id: 7,
    name: 'Street Tacos Trio',
    category: 'Mexican',
    tag: '🌮 Street Food',
    badge: '🥑 Fresh',
    price: 13.49,
    image: null,
    emoji: '🌮',
    gradient: 'linear-gradient(135deg, hsl(130,50%,12%), hsl(120,60%,8%))',
    shortDesc: 'Three loaded street tacos with salsa verde & guacamole.',
    description: 'Three handmade corn tortillas loaded with slow-braised chipotle chicken, freshly made pico de gallo, chunky guacamole, pickled jalapeños, cotija cheese, and a squeeze of charred lime.',
    ingredients: ['Corn Tortilla', 'Chipotle Chicken', 'Guacamole', 'Pico de Gallo', 'Cotija Cheese', 'Jalapeño', 'Lime'],
    time: '12 mins', calories: '490 kcal', rating: '4.6',
  },
  {
    id: 8,
    name: 'Tropical Smoothie Bowl',
    category: 'Healthy',
    tag: '🌿 Vegan',
    badge: '💚 Healthy',
    price: 11.99,
    image: null,
    emoji: '🥗',
    gradient: 'linear-gradient(135deg, hsl(320,70%,18%), hsl(270,60%,12%))',
    shortDesc: 'Açaí base topped with fresh mango, berries & granola.',
    description: 'A vibrant açaí and frozen mango base blended to a thick, creamy consistency. Topped with fresh strawberries, blueberries, sliced banana, toasted coconut flakes, house-made granola, and a drizzle of raw honey.',
    ingredients: ['Açaí', 'Frozen Mango', 'Strawberry', 'Blueberry', 'Banana', 'Coconut Flakes', 'Granola', 'Honey'],
    time: '8 mins', calories: '340 kcal', rating: '4.8',
  },
  {
    id: 9,
    name: 'Ribeye Steak',
    category: 'Grills',
    tag: '🥩 Premium',
    badge: '👑 Signature',
    price: 38.99,
    image: null,
    emoji: '🥩',
    gradient: 'linear-gradient(135deg, hsl(355,60%,16%), hsl(340,70%,10%))',
    shortDesc: '300g dry-aged ribeye, herb butter & roasted garlic.',
    description: 'A 300g 35-day dry-aged bone-in ribeye, seared at extreme heat in a cast-iron skillet. Served with whipped herb butter, roasted whole garlic, crispy duck-fat potatoes, and a rich red wine reduction.',
    ingredients: ['Dry-Aged Ribeye', 'Herb Butter', 'Roasted Garlic', 'Rosemary', 'Thyme', 'Duck-Fat Potatoes', 'Red Wine Jus'],
    time: '30 mins', calories: '980 kcal', rating: '4.9',
  },
  {
    id: 10,
    name: 'New York Cheesecake',
    category: 'Desserts',
    tag: '🗽 Classic',
    badge: '🍓 Seasonal',
    price: 8.99,
    image: null,
    emoji: '🍰',
    gradient: 'linear-gradient(135deg, hsl(345,65%,18%), hsl(330,60%,12%))',
    shortDesc: 'Dense, creamy cheesecake with fresh strawberry compote.',
    description: 'A classic New York style cheesecake with a velvety smooth cream cheese filling on a buttery graham cracker crust. Topped with a vibrant homemade strawberry compote and fresh mint.',
    ingredients: ['Cream Cheese', 'Graham Cracker', 'Butter', 'Eggs', 'Sugar', 'Vanilla', 'Sour Cream', 'Strawberry Compote'],
    time: '5 mins', calories: '480 kcal', rating: '4.7',
  },
];

// ─── Save product data for product.html to read ───────────────
localStorage.setItem('fh_products', JSON.stringify(PRODUCTS));

// ─── DOM References ───────────────────────────────────────────
const splash       = document.getElementById('splash-screen');
const userModal    = document.getElementById('user-modal');
const mainApp      = document.getElementById('main-app');
const userForm     = document.getElementById('user-form');
const nameInput    = document.getElementById('user-name');
const emailInput   = document.getElementById('user-email');
const nameError    = document.getElementById('name-error');
const emailError   = document.getElementById('email-error');
const submitBtn    = document.getElementById('modal-submit-btn');
const btnText      = document.getElementById('btn-text');
const btnSpinner   = document.getElementById('btn-spinner');
const formStatus   = document.getElementById('form-status');
const productsGrid = document.getElementById('products-grid');
const navUserName  = document.getElementById('nav-user-name');
const navAvatarLetter = document.getElementById('user-avatar-letter');

// ─── Helpers ──────────────────────────────────────────────────
const isValidEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

function isSlowNetwork() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!conn) return false;
  return conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g' || conn.saveData;
}

// ─── Skeleton Cards ───────────────────────────────────────────
function renderSkeletons(count = 10) {
  productsGrid.innerHTML = '';
  for (let i = 0; i < count; i++) {
    productsGrid.insertAdjacentHTML('beforeend', `
      <div class="skeleton-card" aria-hidden="true">
        <div class="skeleton skeleton-img"></div>
        <div class="skeleton-body">
          <div class="skeleton skeleton-text-title"></div>
          <div class="skeleton skeleton-text-sub"></div>
          <div class="skeleton skeleton-text-price"></div>
        </div>
      </div>
    `);
  }
}

// ─── Product Cards ────────────────────────────────────────────
function renderProducts() {
  productsGrid.innerHTML = '';
  PRODUCTS.forEach((p, i) => {
    const imgHtml = p.image
      ? `<img src="${p.image}" alt="${p.name}" loading="lazy" />`
      : `<div class="card-img-gradient" style="background:${p.gradient}">${p.emoji}</div>`;

    const card = document.createElement('div');
    card.className = 'product-card-wrap';
    card.style.animationDelay = `${i * 55}ms`;

    card.innerHTML = `
      <a href="product.html?id=${p.id}" class="product-card" id="product-card-${p.id}" aria-label="View details for ${p.name}">
        <div class="card-img-wrapper">
          ${imgHtml}
          <span class="card-tag">${p.tag}</span>
          <span class="card-badge">${p.badge}</span>
        </div>
        <div class="card-body">
          <p class="card-name">${p.name}</p>
          <p class="card-desc">${p.shortDesc}</p>
          <div class="card-footer">
            <span class="card-price">$${p.price.toFixed(2)}</span>
            <span class="card-arrow">→</span>
          </div>
        </div>
      </a>
      <button
        class="card-add-btn"
        id="add-btn-${p.id}"
        aria-label="Add ${p.name} to cart"
        data-id="${p.id}"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add
      </button>
    `;

    productsGrid.appendChild(card);
  });

  // Wire up add-to-cart buttons
  document.querySelectorAll('.card-add-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id, 10);
      const product = PRODUCTS.find(p => p.id === id);
      if (!product) return;

      addToCart(product, 1);

      // Micro-feedback
      const original = btn.innerHTML;
      btn.innerHTML = '✅ Added';
      btn.style.background = 'hsl(145,60%,30%)';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 1200);

      // Open cart
      openCart();
    });
  });
}

// ─── Load Products ────────────────────────────────────────────
function loadProducts() {
  renderSkeletons(10);
  const delay = isSlowNetwork() ? 2200 : 600;
  setTimeout(renderProducts, delay);
}

// ─── Update Navbar ────────────────────────────────────────────
function updateNavbar(name) {
  if (navUserName) navUserName.textContent = name || 'Guest';
  if (navAvatarLetter) navAvatarLetter.textContent = (name || 'G').charAt(0).toUpperCase();
}

// ─── Form Submit ──────────────────────────────────────────────
userForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const name  = nameInput.value.trim();
  const email = emailInput.value.trim();
  let valid = true;

  if (!name) {
    nameInput.classList.add('error');
    nameError.classList.add('show');
    valid = false;
  } else {
    nameInput.classList.remove('error');
    nameError.classList.remove('show');
  }
  if (!email || !isValidEmail(email)) {
    emailInput.classList.add('error');
    emailError.classList.add('show');
    valid = false;
  } else {
    emailInput.classList.remove('error');
    emailError.classList.remove('show');
  }
  if (!valid) return;

  btnText.classList.add('hidden');
  btnSpinner.classList.remove('hidden');
  submitBtn.disabled = true;
  formStatus.className = 'form-status hidden';

  // Save user immediately (no registration email needed — only order email via cart.js)
  localStorage.setItem('fh_user', JSON.stringify({ name, email }));
  formStatus.textContent = '✅ Welcome! Loading your menu…';
  formStatus.className   = 'form-status success';
  formStatus.classList.remove('hidden');

  setTimeout(() => showMainApp(name), 900);
});

// ─── Show Main App ────────────────────────────────────────────
function showMainApp(name) {
  userModal?.classList.add('hidden');
  mainApp?.classList.remove('hidden');
  updateNavbar(name);
  loadProducts();
}

// ─── Splash → Init ────────────────────────────────────────────
function init() {
  const saved = localStorage.getItem('fh_user');
  setTimeout(() => {
    splash?.classList.add('fade-out');
    setTimeout(() => {
      splash?.remove();
      if (saved) {
        const { name } = JSON.parse(saved);
        showMainApp(name);
      } else {
        userModal?.classList.remove('hidden');
        nameInput?.focus();
      }
    }, 600);
  }, 2000);
}

window.addEventListener('DOMContentLoaded', init);
