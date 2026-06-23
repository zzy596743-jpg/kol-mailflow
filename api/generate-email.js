const OPENAI_ENDPOINT = "https://api.openai.com/v1/responses";

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function getOutputText(data) {
  if (data.output_text) return data.output_text.trim();
  const parts = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) parts.push(content.text);
      if (content.type === "text" && content.text) parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
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

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    sendJson(res, 500, { error: "OPENAI_API_KEY is not set in Vercel Environment Variables." });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const model = process.env.OPENAI_MODEL || "gpt-4.1";

  const systemPrompt = [
    "You are a senior overseas influencer/KOL operations specialist writing English email replies.",
    "Your job is to read the entire email thread and rewrite the draft into a warm, natural, human-sounding reply.",
    "Use the context carefully: names, sender signature, creator objections, rates, platform, deliverables, product, usage rights, exclusivity, timing, and previous back-and-forth.",
    "If user notes are in Chinese, understand them and integrate them naturally in English; never paste Chinese into the email.",
    "Keep the tone friendly, respectful, concrete, and businesslike. Avoid sounding like a mass template.",
    "Prefer short paragraphs. Use bullets only when it helps a manager quickly review terms.",
    "Do not invent facts. If a detail is unclear, write around it safely.",
    "Return only the email body, no subject line, no markdown fence, no explanation."
  ].join("\n");

  const userPrompt = {
    task: "Rewrite this influencer collaboration email so it feels more contextual, warm, and human.",
    scenario: body.scenario || "",
    rawEmailThread: body.rawEmail || "",
    currentDraft: body.draft || "",
    extractedFields: body.extracted || {},
    customNotes: body.customNotes || "",
    memo: body.memo || "",
    styleRules: [
      "Do not include Subject.",
      "Keep the final signature from the draft if present.",
      "Make the first paragraph acknowledge the creator's actual reply or concern.",
      "For negotiation or decline scenarios, show respect for the creator's rate and leave the relationship warm.",
      "For contract scenarios, clearly mention confirmed platform, package, and price if provided.",
      "For follow-ups, lead with the new value or reason to reply, not a generic 'just following up'."
    ]
  };

  try {
    const response = await fetch(OPENAI_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(userPrompt, null, 2) }
        ],
        max_output_tokens: 1200
      })
    });

    const data = await response.json();
    if (!response.ok) {
      sendJson(res, response.status, { error: data.error?.message || "OpenAI API request failed." });
      return;
    }

    const email = getOutputText(data);
    if (!email) {
      sendJson(res, 500, { error: "OpenAI returned an empty email." });
      return;
    }

    sendJson(res, 200, { email, model });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Unexpected server error." });
  }
};
