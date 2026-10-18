import { NextResponse } from "next/server";
import { getSkills } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const skills = await getSkills();
    return NextResponse.json(skills);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
