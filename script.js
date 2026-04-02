// HERO SLIDER
let heroIdx = 0;
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".hero-dot");

function heroGoTo(n) {
  if (!slides.length || !dots.length) return;
  slides[heroIdx].classList.remove("active");
  dots[heroIdx].classList.remove("active");
  heroIdx = (n + slides.length) % slides.length;
  slides[heroIdx].classList.add("active");
  dots[heroIdx].classList.add("active");
}

function heroSlide(dir) {
  heroGoTo(heroIdx + dir);
}

if (slides.length && dots.length) {
  setInterval(() => heroSlide(1), 5000);
}

// SHARED HELPERS
function scrollRow(id, dir) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollBy({ left: dir * 280, behavior: "smooth" });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function fetchCatalogData() {
  const res = await fetch("catalog-data.json", { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load catalog data: ${res.status}`);
  }
  return res.json();
}

// CART
let cartCount = 0;
function addToCart(name) {
  cartCount += 1;
  const el = document.getElementById("cartCount");
  if (el) el.textContent = String(cartCount);
  showToast(`${name} added to cart`, "fa-shopping-cart");
}

// WISHLIST
function toggleWish(btn) {
  btn.classList.toggle("active");
  const isActive = btn.classList.contains("active");
  showToast(isActive ? "Added to Wishlist" : "Removed from Wishlist", "fa-heart");
}

// TOAST
function showToast(msg, icon = "fa-check") {
  const wrap = document.getElementById("toastWrap");
  if (!wrap) return;

  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.innerHTML = `<i class="fa ${icon}"></i><span>${escapeHtml(msg)}</span>`;
  wrap.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2200);
}

// SEARCH
function handleSearch() {
  const searchInput = document.getElementById("searchInput");
  const q = searchInput ? searchInput.value.trim() : "";
  if (q) showToast(`Searching for "${q}"…`, "fa-search");
}

// AUTH VALIDATION
function togglePasswordField(inputId, labelId) {
  const password = document.getElementById(inputId);
  const eye = document.getElementById(labelId);
  if (!password || !eye) return;
  const isHidden = password.type === "password";
  password.type = isHidden ? "text" : "password";
  eye.textContent = isHidden ? "Hide" : "Show";
}

function validateLoginFields() {
  const username = document.getElementById("login-username");
  const password = document.getElementById("login-password");
  const usernameError = document.getElementById("login-username-error");
  const passwordError = document.getElementById("login-password-error");
  if (!username || !password || !usernameError || !passwordError) return true;

  let isValid = true;

  if (!username.value.trim()) {
    usernameError.textContent = "Required field";
    isValid = false;
  } else {
    usernameError.textContent = "";
  }

  if (!password.value.trim()) {
    passwordError.textContent = "Required field";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  return isValid;
}

function validateSignupFields() {
  const username = document.getElementById("signup-username");
  const email = document.getElementById("signup-email");
  const password = document.getElementById("signup-password");
  const usernameError = document.getElementById("signup-username-error");
  const emailError = document.getElementById("signup-email-error");
  const passwordError = document.getElementById("signup-password-error");

  if (!username || !email || !password || !usernameError || !emailError || !passwordError) {
    return true;
  }

  const nameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;
  let isValid = true;

  if (nameValue.length < 3) {
    usernameError.textContent = "Name must be at least 3 letters";
    isValid = false;
  } else {
    usernameError.textContent = "";
  }

  if (!emailPattern.test(emailValue)) {
    emailError.textContent = "Enter a valid email address";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (!passwordPattern.test(passwordValue)) {
    passwordError.textContent =
      "Password must include uppercase, lowercase, number, and symbol";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  return isValid;
}

// PAGE INIT
function initSharedControls() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSearch();
    });
  }

  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) searchBtn.addEventListener("click", handleSearch);

  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", () =>
      showToast("Cart has 0 items", "fa-shopping-cart"),
    );
  }

  document.querySelectorAll("[data-scroll-row]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-scroll-row");
      const dir = Number(btn.getAttribute("data-scroll-dir") || 1);
      scrollRow(id, dir);
    });
  });

  ["login-back-btn", "signup-back-btn", "details-back-btn"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", () => history.back());
  });
}

function initLoginPage() {
  const toggle = document.getElementById("login-password-toggle");
  if (toggle) {
    toggle.addEventListener("click", () =>
      togglePasswordField("login-password", "login-password-eye"),
    );
  }

  const submit = document.getElementById("login-submit-btn");
  if (submit) submit.addEventListener("click", validateLoginFields);

  ["login-username", "login-password"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", validateLoginFields);
  });
}

function initSignupPage() {
  const toggle = document.getElementById("signup-password-toggle");
  if (toggle) {
    toggle.addEventListener("click", () =>
      togglePasswordField("signup-password", "signup-password-eye"),
    );
  }

  const submit = document.getElementById("signup-submit-btn");
  if (submit) submit.addEventListener("click", validateSignupFields);

  ["signup-username", "signup-email", "signup-password"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", validateSignupFields);
  });
}

function initProductDetailsPage() {
  const params = new URLSearchParams(window.location.search);
  const productName = params.get("name") || "Product";
  const productPrice = params.get("price") || "₹0";
  const productOld = params.get("old") || "";
  const productImg =
    params.get("img") ||
    "https://placehold.co/500x500/111827/00e5c3?text=Product";
  const productReviews = params.get("reviews") || "(0 reviews)";
  const productStars = params.get("stars") || "★★★★★";
  const productBadge = params.get("badge") || "Top Pick";

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText("productName", productName);
  setText("productPrice", productPrice);
  setText("productOldPrice", productOld);
  setText("productReviews", productReviews);
  setText("productStars", productStars);
  setText("productBadge", productBadge);

  const image = document.getElementById("productImage");
  if (image) {
    image.src = productImg;
    image.alt = productName;
  }
}

function wireProductCards(container) {
  if (!container) return;

  container.querySelectorAll(".product-card").forEach((card) => {
    const detailsUrl = card.getAttribute("data-details-url");
    card.addEventListener("click", () => {
      if (detailsUrl) window.location.href = detailsUrl;
    });
  });

  container.querySelectorAll("img[data-fallback-src]").forEach((img) => {
    img.addEventListener("error", () => {
      img.src = img.getAttribute("data-fallback-src");
    });
  });

  container.querySelectorAll(".wishlist-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWish(btn);
    });
  });

  container.querySelectorAll(".add-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(btn.getAttribute("data-cart-name") || "Item");
    });
  });
}

function initCatalogPage() {
  const exclusivesEl = document.getElementById("exclusives");
  const bestsellersEl = document.getElementById("bestsellers");
  const phonesEl = document.getElementById("phones");
  const dealsEl = document.getElementById("dealsRow");

  if (!exclusivesEl && !bestsellersEl && !phonesEl && !dealsEl) return;

  fetchCatalogData()
    .then((data) => {
      const exclusives = data.exclusives || [];
      const bestsellers = data.bestsellers || [];
      const phones = data.phones || [];
      const deals = data.deals || [];

      function buildProductDetailsUrl(product) {
        const params = new URLSearchParams({
          name: product.name || "Product",
          price: product.price || "",
          old: product.old || "",
          img: product.img || "",
          reviews: product.reviews || "",
          stars: product.stars || "",
          badge: product.badge || "",
        });
        return `product-details.html?${params.toString()}`;
      }

      function renderProducts(container, items, opts = {}) {
        if (!container) return;

        container.innerHTML = items
          .map((p) => {
            const badgeHtml = p.badge
              ? `<span class="badge-sale">${escapeHtml(p.badge)}</span>`
              : "";
            const saveHtml = p.save ? ` <span class="save">${escapeHtml(p.save)}</span>` : "";
            const minWidth = p.minWidth || opts.minWidth || 220;
            const widthClass =
              minWidth === 240
                ? "scroll-item--240"
                : minWidth === 220
                  ? "scroll-item--220"
                  : minWidth === 200
                    ? "scroll-item--200"
                    : "";
            const detailsUrl = buildProductDetailsUrl(p);
            const fallback =
              "https://placehold.co/200x150/1c1c28/00e5c3?text=Product";

            return `
              <div class="scroll-item ${widthClass}">
                <div class="product-card" data-details-url="${escapeHtml(detailsUrl)}">
                  <div class="product-img-wrap">
                    ${badgeHtml}
                    <img src="${escapeHtml(p.img)}" alt="${escapeHtml(p.name)}" data-fallback-src="${fallback}">
                    <button type="button" class="wishlist-btn" aria-label="Toggle wishlist"><i class="fa fa-heart"></i></button>
                  </div>
                  <div class="product-body">
                    <div class="product-name">${escapeHtml(p.name)}</div>
                    <div class="product-price">${escapeHtml(p.price)} <span class="old">${escapeHtml(p.old)}</span>${saveHtml}</div>
                    <div class="stars">${escapeHtml(p.stars)} <span>${escapeHtml(p.reviews)}</span></div>
                    <button type="button" class="add-cart-btn" data-cart-name="${escapeHtml(p.cartName)}">Add to Cart</button>
                  </div>
                </div>
              </div>
            `;
          })
          .join("");

        wireProductCards(container);
      }

      function renderDeals(container, items) {
        if (!container) return;
        container.innerHTML = "";

        items.forEach((d, idx) => {
          const col = document.createElement("div");
          col.className = "col-6 col-md-3";

          const card = document.createElement("div");
          card.className = `deal-card ${d.grad}`;
          card.dataset.dealIdx = String(idx);

          const img = document.createElement("img");
          img.src = d.img;
          img.alt = d.alt;

          const title = document.createElement("div");
          title.className = "deal-card-title";
          title.textContent = d.title;

          const price = document.createElement("div");
          price.className = "deal-card-price";
          price.innerHTML = d.priceHtml;

          card.appendChild(img);
          card.appendChild(title);
          card.appendChild(price);
          col.appendChild(card);
          container.appendChild(col);
        });

        container.querySelectorAll(".deal-card").forEach((card) => {
          card.addEventListener("click", () => {
            const idx = Number(card.dataset.dealIdx);
            const deal = items[idx];
            if (deal && typeof deal.onClick === "function") deal.onClick();
          });
        });
      }

      renderProducts(exclusivesEl, exclusives, { minWidth: 240 });
      renderProducts(bestsellersEl, bestsellers, { minWidth: 220 });
      renderProducts(phonesEl, phones, { minWidth: 200 });
      renderDeals(dealsEl, deals);
    })
    .catch((err) => {
      console.error(err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  initSharedControls();
  initLoginPage();
  initSignupPage();
  initProductDetailsPage();
  initCatalogPage();
});
