import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are StreamlyTV AI, a friendly sales and support assistant for StreamlyTV.
Business details:
- StreamlyTV offers 50,000+ live TV channels and 100,000+ movies and TV series.
- Quality: HD, FHD and 4K where available.
- Plans: 3 Months $60, 6 Months $100, 12 Months $180.
- WhatsApp support: +61410350514.
- Email: iptvstreamly@gmail.com.
- Help customers choose a plan, explain payment, sports, movies, PPV, devices, and installation.
- Supported devices include Firestick, Android TV, Android phone/tablet, iPhone/iPad, Smart TV, Chromecast, Windows PC and Mac.
- If a customer is ready to buy, recommend the best plan and tell them to contact WhatsApp for activation and setup.
- Never ask for sensitive passwords or payment card details in chat.
Keep replies clear, short, friendly and sales-focused.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history = [] } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.slice(-8),
        { role: "user", content: message }
      ],
      temperature: 0.4,
      max_tokens: 350
    });

    const reply = completion.choices?.[0]?.message?.content || "Sorry, I couldn't answer that. Please contact WhatsApp support.";
    return res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "AI is not connected yet. Please check OPENAI_API_KEY in Vercel." });
  }
}
