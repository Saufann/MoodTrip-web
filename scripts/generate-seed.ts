// Generator seed.sql dari data lokal di lib/.
// Jalankan: npx tsx scripts/generate-seed.ts
// Output: supabase/seed.sql — paste di SQL Editor Supabase SETELAH schema.sql.

import { writeFileSync } from "fs";
import { SPOTS, MOOD_TAGS } from "../lib/spots";
import { PACKAGES, PARTNERS } from "../lib/paket";
import { RESTOS } from "../lib/kuliner";
import { ALL_PRODUCTS } from "../lib/products";
import { INTEREST_TAGS } from "../lib/profile";
import { spotDetail } from "../lib/details";
import { productImage, restoImage } from "../lib/images";

const q = (s: string) => `'${s.replace(/'/g, "''")}'`;
const arr = (xs: string[]) =>
  `array[${xs.map(q).join(", ")}]::text[]`;
const num = (label: string) => {
  const m = label.match(/\d[\d.]*/);
  return m ? parseInt(m[0].replace(/\./g, ""), 10) : 0;
};

let sql = `-- MoodTrip seed data (tergenerate dari lib/ oleh scripts/generate-seed.ts)
-- Jalankan SETELAH schema.sql.

`;

// tags: union tag semua spot (mood) + tag minat user
const spotTagSet = new Set<string>();
for (const s of SPOTS) for (const t of s.tags) spotTagSet.add(t);
for (const t of MOOD_TAGS) spotTagSet.add(t);

sql += `-- Tags\ninsert into public.tags (name, kind) values\n`;
sql +=
  [...spotTagSet].map((t) => `  (${q(t)}, 'mood')`).join(",\n") +
  ",\n" +
  INTEREST_TAGS.map((t) => `  (${q(t)}, 'minat')`).join(",\n") +
  "\non conflict (name) do nothing;\n\n";

// spots
sql += `-- Spots\ninsert into public.spots (id, name, category, location, description, uniqueness, price_min, price_label, hours, rating, lat, lng, gallery, fasilitas) values\n`;
sql +=
  SPOTS.map((s) => {
    const d = spotDetail(s.id);
    return `  (${s.id}, ${q(s.name)}, ${q(s.category)}, ${q(s.location)}, ${q(
      s.description
    )}, ${q(s.uniqueness)}, ${num(s.price)}, ${q(s.price)}, ${q(s.hours)}, ${
      s.rating
    }, ${s.lat}, ${s.lng}, ${arr(d.gallery)}, ${arr(d.fasilitas)})`;
  }).join(",\n") + ";\n\n";

// spot_tags
sql += `-- Spot tags\ninsert into public.spot_tags (spot_id, tag_id)\nselect s.id, t.id from (values\n`;
const pairs: string[] = [];
for (const s of SPOTS)
  for (const t of s.tags) pairs.push(`  (${s.id}, ${q(t)})`);
sql +=
  pairs.join(",\n") +
  `\n) as v(spot_id, tag_name)\njoin public.spots s on s.id = v.spot_id\njoin public.tags t on t.name = v.tag_name;\n\n`;

// partners
sql += `-- Partners\ninsert into public.partners (name, base, since, descr, spesialis) values\n`;
sql +=
  PARTNERS.map(
    (m) =>
      `  (${q(m.name)}, ${q(m.base)}, ${q(m.since)}, ${q(m.desc)}, ${q(
        m.spesialis
      )})`
  ).join(",\n") + ";\n\n";

// packages
sql += `-- Packages\ninsert into public.packages (partner_id, name, persona, descr, durasi, price, include)\nselect p.id, v.name, v.persona, v.descr, v.durasi, v.price, v.include from (values\n`;
sql +=
  PACKAGES.map(
    (p) =>
      `  (${q(p.partner)}, ${q(p.name)}, ${q(p.persona)}, ${q(p.desc)}, ${q(
        p.durasi
      )}, ${num(p.price)}, ${arr(p.include)})`
  ).join(",\n") +
  `\n) as v(partner_name, name, persona, descr, durasi, price, include)\njoin public.partners p on p.name = v.partner_name;\n\n`;

// products
sql += `-- Products\ninsert into public.products (name, descr, price, kategori, image) values\n`;
sql +=
  ALL_PRODUCTS.map(
    (p) =>
      `  (${q(p.name)}, ${q(p.desc)}, ${num(p.price)}, ${q(p.kategori)}, ${q(
        productImage(p.name)
      )})`
  ).join(",\n") + ";\n\n";

// restos + menu
sql += `-- Restos\ninsert into public.restos (name, location, hours, about, image, lat, lng, is_open) values\n`;
sql +=
  RESTOS.map(
    (r) =>
      `  (${q(r.name)}, ${q(r.location)}, ${q(r.hours)}, ${q(r.about)}, ${q(
        restoImage(r.name)
      )}, ${r.lat}, ${r.lng}, ${r.isOpen})`
  ).join(",\n") + ";\n\n";

sql += `-- Menu items\ninsert into public.menu_items (resto_id, name, price, ready)\nselect r.id, v.name, v.price, v.ready from (values\n`;
const menuRows: string[] = [];
for (const r of RESTOS)
  for (const m of r.menu)
    menuRows.push(`  (${q(r.name)}, ${q(m.name)}, ${num(m.price)}, ${m.ready})`);
sql +=
  menuRows.join(",\n") +
  `\n) as v(resto_name, name, price, ready)\njoin public.restos r on r.name = v.resto_name;\n`;

writeFileSync("supabase/seed.sql", sql);
console.log("OK: supabase/seed.sql dibuat,", sql.length, "karakter");
