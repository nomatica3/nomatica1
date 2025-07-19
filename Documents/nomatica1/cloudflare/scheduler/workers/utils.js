export function formatResults(results) {
  return results.map(r => ({
    title: r.name,
    url: r.url,
    snippet: r.snippet
  }));
}
