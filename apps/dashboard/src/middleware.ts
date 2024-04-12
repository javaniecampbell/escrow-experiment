import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";


export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
        "/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)" // Match all routes except /api and /trpc
    ]
}


export default authMiddleware({
    publicRoutes: ['/login', '/signup', '/service-agreement', '/terms-conditions', '/site'],

    afterAuth: async (auth, req) => {
        console.log('beforeAuth');
        return rewrites(req);
    }
});


function rewrites(req: NextRequest) {

    const url = req.nextUrl;
    const searchParams = url.searchParams.toString();
    let hostname = req.headers.get('host');

    const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''
        }`;



    if (url.pathname === '/' || url.pathname === '/site' || url.pathname === '/site/'
        && url.host === process.env.NEXT_PUBLIC_DOMAIN
    ) {
        console.log(`Rewriting ${url.pathname} to ${pathWithSearchParams} for client`);
        return NextResponse.rewrite(new URL('/site', req.url));
    }

    if (url.pathname === '/login' || url.pathname === '/login/'
        && url.host === process.env.NEXT_PUBLIC_DOMAIN
    ) {
        console.log(`Rewriting ${url.pathname} to ${pathWithSearchParams} for client`);
        return NextResponse.rewrite(new URL('/shared/login', req.url));
    }

    if (url.pathname === '/signup' || url.pathname === '/signup/'
        && url.host === process.env.NEXT_PUBLIC_DOMAIN
    ) {
        console.log(`Rewriting ${url.pathname} to ${pathWithSearchParams} for client`);
        return NextResponse.rewrite(new URL('/shared/signup', req.url));
    }

    if (url.pathname === '/service-agreement' || url.pathname === '/service-agreement/'
        && url.host === process.env.NEXT_PUBLIC_DOMAIN
    ) {
        console.log(`Rewriting ${url.pathname} to ${pathWithSearchParams} for client`);
        return NextResponse.rewrite(new URL('/shared/service-agreement', req.url));
    }

    if (url.pathname === '/terms-conditions' || url.pathname === '/terms-conditions/'
        && url.host === process.env.NEXT_PUBLIC_DOMAIN
    ) {
        console.log(`Rewriting ${url.pathname} to ${pathWithSearchParams} for client`);
        return NextResponse.rewrite(new URL('/shared/terms-conditions', req.url));
    }

    if (url.pathname === '/client' || url.pathname === '/client/'
        && url.host === process.env.NEXT_PUBLIC_DOMAIN
    ) {
        console.log(`Rewriting ${url.pathname} to ${pathWithSearchParams} for client`);
        return NextResponse.rewrite(new URL('/client/dashboard', req.url));
    }

    if (
        // url.pathname.startsWith('/client/dashboard')||
        url.pathname.startsWith('/agency') ||
        url.pathname.startsWith('/agency/dashboard')
        ||
        url.pathname.startsWith('/client/settings') ||
        url.pathname.startsWith('/client/profile') ||
        url.pathname.startsWith('/client/projects') ||
        url.pathname.startsWith('/client/project') ||
        url.pathname.startsWith('/client/billing') ||
        url.pathname.startsWith('/client/support') ||
        url.pathname.startsWith('/client/feedback') ||
        url.pathname.startsWith('/client/milestones')

    ) {
        console.log(`Rewriting ${url.pathname} to ${pathWithSearchParams}`);
        return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
    }



    // if subdomain exists
    const customSubdomain = hostname?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`).filter(Boolean)[0];

    console.log(`customSubdomain: ${customSubdomain}`);
    if (customSubdomain !== undefined || customSubdomain !== null || customSubdomain !== '') {
        console.log(`Rewriting ${url.pathname} to ${pathWithSearchParams} for subdomain ${customSubdomain}`);
        return NextResponse.rewrite(new URL(`/${customSubdomain}${pathWithSearchParams}`, req.url));
    }

    // return NextResponse.next();
}



function rewriteSharedPages(url: URL, pathWithSearchParams: string, hostname: string | null, req: NextRequest) {
    if (url.pathname === '/login' || url.pathname === '/login/'
        && url.host === process.env.NEXT_PUBLIC_DOMAIN
    ) {
        console.log(`Rewriting ${url.pathname} to ${pathWithSearchParams} for client`);
        new URL('/shared/login', req.url);
    }

    if (url.pathname === '/signup' || url.pathname === '/signup/'
        && url.host === process.env.NEXT_PUBLIC_DOMAIN
    ) {
        console.log(`Rewriting ${url.pathname} to ${pathWithSearchParams} for client`);
        new URL('/shared/signup', req.url);
    }

    if (url.pathname === '/service-agreement' || url.pathname === '/service-agreement/'
        && url.host === process.env.NEXT_PUBLIC_DOMAIN
    ) {
        console.log(`Rewriting ${url.pathname} to ${pathWithSearchParams} for client`);
        new URL('/shared/service-agreement', req.url);
    }

    if (url.pathname === '/terms-conditions' || url.pathname === '/terms-conditions/'
        && url.host === process.env.NEXT_PUBLIC_DOMAIN
    ) {
        console.log(`Rewriting ${url.pathname} to ${pathWithSearchParams} for client`);
        new URL('/shared/terms-conditions', req.url);
    }
}