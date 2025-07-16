import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server";

const publicRoutes = [
  { path: "/auth", whenAuthenticated: "redirect" },
  { path: "/projects", whenAuthenticated: "next" },
  { path: "/projects/registers", whenAuthenticated: "next" },
  //{ path: "/teste", whenAuthenticated: "next" },
] as const;

//https://www.youtube.com/watch?v=nlc-l2nW_J0&list=WL&index=59&ab_channel=Rocketseat
const REDIRECT_WHEN_UNAUTHENTICATED = "/auth";

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => path === route.path);
  const authToken = request.cookies.get("token");

  //todo: quando faz login salva o jtw ou o uid do usuario nos cookies
  //nao sera mais necessario p authcotext hehe
  // puxar a validacao do uid que tem no useeffect para aqui

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_UNAUTHENTICATED;

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    return NextResponse.redirect(new URL("/equipaments/", request.url));
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_UNAUTHENTICATED;

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};

