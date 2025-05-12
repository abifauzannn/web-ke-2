let cart = JSON.parse(localStorage.getItem("cart")) || [];
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const games = [
  {
    title: "Doom",
    price: 1390000,
    image: "Doom The Dark Ages.png",
    category: "action",
    description:
      "Prekuel dari Doom (2016) dan Doom Eternal, game ini mengusung tema techno-medieval dengan fokus pada pertempuran jarak dekat. Pemain mengendalikan Doom Slayer dalam pertempuran brutal melawan iblis, menggunakan senjata seperti Shield Saw yang dapat digunakan untuk bertahan dan menyerang. Mekanik baru seperti parry dan glory kill yang diperbarui menambah kedalaman strategi dalam pertempuran. Selain itu, pemain dapat mengendarai naga mekanik dan mech raksasa dalam beberapa bagian permainan.",
    harga: "Rp1.390.000",
  },
  {
    title: "Gears of War",
    price: 650000,
    image: "(2)Gears of War.png",
    category: "action",
    description:
      "Remaster dari Gears of War (2006) dengan peningkatan grafis hingga 4K dan 120 FPS. Game ini mempertahankan gameplay third-person shooter taktis dengan sistem cover dan pertarungan brutal. Menampilkan semua konten dari Ultimate Edition, termasuk mode kampanye co-op dua pemain dan multiplayer delapan pemain.",
    harga: "Rp650.000",
  },
  {
    title: "La Quimera",
    price: 700000,
    image: "(3)La Quimera.png",
    category: "fantasy",
    description:
      "FPS naratif dengan elemen co-op opsional, dikembangkan oleh Reburn. Pemain menggunakan exoskeleton yang dapat disesuaikan untuk menghadapi berbagai faksi musuh, dari perampok agresif hingga elit berlapis baja. AI asisten pribadi membantu dalam strategi dan eksplorasi.",
    harga: "Rp700.000",
  },
  {
    title: "FragPunk",
    price: 0,
    image: "(4)FragPunk.png",
    category: "action",
    description:
      "Hero shooter free-to-play dengan sistem 'Shard Card' unik yang mempengaruhi gameplay setiap ronde. Pemain memilih karakter dengan kemampuan khusus dan bertarung dalam mode utama 'Shard Clash', di mana tim menyerang atau bertahan untuk menanam atau menjinakkan Converter. Game ini menawarkan berbagai mode tambahan seperti Team Deathmatch dan Capture The Core.",
    harga: "Gratis",
  },
  {
    title: "BattleBit",
    price: 230000,
    image: "(5)BattleBit Remastered.png",
    category: "action",
    description:
      "FPS multipemain masif dengan gaya visual low-poly, memungkinkan hingga 254 pemain dalam satu pertandingan. Game ini menekankan kerja tim dengan sistem kelas karakter, lingkungan yang dapat dihancurkan, dan berbagai kendaraan militer. Meskipun grafisnya sederhana, gameplay-nya yang mendalam dan fokus pada kerja sama mendapat pujian.",
    harga: "Rp230.000",
  },
  {
    title: "Valorant",
    price: 0,
    image: "(6)valo.png",
    category: "action",
    description:
      "FPS taktis 5v5 dari Riot Games yang menggabungkan keterampilan menembak presisi dengan kemampuan unik dari setiap agen. Game ini terus berkembang dengan pembaruan rutin, termasuk peta, agen, dan acara esports seperti Masters Toronto. Mode utama 'Plant/Defuse' menekankan kerja tim dan strategi.",
    harga: "Gratis",
  },
  {
    title: "Firebreak",
    price: 875000,
    image: "(7)FBC Firebreak.png",
    category: "action",
    description:
      "Co-op FPS yang berlatar di markas besar Federal Bureau of Control yang diserang oleh kekuatan supranatural. Pemain menjadi bagian dari unit Firebreak, bertugas mengatasi krisis aneh dan mengembalikan ketertiban. Game ini menawarkan pengalaman bermain kooperatif yang intens dengan berbagai misi dan tantangan.",
    harga: "Rp875.000",
  },
  {
    title: "System Shock",
    price: 600000,
    image: "(8)System Shock.png",
    category: "fantasy",
    description:
      "Remake dari game klasik 1994, dikembangkan oleh Nightdive Studios. Pemain berperan sebagai hacker yang mencoba menghentikan AI jahat SHODAN di stasiun luar angkasa Citadel. Game ini menggabungkan eksplorasi, pemecahan teka-teki, dan pertarungan dalam setting cyberpunk. Dirilis untuk Windows pada 30 Mei 2023 dan untuk konsol pada 21 Mei 2024.",
    harga: "Rp600.000",
  },
  {
    title: "Wrath",
    price: 375000,
    image: "(9)Wrath Aeon of Ruin.png",
    category: "fantasy",
    description:
      "FPS retro yang dibangun menggunakan mesin Quake asli, menawarkan gameplay cepat dan brutal yang terinspirasi dari Doom dan Hexen. Pemain menjelajahi tiga hub dunia dengan total 15 level, menghadapi berbagai musuh dan bos. Game ini menambahkan elemen RPG ringan dan sistem penyimpanan berbasis 'Soul Tethers'.",
    harga: "Rp375.000",
  },
  {
    title: "Witchfire",
    price: 575000,
    image: "(10)Witchfire.jpg",
    category: "fantasy",
    description:
      "FPS dark fantasy dengan elemen roguelite, di mana pemain berperan sebagai 'preyer' yang memburu penyihir. Game ini menggabungkan pertarungan berbasis senjata dan sihir, dengan eksplorasi bioma yang luas dan sistem pertarungan yang menantang. Dirilis dalam Early Access pada 23 September 2024.",
    harga: "Rp575.000",
  },
];

