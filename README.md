# Zaptilo WhatsApp for Zoho Desk

> Send WhatsApp Business messages from Zoho Desk — ticket-status updates, agent replies on WhatsApp, customer-facing notifications, SLA breach alerts. Free extension for Zoho Marketplace; pay-as-you-go INR pricing via Zaptilo.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zaptilo](https://img.shields.io/badge/powered_by-Zaptilo.ai-d97706)](https://zaptilo.ai)
[![Zoho Marketplace](https://img.shields.io/badge/Zoho-Marketplace-c8202f)](https://marketplace.zoho.com/)

## What it does

| Feature | Where |
|---|---|
| **Send WhatsApp** button | On Ticket / Contact / Account records |
| **Conversation history** widget | On Ticket and Contact detail pages |
| **Settings** widget | One-time API token setup |
| **Dashboard** widget | 30-day stats: sent / delivered / failed |
| **Custom Deluge functions** | `sendWhatsAppMessage` and `sendWhatsAppTemplate` callable from any Zoho Desk workflow / SLA / blueprint |

## Use cases

- Agent replies in Zoho Desk → customer instantly gets a WhatsApp message
- Ticket status changes (Open / Pending / Resolved / Closed) → auto-WhatsApp customer
- SLA breach approaching → WhatsApp alert to agent + manager
- New ticket created from a high-priority customer → WhatsApp notify the right team
- CSAT survey link sent via WhatsApp on ticket resolution

## Install

### From Zoho Marketplace (recommended)

1. Visit [Zoho Marketplace](https://marketplace.zoho.com/) → search "Zaptilo WhatsApp for Desk"
2. Click Install → choose your Zoho Desk portal
3. Open Settings widget → paste your Zaptilo API token (free signup at [web.zaptilo.ai](https://web.zaptilo.ai))

### Manual install (developer)

```bash
git clone https://github.com/zaptilo/zaptilo-zoho-desk-whatsapp.git
cd zaptilo-zoho-desk-whatsapp
zet validate
zet pack
# Upload zip via Zoho Marketplace partner dashboard
```

## Use Deluge functions

Two custom functions available in Zoho Desk workflows / SLA rules / Blueprint actions:

- **`sendWhatsAppMessage(phone, message)`** — free-form text inside the 24-hour window
- **`sendWhatsAppTemplate(phone, template_name, language, body_values)`** — approved template (e.g. `ticket_received`, `ticket_resolved`, `sla_breach`)

## Pricing

**Free** extension. You pay Zaptilo for messages sent (from ₹0.04/msg at volume, INR with GST invoice).

## Sister extensions

- [Zoho CRM](https://github.com/zaptilo/zaptilo-zoho-crm-whatsapp)
- [Zoho Books](https://github.com/zaptilo/zaptilo-zoho-books-whatsapp)
- [Zoho Invoice](https://github.com/zaptilo/zaptilo-zoho-invoice-whatsapp)
- [Zoho Recruit](https://github.com/zaptilo/zaptilo-zoho-recruit-whatsapp)
- [Zoho People](https://github.com/zaptilo/zaptilo-zoho-people-whatsapp)

## Support

- Zaptilo: <https://zaptilo.ai>
- Email: connect@zaptilo.ai

## License

MIT — see [LICENSE](./LICENSE).
