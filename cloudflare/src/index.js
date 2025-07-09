export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);

    // API: /api/uuid
    if (pathname === "/api/uuid") {
      return new Response(crypto.randomUUID(), { status: 200 });
    }

    // API: /api/echo
    if (pathname === "/api/echo") {
      const body = await request.text();
      return new Response(`Echo: ${body}`, { status: 200 });
    }

    // API: /api/headers
    if (pathname === "/api/headers") {
      const headers = Object.fromEntries(request.headers.entries());
      return new Response(JSON.stringify(headers, null, 2), { status: 200 });
    }

    // Home page example
    if (pathname === "/" || pathname === "/home") {
      return new Response("👋 Welcome to the Home Page!");
    }

    // Fallback
    return new Response("Not Found", { status: 404 });
  }
};