function showToast(message) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.textContent = message;
    toast.style.opacity = "1";
    setTimeout(() => {
      toast.style.opacity = "0";
    }, 3000);
  }
}

function displayGames() {
  const gameGrid = document.getElementById("gameGrid");
  if (gameGrid) {
    gameGrid.innerHTML = "";
    games.forEach((game) => {
      const gameCard = document.createElement("div");
      gameCard.classList.add("game-card");
      gameCard.innerHTML = `
        <img src="${game.image}" alt="${game.title}" />
        <div class="game-card-footer">
          <div>${game.title}</div>
          <div class="game-price">${
            game.price === 0 ? "Gratis" : "Rp " + game.price.toLocaleString()
          }</div>
          <div class="button-group">
            <button class="fav-button" onclick="showDetailPage('${
              game.title
            }')">Detail</button>
            <button class="add-cart-button" onclick="addToCart('${
              game.title
            }', ${game.price}, '${game.image}')">Tambah Keranjang</button>
          </div>
        </div>
      `;
      gameGrid.appendChild(gameCard);
    });
  }
}

function login() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  if (email.includes("@gmail.com") && password.length >= 6) {
    isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");
    alert("Login berhasil!");
    window.location.href = "index.html";
  } else {
    alert(
      "Email atau password tidak valid. Pastikan email mengandung '@gmail.com' dan password minimal 6 karakter."
    );
  }
}

function register() {
  const fullName = document.getElementById("fullNameInput").value;
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  if (fullName && email.includes("@gmail.com") && password.length >= 6) {
    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "login.html";
  } else {
    alert(
      "Pastikan semua field diisi. Email harus @gmail.com dan password minimal 6 karakter."
    );
  }
}

