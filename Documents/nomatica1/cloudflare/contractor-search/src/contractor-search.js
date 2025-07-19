export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    
    // Serve random UUID for /api/uuid
    if (pathname === "/api/uuid") {
      return new Response(crypto.randomUUID(), { status: 200 });
    }

    // Serve random UUID for /random (button in HTML)
    if (pathname === "/random") {
      return new Response(crypto.randomUUID(), { status: 200 });
    }

    // Serve message for /message (heading in HTML)
    if (pathname === "/message") {
      return new Response("👋 Hello from the Worker!", { status: 200 });
    }

    // Fallback to static assets
    return fetch(request);
  }
};
