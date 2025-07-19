export async function handleSearch(request, env) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return new Response(JSON.stringify({ error: "Missing query" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const bingRes = await fetch(`https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(q)}`, {
    headers: { "Ocp-Apim-Subscription-Key": env.BING_API_KEY }
  });
  const bingData = await bingRes.json();

  return new Response(JSON.stringify(bingData), {
    headers: { "Content-Type": "application/json" },
  });
}
