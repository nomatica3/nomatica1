import { handleSearch } from "./searchHandler";
import { handleAI } from "./aiHandler";
import { classifyIntent } from "./aiIntentClassifier";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Let AI classify intent
    const intent = await classifyIntent(request, env);

    // Route based on AI decision
    if (intent === "search") {
      return handleSearch(request, env);
    }
    if (intent === "summarize") {
      return handleAI(request, env);
    }

    return new Response("Intent unknown. Cannot route.", { status: 400 });
  }
};
