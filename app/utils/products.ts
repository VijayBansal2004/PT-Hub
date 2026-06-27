import { Product } from "@/app/data";

export async function getProducts(): Promise<Product[]> {
  try {
    // Force cache: "no-store" to ensure we get fresh server products on every load
    const res = await fetch("/api/products", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (e) {
    console.error("Error reading products from database REST API", e);
    return [];
  }
}

export async function saveProduct(product: Product): Promise<void> {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to save product to database");
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  const res = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete product from database");
  }
}
