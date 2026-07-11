// Store ringan berbasis localStorage untuk wishlist & keranjang.
// Nanti bisa dipindah ke Supabase saat auth aktif — API-nya sudah dipisah di sini.

export type CartItem = { name: string; price: number; qty: number };

const WISHLIST_KEY = "moodtrip_wishlist";
const CART_KEY = "moodtrip_cart";
export const STORE_EVENT = "moodtrip:store";
export const WHATSAPP = "6285737736349";

function emit() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORE_EVENT));
  }
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
  emit();
}

// ---------- Wishlist ----------
export function getWishlist(): number[] {
  return read<number[]>(WISHLIST_KEY, []);
}

export function isWishlisted(id: number): boolean {
  return getWishlist().includes(id);
}

export function toggleWishlist(id: number): boolean {
  const list = getWishlist();
  const next = list.includes(id)
    ? list.filter((x) => x !== id)
    : [...list, id];
  write(WISHLIST_KEY, next);
  return next.includes(id);
}

// ---------- Wishlist paket & produk (berbasis nama) ----------
const WISHLIST_PAKET_KEY = "moodtrip_wishlist_paket";
const WISHLIST_PRODUK_KEY = "moodtrip_wishlist_produk";

export function getPaketWishlist(): string[] {
  return read<string[]>(WISHLIST_PAKET_KEY, []);
}

export function togglePaketWishlist(name: string): boolean {
  const list = getPaketWishlist();
  const next = list.includes(name)
    ? list.filter((x) => x !== name)
    : [...list, name];
  write(WISHLIST_PAKET_KEY, next);
  return next.includes(name);
}

export function getProdukWishlist(): string[] {
  return read<string[]>(WISHLIST_PRODUK_KEY, []);
}

export function toggleProdukWishlist(name: string): boolean {
  const list = getProdukWishlist();
  const next = list.includes(name)
    ? list.filter((x) => x !== name)
    : [...list, name];
  write(WISHLIST_PRODUK_KEY, next);
  return next.includes(name);
}

// Total semua jenis wishlist (untuk badge navbar)
export function wishlistCount(): number {
  return (
    getWishlist().length + getPaketWishlist().length + getProdukWishlist().length
  );
}

// ---------- Keranjang ----------
export function getCart(): CartItem[] {
  return read<CartItem[]>(CART_KEY, []);
}

export function cartCount(): number {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

export function addToCart(name: string, priceLabel: string, qty = 1) {
  const cart = getCart();
  const found = cart.find((i) => i.name === name);
  if (found) {
    found.qty += qty;
  } else {
    cart.push({ name, price: parsePrice(priceLabel), qty });
  }
  write(CART_KEY, cart);
}

export function setCartQty(name: string, qty: number) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((i) => i.name !== name);
  } else {
    cart = cart.map((i) => (i.name === name ? { ...i, qty } : i));
  }
  write(CART_KEY, cart);
}

export function clearCart() {
  write(CART_KEY, []);
}

// ---------- Itinerary ----------
export type Itinerary = number[][]; // per hari: array id spot

const ITINERARY_KEY = "moodtrip_itinerary";

export function getItinerary(): Itinerary {
  return read<Itinerary>(ITINERARY_KEY, [[]]);
}

export function saveItinerary(it: Itinerary) {
  write(ITINERARY_KEY, it);
}

const ITINERARY_START_KEY = "moodtrip_itinerary_start";

export function getItineraryStart(): string {
  return read<string>(ITINERARY_START_KEY, "");
}

export function setItineraryStart(date: string) {
  write(ITINERARY_START_KEY, date);
}

// ---------- Riwayat pesanan ----------
export type Order = {
  type: "paket" | "belanja";
  title: string;
  detail: string;
  date: string; // ISO
};

const ORDERS_KEY = "moodtrip_orders";

export function getOrders(): Order[] {
  return read<Order[]>(ORDERS_KEY, []);
}

export function saveOrder(order: Order) {
  write(ORDERS_KEY, [order, ...getOrders()]);
}

// ---------- Review user (per spot) ----------
export type UserReview = {
  name: string;
  rating: number;
  date: string;
  text: string;
};

const REVIEWS_KEY = "moodtrip_reviews";

export function getUserReviews(spotId: number): UserReview[] {
  const all = read<Record<string, UserReview[]>>(REVIEWS_KEY, {});
  return all[String(spotId)] ?? [];
}

export function addUserReview(spotId: number, review: UserReview) {
  const all = read<Record<string, UserReview[]>>(REVIEWS_KEY, {});
  const key = String(spotId);
  all[key] = [review, ...(all[key] ?? [])];
  write(REVIEWS_KEY, all);
}

export function removeUserReview(spotId: number, index: number) {
  const all = read<Record<string, UserReview[]>>(REVIEWS_KEY, {});
  const key = String(spotId);
  all[key] = (all[key] ?? []).filter((_, i) => i !== index);
  write(REVIEWS_KEY, all);
}

// ---------- Util harga ----------
export function parsePrice(label: string): number {
  return parseInt(label.replace(/\D/g, ""), 10) || 0;
}

export function formatRp(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}
