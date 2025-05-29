import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Don't apply middleware to API auth routes
  if (isApiAuthRoute) return null;

  // If the user is logged in and accessing an auth route (like /login), redirect to /settings
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // If the user is not logged in and accessing a protected route, redirect to /login
  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  // Allow the request to proceed
  return;
  
});

export const config = {
  matcher: [
    "/((?!_next|.*\\.[\\w]+$).*)",
    "/", // root
  ],
};
