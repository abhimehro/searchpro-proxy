// Use environment variable for URL if available
const SEARCH_PRO_URL =
    "https://chat.openai.com/g/g-fdsdf-searchpro";
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
  async fetch(request, env) {
    const url = new URL(request.url);

    // Check authorization
    if (!isAuthorized(request)) {
      return new Response("Unauthorized", { status: 403 });
    }

    // Handle search requests
    if (url.pathname === "/search") {
      const query = url.searchParams.get("q");
      if (query) {
        // Redirect to SearchPro with query parameter
        return Response.redirect(
          `${SEARCH_PRO_URL}/search?query=${encodeURIComponent(query)}`,
          302
        );
      }
    }

    // Safety check for ASSETS binding
    if (env && env.ASSETS) {
      return env.ASSETS.fetch(request);
    } else {
      // Fallback for static content
      return new Response("Welcome to SearchPro proxy", {
        headers: { "Content-Type": "text/plain" }
      });
    }
  }
};