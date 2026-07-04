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

// ---------- Keranjang ----------
export function getCart(): CartItem[] {
  return read<CartItem[]>(CART_KEY, []);
}

export function cartCount(): number {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

export function addToCart(name: string, priceLabel: string) {
  const cart = getCart();
  const found = cart.find((i) => i.name === name);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ name, price: parsePrice(priceLabel), qty: 1 });
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

// ---------- Util harga ----------
export function parsePrice(label: string): number {
  return parseInt(label.replace(/\D/g, ""), 10) || 0;
}

export function formatRp(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}
