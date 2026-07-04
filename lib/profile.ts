// Profil user (localStorage): nama, tag minat, temperamen Galen, MBTI, persona travel.
// Nanti dipindah ke Supabase saat auth aktif.

import { STORE_EVENT } from "@/lib/store";

export type Profile = {
  name: string;
  interests: string[];
  galen: string | null; // sanguinis | koleris | melankolis | plegmatis
  mbti: string | null; // 16 tipe, mis. "INFP"
  persona: string | null; // hasil tes wisata, mis. "Sang Petualang"
};

const PROFILE_KEY = "moodtrip_profile";

const EMPTY: Profile = {
  name: "",
  interests: [],
  galen: null,
  mbti: null,
  persona: null,
};

// Tag minat gaya "junkie/enthusiast" yang bisa dipilih user.
export const INTEREST_TAGS = [
  "Beach Junkie",
  "Foodie Enthusiast",
  "Adrenaline Junkie",
  "Sunset Chaser",
  "Hidden Gem Hunter",
  "Culture Buff",
  "Coffee Addict",
  "Photo Enthusiast",
  "Budget Traveler",
  "Healing Seeker",
  "Night Owl",
  "Family Tripper",
];

export const GALEN_TYPES = [
  "Sanguinis",
  "Koleris",
  "Melankolis",
  "Plegmatis",
];

export const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

function emit() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORE_EVENT));
  }
}

export function getProfile(): Profile {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Profile>) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function saveProfile(patch: Partial<Profile>) {
  const next = { ...getProfile(), ...patch };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  emit();
  return next;
}

export function toggleInterest(tag: string) {
  const p = getProfile();
  const interests = p.interests.includes(tag)
    ? p.interests.filter((t) => t !== tag)
    : [...p.interests, tag];
  return saveProfile({ interests });
}
