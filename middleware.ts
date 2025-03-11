import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
    async function middleware(request:NextRequest) {
        // console.log(request);
        
    }, {
        isReturnToCurrentPage : true
    }
)

/**
 * Configuration object for middleware matcher.
 * 
 * @property {string[]} matcher - An array of patterns to match against the request URL.
 * The patterns exclude certain paths such as 'api', '_next/static', '_next/image', 'auth', 'favicon.ico', 'robots.txt', 'images', and 'login'.
 * The '$' symbol at the end ensures that the pattern does not match the root URL.
 */
export const config = {
    matcher : [
        '/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|login|$).*)',
    ]
}