function buildSummary(data) {
  return `New StreamlyTV Request\n\nName: ${data.name || ""}\nWhatsApp: ${data.whatsapp || ""}\nEmail: ${data.email || ""}\nPackage: ${data.package || ""}\nDevice: ${data.device || ""}\nIPTV App: ${data.app || ""}\nMAC Address: ${data.mac || ""}\nDevice Key: ${data.deviceKey || ""}\nApp Website: ${data.appWebsite || ""}\nPayment/Trial: ${data.status || ""}\nNotes: ${data.notes || ""}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const data = req.body || {};
  const summary = buildSummary(data);
  const whatsappNumber = "61410350514";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(summary)}`;
  let emailed = false;

  try {
    if (process.env.RESEND_API_KEY) {
      const to = process.env.NOTIFY_EMAIL || "iptvstreamly@gmail.com";
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL || "StreamlyTV <onboarding@resend.dev>",
          to,
          subject: `New StreamlyTV Request - ${data.name || "Customer"}`,
          text: summary
        })
      });
      emailed = response.ok;
      if (!response.ok) console.error(await response.text());
    }
  } catch (e) {
    console.error(e);
  }

  return res.status(200).json({ ok: true, emailed, summary, whatsappUrl, mailto: `mailto:iptvstreamly@gmail.com?subject=${encodeURIComponent("New StreamlyTV Request")}&body=${encodeURIComponent(summary)}` });
}
