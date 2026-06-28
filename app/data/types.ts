export interface Product {
  id: string;
  name: string;
  category: "Utilities" | "Jewellery" | "Dresses";
  price: number;
  rating: number;
  reviewsCount: number;
  video: string;
  description: string;
  isNew?: boolean;
  isPopular?: boolean;
}
