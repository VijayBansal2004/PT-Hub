import { PRODUCTS, Product } from "@/app/data";

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}
