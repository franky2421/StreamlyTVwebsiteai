(() => {
  const whatsappNumber = "61410350514";
  const preferenceStorageKey = "streamlytv-explore-preferences-v1";
  const currentPage = document.body.dataset.page || "home";
  const navigation = [
    ["Home", "/", "home"],
    ["Explore", "/explore", "explore"],
    ["Build Package", "/build-package", "build-package"],
    ["FAQ", "/faq", "faq"],
    ["Contact", "/contact", "contact"],
  ];
  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  const supportMount = document.getElementById("site-support");

  if (headerMount) {
    headerMount.innerHTML = `
      <header class="site-header">
        <div class="site-nav-wrap">
          <a class="site-brand" href="/" aria-label="StreamlyTV home">
            <img src="/assets/streamlytv-logo.png" alt="" width="43" height="43">
            <span>STREAMLYTV</span>
          </a>
          <button class="site-menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav"><span></span></button>
          <nav class="site-nav" id="site-nav" aria-label="Main navigation">
            ${navigation.map(([label, href, page]) => `<a href="${href}"${page === currentPage ? ' aria-current="page"' : ""}${page === "build-package" ? ' class="site-nav-cta"' : ""}>${label}</a>`).join("")}
          </nav>
        </div>
      </header>`;

    const menuButton = headerMount.querySelector(".site-menu-toggle");
    const nav = headerMount.querySelector(".site-nav");
    const closeMenu = () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    };
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      nav.classList.toggle("is-open", !isOpen);
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    });
    nav.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  }

  if (footerMount) {
    footerMount.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer-inner">
          <span>StreamlyTV · WhatsApp <a href="https://wa.me/${whatsappNumber}" target="_blank" rel="noopener noreferrer">0410 350 514</a></span>
          <nav class="site-footer-links" aria-label="Policies">
            <a href="/privacy.html">Privacy Policy</a>
            <a href="/terms.html">Terms &amp; Conditions</a>
            <a href="/refund.html">Refund Policy</a>
          </nav>
        </div>
      </footer>`;
  }

  function renderSupport() {
    if (!supportMount) return;
    supportMount.innerHTML = `
      <div class="site-support">
        <section class="support-panel" id="support-panel" aria-label="StreamlyTV Support" aria-hidden="true">
          <div class="support-head"><strong>StreamlyTV Support</strong><button class="support-close" type="button" aria-label="Close support chat">×</button></div>
          <div class="support-messages" id="support-messages" aria-live="polite" aria-relevant="additions"></div>
          <div class="support-quick" aria-label="Common questions">
            <button type="button" data-quick="How do I start a 24-hour trial?">24h Trial</button>
            <button type="button" data-quick="How do I set up Firestick?">Firestick</button>
            <button type="button" data-quick="Do you have UFC?">UFC</button>
            <button type="button" data-quick="Which package is best?">Packages</button>
          </div>
          <form class="support-form" id="support-form">
            <label class="sr-only" for="support-input">Ask StreamlyTV Support</label>
            <input id="support-input" name="message" autocomplete="off" placeholder="Ask StreamlyTV Support..." required>
            <button type="submit">Send</button>
          </form>
        </section>
        <button class="support-launcher" id="support-launcher" type="button" aria-expanded="false" aria-controls="support-panel">StreamlyTV Support</button>
      </div>`;

    const panel = supportMount.querySelector("#support-panel");
    const launcher = supportMount.querySelector("#support-launcher");
    const close = supportMount.querySelector(".support-close");
    const messagesNode = supportMount.querySelector("#support-messages");
    const input = supportMount.querySelector("#support-input");
    const form = supportMount.querySelector("#support-form");
    const messages = [{ role: "assistant", content: "Hi! Welcome to StreamlyTV Support. I can help with packages, free trials, device setup, sports, movies and troubleshooting. What can I help you with today?" }];

    function renderMessages() {
      messagesNode.replaceChildren();
      messages.forEach(message => {
        const bubble = document.createElement("div");
        bubble.className = `support-message${message.role === "user" ? " user" : ""}`;
        bubble.textContent = message.content;
        if (message.contactButton) {
          const link = document.createElement("a");
          link.href = `https://wa.me/${whatsappNumber}`;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = "WhatsApp StreamlyTV";
          bubble.append(document.createElement("br"), link);
        }
        messagesNode.appendChild(bubble);
      });
      messagesNode.scrollTop = messagesNode.scrollHeight;
    }

    function setOpen(open) {
      panel.classList.toggle("is-open", open);
      panel.setAttribute("aria-hidden", String(!open));
      launcher.setAttribute("aria-expanded", String(open));
      if (open) input.focus();
      else launcher.focus();
    }

    async function sendMessage(value) {
      const content = String(value || "").trim();
      if (!content) return;
      messages.push({ role: "user", content });
      renderMessages();
      input.value = "";
      const sendButton = form.querySelector("button[type='submit']");
      sendButton.disabled = true;
      const pending = { role: "assistant", content: "One moment while I check that for you...", pending: true };
      messages.push(pending);
      renderMessages();
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: messages.filter(message => !message.pending).map(({ role, content }) => ({ role, content })) }),
        });
        const data = await response.json();
        pending.content = data.reply || "Sorry, I couldn't get a reply. Please contact StreamlyTV on WhatsApp: 0410 350 514.";
        pending.contactButton = Boolean(data.contactButton);
      } catch {
        pending.content = "Sorry, something went wrong. Please contact StreamlyTV on WhatsApp: 0410 350 514.";
      } finally {
        delete pending.pending;
        sendButton.disabled = false;
        renderMessages();
      }
    }

    launcher.addEventListener("click", () => setOpen(launcher.getAttribute("aria-expanded") !== "true"));
    close.addEventListener("click", () => setOpen(false));
    panel.addEventListener("keydown", event => { if (event.key === "Escape") setOpen(false); });
    form.addEventListener("submit", event => { event.preventDefault(); sendMessage(input.value); });
    window.sendChat = () => sendMessage(input.value);
    input.addEventListener("keydown", event => {
      if (event.key === "Enter" && (event.isComposing || event.keyCode === 229)) event.preventDefault();
    });
    supportMount.querySelectorAll("[data-quick]").forEach(button => button.addEventListener("click", () => sendMessage(button.dataset.quick)));
    window.openChat = prompt => { setOpen(true); if (prompt) sendMessage(prompt); };
    window.closeChat = () => setOpen(false);
    window.sendQuick = sendMessage;
    renderMessages();
  }

  function readExplorePreferences() {
    try {
      const saved = JSON.parse(localStorage.getItem(preferenceStorageKey) || "{}");
      return {
        categories: new Set(Array.isArray(saved.categories) ? saved.categories : []),
        subpreferences: new Set(Array.isArray(saved.subpreferences) ? saved.subpreferences : []),
        advanced: new Set(Array.isArray(saved.advanced) ? saved.advanced : []),
        countries: Array.isArray(saved.countries) ? saved.countries : [],
      };
    } catch {
      return { categories: new Set(), subpreferences: new Set(), advanced: new Set(), countries: [] };
    }
  }

  function initExplore() {
    const rowsNode = document.getElementById("explore-rows");
    if (!rowsNode) return;
    const shelves = [
      { title: "Live Sports", id: "live-sports", cards: [
        { title: "Football / Soccer", image: "assets/genre-sports.png", category: "sports", option: "Football / Soccer" },
        { title: "UFC & Combat Sports", image: "assets/ufc-hero.png", category: "sports", option: "UFC / Combat Sports" },
        { title: "NRL & Rugby", image: "assets/genre-sports.png", category: "sports", option: "NRL & Rugby" },
        { title: "Cricket", image: "assets/genre-sports.png", category: "sports", option: "Cricket" },
        { title: "Tennis", image: "assets/genre-sports.png", category: "sports", option: "Tennis" },
        { title: "Live PPV Events", image: "assets/ufc-hero.png", category: "sports", option: "Live PPV Events" },
        { title: "Champions League", image: "assets/genre-sports.png", category: "sports", option: "Champions League" },
        { title: "beIN Sports", image: "assets/genre-world.png", category: "sports", option: "beIN Sports" },
      ] },
      { title: "Movies & Series", id: "movies-series", cards: [
        { title: "Latest Movies", image: "assets/genre-films.png", category: "movies", option: "Latest Movies" },
        { title: "Popular Series", image: "assets/genre-films.png", category: "movies", option: "Popular Series" },
        { title: "New Releases", image: "assets/genre-films.png", category: "movies", option: "New Releases" },
        { title: "4K & UHD", image: "assets/genre-films.png", advanced: "4K / UHD" },
        { title: "Dolby Audio", image: "assets/genre-films.png", category: "movies", option: "Dolby Audio" },
        { title: "Cinema Releases", image: "assets/genre-films.png", category: "movies", option: "Cinema Releases" },
        { title: "Box Office", image: "assets/genre-films.png", category: "movies", option: "Box Office" },
        { title: "International Movies", image: "assets/genre-world.png", category: "movies", option: "International Movies" },
      ] },
      { title: "Kids & Family", id: "kids-family", cards: [
        { title: "Kids Channels", image: "assets/genre-family.png", category: "family", option: "Kids Channels" },
        { title: "Kids Movies", image: "assets/genre-family.png", category: "family", option: "Kids Movies" },
        { title: "Cartoons", image: "assets/genre-family.png", category: "family", option: "Cartoons" },
        { title: "Family Entertainment", image: "assets/genre-family.png", category: "family", option: "Family Entertainment" },
        { title: "Kids Series", image: "assets/genre-family.png", category: "family", option: "Kids Series" },
        { title: "Anime for Kids", image: "assets/genre-family.png", category: "family", option: "Anime for Kids" },
      ] },
      { title: "Arabic Entertainment", id: "arabic-entertainment", cards: [
        { title: "Arabic Movies", image: "assets/genre-arabic.png", category: "arabic", option: "Arabic Movies" },
        { title: "Arabic Series", image: "assets/genre-arabic.png", category: "arabic", option: "Arabic Series" },
        { title: "MBC", image: "assets/genre-arabic.png", category: "arabic", option: "MBC" },
        { title: "Rotana & ART", image: "assets/genre-arabic.png", category: "arabic", option: "Rotana & ART" },
        { title: "Arabic Drama", image: "assets/genre-arabic.png", category: "arabic", option: "Arabic Drama" },
        { title: "Arabic Comedy", image: "assets/genre-arabic.png", category: "arabic", option: "Arabic Comedy" },
        { title: "Arabic Cinema", image: "assets/genre-arabic.png", category: "arabic", option: "Arabic Cinema" },
        { title: "Ramadan Content", image: "assets/genre-arabic.png", category: "arabic", option: "Ramadan Content" },
      ] },
      { title: "International", id: "international", cards: [
        { title: "Australia", image: "assets/genre-world.png", advanced: "Australia", badge: "Included" },
        { title: "United Kingdom", image: "assets/genre-world.png", advanced: "United Kingdom", badge: "Included" },
        { title: "USA", image: "assets/genre-world.png", advanced: "USA", badge: "Included" },
        { title: "New Zealand", image: "assets/genre-world.png", advanced: "New Zealand" },
        { title: "Canada", image: "assets/genre-world.png", advanced: "Canada" },
        { title: "Europe", image: "assets/genre-world.png", advanced: "Europe" },
        { title: "Asia", image: "assets/genre-world.png", advanced: "Asia" },
        { title: "Middle East", image: "assets/genre-arabic.png", advanced: "Middle East" },
      ] },
      { title: "More to Explore", id: "more-to-explore", cards: [
        { title: "Documentaries", image: "assets/genre-documentary.png", category: "documentaries", option: "Documentaries" },
        { title: "News", image: "assets/genre-world.png", category: "news", option: "International News" },
        { title: "Music & Radio", image: "assets/genre-world.png", category: "music", option: "Music Channels" },
        { title: "Islamic", image: "assets/genre-arabic.png", category: "islamic", option: "Islamic Channels" },
        { title: "Comedy & Theatre", image: "assets/genre-films.png", category: "comedy", option: "Comedy" },
        { title: "Anime", image: "assets/genre-family.png", category: "anime", option: "Anime Series" },
        { title: "Turkish", image: "assets/genre-world.png", category: "turkish", option: "Turkish Series" },
        { title: "Asian Entertainment", image: "assets/genre-world.png", category: "asian", option: "Asian Series" },
        { title: "Indian Entertainment", image: "assets/genre-world.png", category: "indian", option: "Indian Series" },
      ] },
    ];

    const selections = readExplorePreferences();
    const getKey = card => card.advanced ? `advanced::${card.advanced}` : `${card.category}::${card.option}`;
    const isSelected = card => card.advanced ? selections.advanced.has(card.advanced) : selections.subpreferences.has(`${card.category}::${card.option}`);
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

    rowsNode.innerHTML = shelves.map((shelf, shelfIndex) => `
      <section class="explore-row" id="${shelf.id}" aria-labelledby="explore-title-${shelfIndex + 1}">
        <h2 id="explore-title-${shelfIndex + 1}">${escapeHtml(shelf.title)}</h2>
        <div class="explore-track">
          ${shelf.cards.map(card => {
            const selected = isSelected(card);
            const action = selected ? "Added" : "Add to my preferences";
            const badge = card.badge ? `<span class="shelf-card-badge${card.badge === "Included" ? " is-included" : ""}">${escapeHtml(card.badge)}</span>` : "";
            return `<button class="shelf-card${selected ? " is-selected" : ""}" type="button" style="--shelf-image:url('${card.image}')" data-explore-card="${escapeHtml(getKey(card))}" aria-pressed="${selected}" aria-label="${escapeHtml(`${card.title}: ${action}`)}">
              ${badge}<span class="shelf-card-content"><span class="shelf-card-title">${escapeHtml(card.title)}</span><span class="shelf-card-action">${action}</span></span><span class="shelf-card-check" aria-hidden="true">${selected ? "✓" : ""}</span>
            </button>`;
          }).join("")}
        </div>
      </section>`).join("");

    rowsNode.addEventListener("click", event => {
      const button = event.target.closest("[data-explore-card]");
      if (!button) return;
      const [kind, value] = button.dataset.exploreCard.split("::");
      if (kind === "advanced") {
        if (selections.advanced.has(value)) selections.advanced.delete(value);
        else selections.advanced.add(value);
      } else {
        const key = `${kind}::${value}`;
        if (selections.subpreferences.has(key)) {
          selections.subpreferences.delete(key);
          if (![...selections.subpreferences].some(item => item.startsWith(`${kind}::`))) selections.categories.delete(kind);
        } else {
          selections.categories.add(kind);
          selections.subpreferences.add(key);
        }
      }
      try {
        localStorage.setItem(preferenceStorageKey, JSON.stringify({
          categories: [...selections.categories],
          subpreferences: [...selections.subpreferences],
          advanced: [...selections.advanced],
          countries: selections.countries,
        }));
      } catch {}
      const selected = isSelected({ advanced: kind === "advanced" ? value : undefined, category: kind, option: value });
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute("aria-label", `${button.querySelector(".shelf-card-title").textContent}: ${selected ? "Added" : "Add to my preferences"}`);
      button.querySelector(".shelf-card-action").textContent = selected ? "Added" : "Add to my preferences";
      button.querySelector(".shelf-card-check").textContent = selected ? "✓" : "";
      const status = document.getElementById("explore-status");
      if (status) status.textContent = selected ? "Added to your preferences. Your choices will be ready in Build Package." : "Removed from your preferences.";
    });

    if (window.location.hash) {
      requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: "start" }));
    }
  }

  renderSupport();
  initExplore();
})();
