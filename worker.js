// Use environment variable for URL if available
const SEARCH_PRO_URL = (typeof process !== 'undefined' && process.env.SEARCH_PRO_URL) ||
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

    // Handle search requests
    if (url.pathname === "/search") {
      const query = url.searchParams.get("q");
      if (query) {
        // Redirect to SearchPro with query parameter
        return Response.redirect(
            `https://searchpro-destination.com/search?query=${encodeURIComponent(query)}`,
            302
        );
      }
    }

    // Serve static content for everything else
    return env.ASSETS.fetch(request);
  }
};
// Make sure environment variable is configured in wrangler.toml's [vars] section
// Ensure ASSETS binding is defined in wrangler.toml
// Consider using the isAuthorized() function in your request handling logic
// Update ALLOWED_REFERRERS with your actual production domains