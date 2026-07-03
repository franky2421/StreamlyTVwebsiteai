import OpenAI from "openai";

const PLANS = {
  three: "https://buy.stripe.com/14AeV6fFJ72g8CLcbz1Fe02",
  six: "https://buy.stripe.com/4gMdR2fFJdqEaKTcbz1Fe05",
  twelve: "https://buy.stripe.com/cNi00c3X11HW9GPb7v1Fe04"
};

const BUSINESS = `
You are StreamlyTV AI, a friendly Australian sales and support assistant for StreamlyTV.

BUSINESS DETAILS
- Brand: StreamlyTV
- Support WhatsApp: 0410 350 514
- WhatsApp international link: https://wa.me/61410350514
- Email: iptvstreamly@gmail.com
- Currency: AUD

PLANS AND PAYMENT LINKS
- 3 Months: $60 AUD — ${PLANS.three}
- 6 Months: $100 AUD, best value / most popular — ${PLANS.six}
- 12 Months: $180 AUD, best long-term option — ${PLANS.twelve}

SERVICE HIGHLIGHTS
- 50,000+ live TV channels
- 100,000+ movies and TV series
- HD, FHD and 4K where available
- Live sports, UFC, PPV, football, boxing, AFL, NRL, cricket, NBA, NFL, Formula 1
- Movies, series, kids, news, documentaries, entertainment and international channels
- Works on Firestick, Android TV boxes, Android phones/tablets, iPhone, iPad, Smart TVs, Chromecast, Windows and Mac

SALES RULES
- Keep replies short, friendly and confident.
- Recommend 6 Months for most customers because it is the best value.
- Recommend 12 Months if they want the best long-term option.
- Include the correct payment link when asked how to pay, buy, subscribe, order or purchase.
- After payment, tell the customer to message WhatsApp with proof/payment confirmation and device type so setup/activation can be completed.
- If asked for login details, activation, username, password or account details, say this is handled securely by WhatsApp support after payment.
- Do not promise instant activation unless confirmed manually by the business owner.

SETUP GUIDANCE
- Firestick: install Downloader, enable Install Unknown Apps for Downloader, then support provides the app/code/link after payment.
- Android TV/Box/Phone: install the recommended IPTV player/app provided by support, then enter login details after activation.
- iPhone/iPad/Apple TV: use an IPTV player recommended by support; login details supplied after activation.
- Samsung/LG Smart TV: install a compatible IPTV player from the TV app store where available; send device type to WhatsApp for the right instructions.
- Windows/Mac: use a compatible IPTV player or web/app method provided by support.

TROUBLESHOOTING
- Buffering: check internet speed, restart modem/router, restart device/app, try wired or 5GHz Wi-Fi, close background apps.
- Channels not loading: restart app, check internet, confirm subscription is active, contact WhatsApp if still not working.

SAFETY
- If asked about legality/licensing/content rights, say customers should only use StreamlyTV in accordance with local laws and applicable terms. For more information, contact support on WhatsApp.
- Do not provide illegal instructions, hacking, credential sharing, piracy instructions, or ways to bypass subscriptions.

LANGUAGE
- Default to English. If the customer writes Arabic, reply in simple Arabic.
`;

const reply = (text, actions = []) => ({ reply: text, actions });

