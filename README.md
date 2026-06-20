# KOL MailFlow

KOL MailFlow is a lightweight browser tool for influencer operations teams. Paste an email thread, choose a work scenario, then generate a warmer English reply for outreach follow-up, budget replies, rate negotiation, contract next steps, or draft reminders.

## What It Does

- Reads pasted email context, including forwarded Chinese/English email headers.
- Extracts creator name, team signature, platform, quote, deliverables, and product.
- Generates scenario-based English email drafts.
- Lets the user manually correct extracted fields before generating.
- Runs entirely in the browser as a static site.

## Scenarios

- Ask for missing details
- Reply when creator asks for budget
- Negotiate to a target price
- Send contract and collect shipping/payment details
- Follow up on draft content

## Privacy

This is a static front-end tool. The current version does not send pasted email content to any server or API.

## Local Preview

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8766
```

Then open:

```text
http://127.0.0.1:8766
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose `Add New Project`.
3. Import the GitHub repository.
4. Use the default static project settings. No build command is required.
5. Deploy.

## Suggested Repository Name

`kol-mailflow`
