(() => {
  const whatsappNumber = "61410350514";
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

  function initExplore() {
    const rowsNode = document.getElementById("explore-rows");
    if (!rowsNode) return;
    const shelves = [
      { title: "Live Sports", id: "live-sports", cards: [
        { title: "Football / Soccer", image: "assets/genre-sports.png", category: "sports" },
        { title: "UFC & Combat Sports", image: "assets/ufc-hero.png", category: "sports" },
        { title: "NRL & Rugby", image: "assets/genre-sports.png", category: "sports" },
        { title: "Cricket", image: "assets/genre-sports.png", category: "sports" },
        { title: "Tennis", image: "assets/genre-sports.png", category: "sports" },
        { title: "Live PPV Events", image: "assets/ufc-hero.png", category: "sports" },
        { title: "Champions League", image: "assets/genre-sports.png", category: "sports" },
        { title: "beIN Sports", image: "assets/genre-world.png", category: "sports" },
      ] },
      { title: "Movies & Series", id: "movies-series", cards: [
        { title: "Latest Movies", image: "assets/genre-films.png", category: "movies" },
        { title: "Popular Series", image: "assets/genre-films.png", category: "movies" },
        { title: "New Releases", image: "assets/genre-films.png", category: "movies" },
        { title: "Cinema Releases", image: "assets/genre-films.png", category: "movies" },
        { title: "Box Office", image: "assets/genre-films.png", category: "movies" },
        { title: "International Movies", image: "assets/genre-world.png", category: "movies" },
      ] },
      { title: "Kids & Family", id: "kids-family", cards: [
        { title: "Kids Channels", image: "assets/genre-family.png", category: "family" },
        { title: "Kids Movies", image: "assets/genre-family.png", category: "family" },
        { title: "Cartoons", image: "assets/genre-family.png", category: "family" },
        { title: "Family Entertainment", image: "assets/genre-family.png", category: "family" },
        { title: "Kids Series", image: "assets/genre-family.png", category: "family" },
        { title: "Anime for Kids", image: "assets/genre-family.png", category: "family" },
      ] },
      { title: "Arabic Entertainment", id: "arabic-entertainment", cards: [
        { title: "Arabic Movies", image: "assets/genre-arabic.png", category: "arabic" },
        { title: "Arabic Series", image: "assets/genre-arabic.png", category: "arabic" },
        { title: "MBC", image: "assets/genre-arabic.png", category: "arabic" },
        { title: "Rotana & ART", image: "assets/genre-arabic.png", category: "arabic" },
        { title: "Arabic Drama", image: "assets/genre-arabic.png", category: "arabic" },
        { title: "Arabic Comedy", image: "assets/genre-arabic.png", category: "arabic" },
        { title: "Arabic Cinema", image: "assets/genre-arabic.png", category: "arabic" },
        { title: "Ramadan Content", image: "assets/genre-arabic.png", category: "arabic" },
      ] },
      { title: "International", id: "international", cards: [
        { title: "Australia", image: "assets/genre-world.png", badge: "Included" },
        { title: "United Kingdom", image: "assets/genre-world.png", badge: "Included" },
        { title: "USA", image: "assets/genre-world.png", badge: "Included" },
        { title: "New Zealand", image: "assets/genre-world.png", badge: "Optional Add-On" },
        { title: "Canada", image: "assets/genre-world.png", badge: "Optional Add-On" },
        { title: "Europe", image: "assets/genre-world.png", badge: "Optional Add-On" },
        { title: "Asia", image: "assets/genre-world.png", badge: "Optional Add-On" },
        { title: "Middle East", image: "assets/genre-arabic.png", badge: "Optional Add-On" },
      ] },
      { title: "Documentaries", id: "documentaries", cards: [
        { title: "Documentaries", image: "assets/genre-documentary.png", category: "documentaries" },
      ] },
      { title: "News", id: "news", cards: [
        { title: "International News", image: "assets/genre-world.png", category: "news" },
        { title: "Arabic News", image: "assets/genre-arabic.png", category: "news" },
        { title: "Local News", image: "assets/genre-world.png", category: "news" },
      ] },
      { title: "Music & Radio", id: "music-radio", cards: [
        { title: "Music Channels", image: "assets/genre-world.png", category: "music" },
        { title: "Arabic Music", image: "assets/genre-arabic.png", category: "music" },
        { title: "Radio & Podcasts", image: "assets/genre-world.png", category: "music" },
      ] },
      { title: "Islamic", id: "islamic", cards: [
        { title: "Quran & Islamic Channels", image: "assets/genre-arabic.png", category: "islamic" },
        { title: "Islamic Programs", image: "assets/genre-arabic.png", category: "islamic" },
        { title: "Nasheeds", image: "assets/genre-arabic.png", category: "islamic" },
      ] },
      { title: "Anime", id: "anime", cards: [
        { title: "Anime Movies & Series", image: "assets/genre-family.png", category: "anime" },
        { title: "Dubbed & Subtitled Anime", image: "assets/genre-family.png", category: "anime" },
      ] },
      { title: "Turkish", id: "turkish", cards: [
        { title: "Turkish Movies", image: "assets/genre-world.png", category: "turkish" },
        { title: "Turkish Series", image: "assets/genre-world.png", category: "turkish" },
        { title: "Dubbed & Subtitled", image: "assets/genre-world.png", category: "turkish" },
      ] },
      { title: "Asian Entertainment", id: "asian-entertainment", cards: [
        { title: "Asian Movies & Series", image: "assets/genre-world.png", category: "asian" },
        { title: "Korean, Japanese & Chinese", image: "assets/genre-world.png", category: "asian" },
      ] },
      { title: "Indian Entertainment", id: "indian-entertainment", cards: [
        { title: "Indian Movies & Series", image: "assets/genre-world.png", category: "indian" },
        { title: "Hindi Content", image: "assets/genre-world.png", category: "indian" },
      ] },
      { title: "4K / UHD", id: "4k-uhd", cards: [
        { title: "4K UHD", image: "assets/genre-films.png" },
        { title: "Dolby Audio", image: "assets/genre-films.png" },
        { title: "Dolby Vision", image: "assets/genre-films.png" },
        { title: "Multi-Subtitle", image: "assets/genre-world.png" },
        { title: "Premium Sports Quality", image: "assets/genre-sports.png" },
      ] },
    ];
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

    rowsNode.innerHTML = shelves.map((shelf, shelfIndex) => `
      <section class="explore-row" id="${shelf.id}" aria-labelledby="explore-title-${shelfIndex + 1}">
        <h2 id="explore-title-${shelfIndex + 1}">${escapeHtml(shelf.title)}</h2>
        <div class="explore-track">
          ${shelf.cards.map(card => {
            const href = card.category ? `/build-package?category=${encodeURIComponent(card.category)}` : "/build-package";
            const badge = card.badge ? `<span class="shelf-card-badge${card.badge === "Included" ? " is-included" : ""}">${escapeHtml(card.badge)}</span>` : "";
            return `<a class="shelf-card" href="${escapeHtml(href)}" style="--shelf-image:url('${card.image}')" aria-label="${escapeHtml(`${card.title}: Choose in Package`)}">
              ${badge}<span class="shelf-card-content"><span class="shelf-card-title">${escapeHtml(card.title)}</span><span class="shelf-card-action">Choose in Package</span></span>
            </a>`;
          }).join("")}
        </div>
      </section>`).join("");

    if (window.location.hash) {
      requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: "start" }));
    }
  }

  renderSupport();
  initExplore();
})();
