import fs from "fs";
import path from "path";
import { Product } from "@/app/data";

const dbFilePath = path.join(process.cwd(), "db", "products.json");

function ensureDbFile() {
  const dir = path.dirname(dbFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify([], null, 2), "utf-8");
  }
}

export function readDb(): Product[] {
  ensureDbFile();
  try {
    const data = fs.readFileSync(dbFilePath, "utf-8");
    return JSON.parse(data) || [];
  } catch (e) {
    console.error("Failed to read server database", e);
    return [];
  }
}

export function writeDb(products: Product[]): void {
  ensureDbFile();
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(products, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write to server database", e);
  }
}
