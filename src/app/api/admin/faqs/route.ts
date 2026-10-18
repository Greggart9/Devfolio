import { NextResponse } from "next/server";
import { getFaqs } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const faqs = await getFaqs();
    return NextResponse.json(faqs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
