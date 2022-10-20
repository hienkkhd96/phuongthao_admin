import { NextResponse } from "next/server";
import checkJwtIsValid from "./lib/auth";
const secret = process.env.SECRET || "ttphuongthao";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  if (
    request.url.includes("login") ||
    request.url.includes("authFailed") ||
    (request.url.includes("user") && request.method == "POST") ||
    request.url.includes("404") ||
    request.url.includes("register")
  ) {
    return NextResponse.next();
  }
  const isValid = await checkJwtIsValid(request);
  if (isValid) {
    return NextResponse.next();
  } else {
    const url = request.nextUrl.clone();
    url.pathname = "/api/authFailed";
    return NextResponse.rewrite(url);
  }
}
export const config = {
  matcher: "/api/:path*",
};
