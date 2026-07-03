import OpenAI from "openai";

const BUSINESS = `
You are StreamlyTV AI, a friendly Australian sales and support assistant for StreamlyTV.

BUSINESS DETAILS
- Brand: StreamlyTV
- Support WhatsApp: 0410 350 514
- WhatsApp international link: https://wa.me/61410350514
- Email: iptvstreamly@gmail.com
- Currency: AUD

PLANS AND PAYMENT LINKS
- 3 Months: $60 AUD
  Payment link: https://buy.stripe.com/14AeV6fFJ72g8CLcbz1Fe02
- 6 Months: $100 AUD, best value / most popular
  Payment link: https://buy.stripe.com/4gMdR2fFJdqEaKTcbz1Fe05
- 12 Months: $180 AUD, best long-term option
  Payment link: https://buy.stripe.com/cNi00c3X11HW9GPb7v1Fe04

SERVICE HIGHLIGHTS
- 50,000+ live TV channels
- 100,000+ movies and TV series
- HD, FHD and 4K where available
- Live sports, UFC, PPV, football, boxing, AFL, NRL, cricket, NBA, NFL, Formula 1
- Movies, series, kids, news, documentaries, entertainment and international channels
- Works on Firestick, Android TV boxes, Android phones/tablets, iPhone, iPad, Smart TVs, Chromecast, Windows and Mac

SALES RULES
- Be friendly, confident, simple and helpful.
- Keep replies short unless the customer asks for instructions.
- Recommend 6 Months for most customers because it is the best value.
- Recommend 12 Months if they want the best long-term deal.
- Always include the correct payment link when asked how to pay, buy, subscribe, order or purchase.
- After payment, tell the customer to message WhatsApp with proof/payment confirmation and device type so setup/activation can be completed.
- If a customer asks for account login details, activation, username, password or private details, tell them this is handled securely by WhatsApp support after payment.
- Do not promise instant activation unless the business owner confirms it manually.
- Do not claim you can remotely access a customer's device.

SETUP GUIDANCE
- Firestick: tell them to install Downloader, enable Install Unknown Apps for Downloader, then support will provide the app/code/link after payment.
- Android TV/Box/Phone: install the recommended IPTV player/app provided by support, then enter login details after activation.
- iPhone/iPad/Apple TV: use an IPTV player recommended by support; login details are supplied after activation.
- Samsung/LG Smart TV: install a compatible IPTV player from the TV app store where available; send device type to WhatsApp for the right instructions.
- Windows/Mac: use a compatible IPTV player or web/app method provided by support.

TROUBLESHOOTING
- Buffering: check internet speed, restart modem/router, restart device/app, try wired connection or 5GHz Wi-Fi, close background apps.
- Channels not loading: restart app, check internet, confirm subscription is active, contact WhatsApp if still not working.
- Wrong device/app: ask what device they use and guide them accordingly.

SAFETY AND COMPLIANCE
- If asked about legality, licensing or content rights, say: Customers should only use StreamlyTV in accordance with local laws and applicable terms. For more information, contact support on WhatsApp.
- Do not provide illegal instructions, hacking, credential sharing, piracy instructions, or ways to bypass subscriptions.

LANGUAGE
- Default to English.
- If the customer writes Arabic, reply in simple Arabic.
- If they ask for another language, reply in that language if possible.
`;

const quickKnowledge = (text = "") => {
  const q = text.toLowerCase();
  if (/\b(3 month|3 months|three month|three months|60)\b/.test(q)) {
    return "The 3-month StreamlyTV plan is $60 AUD. It includes 50,000+ live channels, 100,000+ movies and series, sports, PPV, and HD/FHD/4K where available. Payment link: https://buy.stripe.com/14AeV6fFJ72g8CLcbz1Fe02\n\nAfter payment, message WhatsApp 0410 350 514 with your device type for activation and setup.";
  }
  if (/\b(6 month|6 months|six month|six months|100)\b/.test(q)) {
    return "The 6-month StreamlyTV plan is $100 AUD and is our most popular/best value option. Payment link: https://buy.stripe.com/4gMdR2fFJdqEaKTcbz1Fe05\n\nAfter payment, message WhatsApp 0410 350 514 with your device type for activation and setup.";
  }
  if (/\b(12 month|12 months|year|yearly|annual|180)\b/.test(q)) {
    return "The 12-month StreamlyTV plan is $180 AUD and is the best long-term value. Payment link: https://buy.stripe.com/cNi00c3X11HW9GPb7v1Fe04\n\nAfter payment, message WhatsApp 0410 350 514 with your device type for activation and setup.";
  }
  if (/\b(price|prices|plan|plans|cost|how much)\b/.test(q)) {
    return "StreamlyTV plans are:\n• 3 Months – $60 AUD: https://buy.stripe.com/14AeV6fFJ72g8CLcbz1Fe02\n• 6 Months – $100 AUD ⭐ Most popular: https://buy.stripe.com/4gMdR2fFJdqEaKTcbz1Fe05\n• 12 Months – $180 AUD: https://buy.stripe.com/cNi00c3X11HW9GPb7v1Fe04\n\nAfter payment, message WhatsApp 0410 350 514 with your device type for activation.";
  }
  if (/\b(whatsapp|contact|support|phone|number)\b/.test(q)) {
    return "You can contact StreamlyTV support on WhatsApp: 0410 350 514. International link: https://wa.me/61410350514";
  }
  return null;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing messages array." });
    }

    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content || "";
    const instant = quickKnowledge(lastUser);

    // Use fast local answers for common questions. This saves API credit.
    if (instant) {
      return res.status(200).json({ reply: instant, source: "local" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "OPENAI_API_KEY is missing in Vercel Environment Variables." });
    }

    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.35,
      max_tokens: 420,
      messages: [
        { role: "system", content: BUSINESS },
        ...messages.slice(-10)
      ]
    });

    const reply = completion.choices?.[0]?.message?.content || "Sorry, I couldn't answer that. Please contact WhatsApp support on 0410 350 514.";
    return res.status(200).json({ reply, source: "openai" });
  } catch (error) {
    console.error(error);
    const message = String(error?.message || error);
    if (message.includes("429") || message.toLowerCase().includes("quota")) {
      return res.status(500).json({ error: "OpenAI quota/credit issue. Please check billing credits in the OpenAI Platform." });
    }
    return res.status(500).json({ error: "AI error. Please check Vercel logs, API key, billing credits, then redeploy." });
  }
}
