export type SellerProduct = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  returnRate: number; // percent
  status: "Active" | "Inactive";
  ordersPerDay: number;
};

export const sellerProducts: SellerProduct[] = [
  {
    id: "p1",
    name: "Black workwear dress",
    category: "Women's clothing",
    rating: 4.2,
    reviews: 12,
    returnRate: 35,
    status: "Active",
    ordersPerDay: 8,
  },
  {
    id: "p2",
    name: "Wedding heels",
    category: "Footwear",
    rating: 4.8,
    reviews: 24,
    returnRate: 28,
    status: "Active",
    ordersPerDay: 6,
  },
  {
    id: "p3",
    name: "Stainless steel earrings",
    category: "Jewelry",
    rating: 4.6,
    reviews: 18,
    returnRate: 22,
    status: "Active",
    ordersPerDay: 4,
  },
  {
    id: "p4",
    name: "Sports hoodie",
    category: "Sport",
    rating: 3.2,
    reviews: 9,
    returnRate: 48,
    status: "Active",
    ordersPerDay: 5,
  },
  {
    id: "p5",
    name: "Shopper bag",
    category: "Bags",
    rating: 3.1,
    reviews: 5,
    returnRate: 65,
    status: "Inactive",
    ordersPerDay: 2,
  },
];

export type ActivePromotion = {
  productId: string;
  productName: string;
  startDate: string; // pretty
  endDate: string;
  estimatedReach: string;
  daysLeft: number;
  paused?: boolean;
};

export const initialActivePromotions: ActivePromotion[] = [
  {
    productId: "p2",
    productName: "Wedding heels",
    startDate: "Apr 22",
    endDate: "May 2",
    estimatedReach: "140+ views",
    daysLeft: 2,
  },
];

export type QualityCheck =
  | { kind: "pass"; returnRate: number; rating: number }
  | { kind: "borderline"; returnRate: number; rating: number }
  | { kind: "fail-return"; returnRate: number; rating: number }
  | { kind: "fail-rating"; returnRate: number; rating: number };

export function evaluateProduct(p: SellerProduct): QualityCheck {
  const returnFail = p.returnRate >= 50;
  const ratingFail = p.rating < 3.5;
  if (returnFail && !ratingFail) return { kind: "fail-return", returnRate: p.returnRate, rating: p.rating };
  if (ratingFail && !returnFail) return { kind: "fail-rating", returnRate: p.returnRate, rating: p.rating };
  if (returnFail && ratingFail) return { kind: "fail-return", returnRate: p.returnRate, rating: p.rating };
  if (p.returnRate >= 45) return { kind: "borderline", returnRate: p.returnRate, rating: p.rating };
  return { kind: "pass", returnRate: p.returnRate, rating: p.rating };
}
