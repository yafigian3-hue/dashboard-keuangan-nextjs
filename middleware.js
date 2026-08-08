import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  console.log("TOKEN :", token);

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
