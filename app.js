const SCENARIOS = {
  "ask-details": {
    title: "问具体信息",
    desc: "红人只说感兴趣，需要补报价、档期、内容形式",
    subject: "Thanks for your interest in our collaboration",
    fields: [
      {
        id: "questions",
        label: "需要补问的信息",
        type: "multi",
        options: ["报价", "合作内容形式", "档期/交稿时间", "账号数据/媒体包", "是否有使用限制"],
        defaults: ["报价", "合作内容形式", "档期/交稿时间"],
      },
    ],
    reasons: ["方便向客户准确报备", "客户需要完整信息后才能确认", "想先确认内容是否匹配"],
  },
  "ask-budget": {
    title: "回应预算",
    desc: "红人反问预算，不想暴露过多空间",
    subject: "Re: Collaboration details",
    fields: [
      { id: "budget", label: "可透露预算 / 价格", type: "text", placeholder: "例如 $300，留空则让对方先报价" },
    ],
    reasons: ["项目预算有限", "预算需根据最终内容确认", "首次合作先试水", "客户还在比较红人报价"],
  },
  "negotiate-price": {
    title: "砍价",
    desc: "客户有意向，但给价低于红人报价",
    subject: "Re: Collaboration rate",
    fields: [
      { id: "targetPrice", label: "客户可接受价格", type: "text", placeholder: "例如 $350" },
    ],
    reasons: ["客户预算有限", "首次合作先试水", "希望后续长期合作", "同类型红人价格参考", "样品也会免费寄送"],
  },
  "contract-address": {
    title: "签合同/问地址",
    desc: "砍价成功，收集合同和寄样信息",
    subject: "Next steps for our collaboration",
    fields: [
      {
        id: "creativeRequirements",
        label: "拍摄需求 / 创作要求",
        type: "textarea",
        placeholder:
          "例如：Brand Mention: Please explicitly mention the full product name...\nOrganic Integration: Pick 1-2 product points...\nKey features: Size Plus / Thickness Plus / Moisture Plus / Softness Plus",
      },
    ],
    reasons: ["用于准备合同", "用于安排样品寄送", "物流需要电话和邮编", "确认后会尽快推进下一步"],
  },
  "follow-up-draft": {
    title: "催稿",
    desc: "红人已收样品，提醒交 draft 给客户审核",
    subject: "Quick follow-up on the draft",
    fields: [
      { id: "deadline", label: "时间要求", type: "text", placeholder: "例如 this Friday / within 3 days，可留空" },
      {
        id: "urgency",
        label: "催稿语气",
        type: "single",
        options: ["温和提醒", "稍微加急", "已逾期需强调"],
        defaults: ["温和提醒"],
      },
    ],
    reasons: ["客户需要先审核再发布", "项目时间比较紧", "想确认目前进度", "如有问题可以及时协助"],
  },
};

const REASON_TEXT = {
  "方便向客户准确报备": "so I can report the details to the client accurately",
  "客户需要完整信息后才能确认": "as the client needs the full details before confirming the next step",
  "想先确认内容是否匹配": "to make sure the content direction is a good fit for this campaign",
  "项目预算有限": "the campaign budget is quite controlled for this round",
  "预算需根据最终内容确认": "the final budget will depend on the confirmed deliverables",
  "首次合作先试水": "since this would be our first collaboration, the client hopes to start with a trial budget",
  "客户还在比较红人报价": "the client is still reviewing creator options and rates",
  "希望后续长期合作": "if this first project goes well, we would love to explore more long-term opportunities",
  "同类型红人价格参考": "this is close to the approved range for similar creators in this campaign",
  "样品也会免费寄送": "the product sample will also be provided for you to experience and keep",
  "用于准备合同": "so we can prepare the agreement",
  "用于安排样品寄送": "so we can arrange the product sample shipment",
  "物流需要电话和邮编": "as the logistics team needs the phone number and postal code for delivery",
  "确认后会尽快推进下一步": "once confirmed, we can move forward right away",
  "客户需要先审核再发布": "the client needs to review the draft before posting",
  "项目时间比较紧": "the campaign timeline is a bit tight",
  "想确认目前进度": "I wanted to check where things stand",
  "如有问题可以及时协助": "if there is anything blocking the draft, I would be happy to help",
};

const DEFAULT_PLATFORM_PACKAGES = {
  Instagram: "Instagram: 1 Reel + Story Highlights for 3 days + 7-day link in bio",
  TikTok: "TikTok: 1 dedicated video + 7-day link in bio",
};

const elements = {
  rawEmail: document.querySelector("#rawEmail"),
  scenarioCards: document.querySelector("#scenarioCards"),
  dynamicFields: document.querySelector("#dynamicFields"),
  creatorName: document.querySelector("#creatorName"),
  senderName: document.querySelector("#senderName"),
  platformOverride: document.querySelector("#platformOverride"),
  quotedPrice: document.querySelector("#quotedPrice"),
  deliverables: document.querySelector("#deliverables"),
  productName: document.querySelector("#productName"),
  customNotes: document.querySelector("#customNotes"),
  generateBtn: document.querySelector("#generateBtn"),
  sampleBtn: document.querySelector("#sampleBtn"),
  clearBtn: document.querySelector("#clearBtn"),
  copyBtn: document.querySelector("#copyBtn"),
  statusText: document.querySelector("#statusText"),
  subjectLine: document.querySelector("#subjectLine"),
  subjectText: document.querySelector("#subjectText"),
  outputBox: document.querySelector("#outputBox"),
  tagRow: document.querySelector("#tagRow"),
};

const sampleEmail = `Hi Jessica,

Hope you're doing well! We are working on an AI learning tablet campaign and would love to invite you to share your rates for both dedicated and integrated content based on the following:

Instagram: 1 Reel + Story Highlights for 3 days + 7 day link in bio
TikTok: 1 dedicated video + 7 day link in bio

Could you let us know if you are interested, your rate, and your usual timeline after receiving the sample?

Best,
Ann
iFLYTalent Team

---

Hi Ann,

Thanks for reaching out. This sounds interesting!

We mainly post on Instagram and TikTok. My rate is $650 for Instagram and $500 for TikTok. Could you share your budget and timeline for the AI learning tablet campaign?

Best,
Jessica`;

