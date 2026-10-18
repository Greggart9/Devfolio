import { NextResponse } from "next/server";
import { getServices } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json(services);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
