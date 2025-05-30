/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
const publicRoutes = ["/", "/new-verification"];
/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
const authRoutes = ["/login", "/register", "/error", "/reset", "/new-password"];

/**
 * The Prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
const apiAuthPrefix = "/api/auth";

/**
 * The Default redirect path after logging in
 * @type {string}
 */

const DEFAULT_LOGIN_REDIRECT = "/settings";

export { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes };
