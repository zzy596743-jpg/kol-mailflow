const SCENARIOS = {
  "ask-details": {
    title: "问具体信息",
    desc: "红人只说感兴趣，需要补报价、档期、账号数据等",
    subject: "Thanks for your interest in our collaboration",
    fields: [
      {
        id: "questions",
        label: "需要补问的信息",
        type: "multi",
        options: ["报价", "档期/交稿时间", "账号数据/媒体包", "是否有使用限制"],
        defaults: ["报价", "档期/交稿时间"],
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
      {
        id: "valueAdds",
        label: "加分话术",
        type: "multi",
        options: ["合作很轻量", "可用音乐+花字", "未来大件产品优先", "使用权和排他清晰"],
        defaults: ["合作很轻量", "未来大件产品优先"],
      },
    ],
    reasons: ["项目预算有限", "预算需根据最终内容确认", "首次合作先试水", "客户还在比较红人报价", "未来有更多产品和合作机会"],
    defaultReasons: ["项目预算有限", "未来有更多产品和合作机会"],
  },
  "negotiate-price": {
    title: "砍价",
    desc: "客户有意向，但给价低于红人报价",
    subject: "Re: Collaboration rate",
    fields: [
      { id: "targetPrice", label: "客户可接受价格", type: "text", placeholder: "例如 $350" },
      {
        id: "valueAdds",
        label: "加分话术",
        type: "multi",
        options: ["强调已向品牌争取", "合作很轻量", "可用音乐+花字", "未来大件产品优先"],
        defaults: ["强调已向品牌争取", "合作很轻量", "未来大件产品优先"],
      },
    ],
    reasons: ["客户预算有限", "首次合作先试水", "希望后续长期合作", "同类型红人价格参考", "样品也会免费寄送"],
  },
  "sweetener-followup": {
    title: "加价跟进",
    desc: "对方未回复时，前置更高预算和减负条件",
    subject: "Re: Updated budget for this collaboration",
    fields: [
      { id: "newBudget", label: "新争取到的预算", type: "text", placeholder: "例如 $550" },
      { id: "personalNote", label: "个性化近况问候", type: "text", placeholder: "例如 Happy birthday to your twins / Loved your recent Pilates update，可留空" },
      {
        id: "valueAdds",
        label: "加分话术",
        type: "multi",
        options: ["主动争取更高预算", "合作很轻量", "可用音乐+花字", "未来大件产品优先", "使用权和排他清晰"],
        defaults: ["主动争取更高预算", "合作很轻量", "未来大件产品优先"],
      },
    ],
    reasons: ["非常认可内容质量", "希望降低合作门槛", "首次合作先试水", "未来有更多产品和合作机会"],
    defaultReasons: ["非常认可内容质量", "未来有更多产品和合作机会"],
  },
  "rate-decline": {
    title: "婉拒保留机会",
    desc: "红人坚持原报价，本轮不继续压价，保持未来合作",
    subject: "Re: Thanks for letting me know",
    fields: [
      { id: "declinedRate", label: "本轮价格 / 对方坚持价格", type: "text", placeholder: "例如 $1,000 / $200，可留空自动识别" },
      { id: "futureTiming", label: "未来跟进时间", type: "text", placeholder: "例如 in a couple months，可留空自动识别" },
      { id: "warmWish", label: "个性化祝福", type: "text", placeholder: "例如 Wishing your girls the most wonderful birthday celebrations，可留空" },
      {
        id: "valueAdds",
        label: "保留关系重点",
        type: "multi",
        options: ["尊重对方报价", "本轮明确pass", "保留未来机会", "未来大件产品优先"],
        defaults: ["尊重对方报价", "本轮明确pass", "保留未来机会", "未来大件产品优先"],
      },
    ],
    reasons: ["客户预算有限", "非常认可内容质量", "未来有更多产品和合作机会"],
    defaultReasons: ["非常认可内容质量", "未来有更多产品和合作机会"],
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
  "未来有更多产品和合作机会": "there may be more product launches and collaboration opportunities after this first round",
  "非常认可内容质量": "we really value the quality of your content",
  "希望降低合作门槛": "we want to keep the collaboration simple and easy to execute",
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

const VALUE_ADD_TEXT = {
  "主动争取更高预算": "I went back to the brand team to advocate for you because we genuinely like the quality of your content.",
  "强调已向品牌争取": "I did go back to the brand team and pushed for the best number I could get approved on this round.",
  "合作很轻量": "No heavy scripting is required; you can keep your usual authentic lifestyle or parenting style.",
  "可用音乐+花字": "If voiceover feels like too much, a fast-paced video with trending sound and text overlays would also work for us.",
  "未来大件产品优先": "If this first test goes smoothly, we can prioritize you for future higher-budget launches across the brand's pipeline, such as pumps, warmers, cameras, and other bigger-ticket products.",
  "使用权和排他清晰": "We can keep the usage and exclusivity terms clear upfront so it is easy for you or your manager to review.",
  "感谢考虑": "Thank you again for taking the time to consider this campaign.",
  "尊重对方报价": "I completely understand and respect you sticking to your usual rate.",
  "保留未来机会": "I would still love to keep the door open for a future collaboration when the budget is a better fit.",
  "本轮明确pass": "For this specific campaign, we will have to pass this time rather than keep pushing you below your standard rate.",
};

const MEMO_STORAGE_KEY = "kolMailFlowMemo";

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
  reparseBtn: document.querySelector("#reparseBtn"),
  sampleBtn: document.querySelector("#sampleBtn"),
  clearBtn: document.querySelector("#clearBtn"),
  copyBtn: document.querySelector("#copyBtn"),
  aiPolishBtn: document.querySelector("#aiPolishBtn"),
  memoBoard: document.querySelector("#memoBoard"),
  copyMemoBtn: document.querySelector("#copyMemoBtn"),
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
let generationSeed = 0;
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
  renderChipGroup("reasons", scenario.reasons, "multi", scenario.defaultReasons || scenario.reasons.slice(0, activeScenario === "contract-address" ? 2 : 1));

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
  return /@iflytalent\.(?:cn|world|work|org|net)\b/i.test(value) || /\biflytalent team\b/i.test(value);
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

function valueAddBullets(context, options = selectedValues("valueAdds")) {
  const lines = options.map((item) => VALUE_ADD_TEXT[item]).filter(Boolean);
  if (!lines.length) return "";
  return `\n\nA few things that may make this easier to consider:\n- ${lines.join("\n- ")}`;
}

function firstValue(values) {
  return values.length ? values[0] : "";
}

function conversationSignals(context) {
  const fullText = context.thread.fullText || "";
  const creatorReply = context.thread.creatorReply || "";
  const ourText = context.thread.ourText || "";
  const creatorPrices = extractPrices(creatorReply);
  const ourPrices = extractPrices(ourText);
  return {
    creatorRate: creatorPrices[0] || context.quotedPrice,
    latestOffer: firstValue(ourPrices),
    hasBackAndForth: (fullText.match(/-----原始邮件-----|On .+ wrote:/gi) || []).length >= 2,
    openFuture: /\b(?:future|check back|couple months|few months|later|next time)\b/i.test(creatorReply),
    noVoiceover: /\b(?:no voiceover|without voiceover|won't be able to do a voiceover|voiceover.*(?:not|isn't).{0,30}seamless)\b/i.test(fullText),
    trendingTextOverlay: /\b(?:trending sound|text overlay|on-screen text|without any voiceover)\b/i.test(fullText),
    alreadySimplified: /\b(?:no heavy scripting|no formal scripting|required|trending sound|text overlay|Instagram-only|single platform)\b/i.test(ourText),
    alreadyAdvocated: /\b(?:went back to the brand team|advocate|managed to secure|increased flat rate|higher flat rate|stretch our budget)\b/i.test(ourText),
    hadContractStep: /\b(?:contract template|agreement|next steps|get your product shipped|product shipped out)\b/i.test(ourText),
  };
}

function contextBridgeLine(context, scenario) {
  const signals = conversationSignals(context);
  if (scenario === "rate-decline") {
    if (signals.alreadyAdvocated && signals.latestOffer) {
      return `I know we had already tried to stretch the budget to ${signals.latestOffer} and make the scope easier on your side, so I really appreciate you considering it seriously.`;
    }
    if (signals.alreadySimplified) {
      return "I also appreciate you taking the time to consider the simplified content setup we discussed.";
    }
    if (signals.hasBackAndForth) {
      return "I know we have gone back and forth on the details, so I really appreciate your patience throughout the conversation.";
    }
  }
  if (scenario === "sweetener-followup") {
    if (signals.noVoiceover && signals.trendingTextOverlay) {
      return "I also remembered your preference for keeping the content seamless, so we can keep the format closer to trending sound with text overlay rather than a heavy voiceover.";
    }
    if (signals.noVoiceover) {
      return "I also noted your concern about voiceover, so we can keep the content direction as natural to your usual style as possible.";
    }
  }
  if (scenario === "negotiate-price" && signals.noVoiceover) {
    return "I also kept your note about voiceover in mind and will make sure the content direction stays as natural as possible for your style.";
  }
  return "";
}

function personalNoteLine(note) {
  const text = cleanText(note);
  if (!text) return "";
  if (/[.!?]$/.test(text)) return text;
  return text;
}

function extractMoney(text) {
  const clean = cleanText(text);
  const match = clean.match(/(?:USD\s*)?[$€£]\s?\d[\d,]*(?:\.\d+)?|\b\d[\d,]*(?:\.\d+)?\s?(?:USD|EUR|GBP|dollars?)\b|\b\d[\d,]*(?:\.\d+)?\s?\$/i);
  if (!match) return "";
  const value = match[0].trim();
  if (/\$$/.test(value)) return `$${value.replace(/\s?\$$/, "")}`;
  return value;
}

function contractDealSummary(context) {
  const noteText = context.notes;
  const hasClientConfirmation = /客户.*(?:确认|确定|同意|通过|接受|批准)|brand.*(?:confirm|approve|accept)|client.*(?:confirm|approve|accept)/i.test(noteText);
  const notePrice = extractMoney(noteText);
  const price = notePrice || extractMoney(context.thread.ourText) || context.quotedPrice;
  const instagramOnly = /(?:单个|单独|only|single|ig only|instagram only|ig平台|ins平台|instagram平台|ig\b|instagram\b)/i.test(noteText)
    && !/(?:tiktok|两个|both|双平台)/i.test(noteText);
  const tiktokOnly = /(?:tiktok only|single tiktok|单个tiktok|tiktok平台)/i.test(noteText)
    && !/(?:instagram|ig|两个|both|双平台)/i.test(noteText);

  let scope = "";
  if (instagramOnly) scope = `the Instagram-only package (${DEFAULT_PLATFORM_PACKAGES.Instagram})`;
  else if (tiktokOnly) scope = `the TikTok-only package (${DEFAULT_PLATFORM_PACKAGES.TikTok})`;
  else if (context.deliverables) scope = deliverablePhrase(context);
  else if (context.platform) scope = `${context.platform} content package`;

  if (!hasClientConfirmation && !notePrice && !instagramOnly && !tiktokOnly) return null;
  return { hasClientConfirmation, price, scope };
}

function extractFutureTiming(text) {
  const clean = cleanText(text);
  const patterns = [
    /\b(?:in|after)\s+(?:a\s+)?(?:couple|few)\s+months?\b/i,
    /\b(?:in|after)\s+\d+\s+months?\b/i,
    /\bnext\s+(?:month|quarter|season)\b/i,
    /\bwhen\s+(?:you|the brand|we)\s+[^.?!]{0,80}\b/i,
  ];
  for (const pattern of patterns) {
    const match = clean.match(pattern);
    if (match) return match[0].trim();
  }
  return "";
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
    "sweetener-followup": [
      "Re: Updated budget for this collaboration",
      "Re: Improved budget and easier content scope",
      "Re: A better setup for the campaign",
    ],
    "rate-decline": [
      "Re: Thanks for letting me know",
      "Re: Keeping in touch for future opportunities",
      "Re: Future collaboration",
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
    futureOpportunities: /未来.*(?:合作|机会|产品)|更多.*(?:合作|机会|产品)|长期机会|more product launches|more collaboration opportunities|future opportunities/i.test(source),
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
  if (/未来.*(?:合作|机会|产品)|更多.*(?:合作|机会|产品)|长期机会/i.test(value)) return "there may be more product launches and collaboration opportunities after this first round";
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
  if (flags.futureOpportunities) reasonOptions.push("there may be more product launches and collaboration opportunities after this first round");
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

function translateCustomNotes(notes, options = {}) {
  const text = cleanText(notes);
  if (!text) return [];
  const includeDealConfirmation = options.includeDealConfirmation !== false;
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
  if (/未来.*(?:合作|机会|产品)|更多.*(?:合作|机会|产品)|长期机会|future opportunit|more product|more collaboration/i.test(text)) {
    items.push("If this first project goes smoothly, there may be more product launches and collaboration opportunities we can explore together.");
  }
  if (/usage rights?|digital usage|ad purposes?|exclusivity|campaign period|paid usage|spark ads/i.test(text)) {
    const usageDays = text.match(/(\d+)\s*-\s*day|\b(\d+)\s*day/i);
    const days = usageDays ? `${usageDays[1] || usageDays[2]}-day` : "short-term";
    if (/exclusivity/i.test(text)) {
      items.push(`For usage, this would include ${days} digital usage rights for ad purposes, along with standard industry exclusivity during the campaign period.`);
    } else {
      items.push(`For usage, this would include ${days} digital usage rights for ad purposes.`);
    }
  }
  if (includeDealConfirmation && /客户.*(?:确认|确定|同意|通过|接受|批准)|brand.*(?:confirm|approve|accept)|client.*(?:confirm|approve|accept)/i.test(text)) {
    const dealPrice = extractMoney(text);
    const platform = /(?:单个|单独|only|single|ig only|instagram only|ig平台|ins平台|instagram平台|ig\b|instagram\b)/i.test(text)
      ? "the Instagram-only package"
      : /(?:tiktok only|single tiktok|单个tiktok|tiktok平台)/i.test(text)
        ? "the TikTok-only package"
        : "the confirmed package";
    items.push(`The brand team has confirmed moving forward with ${platform}${dealPrice ? ` at ${dealPrice}` : ""}.`);
  }
  if (!items.length && !hasChinese(text)) items.push(text);
  return uniqueValues(items);
}

function notesSentence(notes, options = {}) {
  const items = translateCustomNotes(notes, options);
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
  const base = `${key}|${cleanText(elements.rawEmail.value)}|${activeScenario}|${generationSeed}`;
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
  if (context.thread.asked.timeline && !context.thread.given.timeline) missingFromThread.push("档期/交稿时间");
  if (context.thread.asked.mediaKit && !context.thread.given.mediaKit) missingFromThread.push("账号数据/媒体包");
  if (context.thread.asked.restrictions && !context.thread.given.restrictions) missingFromThread.push("是否有使用限制");
  if (context.thread.asked.child && !context.thread.given.child) missingFromThread.push("孩子相关信息");

  const questionMap = {
    报价: "your rate for this collaboration",
    "档期/交稿时间": context.thread.timelinePrompt || "your usual timeline after receiving the sample",
    "账号数据/媒体包": "your media kit or recent account insights, if you have them handy",
    是否有使用限制: "any usage or posting restrictions we should know about",
    孩子相关信息: "your child's age, and whether they could appear in the video even just from the side or without showing their face",
  };
  const items = uniqueValues([...missingFromThread, ...questions])
    .filter((item) => {
      if (item === "报价") return !context.thread.given.rate;
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
        "I do not want to overstate the budget before the client finishes comparing options, so your usual package rate would be very helpful first.",
        "We have a general range in mind, but I would rather understand what would feel fair on your side before I take it back internally.",
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
    "Yes, absolutely — thanks for checking.",
    "I completely understand wanting to confirm the budget first.",
    "That makes complete sense to ask before we get too far into the details.",
    "Yes, I can share where we are at on budget.",
    "I hear you — it is always helpful to align on budget early.",
    "Absolutely, and I appreciate you checking this upfront.",
    "Sure, happy to clarify the budget side a bit.",
  ]);
  const close = pickVariant("budget-close", [
    "I can then take it back to the client and try to push this forward from there.",
    "Once I have that, I can bring it to the client and see how close we can get.",
    "That will help me position this properly with the client.",
    "From there, I can check internally and come back with a clearer next step.",
    "Once I have your thoughts, I can go back to the client with a more realistic recommendation.",
    "That would give me something concrete to discuss with the client and hopefully keep this moving.",
    "If we can find a number that feels reasonable on both sides, I would be happy to push it forward.",
  ]);

  return `${greeting(context.name)}

${opener}

${budgetLine}${reasonSentence(context.reasons)}

${askRate} If you have separate package options, that would be even better.${platformSelectionNote(context)}
${valueAddBullets(context)}

${close}${notesSentence(context.notes)}

${signature(context)}`;
}

function generateNegotiation(context) {
  const target = fieldValue("targetPrice") || "[target price]";
  const bridge = contextBridgeLine(context, "negotiate-price");
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
${bridge ? `\n\n${bridge}` : ""}

${ask} I know it is a bit lower than your original rate, but we would genuinely love to make this collaboration work.${platformSelectionNote(context)}
${valueAddBullets(context)}

Let me know what you think, and if it works, I can move into the next step right away.${notesSentence(context.notes)}

${signature(context)}`;
}

function generateSweetenerFollowup(context) {
  const newBudget = fieldValue("newBudget") || fieldValue("targetPrice") || fieldValue("budget");
  const personalNote = personalNoteLine(fieldValue("personalNote"));
  const bridge = contextBridgeLine(context, "sweetener-followup");
  const budgetLine = newBudget
    ? pickVariant("sweetener-budget-number", [
        `I went back to the brand team to advocate for you, and I was able to get the budget increased to ${newBudget}.`,
        `Because we really like your content quality, I pushed this again internally and got the brand to move the budget up to ${newBudget}.`,
        `I did not want to lose the chance to work together, so I went back to the brand team and got ${newBudget} approved for this round.`,
      ])
    : pickVariant("sweetener-budget-no-number", [
        "I went back to the brand team to advocate for you and asked if we could make the setup a bit stronger.",
        "Because we really like your content quality, I checked internally again to see how we could make this easier to say yes to.",
        "I wanted to follow up with a more thoughtful setup instead of just sending a plain reminder.",
      ]);
  const opener = pickVariant("sweetener-opener", [
    "I wanted to quickly follow up with a better setup for this collaboration.",
    "Just wanted to come back with a more concrete update on this campaign.",
    "I wanted to circle back because I still think this could be a really good fit.",
  ]);
  const deliverableLine = context.deliverables
    ? `For clarity, the current content scope would be ${deliverablePhrase(context)}${platformSuffix(context)}.`
    : "For clarity, we can keep the scope simple and easy to review.";
  const close = pickVariant("sweetener-close", [
    "Would this updated setup feel more workable on your side?",
    "If this feels closer, I would be happy to take your confirmation back to the client.",
    "Let me know if this makes the collaboration easier to consider, and I can move it forward from there.",
  ]);

  return `${greeting(context.name)}

${personalNote ? `${personalNote}\n\n` : ""}${opener}

${budgetLine}

${bridge ? `${bridge}\n\n` : ""}${deliverableLine}${platformSelectionNote(context)}
${valueAddBullets(context)}

${close}${notesSentence(context.notes)}

${signature(context)}`;
}

function generateRateDecline(context) {
  const futureTiming = fieldValue("futureTiming") || extractFutureTiming(context.thread.creatorReply) || "when a better-fit opportunity comes up";
  const signals = conversationSignals(context);
  const bridge = contextBridgeLine(context, "rate-decline");
  const declinedRate = fieldValue("declinedRate") || extractPrices(context.thread.creatorReply)[0] || context.quotedPrice;
  const warmWish = personalNoteLine(fieldValue("warmWish"));
  const isLowPriceProduct = /wipe|wipes|湿巾/i.test(context.productName);
  const productPhrase = context.productName && context.productName !== "the product"
    ? isLowPriceProduct
      ? `this specific low-priced ${context.productName} campaign`
      : `this specific ${context.productName} campaign`
    : "this specific campaign";
  const opener = pickVariant("rate-decline-opener", [
    "Thank you for your quick reply and for being so upfront about your rate.",
    "Thank you for your quick and honest reply.",
    "Thanks so much for letting me know, and I really appreciate the transparency.",
  ]);
  const budgetLine = declinedRate
    ? pickVariant("rate-decline-budget-rate", [
        `I completely understand and respect your decision to stick to your standard pricing. While we cannot quite make the ${declinedRate} rate work for ${productPhrase}, we would absolutely love to partner with you on future projects.`,
        `I completely understand and respect your decision regarding the pricing. Since our current budget for ${productPhrase} is limited, we will have to pass this time, but we would still love to work with you in the future.`,
        `I fully understand you needing to stay at ${declinedRate}. For ${productPhrase}, the budget is still too limited on our side, so I do not want to keep pushing you below your standard rate.`,
      ])
    : pickVariant("rate-decline-budget-no-rate", [
        `I completely understand and respect your decision regarding the pricing. Since our current budget for ${productPhrase} is limited, we will have to pass this time, but we would still love to work with you in the future.`,
        `For ${productPhrase}, the budget is still too limited on our side, so I do not want to keep pushing you below your standard rate.`,
        `It sounds like this round may not be the right fit budget-wise, and I completely understand.`,
      ]);
  const futureLine = pickVariant("rate-decline-future", [
    `I will definitely keep your profile at the top of our list and check back ${futureTiming} when we have higher-budget baby gear or nursery electronics campaigns launching.`,
    `I will keep your profile at the top of our list and reach out ${futureTiming} as soon as we have higher-budget campaigns that can better match your standard rates.`,
    `I would love to keep you in mind for future higher-budget launches, and I can check back ${futureTiming} when we have a stronger-fit campaign.`,
  ]);
  const relationshipLine = signals.hadContractStep
    ? "Since we had already started discussing next steps, I especially appreciate you being direct with me before we moved further."
    : "";
  const wishLine = warmWish
    ? `${warmWish}${/[.!?]$/.test(warmWish) ? "" : "."} Let's definitely stay in touch.`
    : pickVariant("rate-decline-wish", [
        "Wishing you and your family a wonderful season ahead, and we will stay in touch.",
        "Thanks again for considering this one, and let's definitely stay in touch.",
        "Really appreciate your time, and I hope we can find a better fit soon.",
      ]);
  const close = pickVariant("rate-decline-close", [
    "Thank you again, and I hope we can work together on a stronger-fit campaign in the future.",
    "Really appreciate your time and openness here.",
    "Thank you again for considering this campaign.",
  ]);

  return `${greeting(context.name)}

${opener}

${bridge ? `${bridge}\n\n` : ""}${relationshipLine ? `${relationshipLine}\n\n` : ""}${budgetLine}

${futureLine}

${wishLine}

${close}${notesSentence(context.notes)}

${signature(context)}`;
}

function generateContractAddress(context) {
  const creativeRequirements = fieldValue("creativeRequirements");
  const deal = contractDealSummary(context);
  const requirementsBlock = creativeRequirements
    ? hasRequirementIntro(creativeRequirements)
      ? `\n\n${creativeRequirements}`
      : `\n\n${pickVariant("contract-requirement-intro", [
          `For the creative side, here are the key points for the ${context.productName}:`,
          `For your content prep, please keep the following ${context.productName} notes in mind:`,
          `To make the prep easier, I am including the main ${context.productName} talking points below:`,
        ])}\n\n${creativeRequirements}`
    : "";
  const opener = deal
    ? pickVariant("contract-confirmed-opener", [
        `Great, thank you for the update. I just confirmed with the brand team, and they are happy to move forward${deal.scope ? ` with ${deal.scope}` : ""}${deal.price ? ` at ${deal.price}` : ""}.`,
        `Perfect, I just checked with the brand team and we can move ahead${deal.scope ? ` with ${deal.scope}` : ""}${deal.price ? ` at ${deal.price}` : ""}.`,
        `Wonderful, the brand team has confirmed that they would like to proceed${deal.scope ? ` with ${deal.scope}` : ""}${deal.price ? ` at ${deal.price}` : ""}.`,
      ])
    : pickVariant("contract-opener", [
        `Amazing, thank you for confirming. We are happy to move forward${context.deliverables ? ` with ${deliverablePhrase(context)}` : ""}.`,
        `Perfect, thank you for confirming — excited to move this forward${context.deliverables ? ` with ${deliverablePhrase(context)}` : ""}.`,
        `Great, thank you for sending this over. We can move ahead from here${context.deliverables ? ` with ${deliverablePhrase(context)}` : ""}.`,
      ]);

  return `${greeting(context.name)}

${opener}

I have attached our official contract template (PDF document) to this email.

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

Please let me know if you have any questions. Excited to work with you and looking forward to your script draft!${notesSentence(context.notes, { includeDealConfirmation: false })}

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
  generationSeed += 1;
  const context = normalizeContext(buildContext());
  const generators = {
    "ask-details": generateAskDetails,
    "ask-budget": generateAskBudget,
    "negotiate-price": generateNegotiation,
    "sweetener-followup": generateSweetenerFollowup,
    "rate-decline": generateRateDecline,
    "contract-address": generateContractAddress,
    "follow-up-draft": generateFollowUpDraft,
  };

  const subject = subjectForScenario(activeScenario);
  const body = generators[activeScenario](context).replace(/[ \t]+\n/g, "\n");
  const normalizedBody = polishFinalEmail(body.replace(/\n{3,}/g, "\n\n"), context);
  currentEmail = normalizedBody;

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
  const editedBody = elements.outputBox.classList.contains("empty") ? "" : elements.outputBox.innerText.trim();
  if (!editedBody) {
    setStatus("还没有可复制的邮件", "warn");
    return;
  }
  currentEmail = editedBody;
  await navigator.clipboard.writeText(currentEmail);
  elements.copyBtn.classList.add("copied");
  elements.copyBtn.textContent = "已复制";
  setTimeout(() => {
    elements.copyBtn.classList.remove("copied");
    elements.copyBtn.textContent = "复制全文";
  }, 1300);
  setStatus("已复制到剪贴板", "ok");
}

async function polishWithAI() {
  if (elements.outputBox.classList.contains("empty") || !cleanText(elements.outputBox.innerText)) {
    generateEmail();
  }

  const context = normalizeContext(buildContext());
  const draft = elements.outputBox.innerText.trim();
  if (!draft) {
    setStatus("请先生成一版草稿", "warn");
    return;
  }

  elements.aiPolishBtn.disabled = true;
  elements.aiPolishBtn.textContent = "润色中...";
  setStatus("AI 正在结合上下文重写邮件", "ok");

  try {
    const response = await fetch("/api/generate-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: SCENARIOS[activeScenario]?.title || activeScenario,
        rawEmail: cleanText(elements.rawEmail.value),
        draft,
        customNotes: cleanText(elements.customNotes.value),
        memo: cleanText(elements.memoBoard.value),
        extracted: {
          creatorName: context.name,
          senderName: context.senderName,
          platform: context.platform,
          quotedPrice: context.quotedPrice,
          deliverables: context.deliverables,
          productName: context.productName,
          reasons: context.reasons,
        },
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "AI 润色失败");

    elements.outputBox.classList.remove("empty");
    elements.outputBox.textContent = data.email.trim();
    currentEmail = data.email.trim();
    setStatus(`AI 已润色${data.model ? `（${data.model}）` : ""}`, "ok");
  } catch (error) {
    setStatus(error.message || "AI 润色失败，请稍后再试", "warn");
  } finally {
    elements.aiPolishBtn.disabled = false;
    elements.aiPolishBtn.textContent = "AI润色";
  }
}

async function copyMemo() {
  const text = cleanText(elements.memoBoard.value);
  if (!text) {
    setStatus("备忘录还是空的", "warn");
    return;
  }
  await navigator.clipboard.writeText(elements.memoBoard.value);
  elements.copyMemoBtn.textContent = "已复制";
  setTimeout(() => {
    elements.copyMemoBtn.textContent = "复制";
  }, 1300);
  setStatus("备忘录已复制", "ok");
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
  elements.memoBoard.value = localStorage.getItem(MEMO_STORAGE_KEY) || "";
  elements.memoBoard.addEventListener("input", () => {
    localStorage.setItem(MEMO_STORAGE_KEY, elements.memoBoard.value);
  });

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
  elements.aiPolishBtn.addEventListener("click", polishWithAI);
  elements.outputBox.addEventListener("input", () => {
    if (!elements.outputBox.classList.contains("empty")) {
      setStatus("预览已手动修改，复制时会使用当前内容", "ok");
    }
  });
  elements.copyMemoBtn.addEventListener("click", copyMemo);
  elements.reparseBtn.addEventListener("click", () => {
    manualEdited.clear();
    ["creatorName", "senderName", "platformOverride", "quotedPrice", "deliverables", "productName"].forEach((key) => {
      elements[key].value = "";
    });
    extractInfo({ overwrite: true });
    setStatus("已重新识别当前邮件", "ok");
  });
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
