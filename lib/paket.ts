// Data paket wisata & mitra lokal. Nanti dari Supabase.

export type Paket = {
  name: string;
  partner: string;
  price: string;
  persona: string;
  desc: string;
  durasi: string;
  include: string[];
};

export const PACKAGES: Paket[] = [
  {
    name: "Slow Trip Healing 3 Hari",
    partner: "Lombok Tenang Tour",
    price: "Rp1.250.000",
    persona: "Sang Penenang",
    desc: "Retreat santai: taman kota, sunset Senggigi, dan spot tenang jauh dari keramaian. Ritme perjalanan dibuat pelan — banyak waktu kosong untuk sekadar duduk dan bernapas.",
    durasi: "3 hari 2 malam",
    include: [
      "Penginapan tenang 2 malam",
      "Transport & sopir lokal",
      "Sesi yoga pantai saat sunrise",
      "Makan 3x sehari (menu sehat)",
    ],
  },
  {
    name: "Food Trail Lombok",
    partner: "Rasa Lombok Trip",
    price: "Rp450.000",
    persona: "Pemburu Rasa",
    desc: "Ayam Taliwang legendaris, Nasi Balap Puyung asli, dan tur pasar malam dalam satu hari penuh. Level pedas bisa disesuaikan — dari penasaran sampai penantang.",
    durasi: "1 hari (08.00–21.00)",
    include: [
      "Transport keliling seharian",
      "5+ kuliner legendaris (sudah termasuk)",
      "Guide food hunter lokal",
      "Air mineral & obat sakit perut 😄",
    ],
  },
  {
    name: "Trekking Bukit Merese & Sunrise",
    partner: "Merese Adventure",
    price: "Rp650.000",
    persona: "Sang Petualang",
    desc: "Camping di kaki bukit, summit dini hari untuk sunrise di atas savana Merese, lanjut island hopping ringan ke gili sekitar Kuta Lombok.",
    durasi: "2 hari 1 malam",
    include: [
      "Peralatan camping lengkap",
      "Guide trekking bersertifikat",
      "Island hopping ringan",
      "Dokumentasi foto & drone",
    ],
  },
  {
    name: "Photo Spot Tour Kota Tua",
    partner: "Ampenan Frame",
    price: "Rp400.000",
    persona: "Pemburu Estetik",
    desc: "Rute terkurasi untuk konten: Desa Sade, Kota Tua Ampenan, Kafe Ampenan Heritage, dan beberapa hidden gem yang belum ramai di sosmed.",
    durasi: "1 hari (07.00–18.00)",
    include: [
      "Guide sekaligus fotografer",
      "20 foto teredit siap posting",
      "Tiket masuk semua spot",
      "Rekomendasi golden hour terbaik",
    ],
  },
  {
    name: "Sunset Dinner Romantis",
    partner: "Senggigi Couple",
    price: "Rp900.000",
    persona: "Sang Romantis",
    desc: "Private beach dengan setup candlelight, seafood dinner segar, dan spa pasangan. Cocok untuk anniversary, lamaran, atau sekadar merayakan berdua.",
    durasi: "1 malam (16.00–21.00)",
    include: [
      "Setup private beach & dekorasi",
      "Candlelight seafood dinner",
      "Spa pasangan 60 menit",
      "Dokumentasi momen",
    ],
  },
  {
    name: "Family Explore 4 Hari",
    partner: "Lombok Keluarga",
    price: "Rp2.100.000",
    persona: "Penjelajah Keluarga",
    desc: "Itinerary ramah anak: edukasi budaya di Desa Sade, pantai landai yang aman, dan aktivitas seru untuk semua umur. Tempo santai, banyak jeda istirahat.",
    durasi: "4 hari 3 malam",
    include: [
      "Hotel ramah keluarga 3 malam",
      "Aktivitas edukasi anak",
      "Transport nyaman (car seat tersedia)",
      "Asuransi perjalanan keluarga",
    ],
  },
];

export type Partner = {
  name: string;
  base: string;
  since: string;
  desc: string;
  spesialis: string;
};

export const PARTNERS: Partner[] = [
  {
    name: "Lombok Tenang Tour",
    base: "Senggigi, Lombok Barat",
    since: "2019",
    desc: "Spesialis slow travel dan retreat. Tim kecil yang percaya liburan terbaik adalah yang tidak terburu-buru.",
    spesialis: "Healing & retreat",
  },
  {
    name: "Rasa Lombok Trip",
    base: "Mataram",
    since: "2021",
    desc: "Didirikan food blogger lokal — tahu semua warung legendaris yang tidak muncul di Google Maps.",
    spesialis: "Kuliner",
  },
  {
    name: "Merese Adventure",
    base: "Kuta, Lombok Tengah",
    since: "2018",
    desc: "Operator trekking dan camping berlisensi dengan guide bersertifikat serta peralatan lengkap.",
    spesialis: "Trekking & outdoor",
  },
  {
    name: "Ampenan Frame",
    base: "Ampenan, Mataram",
    since: "2022",
    desc: "Kolektif fotografer muda Lombok — tur mereka setengah jalan-jalan, setengah photoshoot profesional.",
    spesialis: "Foto & konten",
  },
  {
    name: "Senggigi Couple",
    base: "Senggigi, Lombok Barat",
    since: "2020",
    desc: "Spesialis momen romantis: dinner privat, lamaran, honeymoon. Detail kecil adalah keahlian mereka.",
    spesialis: "Romantis & privat",
  },
  {
    name: "Lombok Keluarga",
    base: "Mataram",
    since: "2017",
    desc: "Operator tur keluarga paling berpengalaman — itinerary teruji untuk balita sampai kakek-nenek.",
    spesialis: "Keluarga",
  },
];
