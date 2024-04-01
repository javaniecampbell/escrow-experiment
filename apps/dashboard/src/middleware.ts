import { NextRequest, NextResponse } from "next/server";


export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
    ]
}

export function middleware(req: NextRequest) {

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

    if (url.pathname === '/client' || url.pathname === '/client/'
        && url.host === process.env.NEXT_PUBLIC_DOMAIN
    ) {
        console.log(`Rewriting ${url.pathname} to ${pathWithSearchParams} for client`);
        return NextResponse.rewrite(new URL('/client/dashboard', req.url));
    }

    if (
        // url.pathname.startsWith('/client/dashboard')||
        url.pathname.startsWith('/agency/service-agreement') ||
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


