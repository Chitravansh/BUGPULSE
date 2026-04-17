const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function analyzeBug(description) {
  const response = await client.chat.completions.create({
    model: "gemini-3-flash-preview",
    messages: [
      {
        role: "system",
        content: "You are a software debugging assistant.",
      },
      {
        role: "user",
        content: `
Analyze this bug and give:
1. Short summary (in 60 words)
2. Possible causes (in 3-4 points)
3. Suggested fix (in 3-4 points)

Bug:
${description}
        `,
      },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = { analyzeBug };