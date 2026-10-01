(() => {
  const whatsappNumber = "61410350514";
  const plans = [
    { months: 3, label: "3 Months", price: 80 },
    { months: 6, label: "6 Months", price: 140 },
    { months: 12, label: "12 Months", price: 250 },
    { months: 1, label: "1-Day Free Trial", price: 0 },
  ];

  const entertainment = [
    { id: "sports", title: "Sports & Live Events", icon: "⚽", image: "assets/genre-sports.png", description: "Follow the matches, fights and events you love.", options: ["Football / Soccer", "Live Sports", "Champions League", "beIN Sports", "Football PPV", "Live PPV Events", "NRL & Rugby", "Cricket", "Tennis", "Horse Racing", "UFC / Combat Sports", "Sports Replays"] },
    { id: "movies", title: "Movies & Series", icon: "🎬", image: "assets/genre-films.png", description: "Big-screen stories, new releases and series.", options: ["Latest Movies", "Popular Series", "New Releases", "Cinema Releases", "Blu-ray Movies", "Box Office", "4K Movies", "Dolby Audio", "International Movies"] },
    { id: "family", title: "Kids & Family", icon: "👨‍👩‍👧‍👦", image: "assets/genre-family.png", description: "Family favourites for every age.", options: ["Kids Channels", "Kids Movies", "Cartoons", "Family Movies", "Family Entertainment", "Anime for Kids", "Nickelodeon-style content", "Kids Series"] },
    { id: "arabic", title: "Arabic Entertainment", icon: "🌙", image: "assets/genre-arabic.png", description: "Arabic cinema, series, channels and drama.", options: ["Arabic Movies", "Arabic Series", "MBC", "Rotana & ART", "Shahid-style content", "Arabic Drama", "Arabic Comedy", "Arabic Cinema", "Ramadan Content"] },
    { id: "turkish", title: "Turkish", icon: "🇹🇷", image: "assets/genre-world.png", description: "Turkish movies, series and dubbed favourites.", options: ["Turkish Movies", "Turkish Series", "Dubbed Content", "Subtitled Content"] },
    { id: "asian", title: "Asian Entertainment", icon: "🌏", image: "assets/genre-world.png", description: "Stories and channels from across Asia.", options: ["Asian Movies", "Asian Series", "Korean", "Japanese", "Chinese", "Anime"] },
    { id: "indian", title: "Indian Entertainment", icon: "🇮🇳", image: "assets/genre-world.png", description: "Indian movies, series and Hindi content.", options: ["Indian Movies", "Indian Series", "Hindi Content", "Dubbed Content"] },
    { id: "anime", title: "Anime", icon: "🎌", image: "assets/genre-family.png", description: "Anime movies and series, dubbed or subtitled.", options: ["Anime Movies", "Anime Series", "Dubbed Anime", "Subtitled Anime"] },
    { id: "documentaries", title: "Documentaries", icon: "📚", image: "assets/genre-documentary.png", description: "Nature, discovery and educational programmes.", options: ["Discovery-style content", "National Geographic-style content", "Documentaries", "Educational Programs"] },
    { id: "music", title: "Music & Radio", icon: "🎵", image: "assets/genre-world.png", description: "Music channels, radio and podcasts.", options: ["Music Channels", "Arabic Music", "Classic Music", "Radio", "Podcasts"] },
    { id: "islamic", title: "Islamic", icon: "🕌", image: "assets/genre-arabic.png", description: "Quran, Islamic programmes and nasheeds.", options: ["Quran", "Islamic Channels", "Islamic Programs", "Islamic Kids", "Nasheeds"] },
    { id: "comedy", title: "Comedy & Theatre", icon: "🎭", image: "assets/genre-films.png", description: "Comedy, stand-up and classic theatre.", options: ["Comedy", "Stand-up Comedy", "Arabic Theatre", "Classic Theatre"] },
    { id: "news", title: "News", icon: "📰", image: "assets/genre-world.png", description: "International, Arabic and local news.", options: ["International News", "Arabic News", "Local News"] },
  ];

  const preferenceGroups = {
    quality: { title: "Video quality", values: ["4K / UHD", "Dolby Audio", "Dolby Vision", "Multi-Subtitles", "Premium Sports Quality"] },
    language: { title: "Language & region", values: ["English", "Arabic", "Turkish", "French", "German", "Italian", "Spanish", "Portuguese", "Indian", "Asian", "Nordic", "Latino", "Other International", "Australia", "United Kingdom", "USA", "New Zealand", "Canada", "Europe", "Asia", "Middle East"] },
    dialect: { title: "Arabic content", values: ["Egyptian", "Syrian / Lebanese", "Gulf", "Iraqi", "Moroccan", "Tunisian", "Algerian / Libyan", "Yemeni", "Jordanian / Palestinian", "Bedouin", "Ramadan", "Arabic Kids"] },
  };

  const includedCountries = ["🇦🇺 Australia", "🇬🇧 United Kingdom", "🇺🇸 USA"];
  const allCountries = [
    ["🇳🇿", "New Zealand"], ["🇨🇦", "Canada"], ["🇱🇧", "Lebanon"], ["🇩🇪", "Germany"], ["🇦🇹", "Austria"], ["🇳🇱", "Netherlands"], ["🇧🇪", "Belgium"], ["🇮🇹", "Italy"], ["🇫🇷", "France"], ["🇪🇸", "Spain"], ["🇵🇹", "Portugal"], ["🇨🇭", "Switzerland"], ["🇵🇱", "Poland"], ["🇬🇷", "Greece"], ["🇨🇾", "Cyprus"], ["🇱🇻", "Latvia"], ["🇸🇪", "Sweden"], ["🇩🇰", "Denmark"], ["🇳🇴", "Norway"], ["🇫🇮", "Finland"], ["🇮🇸", "Iceland"], ["🇭🇺", "Hungary"], ["🇷🇴", "Romania"], ["🇦🇱", "Albania"], ["🇽🇰", "Kosovo"], ["🇷🇺", "Russia"], ["🇺🇦", "Ukraine"], ["🇲🇹", "Malta"], ["🇨🇿", "Czech Republic"], ["🇷🇸", "Serbia"], ["🇧🇦", "Bosnia"], ["🇭🇷", "Croatia"], ["🇲🇰", "Macedonia"], ["🇸🇮", "Slovenia"], ["🇲🇪", "Montenegro"], ["🇧🇬", "Bulgaria"], ["🇪🇪", "Estonia"], ["🇹🇷", "Turkey"], ["🌐", "Kurdish Region"], ["🇮🇷", "Iran"], ["🇦🇫", "Afghanistan"], ["🇵🇰", "Pakistan"], ["🇮🇳", "India"], ["🇸🇬", "Singapore"], ["🇧🇷", "Brazil"], ["🇸🇷", "Suriname"], ["🇲🇽", "Mexico"], ["🇦🇷", "Argentina"], ["🌎", "Latin America"], ["🏝️", "Caribbean"], ["🇯🇵", "Japan"], ["🇹🇼", "Taiwan"], ["🇵🇭", "Philippines"], ["🇬🇪", "Georgia"], ["🇦🇿", "Azerbaijan"], ["🇺🇿", "Uzbekistan"], ["🇦🇲", "Armenia"], ["🇻🇪", "Venezuela"], ["🇭🇰", "Hong Kong"], ["🇨🇳", "China"], ["🇻🇳", "Vietnam"], ["🇲🇾", "Malaysia"], ["🇮🇩", "Indonesia"], ["🇰🇷", "South Korea"], ["🇹🇭", "Thailand"], ["🇰🇿", "Kazakhstan"], ["🇱🇹", "Lithuania"], ["🌍", "Africa"], ["🇸🇾", "Syria"], ["🇲🇦", "Morocco"], ["🇪🇬", "Egypt"], ["🇦🇪", "United Arab Emirates"], ["🇮🇶", "Iraq"], ["🇸🇦", "Saudi Arabia"], ["🇰🇼", "Kuwait"], ["🇶🇦", "Qatar"], ["🇴🇲", "Oman"], ["🇧🇭", "Bahrain"], ["🇯🇴", "Jordan"], ["🇵🇸", "Palestine"], ["🇹🇳", "Tunisia"], ["🇩🇿", "Algeria"], ["🇾🇪", "Yemen"], ["🇱🇾", "Libya"], ["🇸🇩", "Sudan"],
  ].filter((country, index, list) => list.findIndex(item => item[1] === country[1]) === index);
  const popularCountryNames = new Set(["New Zealand", "Canada", "Lebanon", "Germany", "France", "India", "Turkey", "Italy", "Spain", "United Arab Emirates"]);
  const preferenceStorageKey = "streamlytv-explore-preferences-v1";
  const validCategoryIds = new Set(entertainment.map(group => group.id));
  const validSubpreferences = new Set(entertainment.flatMap(group => group.options.map(option => `${group.id}::${option}`)));
  const validAdvancedPreferences = new Set(Object.values(preferenceGroups).flatMap(group => group.values));
  const validCountryNames = new Set(allCountries.map(([, name]) => name));

  function readSavedPreferences() {
    try {
      const saved = JSON.parse(localStorage.getItem(preferenceStorageKey) || "{}");
      const subpreferences = Array.isArray(saved.subpreferences) ? saved.subpreferences.filter(value => validSubpreferences.has(value)) : [];
      const categories = Array.isArray(saved.categories) ? saved.categories.filter(value => validCategoryIds.has(value)) : [];
      subpreferences.forEach(value => categories.push(value.split("::")[0]));
      return {
        categories: new Set(categories),
        subpreferences: new Set(subpreferences),
        advanced: new Set(Array.isArray(saved.advanced) ? saved.advanced.filter(value => validAdvancedPreferences.has(value)) : []),
        countries: new Set(Array.isArray(saved.countries) ? saved.countries.filter(value => validCountryNames.has(value)) : []),
      };
    } catch {
      return { categories: new Set(), subpreferences: new Set(), advanced: new Set(), countries: new Set() };
    }
  }

  const savedPreferences = readSavedPreferences();
  const state = {
    plan: plans[0],
    categories: savedPreferences.categories,
    subpreferences: savedPreferences.subpreferences,
    advanced: savedPreferences.advanced,
    countries: savedPreferences.countries,
    step: 1,
    showAllCountries: false,
    countryQuery: "",
  };

  const builder = document.getElementById("package-builder");
  if (!builder) return;

  const categoryGrid = builder.querySelector("#preference-grid");
  const countryGrid = builder.querySelector("#country-grid");
  const countrySearch = builder.querySelector("#country-search");
  const asideSummary = builder.querySelector("#builder-summary-content");
  const mobileTotal = builder.querySelector("#builder-mobile-total");
  const mobileBar = builder.querySelector(".builder-mobile-bar");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      mobileBar.classList.toggle("is-visible", entry.isIntersecting);
      document.body.classList.toggle("package-builder-visible", entry.isIntersecting);
    }, { threshold: 0.01 }).observe(builder);
  }

  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const money = amount => `$${amount} AUD`;
  const planCost = () => state.plan?.price || 0;
  const countryCost = () => state.countries.size * 20;
  const totalCost = () => planCost() + countryCost();
  const selectedPreferenceLines = () => {
    const lines = entertainment.filter(group => state.categories.has(group.id)).map(group => {
      const selectedOptions = group.options.filter(option => state.subpreferences.has(`${group.id}::${option}`));
      return selectedOptions.length ? `${group.title} — ${selectedOptions.join(", ")}` : group.title;
    });
    const advanced = Object.values(preferenceGroups).flatMap(group => group.values.filter(value => state.advanced.has(value)));
    return [...lines, ...advanced];
  };

  const discoveryShelves = [
    { title: "Live Sports", cards: [
      { title: "Football / Soccer", image: "assets/genre-sports.png", category: "sports", option: "Football / Soccer" },
      { title: "UFC & Combat Sports", image: "assets/ufc-hero.png", category: "sports", option: "UFC / Combat Sports" },
      { title: "NRL & Rugby", image: "assets/genre-sports.png", category: "sports", option: "NRL & Rugby" },
      { title: "Cricket", image: "assets/genre-sports.png", category: "sports", option: "Cricket" },
      { title: "Tennis", image: "assets/genre-sports.png", category: "sports", option: "Tennis" },
      { title: "Live PPV Events", image: "assets/ufc-hero.png", category: "sports", option: "Live PPV Events" },
      { title: "Champions League", image: "assets/genre-sports.png", category: "sports", option: "Champions League" },
      { title: "beIN Sports", image: "assets/genre-world.png", category: "sports", option: "beIN Sports" },
    ] },
    { title: "Movies & Series", cards: [
      { title: "Latest Movies", image: "assets/genre-films.png", category: "movies", option: "Latest Movies" },
      { title: "Popular Series", image: "assets/genre-films.png", category: "movies", option: "Popular Series" },
      { title: "New Releases", image: "assets/genre-films.png", category: "movies", option: "New Releases" },
      { title: "4K & UHD", image: "assets/genre-films.png", category: "movies", option: "4K Movies" },
      { title: "Dolby Audio", image: "assets/genre-films.png", category: "movies", option: "Dolby Audio" },
      { title: "Cinema Releases", image: "assets/genre-films.png", category: "movies", option: "Cinema Releases" },
      { title: "Box Office", image: "assets/genre-films.png", category: "movies", option: "Box Office" },
      { title: "International Movies", image: "assets/genre-world.png", category: "movies", option: "International Movies" },
    ] },
    { title: "Kids & Family", cards: [
      { title: "Kids Channels", image: "assets/genre-family.png", category: "family", option: "Kids Channels" },
      { title: "Kids Movies", image: "assets/genre-family.png", category: "family", option: "Kids Movies" },
      { title: "Cartoons", image: "assets/genre-family.png", category: "family", option: "Cartoons" },
      { title: "Family Entertainment", image: "assets/genre-family.png", category: "family", option: "Family Entertainment" },
      { title: "Kids Series", image: "assets/genre-family.png", category: "family", option: "Kids Series" },
      { title: "Anime for Kids", image: "assets/genre-family.png", category: "family", option: "Anime for Kids" },
    ] },
    { title: "Arabic Entertainment", cards: [
      { title: "Arabic Movies", image: "assets/genre-arabic.png", category: "arabic", option: "Arabic Movies" },
      { title: "Arabic Series", image: "assets/genre-arabic.png", category: "arabic", option: "Arabic Series" },
      { title: "MBC", image: "assets/genre-arabic.png", category: "arabic", option: "MBC" },
      { title: "Rotana & ART", image: "assets/genre-arabic.png", category: "arabic", option: "Rotana & ART" },
      { title: "Arabic Drama", image: "assets/genre-arabic.png", category: "arabic", option: "Arabic Drama" },
      { title: "Arabic Comedy", image: "assets/genre-arabic.png", category: "arabic", option: "Arabic Comedy" },
      { title: "Arabic Cinema", image: "assets/genre-arabic.png", category: "arabic", option: "Arabic Cinema" },
      { title: "Ramadan Content", image: "assets/genre-arabic.png", category: "arabic", option: "Ramadan Content" },
    ] },
    { title: "International", cards: [
      { title: "Australia", image: "assets/genre-world.png", country: "Australia", badge: "Included" },
      { title: "United Kingdom", image: "assets/genre-world.png", country: "United Kingdom", badge: "Included" },
      { title: "USA", image: "assets/genre-world.png", country: "USA", badge: "Included" },
      { title: "New Zealand", image: "assets/genre-world.png", country: "New Zealand", badge: "Optional Add-On" },
      { title: "Canada", image: "assets/genre-world.png", country: "Canada", badge: "Optional Add-On" },
      { title: "Europe", image: "assets/genre-world.png", country: "Europe", badge: "Optional Add-On" },
      { title: "Asia", image: "assets/genre-world.png", country: "Asia", badge: "Optional Add-On" },
      { title: "Middle East", image: "assets/genre-arabic.png", country: "Middle East", badge: "Optional Add-On" },
    ] },
    { title: "4K & Premium Quality", cards: [
      { title: "4K UHD", image: "assets/genre-films.png", advanced: "4K / UHD" },
      { title: "Dolby Audio", image: "assets/genre-films.png", advanced: "Dolby Audio" },
      { title: "Dolby Vision", image: "assets/genre-films.png", advanced: "Dolby Vision" },
      { title: "Multi-Subtitle", image: "assets/genre-world.png", advanced: "Multi-Subtitles" },
      { title: "Premium Sports Quality", image: "assets/genre-sports.png", advanced: "Premium Sports Quality" },
    ] },
    { title: "More to Explore", cards: [
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
  const discoveryCards = discoveryShelves.flatMap(shelf => shelf.cards);
  const discoveryRows = document.getElementById("discovery-rows");
  const discoveryStatus = document.getElementById("discovery-status");
  let discoveryFeedbackTimer;

  function isDiscoveryCardSelected(card) {
    if (card.advanced) return state.advanced.has(card.advanced);
    if (card.category && card.option) return state.subpreferences.has(`${card.category}::${card.option}`);
    return false;
  }

  function updateDiscoveryCardStates() {
    if (!discoveryRows) return;
    discoveryRows.querySelectorAll("[data-discovery-card]").forEach(button => {
      const card = discoveryCards[Number(button.dataset.discoveryCard)];
      if (!card || card.country) return;
      const selected = isDiscoveryCardSelected(card);
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
      button.querySelector(".shelf-card-action").textContent = selected ? "Remove Preference" : "Add to Preferences";
      button.setAttribute("aria-label", `${card.title}: ${selected ? "Remove Preference" : "Add to Preferences"}`);
      button.querySelector(".shelf-card-check").textContent = selected ? "✓" : "";
    });
  }

  function showDiscoveryFeedback(message) {
    if (!discoveryStatus) return;
    discoveryStatus.textContent = message;
    window.clearTimeout(discoveryFeedbackTimer);
    discoveryFeedbackTimer = window.setTimeout(() => { discoveryStatus.textContent = ""; }, 2800);
  }

  function renderDiscoveryRows() {
    if (!discoveryRows) return;
    let cardIndex = 0;
    discoveryRows.innerHTML = discoveryShelves.map((shelf, shelfIndex) => `
      <section class="shelf" aria-labelledby="discovery-row-${shelfIndex}">
        <div class="shelf-heading"><h3 id="discovery-row-${shelfIndex}">${escapeHtml(shelf.title)}</h3></div>
        <div class="shelf-track" role="group" aria-label="${escapeHtml(shelf.title)} choices" tabindex="0">
          ${shelf.cards.map(card => {
            const index = cardIndex++;
            const selected = isDiscoveryCardSelected(card);
            const country = Boolean(card.country);
            const action = country ? "Explore Country Options" : selected ? "Remove Preference" : "Add to Preferences";
            const badge = card.badge ? `<span class="shelf-card-badge${card.badge === "Included" ? " is-included" : ""}">${escapeHtml(card.badge)}</span>` : "";
            return `<button class="shelf-card${selected ? " is-selected" : ""}" type="button" style="--shelf-image:url('${card.image}')" data-discovery-card="${index}"${country ? "" : ` aria-pressed="${selected}"`} aria-label="${escapeHtml(`${card.title}: ${action}`)}">
              ${badge}<span class="shelf-card-content"><span class="shelf-card-title">${escapeHtml(card.title)}</span><span class="shelf-card-action">${action}</span></span><span class="shelf-card-check" aria-hidden="true">${selected ? "✓" : ""}</span>
            </button>`;
          }).join("")}
        </div>
      </section>`).join("");
    updateDiscoveryCardStates();
  }

  function openCountrySelector(country) {
    const includedNames = includedCountries.map(name => name.replace(/^\S+\s/, ""));
    const isIncluded = includedNames.includes(country);
    const hasCountry = allCountries.some(([, name]) => name === country);
    state.countryQuery = hasCountry ? country : "";
    state.showAllCountries = !hasCountry;
    countrySearch.value = state.countryQuery;
    renderCountries();
    setStep(3);
    window.requestAnimationFrame(() => {
      const destination = builder.querySelector(isIncluded ? ".country-included" : ".country-controls");
      destination?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (!isIncluded) countrySearch.focus({ preventScroll: true });
    });
    showDiscoveryFeedback(isIncluded ? `${country} is included with every package.` : hasCountry ? `Choose ${country} in the country selector to add it for $20 AUD.` : "Choose a country in the selector to add it for $20 AUD.");
  }

  function selectDiscoveryTrial() {
    state.plan = plans.find(plan => plan.months === 1);
    renderPlanCards();
    setStep(4);
    window.requestAnimationFrame(() => builder.querySelector("[data-builder-step='4']")?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }

  function renderPlanCards() {
    const grid = builder.querySelector("#builder-plan-grid");
    grid.innerHTML = plans.map(plan => `
      <button class="builder-plan${state.plan.months === plan.months ? " is-selected" : ""}" type="button" data-plan="${plan.months}" aria-pressed="${state.plan.months === plan.months}">
        ${plan.months === 6 ? '<span class="builder-plan-badge">Most Popular</span>' : ""}
        <span class="builder-plan-check" aria-hidden="true">✓</span>
        <span class="builder-plan-name">${plan.label}</span>
        <span class="builder-plan-price">${money(plan.price)}</span>
      </button>`).join("");
    grid.querySelectorAll("[data-plan]").forEach(button => button.addEventListener("click", () => {
      state.plan = plans.find(plan => plan.months === Number(button.dataset.plan));
      renderPlanCards();
      renderSummary();
    }));
  }

  function renderPreferences() {
    categoryGrid.innerHTML = entertainment.map(group => `
      <article class="preference-card${state.categories.has(group.id) ? " is-selected" : ""}" style="--category-image:url('${group.image}')">
        <button class="preference-select" type="button" data-category="${group.id}" aria-pressed="${state.categories.has(group.id)}">
          <span class="preference-icon" aria-hidden="true">${group.icon}</span>
          <span class="preference-copy"><strong>${group.title}</strong><small>${group.description}</small></span>
          <span class="preference-check" aria-hidden="true">✓</span>
        </button>
        <details class="preference-details">
          <summary>Choose specific favourites</summary>
          <div class="preference-options">${group.options.map(option => `<label class="check-option"><input type="checkbox" data-subcategory="${group.id}" value="${escapeHtml(option)}"${state.subpreferences.has(`${group.id}::${option}`) ? " checked" : ""}><span>${escapeHtml(option)}</span></label>`).join("")}</div>
        </details>
      </article>`).join("");

    categoryGrid.querySelectorAll("[data-category]").forEach(button => button.addEventListener("click", () => {
      const id = button.dataset.category;
      if (state.categories.has(id)) {
        state.categories.delete(id);
        entertainment.find(group => group.id === id).options.forEach(option => state.subpreferences.delete(`${id}::${option}`));
      } else {
        state.categories.add(id);
      }
      renderPreferences();
      renderSummary();
    }));
    categoryGrid.querySelectorAll("[data-subcategory]").forEach(input => input.addEventListener("change", () => {
      const key = `${input.dataset.subcategory}::${input.value}`;
      if (input.checked) state.subpreferences.add(key);
      else state.subpreferences.delete(key);
      if (input.checked) state.categories.add(input.dataset.subcategory);
      renderPreferences();
      const detail = categoryGrid.querySelector(`[data-category="${input.dataset.subcategory}"]`)?.closest(".preference-card")?.querySelector("details");
      if (detail) detail.open = true;
      renderSummary();
    }));
    updateDiscoveryCardStates();
  }

  function renderAdvanced() {
    builder.querySelectorAll("[data-advanced]").forEach(group => {
      const config = preferenceGroups[group.dataset.advanced];
      group.innerHTML = `<h4>${config.title}</h4><div class="advanced-options">${config.values.map(value => `<label class="check-option"><input type="checkbox" value="${escapeHtml(value)}"${state.advanced.has(value) ? " checked" : ""}><span>${escapeHtml(value)}</span></label>`).join("")}</div>`;
      group.querySelectorAll("input").forEach(input => input.addEventListener("change", () => {
        if (input.checked) state.advanced.add(input.value);
        else state.advanced.delete(input.value);
        renderSummary();
        updateDiscoveryCardStates();
      }));
    });
  }

  function renderCountries() {
    const query = state.countryQuery.trim().toLocaleLowerCase();
    const visible = allCountries.filter(country => {
      if (query) return country[1].toLocaleLowerCase().includes(query);
      return state.showAllCountries || popularCountryNames.has(country[1]);
    });
    countryGrid.innerHTML = visible.length ? visible.map(([flag, name]) => `
      <button type="button" class="country-option${state.countries.has(name) ? " is-selected" : ""}" data-country="${escapeHtml(name)}" aria-pressed="${state.countries.has(name)}">
        <span class="country-flag" aria-hidden="true">${flag}</span><span class="country-name">${escapeHtml(name)}</span><span class="country-cost">+$20</span><span class="country-check" aria-hidden="true">✓</span>
      </button>`).join("") : '<p class="country-empty">No matching countries. Try another search.</p>';
    countryGrid.querySelectorAll("[data-country]").forEach(button => button.addEventListener("click", () => {
      const country = button.dataset.country;
      if (state.countries.has(country)) state.countries.delete(country);
      else state.countries.add(country);
      renderCountries();
      renderSummary();
    }));
    const viewAll = builder.querySelector("#view-all-countries");
    viewAll.hidden = Boolean(query);
    viewAll.textContent = state.showAllCountries ? "Show Popular Countries" : "View All Countries";
  }

  function summaryRows() {
    const preferences = selectedPreferenceLines();
    const countries = [...state.countries];
    return `
      <div class="summary-plan"><span>${state.plan.label} Plan</span><strong>${money(planCost())}</strong></div>
      <div class="summary-block"><h4>Included at no extra cost</h4><ul>${includedCountries.map(country => `<li>${country}</li>`).join("")}</ul></div>
      <div class="summary-block"><h4>Additional countries <span>${money(countryCost())}</span></h4>${countries.length ? `<ul>${countries.map(country => `<li>${escapeHtml(country)} <span>+$20</span></li>`).join("")}</ul>` : '<p class="summary-empty">No additional countries selected</p>'}</div>
      <div class="summary-block"><h4>Entertainment</h4>${preferences.length ? `<ul>${preferences.map(preference => `<li>${escapeHtml(preference)}</li>`).join("")}</ul>` : '<p class="summary-empty">Choose your favourites to personalise your selection</p>'}</div>
      <div class="summary-total"><span>Total</span><strong>${money(totalCost())}</strong><small>One-time package</small></div>`;
  }

  function renderSummary() {
    try {
      localStorage.setItem(preferenceStorageKey, JSON.stringify({
        categories: [...state.categories],
        subpreferences: [...state.subpreferences],
        advanced: [...state.advanced],
        countries: [...state.countries],
      }));
    } catch {}
    const rows = summaryRows();
    asideSummary.innerHTML = rows;
    mobileTotal.textContent = money(totalCost());
    builder.querySelectorAll("[data-current-total]").forEach(node => { node.textContent = money(totalCost()); });
    updateTrialLinks();
    const actionLabel = state.step === 4 ? "Order via WhatsApp" : `Continue — $${totalCost()}`;
    builder.querySelectorAll("[data-builder-action]").forEach(button => { button.textContent = actionLabel; });
    const mobileAction = builder.querySelector("#builder-mobile-action");
    if (mobileAction) mobileAction.setAttribute("aria-label", actionLabel);
    renderReview();
  }

  function renderReview() {
    const review = builder.querySelector("#builder-review");
    if (!review) return;
    review.innerHTML = summaryRows();
  }

  function setStep(step) {
    state.step = Math.max(1, Math.min(4, step));
    builder.querySelectorAll("[data-builder-step]").forEach(panel => { panel.hidden = Number(panel.dataset.builderStep) !== state.step; });
    builder.querySelectorAll("[data-step-indicator]").forEach(indicator => {
      const itemStep = Number(indicator.dataset.stepIndicator);
      indicator.classList.toggle("is-active", itemStep === state.step);
      indicator.classList.toggle("is-complete", itemStep < state.step);
      indicator.setAttribute("aria-current", itemStep === state.step ? "step" : "false");
    });
    builder.querySelectorAll("[data-step-prev]").forEach(button => { button.hidden = state.step === 1; });
    renderSummary();
    builder.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function orderMessage(isTrial = false) {
    const preferences = selectedPreferenceLines();
    if (isTrial) {
      return ["Hi StreamlyTV, I'd like to request a 24-hour free trial.", "", "My preferred content:", ...(preferences.length ? preferences.map(value => `• ${value}`) : ["• I'll choose my preferences later"]), "", "Please help me get started."].join("\n");
    }
    const optionalCountries = [...state.countries];
    return [
      "Hi StreamlyTV, I'd like to place an order.", "",
      "PLAN:", `${state.plan.label} — ${money(planCost())}`, "",
      "ENTERTAINMENT PREFERENCES:", ...(preferences.length ? preferences.map(value => `• ${value}`) : ["• No specific preferences selected"]), "",
      "INCLUDED COUNTRIES:", ...includedCountries.map(country => `• ${country.replace(/^\S+\s/, "")}`), "",
      "ADDITIONAL COUNTRIES:", ...(optionalCountries.length ? optionalCountries.map(country => `• ${country} — $20`) : ["• None"]), "",
      "COUNTRY ADD-ONS:", `${money(countryCost())}`, "",
      "TOTAL:", money(totalCost()), "",
      "Please help me set up my StreamlyTV account."
    ].join("\n");
  }

  function whatsappUrl(message) {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function updateTrialLinks() {
    builder.querySelectorAll("[data-trial-link]").forEach(link => { link.href = whatsappUrl(orderMessage(true)); });
  }

  function goToWhatsApp(message) {
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  renderPlanCards();
  renderPreferences();
  renderAdvanced();
  renderCountries();
  renderDiscoveryRows();
  renderSummary();

  if (discoveryRows) discoveryRows.addEventListener("click", event => {
    const button = event.target.closest("[data-discovery-card]");
    if (!button) return;
    const card = discoveryCards[Number(button.dataset.discoveryCard)];
    if (!card) return;
    if (card.country) {
      openCountrySelector(card.country);
      return;
    }
    if (card.advanced) {
      const selected = state.advanced.has(card.advanced);
      if (selected) state.advanced.delete(card.advanced);
      else state.advanced.add(card.advanced);
      renderAdvanced();
      builder.querySelector(".advanced-details").open = true;
      setStep(2);
      updateDiscoveryCardStates();
      showDiscoveryFeedback(selected ? "Removed from your preferences." : "Added to your preferences.");
      return;
    }
    const key = `${card.category}::${card.option}`;
    const selected = state.subpreferences.has(key);
    if (selected) state.subpreferences.delete(key);
    else {
      state.categories.add(card.category);
      state.subpreferences.add(key);
    }
    renderPreferences();
    if (!selected) categoryGrid.querySelector(`[data-category="${card.category}"]`)?.closest(".preference-card")?.querySelector("details")?.setAttribute("open", "");
    renderSummary();
    showDiscoveryFeedback(selected ? "Removed from your preferences." : "Added to your preferences.");
  });

  document.querySelector("[data-discovery-build]")?.addEventListener("click", () => builder.scrollIntoView({ behavior: "smooth", block: "start" }));
  document.querySelector("[data-discovery-trial]")?.addEventListener("click", selectDiscoveryTrial);

  countrySearch.addEventListener("input", () => {
    state.countryQuery = countrySearch.value;
    renderCountries();
  });
  builder.querySelector("#view-all-countries").addEventListener("click", () => {
    state.showAllCountries = !state.showAllCountries;
    renderCountries();
  });
  builder.querySelector("#select-all-preferences").addEventListener("click", () => {
    entertainment.forEach(group => {
      state.categories.add(group.id);
      group.options.forEach(option => state.subpreferences.add(`${group.id}::${option}`));
    });
    renderPreferences();
    renderSummary();
  });
  builder.querySelector("#clear-preferences").addEventListener("click", () => {
    state.categories.clear();
    state.subpreferences.clear();
    state.advanced.clear();
    renderPreferences();
    renderAdvanced();
    renderSummary();
  });
  builder.querySelectorAll("[data-step-next]").forEach(button => button.addEventListener("click", () => setStep(state.step + 1)));
  builder.querySelectorAll("[data-step-prev]").forEach(button => button.addEventListener("click", () => setStep(state.step - 1)));
  builder.querySelectorAll("[data-builder-action]").forEach(button => button.addEventListener("click", () => {
    if (state.step < 4) setStep(state.step + 1);
    else goToWhatsApp(orderMessage());
  }));
  builder.querySelectorAll("[data-trial-link]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      goToWhatsApp(orderMessage(true));
    });
  });

  window.requestStreamlyTrial = () => goToWhatsApp(orderMessage(true));
  window.StreamlyTVPackageBuilder = {
    getSelections: () => ({
      plan: state.plan,
      categories: selectedPreferenceLines(),
      includedCountries: [...includedCountries],
      additionalCountries: [...state.countries],
      countryAddonTotal: countryCost(),
      total: totalCost(),
    }),
    createOrderMessage: () => orderMessage(),
  };
})();
