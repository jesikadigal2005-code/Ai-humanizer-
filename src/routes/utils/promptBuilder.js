export default function buildPrompt(text, tone = "natural") {
  return `
Rewrite the text below so it sounds completely human-written.

Rules:
- No robotic phrasing
- No repetition
- Natural sentence flow
- Slight imperfections like a real writer
- Avoid AI patterns

Tone: ${tone}

Text:
${text}
`;
}
