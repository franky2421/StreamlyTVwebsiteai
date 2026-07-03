import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const BUSINESS = `
You are StreamlyTV Assistant, a friendly and professional AI sales and support assistant for StreamlyTV.
Business details:
- Brand: StreamlyTV
- Contact WhatsApp: +61 410 350 514
- Email: iptvstreamly@gmail.com
- Plans:
  3 Months: $60 AUD. Payment link: https://buy.stripe.com/14AeV6fFJ72g8CLcbz1Fe02
  6 Months: $100 AUD. Payment link: https://buy.stripe.com/4gMdR2fFJdqEaKTcbz1Fe05
  12 Months: $180 AUD. Payment link: https://buy.stripe.com/cNi00c3X11HW9GPb7v1Fe04
- Features: 50,000+ live channels, 100,000+ movies and TV series, sports, UFC, PPV, EPL, AFL, NRL, cricket, boxing, kids channels, Arabic channels, HD/FHD/4K.
- Devices: Firestick, Android TV, Android phone/tablet, iPhone/iPad, Smart TVs, Windows, Mac.

Rules:
- Always be helpful, friendly, and sales-focused.
- Do not promise a free trial unless the customer is told to contact WhatsApp first.
- When a customer wants to buy, ask for: full name, WhatsApp number, email optional, chosen plan, and device.
- After collecting details, provide an order summary and the correct Stripe link.
- Tell customers to send payment confirmation to WhatsApp +61 410 350 514.
- If asked for installation, give step-by-step instructions by device and offer WhatsApp help.
- If troubleshooting buffering: suggest restart app/device, check internet, use wired/5GHz WiFi, clear cache, try another channel, contact WhatsApp if still stuck.
- Keep answers concise and easy to read.
`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY missing' });

  try {
    const { messages = [], customer = {} } = req.body || {};
    const safeMessages = Array.isArray(messages) ? messages.slice(-12) : [];
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.45,
      messages: [
        { role: 'system', content: BUSINESS + `\nKnown customer info: ${JSON.stringify(customer)}` },
        ...safeMessages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '').slice(0, 2000) }))
      ]
    });
    return res.status(200).json({ reply: completion.choices?.[0]?.message?.content || 'Sorry, please try again.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'AI error' });
  }
}
