const SEARCH_PRO_URL =
    "https://chat.openai.com/g/g-67c54b9a7cac8191a9e788dcbfdf9ed6-searchpro";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (!query) {
      return new Response("No search query provided", { status: 400 });
    }

    // Redirect to your SearchPro GPT with query
    return Response.redirect(
      `${SEARCH_PRO_URL}?q=${encodeURIComponent(query)}`,
      302
    );
  }
};
