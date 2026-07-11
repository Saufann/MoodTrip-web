// Mesin rekomendasi personal: cocokkan spot dengan profil user
// (tag minat + persona travel + temperamen/MBTI tidak dipakai langsung,
//  tapi persona hasil tes wisata punya bobot terbesar).

import { Spot } from "@/lib/spots";
import { Profile } from "@/lib/profile";
import { PERSONAS } from "@/lib/personas";

// Peta tag minat user -> tag spot
const INTEREST_TO_TAGS: Record<string, string[]> = {
  "Beach Junkie": ["pantai", "sunset", "snorkeling"],
  "Foodie Enthusiast": ["kuliner lokal", "pedas", "food hunter"],
  "Adrenaline Junkie": ["adventurous", "nature", "trekking"],
  "Sunset Chaser": ["sunset", "romantis"],
  "Hidden Gem Hunter": ["hidden gem"],
  "Culture Buff": ["budaya", "belajar budaya", "lokal banget"],
  "Coffee Addict": ["nongkrong", "cozy"],
  "Photo Enthusiast": ["aesthetic", "foto-foto"],
  "Budget Traveler": ["murah"],
  "Healing Seeker": ["healing", "tenang"],
  "Night Owl": ["malam"],
  "Family Tripper": ["keluarga"],
};

export function scoreSpot(spot: Spot, profile: Profile): number {
  let score = 0;
  const spotTags = spot.tags.map((t) => t.toLowerCase());

  // Persona travel (bobot terbesar)
  if (profile.persona) {
    const persona = Object.values(PERSONAS).find(
      (p) => p.name === profile.persona
    );
    if (persona) {
      for (const t of persona.tags) {
        if (spotTags.includes(t.toLowerCase())) score += 3;
      }
    }
  }

  // Tag minat
  for (const interest of profile.interests) {
    const mapped = INTEREST_TO_TAGS[interest] ?? [];
    for (const t of mapped) {
      if (spotTags.includes(t.toLowerCase())) score += 2;
    }
  }

  return score;
}

export function hasPreferences(profile: Profile): boolean {
  return profile.interests.length > 0 || profile.persona !== null;
}

export function recommendedSpots(
  spots: Spot[],
  profile: Profile,
  n = 3
): { spot: Spot; score: number }[] {
  return spots
    .map((spot) => ({ spot, score: scoreSpot(spot, profile) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

// Ambil angka pertama dari label harga ("Rp10.000 - Rp30.000" -> 10000; "Gratis" -> 0)
export function priceMin(label: string): number {
  const m = label.match(/\d[\d.]*/);
  return m ? parseInt(m[0].replace(/\./g, ""), 10) : 0;
}
