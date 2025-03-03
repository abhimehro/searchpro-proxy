export default {
  async fetch(request) {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    // 🔹 Only allow requests from your website (optional security)
    const allowedReferrers = ["yourwebsite.com", "localhost"];
    const referrer = request.headers.get("Referer");

    if (referrer) {
      const referrerHost = new URL(referrer).hostname;
      if (!allowedReferrers.includes(referrerHost)) {
        return new Response("Unauthorized request", { status: 403 });
      }
    }

    if (!query) {
      return Response.redirect("https://chat.openai.com/g/g-67c54b9a7cac8191a9e788dcbfdf9ed6-searchpro", 302);
    }

    const redirectURL = `https://chat.openai.com/g/g-67c54b9a7cac8191a9e788dcbfdf9ed6-searchpro?q=${encodeURIComponent(query)}`;

    return Response.redirect(redirectURL, 302);
  }
};
