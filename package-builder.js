(() => {
  const whatsappNumber = "61410350514";
  const plans = [
    { months: 3, label: "3 Months", price: 80 },
    { months: 6, label: "6 Months", price: 140 },
    { months: 12, label: "12 Months", price: 250 },
  ];

  const entertainment = [
    { id: "sports", title: "Sports & Live Events", icon: "⚽", image: "assets/genre-sports.png", description: "Follow the matches, fights and events you love.", options: ["Football / Soccer", "Live Sports", "Champions League", "beIN Sports", "Football PPV", "Cricket", "Tennis", "Horse Racing", "UFC / Combat Sports", "Sports Replays"] },
    { id: "movies", title: "Movies & Series", icon: "🎬", image: "assets/genre-films.png", description: "Big-screen stories, new releases and series.", options: ["Latest Movies", "Popular Series", "New Releases", "Cinema Releases", "Blu-ray Movies", "Box Office", "4K Movies", "Dolby Audio", "International Movies"] },
    { id: "premium", title: "Premium Entertainment", icon: "✨", image: "assets/genre-films.png", description: "Popular international movies, series and on-demand entertainment.", options: ["Popular streaming-style movies and series", "Major international entertainment", "Exclusive series", "On-demand entertainment"] },
    { id: "family", title: "Kids & Family", icon: "👨‍👩‍👧‍👦", image: "assets/genre-family.png", description: "Family favourites for every age.", options: ["Kids Channels", "Kids Movies", "Cartoons", "Family Movies", "Nickelodeon-style content", "Kids Series"] },
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
    quality: { title: "Video quality", values: ["4K / UHD", "Dolby Audio", "Dolby Vision", "Multi-Subtitles"] },
    language: { title: "Language & region", values: ["English", "Arabic", "Turkish", "French", "German", "Italian", "Spanish", "Portuguese", "Indian", "Asian", "Nordic", "Latino", "Other International"] },
    dialect: { title: "Arabic content", values: ["Egyptian", "Syrian / Lebanese", "Gulf", "Iraqi", "Moroccan", "Tunisian", "Algerian / Libyan", "Yemeni", "Jordanian / Palestinian", "Bedouin", "Ramadan", "Arabic Kids"] },
  };

  const includedCountries = ["🇦🇺 Australia", "🇬🇧 United Kingdom", "🇺🇸 USA"];
  const allCountries = [
    ["🇳🇿", "New Zealand"], ["🇨🇦", "Canada"], ["🇱🇧", "Lebanon"], ["🇩🇪", "Germany"], ["🇦🇹", "Austria"], ["🇳🇱", "Netherlands"], ["🇧🇪", "Belgium"], ["🇮🇹", "Italy"], ["🇫🇷", "France"], ["🇪🇸", "Spain"], ["🇵🇹", "Portugal"], ["🇨🇭", "Switzerland"], ["🇵🇱", "Poland"], ["🇬🇷", "Greece"], ["🇨🇾", "Cyprus"], ["🇱🇻", "Latvia"], ["🇸🇪", "Sweden"], ["🇩🇰", "Denmark"], ["🇳🇴", "Norway"], ["🇫🇮", "Finland"], ["🇮🇸", "Iceland"], ["🇭🇺", "Hungary"], ["🇷🇴", "Romania"], ["🇦🇱", "Albania"], ["🇽🇰", "Kosovo"], ["🇷🇺", "Russia"], ["🇺🇦", "Ukraine"], ["🇲🇹", "Malta"], ["🇨🇿", "Czech Republic"], ["🇷🇸", "Serbia"], ["🇧🇦", "Bosnia"], ["🇭🇷", "Croatia"], ["🇲🇰", "Macedonia"], ["🇸🇮", "Slovenia"], ["🇲🇪", "Montenegro"], ["🇧🇬", "Bulgaria"], ["🇪🇪", "Estonia"], ["🇹🇷", "Turkey"], ["🌐", "Kurdish Region"], ["🇮🇷", "Iran"], ["🇦🇫", "Afghanistan"], ["🇵🇰", "Pakistan"], ["🇮🇳", "India"], ["🇸🇬", "Singapore"], ["🇧🇷", "Brazil"], ["🇸🇷", "Suriname"], ["🇲🇽", "Mexico"], ["🇦🇷", "Argentina"], ["🌎", "Latin America"], ["🏝️", "Caribbean"], ["🇯🇵", "Japan"], ["🇹🇼", "Taiwan"], ["🇵🇭", "Philippines"], ["🇬🇪", "Georgia"], ["🇦🇿", "Azerbaijan"], ["🇺🇿", "Uzbekistan"], ["🇦🇲", "Armenia"], ["🇻🇪", "Venezuela"], ["🇭🇰", "Hong Kong"], ["🇨🇳", "China"], ["🇻🇳", "Vietnam"], ["🇲🇾", "Malaysia"], ["🇮🇩", "Indonesia"], ["🇰🇷", "South Korea"], ["🇹🇭", "Thailand"], ["🇰🇿", "Kazakhstan"], ["🇱🇹", "Lithuania"], ["🌍", "Africa"], ["🇸🇾", "Syria"], ["🇲🇦", "Morocco"], ["🇪🇬", "Egypt"], ["🇦🇪", "United Arab Emirates"], ["🇮🇶", "Iraq"], ["🇸🇦", "Saudi Arabia"], ["🇰🇼", "Kuwait"], ["🇶🇦", "Qatar"], ["🇴🇲", "Oman"], ["🇧🇭", "Bahrain"], ["🇯🇴", "Jordan"], ["🇵🇸", "Palestine"], ["🇹🇳", "Tunisia"], ["🇩🇿", "Algeria"], ["🇾🇪", "Yemen"], ["🇱🇾", "Libya"], ["🇸🇩", "Sudan"],
  ].filter((country, index, list) => list.findIndex(item => item[1] === country[1]) === index);
  const popularCountryNames = new Set(["New Zealand", "Canada", "Lebanon", "Germany", "France", "India", "Turkey", "Italy", "Spain", "United Arab Emirates"]);

  const state = {
    plan: plans[0],
    categories: new Set(),
    subpreferences: new Set(),
    advanced: new Set(),
    countries: new Set(),
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
  }

  function renderAdvanced() {
    builder.querySelectorAll("[data-advanced]").forEach(group => {
      const config = preferenceGroups[group.dataset.advanced];
      group.innerHTML = `<h4>${config.title}</h4><div class="advanced-options">${config.values.map(value => `<label class="check-option"><input type="checkbox" value="${escapeHtml(value)}"${state.advanced.has(value) ? " checked" : ""}><span>${escapeHtml(value)}</span></label>`).join("")}</div>`;
      group.querySelectorAll("input").forEach(input => input.addEventListener("change", () => {
        if (input.checked) state.advanced.add(input.value);
        else state.advanced.delete(input.value);
        renderSummary();
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
  renderSummary();

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
