// middleware.js
import { verifyAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token");

  // Verifica si el usuario está autenticado
  const isAuthenticated = await verifyAuth(token);

  // Define las rutas protegidas
  const protectedPaths = ["/dashboard", "/settings"];

  // Si el usuario no está autenticado y está intentando acceder a una ruta protegida, redirígelo al login
  if (
    protectedPaths.some((path) => pathname.startsWith(path)) &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
