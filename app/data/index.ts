import { UTILITIES_PRODUCTS } from "./utilities";
import { JEWELLERY_PRODUCTS } from "./jewellery";
import { DRESSES_PRODUCTS } from "./dresses";
import { Product } from "./types";

export * from "./types";

export const PRODUCTS: Product[] = [
  ...UTILITIES_PRODUCTS,
  ...JEWELLERY_PRODUCTS,
  ...DRESSES_PRODUCTS,
];
