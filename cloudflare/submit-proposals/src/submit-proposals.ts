function generateUUID() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  array[6] = (array[6] & 0x0f) | 0x40;
  array[8] = (array[8] & 0x3f) | 0x80;
  const hex = Array.from(array, b => b.toString(16).padStart(2, "0"));
  return `${hex.slice(0,4).join("")}-${hex.slice(4,6).join("")}-${hex.slice(6,8).join("")}-${hex.slice(8,10).join("")}-${hex.slice(10,16).join("")}`;
}

export default {
  async fetch(request: Request): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/uuid") {
      return new Response(generateUUID(), { status: 200 });
    }

    if (pathname === "/api/echo") {
      const body = await request.text();
      return new Response(`Echo: ${body}`);
    }

    return new Response("Not Found", { status: 404 });
  }
};
