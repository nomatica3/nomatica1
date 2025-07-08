// src/index.js
import { handleSearch } from "./handleSearch";
import { handleAI } from "./handleAI";
import { classifyIntent } from "./aiIntentClassifier";

export default {
  async fetch(request, env, ctx) {
    const intent = await classifyIntent(request, env);
    if (intent === "search") {
      return handleSearch(request, env);
    }
    if (intent === "summarize") {
      return handleAI(request, env);
    }
    return new Response("Intent unknown. Cannot route.", { status: 400 });
  },
};
