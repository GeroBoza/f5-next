import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { decode } from "punycode";

const secret = process.env.NEXTAUTH_SECRET; // Asegúrate de definir esto en tus variables de entorno

// Define the token type
interface DecodedToken {
  exp: number;
  [key: string]: any; // Add other properties if needed
}

export async function middleware(request: NextRequest) {
  const localSessionToken = request.cookies.get(
    "next-auth.session-token",
  )?.value;
  const secureSessionToken = request.cookies.get(
    "__Secure-next-auth.session-token",
  )?.value;

  const token = localSessionToken || secureSessionToken;

  if (!token) {
    if (!request.nextUrl.pathname.startsWith("/auth/login")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  const decodedToken = (await getToken({
    req: request,
    secret,
  })) as DecodedToken;

  if (!decodedToken || (decodedToken && Date.now() > decodedToken.exp * 1000)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/friends", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/friends", "/teams", "/matches", "/profile", "/auth/login"],
};
