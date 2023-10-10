import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt"
 
export async function middleware(req: NextRequest) {
    const previousPage = req.nextUrl.pathname;
    const secret = process.env.NEXTAUTH_SECRET;
 
    if (previousPage.startsWith("/checkout")) {
 
        const decodedToken = await getToken({ req, secret });
        
        if (!decodedToken) {
            return NextResponse.redirect(
                new URL(`/auth/login?p=${previousPage}`, req.url)
            );
        }
 
        return NextResponse.next();
    }
}
 
export const config = {
  matcher: ["/checkout/:path*"],
};