import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";
import { User } from "@/lib/models/User";
import axios from "axios";
import useAuth from "./data/hooks/useAuth";

const UNAUTH_ROUTE = "/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("elevate-token");
  
   if (!token) {
    return NextResponse.redirect(new URL(UNAUTH_ROUTE, request.url));
  }

  //? futuramente vai pegar o jwt e validar se ele é valido
  try {
    let res = await axios.post<User>("http://localhost:8080/users/validate", { token: token?.value });
    //await login?.(res.data);
    return NextResponse.next();
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL(UNAUTH_ROUTE, request.url));
  }
  
  
 /*  if (!res.data) {
    return NextResponse.redirect(new URL(UNAUTH_ROUTE, request.url));
  } */

  //colocar pra fazer o auth aqui
}

export const config = {
  matcher: ["/dashboard/(.*)"],
};
