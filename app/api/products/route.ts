import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/app/utils/serverDb";

export async function GET() {
  try {
    const products = readDb();
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    if (!product || !product.id) {
      return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
    }
    const products = readDb();
    const existingIndex = products.findIndex((p) => p.id === product.id);
    if (existingIndex > -1) {
      products[existingIndex] = product;
    } else {
      products.unshift(product);
    }
    writeDb(products);
    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
