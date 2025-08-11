import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server";

const publicRoutes = [
  { path: "/", whenAuthenticated: "next" },
  { path: "/auth", whenAuthenticated: "redirect" },
] as const;

//https://www.youtube.com/watch?v=nlc-l2nW_J0&list=WL&index=59&ab_channel=Rocketseat
const REDIRECT_WHEN_UNAUTHENTICATED = "/auth";
/* const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".ico"]; */


export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
/*    if (IMAGE_EXTENSIONS.some((ext) => pathname.endsWith(ext))) {
    return NextResponse.next();
  }  */
   
  
    //const token = request.cookies.get('token')?.value
    const token = request.cookies.get("elevate-token");


    // Se for rota pública, libera
    if (publicRoutes.find((route) => route.path == pathname)) {      
      return NextResponse.next()
    }
  
    // Se não tiver token, bloqueia e redireciona para login
    if (!token) {
      const loginUrl = new URL(REDIRECT_WHEN_UNAUTHENTICATED, request.url)
      return NextResponse.redirect(loginUrl)
    }
  
    // Se tiver token, libera
    return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};

