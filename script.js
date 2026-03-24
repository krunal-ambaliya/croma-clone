// ─── HERO SLIDER ───
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
if (slides.length && dots.length) setInterval(() => heroSlide(1), 5000);

// ─── SCROLL ROW ───
function scrollRow(id, dir) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollBy({ left: dir * 280, behavior: "smooth" });
}

// ─── CART ───
let cartCount = 0;
function addToCart(name) {
  cartCount++;
  const el = document.getElementById("cartCount");
  if (el) el.textContent = cartCount;
  showToast(`${name} added to cart`, "fa-shopping-cart");
}

// ─── WISHLIST ───
function toggleWish(btn) {
  btn.classList.toggle("active");
  const isActive = btn.classList.contains("active");
  showToast(
    isActive ? "Added to Wishlist" : "Removed from Wishlist",
    "fa-heart",
  );
}

// ─── TOAST ───
function showToast(msg, icon = "fa-check") {
  return;
}

// ─── SEARCH ───
function handleSearch() {
  const searchInput = document.getElementById("searchInput");
  const q = searchInput ? searchInput.value.trim() : "";
  if (q) showToast(`Searching for "${q}"…`, "fa-search");
}
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });
}

// ─── MENU ACTIVE ───
document.querySelectorAll(".nav-menu li a").forEach((a) => {
  a.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelectorAll(".nav-menu li")
      .forEach((li) => li.classList.remove("active"));
    this.parentElement.classList.add("active");
  });
});

// ─── APP DL HOVER ───
document.querySelectorAll(".app-dl-btn").forEach((btn) => {
  btn.addEventListener(
    "mouseenter",
    () => (btn.style.borderColor = "var(--teal)"),
  );
  btn.addEventListener(
    "mouseleave",
    () => (btn.style.borderColor = "var(--border)"),
  );
});

