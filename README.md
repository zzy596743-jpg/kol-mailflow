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

## Deploy to GitHub + Vercel

### Step 1: Create a GitHub repository

1. Open GitHub in your browser.
2. Click `+` in the top-right corner.
3. Choose `New repository`.
4. Repository name: `kol-mailflow`
5. Choose `Public` if teammates can access it, or `Private` if you only want invited people to see the code.
6. Do not add README, .gitignore, or license on GitHub because this folder already has them.
7. Click `Create repository`.

### Step 2: Push this local folder to GitHub

After GitHub creates the repository, it will show a repository URL like:

```text
https://github.com/YOUR_USERNAME/kol-mailflow.git
```

In Terminal, run:

```bash
cd "/Users/ann/Documents/iflytech email"
git remote add origin https://github.com/YOUR_USERNAME/kol-mailflow.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

If GitHub asks you to sign in, follow the browser login prompt.

### Step 3: Deploy on Vercel

1. Open Vercel.
2. Click `Add New...` or `New Project`.
3. Import the `kol-mailflow` GitHub repository.
4. Keep the default settings.
5. Build Command: leave empty.
6. Output Directory: leave empty.
7. Click `Deploy`.

Vercel will create a free URL such as:

```text
https://kol-mailflow.vercel.app
```

You can send that link to teammates.

## Suggested Repository Name

`kol-mailflow`
