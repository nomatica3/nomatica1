export async function handleAI(request, env) {
  const body = await request.json();
  const { text } = body;

  if (!text) {
    return new Response(JSON.stringify({ error: "Missing text" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize this text:" },
        { role: "user", content: text }
      ],
      max_tokens: 300
    })
  });

  const data = await openaiRes.json();

  return new Response(JSON.stringify({ summary: data.choices[0].message.content }), {
    headers: { "Content-Type": "application/json" },
  });
}
