import { Product } from "@/app/data";

const DB_NAME = "PTHubStoreDB";
const DB_VERSION = 1;
const STORE_NAME = "custom-products";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Browser database is not available on server-side"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
}

export async function getProducts(): Promise<Product[]> {
  if (typeof window === "undefined") return [];
  try {
    const db = await openDB();
    const customList = await new Promise<Product[]>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
    return customList;
  } catch (e) {
    console.error("Error reading custom products from database", e);
    return [];
  }
}

export async function saveProduct(product: Product): Promise<void> {
  if (typeof window === "undefined") return;
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(product);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function deleteProduct(productId: string): Promise<void> {
  if (typeof window === "undefined") return;
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(productId);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
