const DEEPSEEK_ENDPOINT = "https://api.deepseek.com/chat/completions";

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function getOutputText(data) {
  return (data.choices?.[0]?.message?.content || "").trim();
}

function cleanEmailText(text) {
  return text
    .replace(/\*\*/g, "")
    .replace(/```[a-z]*\n?/gi, "")
    .replace(/```/g, "")
    .replace(/[—–]/g, ", ")
    .replace(/[ \t]+,/g, ",")
    .replace(/,\s*,/g, ",")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function compactText(text, headLimit = 9000, tailLimit = 2500) {
  const clean = String(text || "").trim();
  if (clean.length <= headLimit + tailLimit) return clean;
  const head = clean.slice(0, headLimit).trim();
  if (!tailLimit) return `${head}\n\n[Older text omitted for speed]`;
  const tail = clean.slice(-tailLimit).trim();
  return `${head}\n\n[Older middle part omitted for speed]\n\n${tail}`;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Only POST requests are supported." });
    return;
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    sendJson(res, 500, { error: "DEEPSEEK_API_KEY is not set in Vercel Environment Variables." });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
  const rawEmailThread = compactText(body.rawEmail, 9000, 2200);
  const currentDraft = compactText(body.draft, 3500, 0);
  const memo = compactText(body.memo, 1600, 0);
  const customNotes = compactText(body.customNotes, 1200, 0);

  const systemPrompt = [
    "You are a senior overseas influencer/KOL operations specialist writing English email replies.",
    "Read the email context before rewriting. The reply must feel like it was written by a real influencer-operations person, not a template.",
    "Use concrete context: names, sender signature, creator concerns, rates, platform, deliverables, product, usage rights, exclusivity, timing, previous budget changes, and previous compromises.",
    "If user notes are in Chinese, understand them and integrate them naturally in English; never paste Chinese into the email.",
    "Keep the tone warm, respectful, concise, and businesslike. Show empathy before asking for anything.",
    "For negotiation or rejection, protect the relationship and make the creator feel respected.",
    "For contract next steps, clearly mention confirmed platform, package, and price if provided.",
    "Do not invent facts. If a detail is unclear, write around it safely.",
    "Return only the email body. Do not include a subject line, markdown fence, or explanation.",
    "Use plain email text only. Do not use Markdown formatting, bold markers, headings, or long dashes."
  ].join("\n");

  const userPrompt = {
    task: "Rewrite this influencer collaboration email so it feels contextual, warm, and human.",
    scenario: body.scenario || "",
    rawEmailThread,
    currentDraft,
    extractedFields: body.extracted || {},
    customNotes,
    memo,
    styleRules: [
      "No Subject line.",
      "Keep the final sender signature from the draft if present.",
      "Start by acknowledging the creator's actual reply or concern.",
      "Avoid generic lines like 'just following up' unless there is a clear new value.",
      "Use short paragraphs. Use bullets only when terms need to be easy to forward.",
      "Do not over-apologize or sound desperate.",
      "Do not add Chinese text to the final email.",
      "Do not use **bold**, markdown headings, em dashes, or en dashes. Use normal commas or short sentences instead."
    ]
  };

  try {
    const response = await fetch(DEEPSEEK_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(userPrompt, null, 2) }
        ],
        max_tokens: 850,
        temperature: 0.55
      })
    });

    const data = await response.json();
    if (!response.ok) {
      sendJson(res, response.status, { error: data.error?.message || "DeepSeek API request failed." });
      return;
    }

    const email = cleanEmailText(getOutputText(data));
    if (!email) {
      sendJson(res, 500, { error: "DeepSeek returned an empty email." });
      return;
    }

    sendJson(res, 200, { email, model, provider: "deepseek" });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Unexpected server error." });
  }
};
