// Use environment variable for URL if available
const SEARCH_PRO_URL = (typeof process !== 'undefined' && process.env.SEARCH_PRO_URL) ||
    "https://chat.openai.com/g/g-67c54b9a7cac8191a9e788dcbfdf9ed6-searchpro";
const ALLOWED_REFERRERS = ["yourwebsite.com", "localhost"];

/**
 * Checks if the request is authorized based on referrer
 * @param {Request} request - The incoming request
 * @returns {boolean} Whether the request is authorized
 */
function isAuthorized(request) {
  const referrer = request.headers.get("Referer");
  if (!referrer) return true;

  const referrerHost = new URL(referrer).hostname;
  return ALLOWED_REFERRERS.includes(referrerHost);
}

export default {
  async fetch(request) {
    try {
      // Check authorization
      if (!isAuthorized(request)) {
        return new Response("Unauthorized request", {
          status: 403,
          headers: {"Content-Type": "text/plain"}
        });
      }

      const url = new URL(request.url);
      const query = url.searchParams.get("q")?.trim();

      // If no query parameter, redirect to base URL
      if (!query) {
        return Response.redirect(SEARCH_PRO_URL, 302);
      }

      // Redirect with query parameter
      const redirectURL = `${SEARCH_PRO_URL}?q=${encodeURIComponent(query)}`;
      return Response.redirect(redirectURL, 302);
    } catch (error) {
      console.error("Error processing request:", error);
      return new Response(`Error processing request: ${error.message}`, {
        status: 500,
        headers: {"Content-Type": "text/plain"}
      });
    }
  }
};
