import { handleSearch } from "./searchHandler";
import { handleAI } from "./aiHandler";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === "/api/search") {
      return handleSearch(request, env);
    }
    if (pathname === "/api/summarize") {
      return handleAI(request, env);
    }
    return new Response("Not Found", { status: 404 });
  },
};
