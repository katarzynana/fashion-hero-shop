// Realistic indie fashion data for the Promoted Listings mockup.
// Product images are CSS gradients (no external URLs) to keep things tasteful.

export type Gradient = string;

export type PromotedProduct = {
  id: string;
  brand: string;
  name: string;
  price: number; // PLN
  rating: number;
  reviews: number;
  promoted?: boolean;
  category: string;
  gradient: Gradient;
  size?: "sm" | "lg";
};

const g = {
  rose: "linear-gradient(135deg, #E8D5CE 0%, #C99B8E 55%, #8E5C4E 100%)",
  sage: "linear-gradient(135deg, #DCE3D5 0%, #9DAE8C 60%, #5C6E50 100%)",
  ivory: "linear-gradient(135deg, #F4EFE6 0%, #E6DBC7 55%, #BFAE8E 100%)",
  cocoa: "linear-gradient(135deg, #E5D3C0 0%, #B5916F 55%, #6B4A33 100%)",
  midnight: "linear-gradient(135deg, #C9CCD6 0%, #5C6478 55%, #1F2435 100%)",
  terracotta: "linear-gradient(135deg, #F1D6C3 0%, #C97A56 55%, #7A3A22 100%)",
  forest: "linear-gradient(135deg, #CFD8C8 0%, #6E8770 55%, #2D4A3E 100%)",
  bone: "linear-gradient(135deg, #F2EDE3 0%, #D8CDB6 60%, #9F8E6B 100%)",
  blush: "linear-gradient(135deg, #F3E2DE 0%, #D8A9A4 55%, #9C5B58 100%)",
  oat: "linear-gradient(135deg, #EDE5D2 0%, #C9B68C 55%, #826A3D 100%)",
  navy: "linear-gradient(135deg, #C7CEDA 0%, #5C6E8A 55%, #1E2C44 100%)",
  plum: "linear-gradient(135deg, #E0CFD9 0%, #8E6B82 55%, #4A2E45 100%)",
};

export const brands = [
  "Atelier Ela",
  "Marszałkowska 23",
  "Nina Knit",
  "Studio Lipowa",
  "Kosma Atelier",
  "Dom Mody Wrońska",
  "Hala Koszyki",
  "Pracownia Solec",
  "Bielsko Linen",
  "Mokotów Slow",
];

// Homepage "Promoted brands" — 6 products from different sellers
export const promotedHome: PromotedProduct[] = [
  { id: "p1", brand: "Atelier Ela", name: "Floral midi dress", price: 389, rating: 4.8, reviews: 142, promoted: true, category: "Dresses", gradient: g.rose },
  { id: "p2", brand: "Nina Knit", name: "Merino wool sweater", price: 459, rating: 4.7, reviews: 88, promoted: true, category: "Knitwear", gradient: g.sage },
  { id: "p3", brand: "Studio Lipowa", name: "Oversized linen shirt", price: 279, rating: 4.6, reviews: 211, promoted: true, category: "Shirts", gradient: g.ivory },
  { id: "p4", brand: "Kosma Atelier", name: "Leather loafers", price: 549, rating: 4.9, reviews: 64, promoted: true, category: "Shoes", gradient: g.cocoa },
  { id: "p5", brand: "Marszałkowska 23", name: "Suede crossbody bag", price: 329, rating: 4.5, reviews: 176, promoted: true, category: "Bags", gradient: g.terracotta },
  { id: "p6", brand: "Pracownia Solec", name: "Cotton trench coat", price: 599, rating: 4.7, reviews: 53, promoted: true, category: "Outerwear", gradient: g.bone },
];

// "New arrivals" — no promoted badge
export const newArrivals: PromotedProduct[] = [
  { id: "n1", brand: "Bielsko Linen", name: "Linen maxi dress", price: 329, rating: 4.4, reviews: 47, category: "Dresses", gradient: g.blush },
  { id: "n2", brand: "Hala Koszyki", name: "Viscose palazzo trousers", price: 249, rating: 4.5, reviews: 31, category: "Trousers", gradient: g.midnight },
  { id: "n3", brand: "Mokotów Slow", name: "Ruffled blouse", price: 189, rating: 4.6, reviews: 92, category: "Blouses", gradient: g.oat },
  { id: "n4", brand: "Dom Mody Wrońska", name: "Block-heel sandals", price: 419, rating: 4.3, reviews: 28, category: "Shoes", gradient: g.cocoa },
  { id: "n5", brand: "Nina Knit", name: "Alpaca cardigan", price: 489, rating: 4.8, reviews: 71, category: "Knitwear", gradient: g.ivory },
  { id: "n6", brand: "Atelier Ela", name: "Pleated midi skirt", price: 279, rating: 4.5, reviews: 58, category: "Skirts", gradient: g.plum },
];

// Second promoted format — fewer, larger
export const editorPicks: PromotedProduct[] = [
  { id: "e1", brand: "Kosma Atelier", name: "Double-breasted wool coat", price: 1190, rating: 4.9, reviews: 39, promoted: true, category: "Outerwear", gradient: g.forest, size: "lg" },
  { id: "e2", brand: "Studio Lipowa", name: "Silk pyjama set", price: 449, rating: 4.7, reviews: 84, promoted: true, category: "Lingerie", gradient: g.blush, size: "lg" },
  { id: "e3", brand: "Marszałkowska 23", name: "Leather shopper bag", price: 689, rating: 4.8, reviews: 112, promoted: true, category: "Bags", gradient: g.cocoa, size: "lg" },
];

export const mainCategories = [
  { name: "Women",      gradient: g.rose },
  { name: "Shoes",      gradient: g.cocoa },
  { name: "Sportswear", gradient: g.sage },
  { name: "Lingerie",   gradient: g.blush },
  { name: "Bags",       gradient: g.oat },
  { name: "Jewellery",  gradient: g.midnight },
];
