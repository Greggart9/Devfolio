import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const allowedAdmin = process.env.ADMIN_EMAIL || "oluwadamilare.greggart9@gmail.com";
      if (!user || user.email?.toLowerCase() !== allowedAdmin.toLowerCase()) {
        // Force sign-out of non-whitelisted account
        await supabase.auth.signOut();
        return NextResponse.redirect(
          `${origin}/admin/login?error=unauthorized`
        );
      }

      return NextResponse.redirect(`${origin}/admin`);
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`);
}
