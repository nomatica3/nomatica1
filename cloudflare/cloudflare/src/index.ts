export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/" || pathname === "/home") {
      return new Response("👋 Welcome to the Home Page (supports / and /home)!");
    }

    if (pathname === "/search") {
      const query = new URL(request.url).searchParams.get("q") || "default";
      return new Response(`🔍 You searched for: ${query}`);
    }

    return new Response("Not Found", { status: 404 });
  },
};
