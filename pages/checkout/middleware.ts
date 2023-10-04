import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwt } from "@/utils.ts";

export async function middleware(req: NextRequest) {
    const previousPage = req.nextUrl.pathname;

    if (previousPage.startsWith("/checkout")) {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.redirect(
                new URL(`/auth/login?p=${previousPage}`, req.url)
            );
        }
        try {
            await jwt.isJWTValid(token);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(
                new URL(`/auth/login?p=${previousPage}`, req.url)
            );
        }
    }
}

export const config = {
    matcher: ["/checkout/:path*"],
};