import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const UNAUTH_ROUTE = "/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("elevate-token");
  
   if (!token) {
    return NextResponse.redirect(new URL(UNAUTH_ROUTE, request.url));
  }

  //teste

  //? futuramente vai pegar o jwt e validar se ele é valido
  try {
    await axios.post("https://elevatepromedia.com/api/users/validate", { token: token?.value });
    //await login(response.data);
    return NextResponse.next();
  } catch (err) {
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
