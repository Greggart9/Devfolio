import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    // Allow /admin/login and /admin/reset-password without redirection loop
    if (pathname === "/admin/login" || pathname === "/admin/reset-password") {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const allowedAdmin = process.env.ADMIN_EMAIL || "oluwadamilare.greggart9@gmail.com";
      if (user && user.email?.toLowerCase() === allowedAdmin.toLowerCase() && pathname === "/admin/login") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return response;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const allowedAdmin = process.env.ADMIN_EMAIL || "oluwadamilare.greggart9@gmail.com";
    if (!user || user.email?.toLowerCase() !== allowedAdmin.toLowerCase()) {
      const redirectUrl = new URL("/admin/login", request.url);
      if (user) {
        redirectUrl.searchParams.set("error", "unauthorized");
      }
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