function addToCart(title, price, image) {
  if (!isLoggedIn) {
    alert("Anda perlu login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }
  cart.push({ title, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  showToast("Item berhasil ditambahkan ke keranjang!");
}

function updateCartDisplay() {
  const cartCount = isLoggedIn ? cart.length : 0;
  const cartButton = document.querySelector(".btn-cart");
  if (cartButton) {
    cartButton.textContent = `Keranjang${
      cartCount > 0 ? ` (${cartCount})` : ""
    }`;
  }
  updateCartPage();
}

function updateCartPage() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  if (cartItems && cartTotal) {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${item.image}" alt="${
        item.title
      }" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
          <span>${item.title} - Rp ${item.price.toLocaleString()}</span>
        </div>
        <button onclick="removeFromCart(${index})">Hapus</button>
      `;
      cartItems.appendChild(itemElement);
      total += item.price;
    });
    cartTotal.innerText = `Total: Rp ${total.toLocaleString()}`;
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function checkout() {
  const paymentMethod = document.getElementById("paymentMethod");
  if (!paymentMethod) return;
  const paymentValue = paymentMethod.value;

  if (cart.length === 0) {
    alert(
      "Keranjang belanja kosong. Silakan tambahkan barang terlebih dahulu."
    );
    return;
  }

  if (!paymentValue) {
    alert("Silakan pilih metode pembayaran terlebih dahulu.");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  const receiptData = {
    paymentMethod: paymentValue,
    items: cart,
    total: total,
    date: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
  };

  localStorage.setItem("receiptData", JSON.stringify(receiptData));

  // Generate PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("STRUK PEMBAYARAN", 105, 20, null, null, "center");

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Tanggal       : ${receiptData.date}`, 20, 40);
  doc.text(`Metode Bayar  : ${paymentValue}`, 20, 48);

  // Item list header
  doc.setFont("helvetica", "bold");
  doc.text("No", 20, 60);
  doc.text("Nama Produk", 30, 60);
  doc.text("Harga (Rp)", 160, 60, null, null, "right");

  doc.setFont("helvetica", "normal");
  let yPos = 70;
  receiptData.items.forEach((item, index) => {
    doc.text(`${index + 1}`, 20, yPos);
    doc.text(item.title, 30, yPos);
    doc.text(
      `${item.price.toLocaleString("id-ID")}`,
      160,
      yPos,
      null,
      null,
      "right"
    );
    yPos += 8;
  });

  // Total
  doc.setFont("helvetica", "bold");
  doc.text("Total Bayar", 30, yPos + 10);
  doc.text(
    `Rp ${total.toLocaleString("id-ID")}`,
    160,
    yPos + 10,
    null,
    null,
    "right"
  );

  // Save PDF
  doc.save("receipt.pdf");

  // Reset keranjang
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  window.location.href = "invoice.html";
}

function displayReceipt() {
  const receiptContent = document.getElementById("receiptContent");
  if (receiptContent) {
    const receiptData = JSON.parse(localStorage.getItem("receiptData")) || {};
    const { paymentMethod, items, total } = receiptData;
    if (items && paymentMethod) {
      receiptContent.innerHTML = `
        <div class="receipt-header">
          <h3>Struk Pembayaran</h3>
          <p>Metode Pembayaran: <strong>${paymentMethod}</strong></p>
        </div>
        <div class="receipt-items">
          <ul>
            ${items
              .map(
                (item) =>
                  `<li><span class="item-title">${
                    item.title
                  }</span> - <span class="item-price">Rp ${item.price.toLocaleString()}</span></li>`
              )
              .join("")}
          </ul>
        </div>
        <div class="receipt-footer">
          <p><strong>Total Bayar: Rp ${total.toLocaleString()}</strong></p>
        </div>
      `;
    } else {
      receiptContent.innerHTML = "<p>Tidak ada data struk pembayaran.</p>";
    }
  }
}

function logout() {
  isLoggedIn = false;
  cart = [];
  localStorage.setItem("isLoggedIn", "false");
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  updateLoginStatus();
  alert("Anda berhasil logout!");
  window.location.href = "index.html";
}

function updateLoginStatus() {
  const logoutButton = document.querySelector(".btn-logout");
  const loginButton = document.querySelector(".btn-login");
  const registerButton = document.querySelector(".btn-register");
  if (logoutButton && loginButton && registerButton) {
    if (isLoggedIn) {
      logoutButton.style.display = "inline-block";
      loginButton.style.display = "none";
      registerButton.style.display = "none";
    } else {
      logoutButton.style.display = "none";
      loginButton.style.display = "inline-block";
      registerButton.style.display = "inline-block";
    }
  }
}

function searchGame() {
  const input = document.getElementById("searchInput");
  const category = document.getElementById("categorySelect");
  if (input && category) {
    const searchValue = input.value.toLowerCase();
    const categoryValue = category.value;
    const filteredGames = games.filter((game) => {
      const isInCategory =
        categoryValue === "all" || game.category === categoryValue;
      const isInSearch = game.title.toLowerCase().includes(searchValue);
      return isInCategory && isInSearch;
    });
    const gameGrid = document.getElementById("gameGrid");
    if (gameGrid) {
      gameGrid.innerHTML = "";
      filteredGames.forEach((game) => {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
          <img src="${game.image}" alt="${game.title}" />
          <div class="game-card-footer">
            <div>${game.title}</div>
            <div class="game-price">${
              game.price === 0 ? "Gratis" : "Rp " + game.price.toLocaleString()
            }</div>
            <div class="button-group">
              <button class="fav-button" onclick="showDetailPage('${
                game.title
              }')">Detail</button>
              <button class="add-cart-button" onclick="addToCart('${
                game.title
              }', ${game.price}, '${game.image}')">Tambah Keranjang</button>
            </div>
          </div>
        `;
        gameGrid.appendChild(gameCard);
      });
    }
  }
}

function showDetailPage(title) {
  const game = games.find((g) => g.title === title);
  if (game) {
    localStorage.setItem("currentGame", JSON.stringify(game));
    const detailPage = document.getElementById("detailPage");
    const detailTitle = document.getElementById("detailTitle");
    const detailDescription = document.getElementById("detailDescription");
    const detailPrice = document.getElementById("detailPrice");
    const detailImage = document.getElementById("detailImage");
    if (
      detailPage &&
      detailTitle &&
      detailDescription &&
      detailPrice &&
      detailImage
    ) {
      detailPage.style.display = "block";
      detailTitle.innerText = game.title;
      detailDescription.innerText = game.description;
      detailPrice.innerText = game.price.toLocaleString();
      detailImage.src = game.image;
      document.getElementById("gameGrid").style.display = "none";
      document.getElementById("searchBar").style.display = "none";
    }
  }
}

function addToCartFromDetail() {
  const game = JSON.parse(localStorage.getItem("currentGame"));
  if (game) {
    addToCart(game.title, game.price, game.image);
  }
}

function updateLoginStatus() {
  const logoutButton = document.querySelector(".btn-logout");
  const loginButton = document.querySelector(".btn-login");
  const registerButton = document.querySelector(".btn-register");
  if (logoutButton && loginButton && registerButton) {
    if (isLoggedIn) {
      logoutButton.style.display = "inline-block";
      loginButton.style.display = "none";
      registerButton.style.display = "none";
    } else {
      logoutButton.style.display = "none";
      loginButton.style.display = "inline-block";
      registerButton.style.display = "inline-block";
    }
  } else {
    console.error(
      "Salah satu tombol (logout, login, atau register) tidak ditemukan di DOM."
    );
  }
}

function init() {
  updateCartDisplay();
  updateLoginStatus();
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname.includes("shop.html")
  ) {
    displayGames(); // Panggil displayGames untuk index.html dan shop.html
  }
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
  ) {
    const heroSection = document.getElementById("hero");
    const dotContainer = document.getElementById("dotIndicators");
    if (heroSection && dotContainer) {
      const backgrounds = [
        "url('Doom The Dark Ages.png')",
        "url('(2)Gears of War.png')",
        "url('(3)La Quimera.png')",
        "url('(4)FragPunk.png')",
        "url('(5)BattleBit Remastered.png')",
      ];
      let currentIndex = 0;

      function updateDots() {
        dotContainer.innerHTML = backgrounds
          .map(
            (_, idx) =>
              `<span class="${idx === currentIndex ? "active" : ""}"></span>`
          )
          .join("");
      }

      function changeBackground() {
        currentIndex = (currentIndex + 1) % backgrounds.length;
        heroSection.style.backgroundImage = `linear-gradient(120deg, #260050c7, #1b003ac9), ${backgrounds[currentIndex]}`;
        updateDots();
      }

      updateDots();
      setInterval(changeBackground, 4000);
    }
  } else if (window.location.pathname.includes("checkout.html")) {
    updateCartPage();
  } else if (window.location.pathname.includes("invoice.html")) {
    displayReceipt();
  }
}

window.onload = init;
