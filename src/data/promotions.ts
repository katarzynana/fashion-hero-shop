import { products } from "./products";
import type { Product } from "@/types";

export interface PromotedProduct {
  productId: string;
  daysLeft: number;
  paused?: boolean;
}

// Mock active promotions — in production this would come from an API
const activePromotions: PromotedProduct[] = [
  { productId: "4", daysLeft: 8 },
  { productId: "11", daysLeft: 3 },
  { productId: "22", daysLeft: 5 },
  { productId: "31", daysLeft: 7 },
];

export function getPromotedProducts(): Product[] {
  return activePromotions
    .filter((p) => !p.paused && p.daysLeft > 0)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .flatMap((promo) => {
      const product = products.find((p) => p.id === promo.productId);
      return product ? [product] : [];
    });
}

export function isPromoted(productId: string): boolean {
  return activePromotions.some(
    (p) => p.productId === productId && !p.paused && p.daysLeft > 0
  );
}
