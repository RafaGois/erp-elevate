import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";

const UNAUTH_ROUTE = "/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("elevate-token");
  console.log(token);
  //? futuramente vai pegar o jwt e validar se ele é valido
  if (!token) {
    return NextResponse.redirect(new URL(UNAUTH_ROUTE, request.url));
  }
}

export const config = {
  matcher: ["/dashboard/(.*)"],
};