$(function () {
  const exclusives = [
    {
      badge: "39% OFF",
      img: "https://media.tatacroma.com/Croma%20Assets/Entertainment/Television/Images/319806_0_4QNiuwHD-9.png",
      name: "Croma 127cm (50 inch) 4K Ultra HD LED Smart Google TV 5.0",
      price: "₹24,990",
      old: "₹40,900",
      stars: "★★★★★",
      reviews: "(2.4k)",
      cartName: "50-inch 4K TV",
      minWidth: 240,
    },
    {
      badge: "47% OFF",
      img: "https://media.tatacroma.com/Croma%20Assets/Entertainment/Television/Images/301716_0_cmisgc.png",
      name: "Croma 80cm (32 inch) HD LED Google TV 5.0 with Alexa Built-in",
      price: "₹9,990",
      old: "₹19,000",
      stars: "★★★★★",
      reviews: "(4.1k)",
      cartName: "32-inch HD TV",
      minWidth: 240,
    },
    {
      badge: "39% OFF",
      img: "https://media-ik.croma.com/prod/https://media.tatacroma.com/273359_0_KJ3oEFbpO.png?updatedAt=1762413104063",
      name: "Croma 80cm (32 inch) QLED Smart Google TV 5.0 with Dolby Audio",
      price: "₹10,990",
      old: "₹18,000",
      stars: "★★★★☆",
      reviews: "(1.8k)",
      cartName: "32-inch QLED TV",
      minWidth: 240,
    },
    {
      badge: "22% OFF",
      img: "https://media.tatacroma.com/Croma%20Assets/Entertainment/Television/Images/251388_8_ciaurn.png",
      name: "Croma 109cm (43 inch) LED 4K Ultra HD Smart Google TV",
      price: "₹19,490",
      old: "₹25,000",
      stars: "★★★★★",
      reviews: "(3.2k)",
      cartName: "43-inch 4K TV",
      minWidth: 240,
    },
    {
      badge: "30% OFF",
      img: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Entertainment/Television/Images/315755_0_lpag1g.png?tr=w-640",
      name: "Croma 139cm (55 inch) QLED 4K Smart Google TV with Dolby Vision",
      price: "₹34,990",
      old: "₹49,990",
      stars: "★★★★★",
      reviews: "(890)",
      cartName: "55-inch QLED TV",
      minWidth: 240,
    },
  ];

  const bestsellers = [
  {
    img: "https://media.tatacroma.com/Croma%20Assets/Entertainment/Television/Images/301716_0_cmisgc.png",
    name: "Apple iPhone 15 (128GB) – Black Titanium",
    price: "₹69,999",
    old: "₹79,900",
    save: "Save ₹9,901",
    stars: "★★★★★",
    reviews: "(12.4k)",
    cartName: "iPhone 15",
    minWidth: 220,
  },
  {
    img: "https://media.tatacroma.com/Croma%20Assets/Entertainment/Television/Images/319806_0_4QNiuwHD-9.png",
    name: "Samsung Galaxy S24 5G (256GB) – Onyx Black",
    price: "₹74,999",
    old: "₹89,999",
    save: "",
    stars: "★★★★★",
    reviews: "(8.7k)",
    cartName: "Samsung Galaxy S24",
    minWidth: 220,
  },
  {
    img: "https://media-ik.croma.com/prod/https://media.tatacroma.com/273359_0_KJ3oEFbpO.png?updatedAt=1762413104063",
    name: "Apple AirPods Pro (2nd Gen) with MagSafe Case",
    price: "₹22,990",
    old: "₹26,900",
    save: "",
    stars: "★★★★★",
    reviews: "(9.2k)",
    cartName: "AirPods Pro",
    minWidth: 220,
  },
  {
    img: "https://media.tatacroma.com/Croma%20Assets/Entertainment/Television/Images/251388_8_ciaurn.png",
    name: "Apple MacBook Air M2 (13-inch, 8GB RAM, 256GB SSD)",
    price: "₹99,900",
    old: "₹1,14,900",
    save: "",
    stars: "★★★★★",
    reviews: "(5.3k)",
    cartName: "MacBook Air M2",
    minWidth: 220,
  },
  {
    img: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Entertainment/Television/Images/315755_0_lpag1g.png?tr=w-640",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: "₹26,990",
    old: "₹34,990",
    save: "",
    stars: "★★★★★",
    reviews: "(6.8k)",
    cartName: "Sony WH-1000XM5",
    minWidth: 220,
  },
];

  const phones = [
    {
      badge: "HOT",
      img: "https://m.media-amazon.com/images/I/41pR0qlI0yL._SY300_SX300_QL70_FMwebp_.jpg",
      name: "OnePlus 12 5G (256GB) – Silky Black",
      price: "₹64,999",
      old: "₹69,999",
      stars: "★★★★★",
      reviews: "(3.1k)",
      cartName: "OnePlus 12",
      minWidth: 200,
    },
    {
      badge: "",
      img: "https://www.designinfo.in/wp-content/uploads/2024/02/Google-Pixel-8-128GB-Unlocked-Obsidian-1.webp",
      name: "Google Pixel 8 5G (128GB) – Obsidian",
      price: "₹59,999",
      old: "₹75,999",
      stars: "★★★★★",
      reviews: "(2.4k)",
      cartName: "Google Pixel 8",
      minWidth: 200,
    },
    {
      badge: "15% OFF",
      img: "https://m.media-amazon.com/images/I/41pR0qlI0yL._SY300_SX300_QL70_FMwebp_.jpg",
      name: "Redmi Note 13 Pro 5G (256GB) – Aurora Purple",
      price: "₹25,999",
      old: "₹30,999",
      stars: "★★★★☆",
      reviews: "(7.8k)",
      cartName: "Redmi Note 13 Pro",
      minWidth: 200,
    },
    {
      badge: "",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhPTWk7N6GLS9mSgI60n8ouS_JJtOrNE4UyQ&s",
      name: "Vivo V30 5G (256GB) – Peacock Green",
      price: "₹33,999",
      old: "₹39,999",
      stars: "★★★★☆",
      reviews: "(1.9k)",
      cartName: "Vivo V30",
      minWidth: 200,
    },
    {
      badge: "NEW",
      img: "https://m.media-amazon.com/images/I/41pR0qlI0yL._SY300_SX300_QL70_FMwebp_.jpg",
      name: "Samsung Galaxy A55 5G (256GB) – Navy",
      price: "₹34,999",
      old: "₹38,999",
      stars: "★★★★★",
      reviews: "(4.5k)",
      cartName: "Samsung Galaxy A55",
      minWidth: 200,
    },
  ];

  const deals = [
    {
      grad: "grad-teal",
      img: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Small%20Appliances/Fans/Images/232311_0_zocKLmb1m.png?updatedAt=1770706572338?tr=w-640",
      alt: "Cooler",
      title: "Room Coolers",
      priceHtml: "Starting at <strong>₹3,999</strong>",
      onClick: () => addToCart("Room Cooler"),
    },
    {
      grad: "grad-purple",
      img: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Small%20Appliances/Fans/Images/232311_0_zocKLmb1m.png?updatedAt=1770706572338?tr=w-640",
      alt: "TWS",
      title: "Truly Wireless Earbuds",
      priceHtml: "Starting at <strong>₹999</strong>",
      onClick: () => addToCart("TWS Earbuds"),
    },
    {
      grad: "grad-blue",
      img: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Small%20Appliances/Fans/Images/232311_0_zocKLmb1m.png?updatedAt=1770706572338?tr=w-640",
      alt: "Keyboard",
      title: "Keyboards & Mouse",
      priceHtml: "Up to <strong>75% Off</strong>",
      onClick: () => showToast("Keyboards up to 75% off!", "fa-keyboard"),
    },
    {
      grad: "grad-orange",
      img: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Small%20Appliances/Fans/Images/232311_0_zocKLmb1m.png?updatedAt=1770706572338?tr=w-640",
      alt: "Microwave",
      title: "Microwave Ovens",
      priceHtml: "Starting at <strong>₹10,690</strong>",
      onClick: () => addToCart("Samsung Microwave"),
    },
  ];

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

  function renderProducts($container, items, opts = {}) {
    if (!$container || !$container.length) return;
    const html = items
      .map((p) => {
        const badgeHtml = p.badge
          ? `<span class="badge-sale">${p.badge}</span>`
          : "";
        const saveHtml = p.save ? ` <span class="save">${p.save}</span>` : "";
        const minWidth = p.minWidth || opts.minWidth || 220;
        const detailsUrl = buildProductDetailsUrl(p);

        return `
        <div class="scroll-item" style="min-width:${minWidth}px">
          <div class="product-card" onclick="window.location.href='${detailsUrl}'">
            <div class="product-img-wrap">
              ${badgeHtml}
              <img src="${p.img}" alt="${p.name}" onerror="this.src='https://placehold.co/200x150/1c1c28/00e5c3?text=Product'">
              <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWish(this)"><i class="fa fa-heart"></i></button>
            </div>
            <div class="product-body">
              <div class="product-name">${p.name}</div>
              <div class="product-price">${p.price} <span class="old">${p.old}</span>${saveHtml}</div>
              <div class="stars">${p.stars} <span>${p.reviews}</span></div>
              <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart('${String(p.cartName).replace(/'/g, "\\'")}')">Add to Cart</button>
            </div>
          </div>
        </div>
      `;
      })
      .join("");

    $container.html(html);
  }

  function renderDeals($container, items) {
    if (!$container || !$container.length) return;
    $container.empty();

    items.forEach((d, idx) => {
      const $col = $("<div/>", { class: "col-6 col-md-3" });
      const $card = $("<div/>", {
        class: `deal-card ${d.grad}`,
        "data-deal-idx": idx,
      });
      $card.append($("<img/>", { src: d.img, alt: d.alt }));
      $card.append($("<div/>", { class: "deal-card-title", text: d.title }));
      $card.append(
        $("<div/>", { class: "deal-card-price", html: d.priceHtml }),
      );
      $col.append($card);
      $container.append($col);
    });

    $container
      .off("click", ".deal-card")
      .on("click", ".deal-card", function () {
        const idx = Number($(this).attr("data-deal-idx"));
        const deal = items[idx];
        if (deal && typeof deal.onClick === "function") deal.onClick();
      });
  }

  renderProducts($("#exclusives"), exclusives, { minWidth: 240 });
  renderProducts($("#bestsellers"), bestsellers, { minWidth: 220 });
  renderProducts($("#phones"), phones, { minWidth: 200 });
  renderDeals($("#dealsRow"), deals);
});
