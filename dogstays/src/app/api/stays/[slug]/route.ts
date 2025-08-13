import { NextResponse } from "next/server";
import { getStayBySlugOrId } from "@/lib/data/stays";

export async function GET(_request: Request, context: unknown) {
  const { slug } = (context as { params: { slug: string } }).params;
  const stay = getStayBySlugOrId(slug);
  if (!stay) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(stay);
}