let activeScenario = "ask-details";
let selected = {};
let currentEmail = "";
let manualEdited = new Set();
let lastThreadContext = null;

function cleanText(value) {
  return (value || "").replace(/\r/g, "").trim();
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean).map((item) => item.trim()))];
}

function titleCase(value) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function renderScenarioCards() {
  elements.scenarioCards.innerHTML = "";
  Object.entries(SCENARIOS).forEach(([key, scenario]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `scenario-card${key === activeScenario ? " active" : ""}`;
    button.innerHTML = `<strong>${scenario.title}</strong><span>${scenario.desc}</span>`;
    button.addEventListener("click", () => {
      activeScenario = key;
      selected = {};
      renderScenarioCards();
      renderDynamicFields();
      setStatus(`已切换到：${scenario.title}`);
    });
    elements.scenarioCards.appendChild(button);
  });
}

function renderDynamicFields() {
  const scenario = SCENARIOS[activeScenario];
  elements.dynamicFields.innerHTML = "";

  scenario.fields.forEach((field) => renderField(field));

  const reasonLabel = document.createElement("div");
  reasonLabel.className = "field-label with-space";
  reasonLabel.textContent = "场景理由";
  elements.dynamicFields.appendChild(reasonLabel);
  renderChipGroup("reasons", scenario.reasons, "multi", scenario.reasons.slice(0, activeScenario === "contract-address" ? 2 : 1));

  const custom = document.createElement("input");
  custom.id = "field_customReason";
  custom.className = "custom-reason";
  custom.placeholder = "也可以手动输入额外理由，会写进邮件";
  elements.dynamicFields.appendChild(custom);
}

function renderField(field) {
  const label = document.createElement("div");
  label.className = "field-label";
  label.textContent = field.label;
  elements.dynamicFields.appendChild(label);

  if (field.type === "text") {
    const input = document.createElement("input");
    input.id = `field_${field.id}`;
    input.placeholder = field.placeholder || "";
    elements.dynamicFields.appendChild(input);
    return;
  }

  if (field.type === "textarea") {
    const textarea = document.createElement("textarea");
    textarea.id = `field_${field.id}`;
    textarea.className = "dynamic-textarea";
    textarea.rows = 8;
    textarea.placeholder = field.placeholder || "";
    elements.dynamicFields.appendChild(textarea);
    return;
  }

  renderChipGroup(field.id, field.options, field.type, field.defaults || []);
}

function renderChipGroup(id, options, type, defaults) {
  const row = document.createElement("div");
  row.className = "chip-row";
  selected[id] = new Set(defaults);

  options.forEach((option) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `chip${selected[id].has(option) ? " active" : ""}`;
    chip.textContent = option;
    chip.addEventListener("click", () => {
      if (type === "single") selected[id].clear();
      if (selected[id].has(option)) selected[id].delete(option);
      else selected[id].add(option);
      [...row.querySelectorAll(".chip")].forEach((item) => {
        item.classList.toggle("active", selected[id].has(item.textContent));
      });
    });
    row.appendChild(chip);
  });

  elements.dynamicFields.appendChild(row);
}

function fieldValue(id) {
  return cleanText(document.querySelector(`#field_${id}`)?.value);
}

function selectedValues(id) {
  return [...(selected[id] || new Set())];
}

function splitThreadBlocks(text) {
  const normalized = text.replace(/\r/g, "");
  return normalized.split(/\n\s*(?:-{3,}|_{3,}|On .+ wrote:|From:\s*)\s*\n?/i).map((block) => block.trim()).filter(Boolean);
}

function extractHeaderValue(block, label) {
  const pattern = new RegExp(`(?:^|\\n)\\s*(?:${label})\\s*[:：]\\s*(?:\\n\\s*)?([^\\n]+)`, "i");
  const match = block.match(pattern);
  return match ? match[1].trim() : "";
}

