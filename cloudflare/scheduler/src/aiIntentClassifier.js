// aiIntentClassifier.js
export async function classifyIntent(request, env) {
  const text = await request.text();

  const prompt = `
You are an intent classification AI. Analyze the request and return ONLY one of:
"search", "summarize", or "unknown".

Request Path: ${request.url}
Request Body: ${text}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // or whichever model you prefer
      messages: [
        { role: "system", content: "You classify intents." },
        { role: "user", content: prompt }
      ],
      max_tokens: 10,
      temperature: 0,
    }),
  });

  const data = await response.json();
  const intent = data.choices[0].message.content.trim().toLowerCase();

  return intent;
}