function localAnswer(text = "") {
  const q = text.toLowerCase();
  if (/\b(3 month|3 months|three month|three months|60)\b/.test(q)) {
    return reply(`The 3-month StreamlyTV plan is $60 AUD. It includes 50,000+ live channels, 100,000+ movies and series, sports, PPV, and HD/FHD/4K where available.\n\nSecure payment link:\n${PLANS.three}\n\nAfter payment, message WhatsApp 0410 350 514 with your device type for activation and setup.`, [{ label: "Buy 3 Months", url: PLANS.three }, { label: "WhatsApp Support", url: "https://wa.me/61410350514" }]);
  }
  if (/\b(6 month|6 months|six month|six months|100)\b/.test(q)) {
    return reply(`The 6-month StreamlyTV plan is $100 AUD ⭐ Most popular and best value.\n\nSecure payment link:\n${PLANS.six}\n\nAfter payment, message WhatsApp 0410 350 514 with your device type for activation and setup.`, [{ label: "Buy 6 Months", url: PLANS.six }, { label: "WhatsApp Support", url: "https://wa.me/61410350514" }]);
  }
  if (/\b(12 month|12 months|year|yearly|annual|180)\b/.test(q)) {
    return reply(`The 12-month StreamlyTV plan is $180 AUD and is the best long-term option.\n\nSecure payment link:\n${PLANS.twelve}\n\nAfter payment, message WhatsApp 0410 350 514 with your device type for activation and setup.`, [{ label: "Buy 12 Months", url: PLANS.twelve }, { label: "WhatsApp Support", url: "https://wa.me/61410350514" }]);
  }
  if (/\b(price|prices|plan|plans|cost|how much)\b/.test(q)) {
    return reply(`StreamlyTV plans:\n• 3 Months – $60 AUD\n• 6 Months – $100 AUD ⭐ Most popular\n• 12 Months – $180 AUD\n\nChoose a plan below or message WhatsApp 0410 350 514 for help.`, [{ label: "Buy 3 Months", url: PLANS.three }, { label: "Buy 6 Months", url: PLANS.six }, { label: "Buy 12 Months", url: PLANS.twelve }]);
  }
  if (/\b(pay|payment|buy|subscribe|order|purchase)\b/.test(q)) {
    return reply(`You can pay securely with Stripe. Choose your plan:\n\n3 Months – $60\n6 Months – $100 ⭐ Most popular\n12 Months – $180\n\nAfter payment, message WhatsApp 0410 350 514 with your payment confirmation and device type.`, [{ label: "Buy 3 Months", url: PLANS.three }, { label: "Buy 6 Months", url: PLANS.six }, { label: "Buy 12 Months", url: PLANS.twelve }]);
  }
  if (/\b(firestick|fire stick|downloader)\b/.test(q)) {
    return reply(`Firestick setup:\n1. Install the Downloader app.\n2. Go to Settings and allow Install Unknown Apps for Downloader.\n3. After payment, message WhatsApp with your device type.\n4. Support will provide the correct app/code/link and activation details.`, [{ label: "Choose a Plan", url: "#plans" }, { label: "WhatsApp Setup", url: "https://wa.me/61410350514" }]);
  }
  if (/\b(ufc|ppv|sports|football|epl|nrl|afl|boxing|cricket|nba|formula|f1)\b/.test(q)) {
    return reply(`Yes, StreamlyTV includes live sports and PPV where available, including UFC, boxing, football, EPL, AFL, NRL, cricket, NBA, NFL and Formula 1.\n\nFor most sports fans, the 6-month plan for $100 is the best value.`, [{ label: "Buy 6 Months", url: PLANS.six }, { label: "Ask on WhatsApp", url: "https://wa.me/61410350514" }]);
  }
  if (/\b(buffer|buffering|lag|freezing|not working|channel not loading)\b/.test(q)) {
    return reply(`Try these quick fixes:\n1. Restart your modem/router.\n2. Restart the app and device.\n3. Use 5GHz Wi-Fi or Ethernet if possible.\n4. Close background apps.\n5. Check your internet speed.\n\nIf it still happens, message WhatsApp 0410 350 514 with your device type and issue.`, [{ label: "WhatsApp Help", url: "https://wa.me/61410350514" }]);
  }
  if (/\b(whatsapp|contact|support|phone|number)\b/.test(q)) {
    return reply(`You can contact StreamlyTV support on WhatsApp: 0410 350 514\n\nInternational link: https://wa.me/61410350514`, [{ label: "Open WhatsApp", url: "https://wa.me/61410350514" }]);
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) return res.status(400).json({ error: "Missing messages array." });
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content || "";
    const instant = localAnswer(lastUser);
    if (instant) return res.status(200).json({ ...instant, source: "local" });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "OPENAI_API_KEY is missing in Vercel Environment Variables." });

    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.35,
      max_tokens: 420,
      messages: [{ role: "system", content: BUSINESS }, ...messages.slice(-10)]
    });
    const text = completion.choices?.[0]?.message?.content || "Sorry, please contact WhatsApp support on 0410 350 514.";
    return res.status(200).json({ reply: text, actions: [{ label: "WhatsApp Support", url: "https://wa.me/61410350514" }], source: "openai" });
  } catch (error) {
    console.error(error);
    const message = String(error?.message || error);
    if (message.includes("429") || message.toLowerCase().includes("quota")) return res.status(500).json({ error: "OpenAI quota/credit issue. Please check billing credits in the OpenAI Platform." });
    return res.status(500).json({ error: "AI error. Please check Vercel logs, API key, billing credits, then redeploy." });
  }
}
