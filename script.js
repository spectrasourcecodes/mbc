/* ===================================================
   GLOBAL SHARED SCRIPT (with Google Translate Auto-hide)
   =================================================== */

// ========= HEADER & MENU =========
const menuBtn = document.getElementById("menu-btn");
const menuClose = document.getElementById("menu-close");
const sideMenu = document.getElementById("side-menu");
const yearSpan = document.getElementById("year");

// --- Dynamic Year ---
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// --- Side Menu Toggle ---
if (menuBtn && sideMenu) {
  menuBtn.addEventListener("click", () => sideMenu.classList.add("open"));
}
if (menuClose && sideMenu) {
  menuClose.addEventListener("click", () => sideMenu.classList.remove("open"));
}

// --- Close Menu on Outside Click ---
window.addEventListener("click", (e) => {
  if (sideMenu && sideMenu.classList.contains("open")) {
    if (!sideMenu.contains(e.target) && e.target !== menuBtn) {
      sideMenu.classList.remove("open");
    }
  }
});

/* ===================================================
   HOME PAGE (Hero Slider + Subscribe Form)
   =================================================== */
const heroCard = document.querySelector(".hero-card");
if (heroCard) {
  const slides = Array.from(document.querySelectorAll(".slide"));
  let index = 0;

  const updateHeroBackground = () => {
    if (slides.length > 0) {
      heroCard.style.backgroundImage = slides[index].style.backgroundImage;
      heroCard.style.transition = "background-image 1s ease-in-out";
    }
  };

  updateHeroBackground();

  setInterval(() => {
    index = (index + 1) % slides.length;
    updateHeroBackground();
  }, 4000);

  const phoneInput = document.getElementById("phone");
  const operatorSelect = document.getElementById("operator");
  const subscribeBtn = document.getElementById("subscribe-btn");

  const validateForm = () => {
    const validPhone = phoneInput?.value.trim().length >= 7;
    const validOperator = operatorSelect?.value.trim() !== "";
    if (subscribeBtn) {
      subscribeBtn.disabled = !(validPhone && validOperator);
    }
  };

  if (phoneInput && operatorSelect && subscribeBtn) {
    phoneInput.addEventListener("input", validateForm);
    operatorSelect.addEventListener("change", validateForm);
  }
}

/* ===================================================
   WINNERS PAGE
   =================================================== */
const winnersList = document.getElementById("winners-list");
if (winnersList) {
  const fakeWinners = [
    { name: "Ali H.", date: "Oct 10, 2025", prize: "$100,000" },
    { name: "Sara M.", date: "Sep 28, 2025", prize: "$50,000" },
    { name: "John K.", date: "Aug 15, 2025", prize: "$10,000" },
  ];

  winnersList.innerHTML = fakeWinners
    .map(
      (w) => `
        <li class="winner-card">
          <div class="winner-info">
            <div class="winner-name">${w.name}</div>
            <div class="winner-date">${w.date}</div>
          </div>
          <div class="winner-prize">${w.prize}</div>
        </li>
      `
    )
    .join("");
}

/* ===================================================
   GOOGLE TRANSLATE INTEGRATION (Auto-hide after selection)
   =================================================== */

// --- Load Google Translate Script ---
function loadGoogleTranslate() {
  const script = document.createElement("script");
  script.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);
}

// --- Initialize Google Translate ---
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages:
        "en,ar,fr,es,de,pt,zh,hi,ru,tr,it,ja,ko,ms,sw,ha,yo",
      layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
      autoDisplay: false,
    },
    "google_translate_container"
  );

  // Observe and attach event listener to hide after selection
  const observer = new MutationObserver(() => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.addEventListener("change", () => {
        const container = document.getElementById("google_translate_container");
        if (container) {
          container.style.opacity = "1";
          container.style.transition = "opacity 0.3s ease";
          container.style.opacity = "0";
          setTimeout(() => (container.style.display = "none"), 300);
        }
      });
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// --- Setup Translator Button ---
function setupTranslatorButton() {
  const langContainer = document.createElement("div");
  langContainer.id = "google_translate_container";
  langContainer.style.display = "none";
  document.body.appendChild(langContainer);

  const langBtn = document.getElementById("lang-btn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const container = document.getElementById("google_translate_container");
      if (container.style.display === "none") {
        container.style.display = "block";
        container.style.opacity = "0";
        container.style.transition = "opacity 0.3s ease";
        requestAnimationFrame(() => (container.style.opacity = "1"));
        container.style.position = "fixed";
        container.style.top = "60px";
        container.style.right = "10px";
        container.style.background = "#fff";
        container.style.padding = "8px";
        container.style.borderRadius = "8px";
        container.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
        container.style.zIndex = "1000";
      } else {
        container.style.opacity = "0";
        setTimeout(() => (container.style.display = "none"), 300);
      }
    });
  }
}

// --- Initialize Everything ---
window.addEventListener("DOMContentLoaded", () => {
  setupTranslatorButton();
  loadGoogleTranslate();
});

/* ===================================================
   UI ENHANCEMENTS
   =================================================== */

// --- Fade-In Animation on Load ---
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.6s ease";
  requestAnimationFrame(() => (document.body.style.opacity = "1"));
});
