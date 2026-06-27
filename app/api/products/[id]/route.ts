import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/app/utils/serverDb";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing product ID parameter" }, { status: 400 });
    }
    const products = readDb();
    const filtered = products.filter((p) => p.id !== id);
    writeDb(filtered);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
