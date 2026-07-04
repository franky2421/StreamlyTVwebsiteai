# StreamlyTV AI Pro v10

Premium StreamlyTV website with StreamlyTV Assistant, customer request form, WhatsApp handoff, and optional email notifications.

## Files
- `index.html`
- `package.json`
- `assets/streamlytv-logo.jpg`
- `api/chat.js`
- `api/order.js`

## Required Vercel Environment Variable
- `OPENAI_API_KEY` = your OpenAI API key

## Optional Email Notifications
To send order emails automatically, add:
- `RESEND_API_KEY` = Resend API key
- `NOTIFY_EMAIL` = iptvstreamly@gmail.com
- `FROM_EMAIL` = your verified sender email in Resend

Without Resend, the form still creates a WhatsApp message and email draft link.
