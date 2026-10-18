import { NextResponse } from "next/server";
import { getAboutProfile } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const profile = await getAboutProfile();
    return NextResponse.json(profile);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