function extractPersonFromHeader(value) {
  if (!value) return "";
  const beforeEmail = value.split(/[<（(]/)[0].trim();
  const emailMatch = value.match(/([A-Z0-9._%+-]+)@/i);
  const candidate = beforeEmail.includes("@") ? emailMatch?.[1] || beforeEmail : beforeEmail || emailMatch?.[1] || "";
  return candidate.replace(/^["']|["']$/g, "").trim();
}

function isIflyAddress(value) {
  return /@iflytalent\.(?:cn|world)\b/i.test(value) || /\biflytalent team\b/i.test(value);
}

function blockSender(block) {
  return extractHeaderValue(block, "发件人|From");
}

function looksLikeOurEmail(block) {
  const sender = blockSender(block);
  if (sender) return isIflyAddress(sender);
  return /\b(?:iFLYTalent Team|iFLYTalent, representing|I am with iFLYTalent|we are working on|we would love to invite|our client|collaboration opportunity)\b/i.test(block);
}

function analyzeThread(text) {
  const blocks = splitThreadBlocks(text);
  if (!blocks.length) {
    return { fullText: text, ourText: "", creatorReply: text, senderName: "", asked: {}, given: {} };
  }

  const ourBlocks = blocks.filter(looksLikeOurEmail);
  const creatorBlocks = blocks.filter((block) => !looksLikeOurEmail(block));
  const ourText = ourBlocks.join("\n\n");
  const creatorReply = creatorBlocks.length ? creatorBlocks[0] : blocks[0];
  return {
    fullText: text,
    ourText,
    creatorReply,
    senderName: extractSenderName(ourBlocks[ourBlocks.length - 1] || text),
    asked: detectAskedInfo(ourText || text),
    given: detectGivenInfo(creatorReply),
    timelinePrompt: extractTimelinePrompt(ourText || text),
  };
}

function extractSenderName(text) {
  const iflyHeader = [blockSender(text), extractHeaderValue(text, "收件人|To")]
    .find((value) => isIflyAddress(value));
  if (iflyHeader) {
    const candidate = extractPersonFromHeader(iflyHeader);
    if (candidate) return titleCase(candidate.replace(/[._-]/g, " "));
  }

  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    if (/^(best|best regards|regards|thanks|thank you|warmly|sincerely),?$/i.test(lines[index]) && lines[index + 1]) {
      const candidate = lines[index + 1].replace(/[^a-zA-Z\s'-]/g, "").trim();
      if (candidate && !/\b(?:ifly|iflytalent|team|talent)\b/i.test(candidate) && candidate.split(/\s+/).length <= 3) {
        return titleCase(candidate);
      }
    }
  }
  return "";
}

function detectAskedInfo(text) {
  return {
    rate: /\b(?:rate|price|quote|budget|fee|how much|报价|预算|价格)\b/i.test(text),
    deliverables: /\b(?:deliverables?|content package|content type|content format).{0,40}\b(?:recommend|suggest|prefer|work for you|comfortable|报价|建议|形式)\b/i.test(text),
    timeline: /\b(?:timeline|deadline|date|when|schedule|availability|available|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\b\d{1,2}\/\d{1,2}\b|\b\d{1,2}\s*(?:st|nd|rd|th)\b|日期|时间|档期|几月|月)\b/i.test(text),
    mediaKit: /\b(?:media kit|insights|analytics|followers|engagement|账号数据|数据)\b/i.test(text),
    restrictions: /\b(?:usage|rights|restriction|exclusivity|whitelist|spark ads|使用限制|授权)\b/i.test(text),
    child: /\b(?:child|kid|baby|toddler|son|daughter|age|孩子|宝宝|年龄)\b/i.test(text),
  };
}

function detectGivenInfo(text) {
  const hasQuestion = /\?|\b(?:could you|can you|would you|please share|let me know|what is|what's|how much)\b/i.test(text);
  return {
    rate: extractPrices(text).length > 0,
    deliverables: Boolean(extractDeliverables(text, extractPlatform(text))),
    timeline: !hasQuestion && /\b(?:available|works for me|july|august|september|october|november|december|this week|next week|by friday|within \d+ days|\b\d{1,2}\/\d{1,2}\b|\b\d{1,2}\s*(?:st|nd|rd|th)\b|可以|合适|有空|档期)\b/i.test(text),
    mediaKit: /\b(?:media kit|insights|analytics|followers|engagement)\b/i.test(text),
    restrictions: /\b(?:usage|rights|restriction|exclusivity|whitelist|spark ads)\b/i.test(text),
    child: /\b(?:\d+\s*(?:years?|months?)\s*old|baby is|child is|kid is|son is|daughter is|宝宝.*(?:岁|月)|孩子.*(?:岁|月))\b/i.test(text),
  };
}

function extractTimelinePrompt(text) {
  const monthMatch = text.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\b/i);
  if (monthMatch && /\b(?:work|works|available|availability|fit|schedule|date)\b/i.test(text)) {
    return `whether ${titleCase(monthMatch[1])} works for you`;
  }
  const dateMatch = text.match(/\b(?:on\s+)?([A-Z][a-z]+\s+\d{1,2}(?:st|nd|rd|th)?|\d{1,2}\/\d{1,2})\b/);
  if (dateMatch) return `whether ${dateMatch[1]} works for you`;
  return "your usual timeline after receiving the sample";
}

function extractName(text) {
  const sender = blockSender(text);
  let senderFallback = "";
  if (sender && !isIflyAddress(sender)) {
    const candidate = extractPersonFromHeader(sender);
    const visibleName = sender.split(/[<（(]/)[0].trim();
    const isBareEmail = /^[^\s<>（(]+@[^\s<>）)]+$/.test(sender.trim()) || visibleName.includes("@");
    if (candidate && !isBareEmail) return candidate;
    if (candidate) senderFallback = titleCase(candidate.replace(/[._-]/g, " "));
  }

  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const fromLine = [...lines]
    .reverse()
    .find((line) => /^from:/i.test(line) && !isIflyAddress(line));
  if (fromLine) {
    const match = fromLine.match(/^from:\s*"?([^"<@]+)"?/i);
    if (match) return titleCase(match[1].replace(/[._-]/g, " "));
  }

  let signoffIndex = -1;
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    if (/^(best|thanks|thank you|regards|cheers|sincerely|warmly|kind regards),?$/i.test(lines[index])) {
      signoffIndex = index;
      break;
    }
  }
  if (signoffIndex >= 0 && lines[signoffIndex + 1]) {
    const candidate = lines[signoffIndex + 1].replace(/[^a-zA-Z\s'-]/g, "").trim();
    if (candidate && candidate.split(/\s+/).length <= 3) return titleCase(candidate);
  }

  const intro = text.match(/\b(?:I am|I'm|This is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/);
  if (intro) return titleCase(intro[1]);
  return senderFallback;
}

function extractPlatform(text) {
  const platformRules = [
    ["Instagram", /\b(?:instagram|insta|ig|ins)\b/i],
    ["TikTok", /\btik\s?tok\b/i],
    ["YouTube Shorts", /\byoutube shorts?\b/i],
    ["YouTube", /\byoutube\b/i],
    ["Facebook", /\bfacebook\b/i],
    ["Pinterest", /\bpinterest\b/i],
    ["Amazon", /\bamazon\b/i],
    ["Blog", /\bblog\b/i],
  ];
  return uniqueValues(platformRules.filter(([, pattern]) => pattern.test(text)).map(([label]) => label)).join(" + ");
}

function extractPrices(text) {
  const matches = text.match(/(?:USD\s*)?[$€£]\s?\d[\d,]*(?:\.\d+)?|\b\d[\d,]*\s?(?:USD|EUR|GBP|dollars?)\b/gi);
  return uniqueValues(matches || []);
}

function extractDeliverables(text, platformText = "") {
  const allowedPlatforms = platformText.split("+").map((item) => item.trim()).filter(Boolean);
  const allows = (platform) => !allowedPlatforms.length || allowedPlatforms.includes(platform);
  const packages = [];
  if (allows("Instagram") && /\bInstagram\b/i.test(text) && /\bReels?\b/i.test(text) && /\b(?:Story|Stroy) Highlights?\b/i.test(text) && /\blink in bio\b/i.test(text)) {
    packages.push(DEFAULT_PLATFORM_PACKAGES.Instagram);
  }
  if (allows("TikTok") && /\bTikTok\b/i.test(text) && /\bdedicated video\b/i.test(text) && /\blink in bio\b/i.test(text)) {
    packages.push(DEFAULT_PLATFORM_PACKAGES.TikTok);
  }
  if (packages.length) return packages.join("; ");

  const rules = [
    ["Instagram Reel", /\b(?:ig|instagram)?\s*reels?\b/i],
    ["TikTok video", /\b(?:tiktok\s+video|video\s+on\s+tiktok|\d+\s*tiktok|one\s+tiktok)\b/i],
    ["Story frames", /\bstor(?:y|ies|y highlights?)\b/i],
    ["YouTube video", /\b(?:youtube\s+video|video\s+on\s+youtube|\d+\s*youtube|one\s+youtube)\b/i],
    ["Shorts", /\bshorts?\b/i],
    ["Static post", /\b(?:static\s+post|feed\s+post|in-feed\s+post|instagram\s+post|\d+\s*posts?)\b/i],
    ["Blog post", /\bblog\b/i],
  ];
  return uniqueValues(rules.filter(([, pattern]) => pattern.test(text)).map(([label]) => label)).join(" + ");
}

function platformList(platformText) {
  return platformText.split("+").map((item) => item.trim()).filter(Boolean);
}

function filterDeliverablesForPlatform(deliverables, platformText) {
  const platforms = platformList(platformText);
  if (!deliverables || !platforms.length) return deliverables;

  const sections = deliverables.split(";").map((item) => item.trim()).filter(Boolean);
  if (!sections.length) return deliverables;

  const filtered = sections.filter((section) => {
    if (/^Instagram:/i.test(section)) return platforms.includes("Instagram");
    if (/^TikTok:/i.test(section)) return platforms.includes("TikTok");
    if (/TikTok/i.test(section) && !platforms.includes("TikTok")) return false;
    if (/(Instagram|IG|Reel|Story)/i.test(section) && !platforms.includes("Instagram")) return false;
    return true;
  });

  return filtered.length ? filtered.join("; ") : "";
}

function normalizeContext(context) {
  return {
    ...context,
    deliverables: filterDeliverablesForPlatform(context.deliverables, context.platform),
  };
}

function hasMultiPlatformPackage(context) {
  const platforms = platformList(context.platform);
  return context.deliverables.includes("Instagram:") && context.deliverables.includes("TikTok:") && platforms.includes("Instagram") && platforms.includes("TikTok");
}

function deliverablePhrase(context, fallback = "the content package") {
  if (!context.deliverables) return fallback;
  if (hasMultiPlatformPackage(context)) return "the Instagram and TikTok package listed below";
  return context.deliverables.replace(/\n/g, "; ");
}

function deliverablesMentionPlatform(deliverables) {
  return /\b(?:Instagram|TikTok|YouTube|Facebook|Pinterest|Amazon|Blog|IG|Reel|Story)\b/i.test(deliverables);
}

function platformSuffix(context) {
  if (!context.platform || hasMultiPlatformPackage(context) || deliverablesMentionPlatform(context.deliverables)) return "";
  return ` on ${context.platform}`;
}

function platformSelectionNote(context) {
  if (!hasMultiPlatformPackage(context)) return "";
  return "\n\nThe client may choose Instagram, TikTok, or both platforms later based on your account data and campaign fit, so it would be helpful to have the rates for both options first.";
}

function subjectForScenario(scenario) {
  const subjects = {
    "ask-details": [
      "Re: Collaboration details",
      "Re: Quick details for the collaboration",
      "Re: A few details for the campaign",
    ],
    "ask-budget": [
      "Re: Collaboration details",
      "Re: Campaign budget",
      "Re: Package rate",
      "Re: Budget and deliverables",
    ],
    "negotiate-price": [
      "Re: Collaboration rate",
      "Re: Rate for this campaign",
      "Re: Campaign budget update",
    ],
    "contract-address": [
      "Next steps for our collaboration",
      "Contract and next steps",
      "Moving forward with the collaboration",
    ],
    "follow-up-draft": [
      "Quick follow-up on the draft",
      "Checking in on the draft",
      "Draft review follow-up",
    ],
  };
  return pickVariant(`subject-${scenario}`, subjects[scenario] || [SCENARIOS[scenario].subject]);
}

function extractProduct(text) {
  const known = [
    /Momcozy\s+[A-Za-z0-9 +'-]+?(?:Wipes|Pump|Bottle|Bra|Carrier|Warmer|Monitor)/i,
    /AI\s+[A-Za-z0-9 +'-]+?(?:tablet|toy|robot|camera|translator|device)/i,
    /iFLYTEK\s+[A-Za-z0-9 +'-]+/i,
  ];
  for (const pattern of known) {
    const match = text.match(pattern);
    if (match) return match[0].replace(/\s+campaign$/i, "").trim();
  }

  const campaignMatch = text.match(/\b(?:for|about|regarding)\s+(?:the\s+)?([A-Za-z0-9][A-Za-z0-9 +'-]{2,60}?)\s+(?:campaign|collaboration|product)\b/i);
  if (campaignMatch) return campaignMatch[1].trim();

  const workingMatch = text.match(/\bworking on\s+(?:a|an|the\s+)?([A-Za-z0-9][A-Za-z0-9 +'-]{2,60}?)\s+campaign\b/i);
  if (workingMatch) return workingMatch[1].replace(/^(?:a|an|the)\s+/i, "").trim();

  const productMatch = text.match(/\b(?:product|sample)\s+(?:is|called|named)?\s*[:\-]?\s*([A-Za-z0-9][A-Za-z0-9 +'-]{2,50})/i);
  return productMatch ? productMatch[1].trim() : "";
}

function extractInfo({ overwrite = false } = {}) {
  const raw = cleanText(elements.rawEmail.value);
  if (!raw) {
    lastThreadContext = null;
    updateTags();
    setStatus("等待输入");
    return;
  }

  const thread = analyzeThread(raw);
  lastThreadContext = thread;
  const prices = extractPrices(thread.creatorReply);
  const creatorPlatform = extractPlatform(thread.creatorReply);
  const platform = creatorPlatform || extractPlatform(raw);
  const updates = {
    creatorName: extractName(thread.creatorReply) || extractName(raw),
    senderName: thread.senderName,
    platformOverride: platform,
    quotedPrice: prices[0] || "",
    deliverables: extractDeliverables(raw, platform),
    productName: extractProduct(raw),
  };

  Object.entries(updates).forEach(([key, value]) => {
    if (value && (overwrite || (!manualEdited.has(key) && !cleanText(elements[key].value)))) {
      elements[key].value = value;
    }
  });

  updateTags();
  const count = Object.values(updates).filter(Boolean).length;
  setStatus(count ? `已自动识别 ${count} 项信息` : "未识别到关键信息，可在下方手动填写");
}

function buildContext() {
  extractInfo();
  const customReason = fieldValue("customReason");
  const reasons = selectedValues("reasons").map((key) => REASON_TEXT[key.trim()] || key.trim());
  if (customReason) reasons.push(customReason);

  return {
    name: cleanText(elements.creatorName.value) || "there",
    senderName: cleanText(elements.senderName.value) || "iFLYTalent Team",
    platform: cleanText(elements.platformOverride.value),
    quotedPrice: cleanText(elements.quotedPrice.value),
    deliverables: cleanText(elements.deliverables.value),
    productName: cleanText(elements.productName.value) || "the product",
    notes: cleanText(elements.customNotes.value),
    reasons,
    thread: lastThreadContext || { asked: {}, given: {}, ourText: "", creatorReply: "", fullText: "", timelinePrompt: "" },
  };
}

function greeting(name) {
  return name === "there" ? "Hi there," : `Hi ${name},`;
}

function signature(context) {
  return context.senderName === "iFLYTalent Team"
    ? "Best regards,\niFLYTalent Team"
    : `Best regards,\n${context.senderName}\niFLYTalent Team`;
}

function sentenceList(items) {
  const clean = items.filter(Boolean);
  if (!clean.length) return "";
  if (clean.length === 1) return clean[0];
  return `${clean.slice(0, -1).join(", ")} and ${clean[clean.length - 1]}`;
}

function hasChinese(text) {
  return /[\u4e00-\u9fff]/.test(text || "");
}

function reasonFlags(reasons) {
  const source = reasons.join(" ");
  return {
    lowBudget: /项目预算有限|客户预算有限|预算有限|预算不高|预算低/i.test(source),
    scopePending: /预算需根据最终内容确认|最终内容|最终package|final scope/i.test(source),
    firstTrial: /首次合作|先试水|trial|first collaboration/i.test(source),
    longTerm: /长期合作|long-term|long term/i.test(source),
    sampleIncluded: /样品|sample/i.test(source),
    benchmark: /同类型红人|价格参考|benchmark|reference/i.test(source),
    lowPriceProduct: /湿巾.*单价低|单价低|客单价低|价格低|产品价格低|lower price-point|low price/i.test(source),
    exclusivity: /排他|独家|exclusiv/i.test(source),
    dedicatedOnly: /单独|dedicated|单条|单支/i.test(source),
    noIntegrated: /不做插播|不要插播|不接受插播|插播|not integrated|no integrated/i.test(source),
    draftReview: /审核|review/i.test(source),
    tightTimeline: /时间|timeline|urgent|asap|加急|尽快/i.test(source),
  };
}

function reasonToEnglish(reason) {
  const value = cleanText(reason);
  if (REASON_TEXT[value]) return REASON_TEXT[value];
  if (/湿巾.*单价低|单价低|客单价低|价格低|产品价格低/i.test(value)) return "this is a lower price-point product, so the campaign budget is more limited";
  if (/预算有限|预算不高|预算低/i.test(value)) return "the campaign budget is quite controlled for this round";
  if (value.includes("预算有限")) return "the campaign budget is quite controlled for this round";
  if (value.includes("首次合作")) return "since this would be our first collaboration, the client hopes to start with a trial budget";
  if (value.includes("长期合作")) return "if this first project goes well, we would love to explore more long-term opportunities";
  if (value.includes("样品")) return "the product sample will also be provided for you to experience and keep";
  if (value.includes("审核")) return "the client needs to review the draft before posting";
  if (value.includes("时间")) return "the campaign timeline is a bit tight";
  if (/排他|独家|exclusiv/i.test(value)) return "the client has an exclusivity requirement for this campaign";
  if (/单独|dedicated|单条|单支/i.test(value)) return "the client needs this to be a dedicated standalone video";
  if (/不做插播|不要插播|不接受插播|插播/i.test(value)) return "integrated mentions or short insert-style placements would not work for this brief";
  return value;
}

function reasonSentence(reasons) {
  if (!reasons.length) return "";
  const flags = reasonFlags(reasons);
  const reasonOptions = [];

  if (flags.firstTrial && flags.lowPriceProduct) {
    reasonOptions.push("since this is our first collaboration and the product has a lower price point, the client is keeping this round closer to a trial budget");
  } else {
    if (flags.firstTrial) reasonOptions.push("since this would be our first collaboration, the client would like to start with a trial budget");
    if (flags.lowPriceProduct) reasonOptions.push("because this is a lower price-point product, the campaign budget is more limited");
  }
  if (flags.lowBudget) reasonOptions.push("the campaign budget is quite controlled for this round");
  if (flags.scopePending) reasonOptions.push("the final budget will depend on the confirmed deliverables");
  if (flags.longTerm) reasonOptions.push("if this first project goes well, we would love to explore more long-term opportunities");
  if (flags.sampleIncluded) reasonOptions.push("the product sample will also be provided for you to experience and keep");
  if (flags.benchmark) reasonOptions.push("we are also comparing rates across creators with a similar profile");
  if (flags.exclusivity) reasonOptions.push("the client has an exclusivity requirement for this campaign");
  if (flags.dedicatedOnly) reasonOptions.push("the client needs this to be a dedicated standalone video");
  if (flags.noIntegrated) reasonOptions.push("integrated mentions or short insert-style placements would not work for this brief");
  if (flags.draftReview) reasonOptions.push("the client needs to review the draft before posting");
  if (flags.tightTimeline) reasonOptions.push("the campaign timeline is a bit tight");

  const translated = reasons.map(reasonToEnglish).filter((item) => item && !hasChinese(item));
  const reasonText = sentenceList(uniqueValues([...reasonOptions, ...translated]));
  if (!reasonText) return "";
  return pickVariant("reason-sentence", [
    ` Just to share a little context, ${reasonText}.`,
    ` The main reason is that ${reasonText}.`,
    ` For a bit of background, ${reasonText}.`,
    ` I wanted to be transparent here: ${reasonText}.`,
  ]);
}

function translateCustomNotes(notes) {
  const text = cleanText(notes);
  if (!text) return [];
  const items = [];
  if (/排他|独家|exclusiv/i.test(text)) {
    items.push("Please also note that the client has an exclusivity requirement for this campaign.");
  }
  if (/单独|dedicated|单条|单支/i.test(text)) {
    items.push("The content should be created as a dedicated standalone video.");
  }
  if (/不做插播|不要插播|不接受插播|不做integrated|not integrated|no integrated|插播/i.test(text)) {
    items.push("Integrated mentions or short insert-style placements would not work for this brief.");
  }
  if (/不要太强硬|别太强硬|soft|gentle/i.test(text)) {
    items.push("Please keep the tone friendly and low-pressure.");
  }
  if (/加急|尽快|urgent|asap/i.test(text)) {
    items.push("The timeline is a little tight, so a quick confirmation would be very helpful.");
  }
  if (!items.length) items.push(text);
  return uniqueValues(items);
}

function notesSentence(notes) {
  const items = translateCustomNotes(notes);
  if (!items.length) return "";
  return `\n\n${items.join("\n")}`;
}

function polishFinalEmail(email, context) {
  let output = email;
  output = output.replace(/\bOne small note from our side:\s*/gi, "");

  const translatedNotes = notesSentence(context.notes).trim();
  if (translatedNotes) {
    output = output
      .split("\n")
      .map((line) => {
        if (hasChinese(line) && /排他|独家|单独|不做插播|不要插播|不接受插播|插播/i.test(line)) {
          return translatedNotes;
        }
        return line;
      })
      .join("\n");
  }

  output = output
    .replace(/and\s+湿巾单价低/gi, "and because this is a lower price-point product, the campaign budget is more limited")
    .replace(/,\s*湿巾单价低/gi, ", and because this is a lower price-point product, the campaign budget is more limited")
    .replace(/湿巾单价低/gi, "because this is a lower price-point product, the campaign budget is more limited")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n");

  return output.trim();
}

function pickVariant(key, options) {
  const base = `${key}|${cleanText(elements.rawEmail.value)}|${activeScenario}`;
  let hash = 0;
  for (let index = 0; index < base.length; index += 1) {
    hash = (hash * 31 + base.charCodeAt(index)) % 100000;
  }
  return options[hash % options.length];
}

function hasRequirementIntro(text) {
  return /\b(?:to keep things simple|please follow these key guidelines|key guidelines|content preparation|creative requirements|shooting requirements)\b/i.test(text);
}

function contextLine(context) {
  const pieces = [];
  if (context.productName && context.productName !== "the product") pieces.push(`${context.productName} campaign`);
  if (context.deliverables) pieces.push(deliverablePhrase(context));
  const subject = sentenceList(pieces);
  if (context.deliverables.includes(":")) {
    return pieces.length
      ? pickVariant("context-package", [
          `The ${subject} still looks like a good fit on our end.`,
          `This should work well for the ${subject}.`,
          `Based on the thread, the ${subject} is still the direction we would like to explore.`,
        ])
      : "";
  }
  const deliverablesLower = context.deliverables.toLowerCase();
  const platformParts = context.platform.split("+").map((part) => part.trim()).filter(Boolean);
  const missingPlatforms = platformParts.filter((platform) => !deliverablesLower.includes(platform.toLowerCase()));
  if (missingPlatforms.length) pieces.push(missingPlatforms.join(" + "));
  return pieces.length
    ? pickVariant("context-general", [
        `For ${sentenceList(pieces)}, this still feels like a strong fit for us.`,
        `This still feels like a good match for ${sentenceList(pieces)}.`,
        `I think this can still work nicely for ${sentenceList(pieces)}.`,
      ])
    : "";
}

function generateAskDetails(context) {
  const questions = selectedValues("questions");
  const missingFromThread = [];
  if (context.thread.asked.rate && !context.thread.given.rate) missingFromThread.push("报价");
  if (context.thread.asked.deliverables && !context.thread.given.deliverables) missingFromThread.push("合作内容形式");
  if (context.thread.asked.timeline && !context.thread.given.timeline) missingFromThread.push("档期/交稿时间");
  if (context.thread.asked.mediaKit && !context.thread.given.mediaKit) missingFromThread.push("账号数据/媒体包");
  if (context.thread.asked.restrictions && !context.thread.given.restrictions) missingFromThread.push("是否有使用限制");
  if (context.thread.asked.child && !context.thread.given.child) missingFromThread.push("孩子相关信息");

  const questionMap = {
    报价: "your rate for this collaboration",
    合作内容形式: "the content package you would suggest",
    "档期/交稿时间": context.thread.timelinePrompt || "your usual timeline after receiving the sample",
    "账号数据/媒体包": "your media kit or recent account insights, if you have them handy",
    是否有使用限制: "any usage or posting restrictions we should know about",
    孩子相关信息: "your child's age, and whether they could appear in the video even just from the side or without showing their face",
  };
  const items = uniqueValues([...missingFromThread, ...questions])
    .filter((item) => {
      if (item === "报价") return !context.thread.given.rate;
      if (item === "合作内容形式") return !context.thread.given.deliverables && !context.deliverables;
      if (item === "档期/交稿时间") return !context.thread.given.timeline;
      if (item === "账号数据/媒体包") return !context.thread.given.mediaKit;
      if (item === "是否有使用限制") return !context.thread.given.restrictions;
      if (item === "孩子相关信息") return !context.thread.given.child;
      return true;
    })
    .map((item) => questionMap[item])
    .filter(Boolean);
  const itemText = items.length ? `- ${items.join("\n- ")}` : "- any other details you think would be helpful for the client to review";
  const opener = pickVariant("ask-details-opener", [
    "Thanks so much for getting back to me.",
    "Lovely to hear from you, and thank you for the quick reply.",
    "Thank you for the reply — happy to hear you're open to this.",
  ]);
  const askLine = pickVariant("ask-details-ask", [
    "Before I take this back to the client, could you help me fill in the details below?",
    "Could you help me confirm the few details below so I can update the client properly?",
    "A couple of details are still missing on my end — could you send these over when you have a moment?",
  ]);
  const closeLine = pickVariant("ask-details-close", [
    "Once I have these, I can package everything up neatly for the client and come back with the next step.",
    "Once I have this, I can share everything with the client and keep things moving.",
    "After that, I can check with the client and come back to you with a clearer next step.",
  ]);

  return `${greeting(context.name)}

${opener}

${contextLine(context)}

${askLine}

${itemText}
${platformSelectionNote(context)}

${closeLine}${notesSentence(context.notes)}

${signature(context)}`;
}

function generateAskBudget(context) {
  const budget = fieldValue("budget");
  const budgetLine = budget
    ? pickVariant("budget-with-number", [
        `For this one, the client is trying to keep the package around ${budget}, depending on the final scope.`,
        `The number we are working with right now is around ${budget}, though the final package still matters.`,
        `For this campaign, we are looking at roughly ${budget} for the package.`,
        `The client asked us to stay close to ${budget} for this round if possible.`,
        `We are trying to make this work around ${budget}, depending on what is included.`,
        `Right now, ${budget} is the range we can most realistically bring back to the client.`,
      ])
    : pickVariant("budget-no-number", [
        "We are still lining up the final creator list, so I do not want to give you a number that ends up being misleading.",
        "The client is still reviewing creator options, so I am collecting rates first before locking in a number.",
        "We are still matching rates with the final scope, so it would be helpful to see what package would work best for you.",
        "We are still confirming the creator mix, so I would rather check your usual package first and then take it back to the client.",
        "The final budget depends a bit on the package and platform, so your usual rate would really help us frame this properly.",
      ]);
  const askRate = pickVariant("budget-ask-rate", [
    `Would you be comfortable sharing what rate would work for you for ${deliverablePhrase(context)}${platformSuffix(context)}?`,
    `Could you send over the rate you would feel good about for ${deliverablePhrase(context)}${platformSuffix(context)}?`,
    `What rate would you usually quote for ${deliverablePhrase(context)}${platformSuffix(context)}?`,
    `What number would make sense on your side for ${deliverablePhrase(context)}${platformSuffix(context)}?`,
    `Could you let me know what package rate you would suggest for ${deliverablePhrase(context)}${platformSuffix(context)}?`,
  ]);
  const opener = pickVariant("budget-opener", [
    "Thanks for asking — totally understand.",
    "Of course, happy to share a bit more context.",
    "Totally fair question.",
    "Yes, absolutely — thanks for checking.",
    "I completely understand wanting to confirm the budget first.",
  ]);
  const close = pickVariant("budget-close", [
    "I can then take it back to the client and try to push this forward from there.",
    "Once I have that, I can bring it to the client and see how close we can get.",
    "That will help me position this properly with the client.",
    "From there, I can check internally and come back with a clearer next step.",
  ]);

  return `${greeting(context.name)}

${opener}

${budgetLine}${reasonSentence(context.reasons)}

${askRate} If you have separate package options, that would be even better.${platformSelectionNote(context)}

${close}${notesSentence(context.notes)}

${signature(context)}`;
}

function generateNegotiation(context) {
  const target = fieldValue("targetPrice") || "[target price]";
  const quote = context.quotedPrice
    ? pickVariant("negotiation-quote", [
        `I brought your ${context.quotedPrice} rate to the client.`,
        `I shared your ${context.quotedPrice} quote with the client.`,
        `I passed along your ${context.quotedPrice} rate on my side.`,
      ])
    : "I brought your rate to the client.";
  const ask = pickVariant("negotiation-ask", [
    `Would ${target} be possible for ${deliverablePhrase(context, "the agreed content")}?`,
    `Do you think ${target} could work for ${deliverablePhrase(context, "the agreed content")}?`,
    `Would you be open to meeting the client at ${target} for ${deliverablePhrase(context, "the agreed content")}?`,
  ]);

  return `${greeting(context.name)}

Thank you again for sharing the details.

${quote} They really like your content and would like to move forward, but the number they approved on their side is ${target}.${reasonSentence(context.reasons)}

${ask} I know it is a bit lower than your original rate, but we would genuinely love to make this collaboration work.${platformSelectionNote(context)}

Let me know what you think, and if it works, I can move into the next step right away.${notesSentence(context.notes)}

${signature(context)}`;
}

function generateContractAddress(context) {
  const creativeRequirements = fieldValue("creativeRequirements");
  const requirementsBlock = creativeRequirements
    ? hasRequirementIntro(creativeRequirements)
      ? `\n\n${creativeRequirements}`
      : `\n\n${pickVariant("contract-requirement-intro", [
          `For the creative side, here are the key points for the ${context.productName}:`,
          `For your content prep, please keep the following ${context.productName} notes in mind:`,
          `To make the prep easier, I am including the main ${context.productName} talking points below:`,
        ])}\n\n${creativeRequirements}`
    : "";
  const opener = pickVariant("contract-opener", [
    `Amazing, thank you for confirming. We are happy to move forward${context.deliverables ? ` with ${deliverablePhrase(context)}` : ""}.`,
    `Perfect, thank you for confirming — excited to move this forward${context.deliverables ? ` with ${deliverablePhrase(context)}` : ""}.`,
    `Great, thank you for sending this over. We can move ahead from here${context.deliverables ? ` with ${deliverablePhrase(context)}` : ""}.`,
  ]);

  return `${greeting(context.name)}

${opener}

I have attached our official contract template (Word document) to this email.

To move forward and lock everything in, please review the agreement and fill out the highlighted sections inside the document, including your Full Name, Shipping Address, and PayPal Account so we can get your product shipped out and your payment processed smoothly.

For the shipping details, please use this format:

Country:
State:
City:
Address:
Postal Code:
Phone Number:
Email:

Whenever you have time, feel free to draft a quick video script/concept and send it over to us for a brief review before you start filming.${requirementsBlock}

Once you return the signed agreement, we will get your products dispatched as soon as possible.

Please let me know if you have any questions. Excited to work with you and looking forward to your script draft!${notesSentence(context.notes)}

${signature(context)}`;
}

function generateFollowUpDraft(context) {
  const deadline = fieldValue("deadline");
  const urgency = selectedValues("urgency")[0] || "温和提醒";
  const urgencyLine =
    urgency === "已逾期需强调"
      ? "Since we are already past the expected timing, the client is hoping to receive the draft as soon as possible."
      : urgency === "稍微加急"
        ? "The client is hoping to review it soon, so it would be wonderful if you could send it over when possible."
        : "Just wanted to gently check in and see how the draft is coming along.";

  const opener = pickVariant("followup-opener", [
    `Hope you are doing well! I wanted to quickly follow up on the draft for ${context.productName}.`,
    `Hope your week is going well. Just checking in on the ${context.productName} draft.`,
    `I hope everything is going smoothly on your side. I wanted to see how the ${context.productName} draft is coming along.`,
  ]);
  const helpLine = pickVariant("followup-help", [
    "If it is already ready, feel free to send the file or link directly here. And if anything is blocking it, just let me know and I can help coordinate.",
    "If you already have a draft or rough cut, you can send it over here and we will take a quick look. If you need anything from us first, just let me know.",
    "Feel free to send over whatever version you have ready. If there is anything you are unsure about, I am happy to help check it with the client.",
  ]);

  return `${greeting(context.name)}

${opener}

${urgencyLine}${deadline ? ` If possible, it would be great to receive it by ${deadline}.` : ""}${reasonSentence(context.reasons)}

${helpLine}${notesSentence(context.notes)}

${signature(context)}`;
}

function generateEmail() {
  const context = normalizeContext(buildContext());
  const generators = {
    "ask-details": generateAskDetails,
    "ask-budget": generateAskBudget,
    "negotiate-price": generateNegotiation,
    "contract-address": generateContractAddress,
    "follow-up-draft": generateFollowUpDraft,
  };

  const subject = subjectForScenario(activeScenario);
  const body = generators[activeScenario](context).replace(/[ \t]+\n/g, "\n");
  const normalizedBody = polishFinalEmail(body.replace(/\n{3,}/g, "\n\n"), context);
  currentEmail = `Subject: ${subject}\n\n${normalizedBody}`;

  elements.subjectText.textContent = subject;
  elements.subjectLine.classList.remove("is-hidden");
  elements.outputBox.classList.remove("empty");
  elements.outputBox.textContent = normalizedBody;
  setStatus("邮件已生成", "ok");
}

function updateTags() {
  const tags = [
    ["名字", elements.creatorName.value],
    ["署名", elements.senderName.value],
    ["平台", elements.platformOverride.value],
    ["报价", elements.quotedPrice.value],
    ["内容", elements.deliverables.value],
    ["产品", elements.productName.value],
  ].filter(([, value]) => cleanText(value));

  elements.tagRow.innerHTML = tags.length
    ? tags.map(([label, value]) => `<span class="tag"><b>${label}</b> ${value.replace(/\n/g, " / ")}</span>`).join("")
    : `<span class="tag">暂无识别结果</span>`;
}

function setStatus(text, type = "") {
  elements.statusText.textContent = text;
  elements.statusText.className = `status ${type}`.trim();
}

async function copyOutput() {
  if (!currentEmail) {
    setStatus("还没有可复制的邮件", "warn");
    return;
  }
  await navigator.clipboard.writeText(currentEmail);
  elements.copyBtn.classList.add("copied");
  elements.copyBtn.textContent = "已复制";
  setTimeout(() => {
    elements.copyBtn.classList.remove("copied");
    elements.copyBtn.textContent = "复制全文";
  }, 1300);
  setStatus("已复制到剪贴板", "ok");
}

function clearAll() {
  [
    "rawEmail",
    "creatorName",
    "senderName",
    "platformOverride",
    "quotedPrice",
    "deliverables",
    "productName",
    "customNotes",
  ].forEach((key) => {
    elements[key].value = "";
  });
  manualEdited.clear();
  currentEmail = "";
  elements.subjectLine.classList.add("is-hidden");
  elements.outputBox.className = "output-box empty";
  elements.outputBox.textContent = "左侧填好信息后，点击「生成邮件」";
  renderDynamicFields();
  updateTags();
  setStatus("已清空");
}

function bindEvents() {
  elements.rawEmail.addEventListener("input", () => {
    manualEdited.clear();
    ["creatorName", "senderName", "platformOverride", "quotedPrice", "deliverables", "productName"].forEach((key) => {
      elements[key].value = "";
    });
    extractInfo({ overwrite: true });
  });

  ["creatorName", "senderName", "platformOverride", "quotedPrice", "deliverables", "productName"].forEach((key) => {
    elements[key].addEventListener("input", () => {
      manualEdited.add(key);
      updateTags();
    });
  });

  elements.generateBtn.addEventListener("click", generateEmail);
  elements.copyBtn.addEventListener("click", copyOutput);
  elements.clearBtn.addEventListener("click", clearAll);
  elements.sampleBtn.addEventListener("click", () => {
    clearAll();
    activeScenario = "negotiate-price";
    renderScenarioCards();
    renderDynamicFields();
    elements.rawEmail.value = sampleEmail;
    extractInfo({ overwrite: true });
    const target = document.querySelector("#field_targetPrice");
    if (target) target.value = "$350";
  });
}

renderScenarioCards();
renderDynamicFields();
updateTags();
bindEvents();

window.__mailAssistant = {
  generateEmail,
  setScenario(key) {
    if (!SCENARIOS[key]) return;
    activeScenario = key;
    selected = {};
    renderScenarioCards();
    renderDynamicFields();
  },
};
