const SEARCH_PRO_URL = "https://chat.openai.com/g/g-67c54b9a7cac8191a9e788dcbfdf9ed6-searchpro";

export default {
  async fetch(request) {
    try {
      const url = new URL(request.url);
      const query = url.searchParams.get("q");

      if (!query) {
        return Response.redirect(SEARCH_PRO_URL, 302);
      }

      // Properly construct the redirect URL
      const redirectUrl = `${SEARCH_PRO_URL}#q=${encodeURIComponent(query)}`;
      return Response.redirect(redirectUrl, 302);
    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
  }
};
