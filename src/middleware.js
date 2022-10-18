import { NextResponse } from "next/server";
import checkJwtIsValid from "./lib/auth";
const secret = process.env.SECRET || "ttphuongthao";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  if (request.url.includes("api/login") || request.url.includes("api/authFailed")) {
    return NextResponse.next();
  }
  const isValid = await checkJwtIsValid(request);
  if (isValid) {
    return NextResponse.next();
  } else {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "false");
    }
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }
}
export const config = {
  matcher: "/api/:path*",
};
