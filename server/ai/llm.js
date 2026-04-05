const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function analyzeBug(description) {
  const response = await client.chat.completions.create({
    model: "stepfun/step-3.5-flash:free",
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