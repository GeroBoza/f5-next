import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const localSessionToken = request.cookies.get(
    "next-auth.session-token",
  )?.value;
  const secureSessionToken = request.cookies.get(
    "__Secure-next-auth.session-token",
  )?.value;

  const currentUser = localSessionToken || secureSessionToken;

  if (!currentUser && !request.nextUrl.pathname.startsWith("/auth/login")) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
  if (currentUser && request.nextUrl.pathname.startsWith("/auth/login")) {
    return Response.redirect(new URL("/friends", request.url)); // Redirigir a la página de inicio u otra página
  }
}

export const config = {
  matcher: ["/friends", "/teams", "/matches", "/profile", "/auth/login"],
};
