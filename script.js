// SHARED HELPERS
function scrollRow(id, dir) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollBy({ left: dir * 280, behavior: "smooth" });
}

function fetchCatalogData() {
  return fetch("catalog-data.json", { cache: "no-store" }).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to load catalog data: ${res.status}`);
    }
    return res.json();
  });
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
  toast.innerHTML = `<i class="fa ${icon}"></i><span></span>`;
  toast.querySelector("span").textContent = msg;
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

function renderProductList(container, items, minWidth) {
  if (!container) return;

  let html = "";
  const widthClass =
    minWidth === 240 ? "scroll-item--240" : minWidth === 200 ? "scroll-item--200" : "scroll-item--220";

  items.forEach((p) => {
    html += `
      <div class="scroll-item ${widthClass}">
        <div class="product-card" data-details-url="${buildProductDetailsUrl(p)}">
          <div class="product-img-wrap">
            ${p.badge ? `<span class="badge-sale">${p.badge}</span>` : ""}
            <img src="${p.img || ""}" alt="${p.name || "Product"}" data-fallback-src="https://placehold.co/200x150/1c1c28/00e5c3?text=Product">
            <button type="button" class="wishlist-btn" aria-label="Toggle wishlist"><i class="fa fa-heart"></i></button>
          </div>
          <div class="product-body">
            <div class="product-name">${p.name || ""}</div>
            <div class="product-price">${p.price || ""} <span class="old">${p.old || ""}</span>${p.save ? ` <span class="save">${p.save}</span>` : ""}</div>
            <div class="stars">${p.stars || ""} <span>${p.reviews || ""}</span></div>
            <button type="button" class="add-cart-btn" data-cart-name="${p.cartName || "Item"}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  wireProductCards(container);
}

function renderDealList(container, items) {
  if (!container) return;
  let html = "";

  items.forEach((d, idx) => {
    html += `
      <div class="col-6 col-md-3">
        <div class="deal-card ${d.grad}" data-deal-idx="${idx}">
          <img src="${d.img || ""}" alt="${d.alt || "Deal"}">
          <div class="deal-card-title">${d.title || ""}</div>
          <div class="deal-card-price">${d.priceHtml || ""}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll(".deal-card").forEach((card) => {
    card.addEventListener("click", () => {
      const deal = items[Number(card.dataset.dealIdx)];
      if (deal && typeof deal.onClick === "function") deal.onClick();
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
      renderProductList(exclusivesEl, data.exclusives || [], 240);
      renderProductList(bestsellersEl, data.bestsellers || [], 220);
      renderProductList(phonesEl, data.phones || [], 200);
      renderDealList(dealsEl, data.deals || []);
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
