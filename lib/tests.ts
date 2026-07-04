// Data & skoring untuk Tes Kepribadian Diri (Galen / MBTI).
// Tes wisata (persona) ada di lib/personas.ts.

// ---------------- Galen (4 temperamen) ----------------
export type GalenId = "Sanguinis" | "Koleris" | "Melankolis" | "Plegmatis";

export const GALEN_INFO: Record<
  GalenId,
  { emoji: string; desc: string; travel: string }
> = {
  Sanguinis: {
    emoji: "🎉",
    desc: "Ceria, spontan, dan mudah bergaul. Energimu menular ke orang sekitar.",
    travel:
      "Cocok dengan trip ramai: festival, pasar malam, group tour, dan tempat yang hidup.",
  },
  Koleris: {
    emoji: "🔥",
    desc: "Tegas, ambisius, dan suka memimpin. Kamu bergerak cepat menuju target.",
    travel:
      "Cocok dengan itinerary padat dan menantang: trekking, island hopping, target banyak spot.",
  },
  Melankolis: {
    emoji: "🌙",
    desc: "Teliti, mendalam, dan perencana ulung. Kamu menghargai detail dan makna.",
    travel:
      "Cocok dengan wisata budaya, museum, desa adat, dan tempat dengan cerita mendalam.",
  },
  Plegmatis: {
    emoji: "🍃",
    desc: "Tenang, damai, dan mudah menyesuaikan diri. Kamu penyeimbang suasana.",
    travel:
      "Cocok dengan slow travel: pantai tenang, kafe cozy, taman kota, dan healing spot.",
  },
};

export type GalenQuestion = {
  question: string;
  options: { label: string; type: GalenId }[];
};

export const GALEN_QUIZ: GalenQuestion[] = [
  {
    question: "Di sebuah pesta, kamu biasanya...",
    options: [
      { label: "Jadi pusat keramaian, ngobrol ke sana-sini", type: "Sanguinis" },
      { label: "Mengatur acara biar berjalan lancar", type: "Koleris" },
      { label: "Mengamati dan ngobrol mendalam dengan 1-2 orang", type: "Melankolis" },
      { label: "Santai menikmati suasana tanpa ribet", type: "Plegmatis" },
    ],
  },
  {
    question: "Saat merencanakan sesuatu, kamu...",
    options: [
      { label: "Spontan aja, lihat nanti", type: "Sanguinis" },
      { label: "Tentukan target lalu eksekusi cepat", type: "Koleris" },
      { label: "Buat rencana detail dan cadangan", type: "Melankolis" },
      { label: "Ikut rencana orang lain juga tidak masalah", type: "Plegmatis" },
    ],
  },
  {
    question: "Saat menghadapi masalah, reaksimu...",
    options: [
      { label: "Cerita ke teman, cari suasana baru", type: "Sanguinis" },
      { label: "Langsung cari solusi dan bertindak", type: "Koleris" },
      { label: "Menganalisis dulu akar masalahnya", type: "Melankolis" },
      { label: "Tenang, biasanya semua akan baik-baik saja", type: "Plegmatis" },
    ],
  },
  {
    question: "Teman-teman mengenalmu sebagai orang yang...",
    options: [
      { label: "Seru dan penuh cerita", type: "Sanguinis" },
      { label: "Tegas dan bisa diandalkan", type: "Koleris" },
      { label: "Perhatian pada detail dan perasaan", type: "Melankolis" },
      { label: "Kalem dan gampang diajak apa saja", type: "Plegmatis" },
    ],
  },
  {
    question: "Hal yang paling menguras energimu?",
    options: [
      { label: "Sendirian terlalu lama", type: "Sanguinis" },
      { label: "Menunggu tanpa kejelasan", type: "Koleris" },
      { label: "Lingkungan berantakan / tanpa rencana", type: "Melankolis" },
      { label: "Konflik dan drama", type: "Plegmatis" },
    ],
  },
  {
    question: "Gaya belanjamu saat liburan?",
    options: [
      { label: "Beli yang menarik saat itu juga", type: "Sanguinis" },
      { label: "Cepat, sudah tahu mau beli apa", type: "Koleris" },
      { label: "Bandingkan dulu harga & kualitas", type: "Melankolis" },
      { label: "Ikut saja, tidak beli juga tidak apa", type: "Plegmatis" },
    ],
  },
  {
    question: "Saat liburan bersama grup, peranmu biasanya...",
    options: [
      { label: "Penghidup suasana sepanjang jalan", type: "Sanguinis" },
      { label: "Pengatur itinerary dan keputusan", type: "Koleris" },
      { label: "Periset tempat dan detail biaya", type: "Melankolis" },
      { label: "Anggota santai yang ikut ke mana saja", type: "Plegmatis" },
    ],
  },
  {
    question: "Isi notifikasi HP-mu kebanyakan...",
    options: [
      { label: "Chat grup yang ramai", type: "Sanguinis" },
      { label: "Reminder target dan pekerjaan", type: "Koleris" },
      { label: "Catatan dan jadwal yang tertata", type: "Melankolis" },
      { label: "Sedikit — HP sering senyap", type: "Plegmatis" },
    ],
  },
  {
    question: "Saat harus memutuskan sesuatu dengan cepat...",
    options: [
      { label: "Tanya pendapat teman-teman dulu", type: "Sanguinis" },
      { label: "Putuskan sendiri, langsung jalan", type: "Koleris" },
      { label: "Minta waktu untuk menimbang", type: "Melankolis" },
      { label: "Ikut suara terbanyak saja", type: "Plegmatis" },
    ],
  },
  {
    question: "Saat rencana tiba-tiba berubah...",
    options: [
      { label: "Justru seru, jadi petualangan baru", type: "Sanguinis" },
      { label: "Ambil alih dan susun ulang rencana", type: "Koleris" },
      { label: "Agak terganggu — butuh rencana pengganti", type: "Melankolis" },
      { label: "Santai, apa pun jadinya tidak masalah", type: "Plegmatis" },
    ],
  },
  {
    question: "Di lingkungan kerja atau kelas, kamu dikenal sebagai...",
    options: [
      { label: "Yang paling ramai dan banyak teman", type: "Sanguinis" },
      { label: "Yang memimpin dan ambil inisiatif", type: "Koleris" },
      { label: "Yang paling rapi dan bisa diandalkan detailnya", type: "Melankolis" },
      { label: "Yang paling kalem dan jarang konflik", type: "Plegmatis" },
    ],
  },
  {
    question: "Gaya bercerita kamu...",
    options: [
      { label: "Ekspresif, penuh drama dan tawa", type: "Sanguinis" },
      { label: "Langsung ke inti, tanpa basa-basi", type: "Koleris" },
      { label: "Runtut dan lengkap dengan detail", type: "Melankolis" },
      { label: "Singkat dan secukupnya", type: "Plegmatis" },
    ],
  },
  {
    question: "Saat antre panjang, kamu...",
    options: [
      { label: "Ngobrol dengan orang di sebelah", type: "Sanguinis" },
      { label: "Cari cara agar lebih cepat", type: "Koleris" },
      { label: "Menghitung waktu dan menyusun rencana", type: "Melankolis" },
      { label: "Sabar menunggu sambil melamun", type: "Plegmatis" },
    ],
  },
  {
    question: "Media sosialmu isinya...",
    options: [
      { label: "Story hampir setiap hari", type: "Sanguinis" },
      { label: "Pencapaian dan progres", type: "Koleris" },
      { label: "Feed estetik yang terkurasi", type: "Melankolis" },
      { label: "Jarang posting, lebih suka melihat", type: "Plegmatis" },
    ],
  },
  {
    question: "Dalam kerja kelompok, kamu...",
    options: [
      { label: "Menjaga suasana tetap menyenangkan", type: "Sanguinis" },
      { label: "Membagi tugas dan memimpin jalannya", type: "Koleris" },
      { label: "Memastikan kualitas setiap detail", type: "Melankolis" },
      { label: "Mengerjakan bagianku dengan tenang", type: "Plegmatis" },
    ],
  },
  {
    question: "Barang bawaanmu saat trip...",
    options: [
      { label: "Banyak — siapa tahu ada acara seru", type: "Sanguinis" },
      { label: "Ringkas, sesuai kebutuhan target", type: "Koleris" },
      { label: "Lengkap sesuai checklist yang kubuat", type: "Melankolis" },
      { label: "Secukupnya, tidak mau ribet", type: "Plegmatis" },
    ],
  },
  {
    question: "Reaksimu saat dapat kabar baik besar...",
    options: [
      { label: "Langsung teriak dan rayakan bareng orang", type: "Sanguinis" },
      { label: "Langsung merencanakan langkah berikutnya", type: "Koleris" },
      { label: "Cek dulu detailnya, benarkah demikian", type: "Melankolis" },
      { label: "Senyum tenang, bersyukur dalam hati", type: "Plegmatis" },
    ],
  },
  {
    question: "Hal yang paling membuatmu bersemangat...",
    options: [
      { label: "Bertemu orang-orang baru", type: "Sanguinis" },
      { label: "Tantangan yang belum pernah kucoba", type: "Koleris" },
      { label: "Menyelesaikan sesuatu dengan sempurna", type: "Melankolis" },
      { label: "Hari damai tanpa tekanan apa pun", type: "Plegmatis" },
    ],
  },
  {
    question: "Saat ada konflik di dalam tim...",
    options: [
      { label: "Kucairkan suasananya dengan humor", type: "Sanguinis" },
      { label: "Kuselesaikan langsung secara terbuka", type: "Koleris" },
      { label: "Kupikirkan kata-kata dengan hati-hati dulu", type: "Melankolis" },
      { label: "Kujadi penengah yang menenangkan", type: "Plegmatis" },
    ],
  },
  {
    question: "Meja kerja atau kamarmu...",
    options: [
      { label: "Penuh pernak-pernik dan kenangan", type: "Sanguinis" },
      { label: "Fungsional — yang penting kerja jalan", type: "Koleris" },
      { label: "Tertata rapi dan terorganisir", type: "Melankolis" },
      { label: "Sederhana, apa adanya", type: "Plegmatis" },
    ],
  },
];

export function scoreGalen(answers: GalenId[]): GalenId {
  const counts = new Map<GalenId, number>();
  for (const a of answers) counts.set(a, (counts.get(a) || 0) + 1);
  let best: GalenId = "Sanguinis";
  let bestScore = -1;
  for (const [type, score] of counts) {
    if (score > bestScore) {
      bestScore = score;
      best = type;
    }
  }
  return best;
}

// ---------------- MBTI (20 pertanyaan, 5 per dimensi — ganjil, tak bisa seri) ----------------
export type MbtiQuestion = {
  question: string;
  options: [{ label: string; letter: string }, { label: string; letter: string }];
};

export const MBTI_QUIZ: MbtiQuestion[] = [
  {
    question: "Setelah seminggu sibuk, kamu isi ulang energi dengan...",
    options: [
      { label: "Kumpul bareng banyak orang", letter: "E" },
      { label: "Waktu sendiri yang tenang", letter: "I" },
    ],
  },
  {
    question: "Dalam obrolan grup, kamu lebih sering...",
    options: [
      { label: "Bicara sambil berpikir", letter: "E" },
      { label: "Berpikir dulu baru bicara", letter: "I" },
    ],
  },
  {
    question: "Kamu lebih percaya pada...",
    options: [
      { label: "Fakta dan pengalaman nyata", letter: "S" },
      { label: "Intuisi dan kemungkinan", letter: "N" },
    ],
  },
  {
    question: "Saat membaca tempat wisata, kamu fokus ke...",
    options: [
      { label: "Detail praktis: harga, rute, jam buka", letter: "S" },
      { label: "Gambaran besar: vibe & cerita tempatnya", letter: "N" },
    ],
  },
  {
    question: "Saat teman curhat, kamu cenderung...",
    options: [
      { label: "Bantu cari solusi logis", letter: "T" },
      { label: "Validasi perasaannya dulu", letter: "F" },
    ],
  },
  {
    question: "Keputusan besar kamu ambil berdasarkan...",
    options: [
      { label: "Analisis untung-rugi", letter: "T" },
      { label: "Nilai pribadi & dampak ke orang lain", letter: "F" },
    ],
  },
  {
    question: "Gaya liburanmu lebih ke...",
    options: [
      { label: "Itinerary tersusun rapi", letter: "J" },
      { label: "Mengalir, lihat nanti di sana", letter: "P" },
    ],
  },
  {
    question: "Deadline bagimu adalah...",
    options: [
      { label: "Patokan yang harus ditepati lebih awal", letter: "J" },
      { label: "Sumber tenaga di menit-menit akhir", letter: "P" },
    ],
  },
  {
    question: "Akhir pekan idealmu...",
    options: [
      { label: "Penuh agenda bareng teman", letter: "E" },
      { label: "Maraton film atau buku di rumah", letter: "I" },
    ],
  },
  {
    question: "Di acara yang ramai, kamu...",
    options: [
      { label: "Makin lama makin berenergi", letter: "E" },
      { label: "Cepat lelah dan mencari pojok tenang", letter: "I" },
    ],
  },
  {
    question: "Dengan kenalan baru, kamu...",
    options: [
      { label: "Mudah akrab — aku yang menyapa duluan", letter: "E" },
      { label: "Butuh waktu sebelum benar-benar nyaman", letter: "I" },
    ],
  },
  {
    question: "Saat belajar hal baru, kamu mulai dari...",
    options: [
      { label: "Contoh nyata dan praktik langsung", letter: "S" },
      { label: "Konsep besar dan alasannya", letter: "N" },
    ],
  },
  {
    question: "Obrolan yang lebih kamu nikmati...",
    options: [
      { label: "Pengalaman dan kejadian nyata", letter: "S" },
      { label: "Ide, teori, dan 'bagaimana jika'", letter: "N" },
    ],
  },
  {
    question: "Instruksi yang kamu suka...",
    options: [
      { label: "Langkah demi langkah yang jelas", letter: "S" },
      { label: "Garis besar saja, sisanya improvisasi", letter: "N" },
    ],
  },
  {
    question: "Kritik terbaik menurutmu...",
    options: [
      { label: "Jujur dan langsung ke poinnya", letter: "T" },
      { label: "Disampaikan dengan empati", letter: "F" },
    ],
  },
  {
    question: "Saat menilai sebuah ide, yang utama...",
    options: [
      { label: "Masuk akal atau tidak", letter: "T" },
      { label: "Dampaknya ke orang-orang", letter: "F" },
    ],
  },
  {
    question: "Dalam diskusi panas, kamu...",
    options: [
      { label: "Fokus pada logika argumen", letter: "T" },
      { label: "Menjaga perasaan semua pihak", letter: "F" },
    ],
  },
  {
    question: "Packing untuk trip, kamu...",
    options: [
      { label: "H-3 koper sudah rapi", letter: "J" },
      { label: "Malam sebelum berangkat baru mulai", letter: "P" },
    ],
  },
  {
    question: "To-do list bagimu...",
    options: [
      { label: "Wajib dicoret satu per satu", letter: "J" },
      { label: "Sekadar saran yang bisa berubah", letter: "P" },
    ],
  },
  {
    question: "Rencana yang berubah mendadak itu...",
    options: [
      { label: "Mengganggu — aku suka kepastian", letter: "J" },
      { label: "Justru menarik — jadi lebih hidup", letter: "P" },
    ],
  },
];

export function scoreMbti(letters: string[]): string {
  const count = (l: string) => letters.filter((x) => x === l).length;
  return (
    (count("E") >= count("I") ? "E" : "I") +
    (count("S") >= count("N") ? "S" : "N") +
    (count("T") >= count("F") ? "T" : "F") +
    (count("J") >= count("P") ? "J" : "P")
  );
}

export const MBTI_DESC: Record<string, string> = {
  INTJ: "Si Arsitek — perencana strategis; suka itinerary efisien dan tempat bermakna.",
  INTP: "Si Pemikir — penjelajah ide; suka tempat unik dengan cerita untuk dianalisis.",
  ENTJ: "Si Komandan — pemimpin trip alami; itinerary padat, target jelas.",
  ENTP: "Si Pendebat — spontan dan penasaran; suka pengalaman baru yang tak terduga.",
  INFJ: "Si Advokat — pencari makna; suka tempat tenang dengan kedalaman budaya.",
  INFP: "Si Mediator — pemimpi; suka hidden gem, jurnal perjalanan, dan momen syahdu.",
  ENFJ: "Si Protagonis — perekat grup; paling seru saat trip bareng orang tersayang.",
  ENFP: "Si Juru Kampanye — bebas dan ekspresif; suka petualangan spontan penuh warna.",
  ISTJ: "Si Logistik — teliti dan tepercaya; rencana matang, anggaran rapi.",
  ISFJ: "Si Pembela — hangat dan perhatian; memastikan semua orang nyaman di trip.",
  ESTJ: "Si Eksekutif — organisator; jadwal jalan, semua orang tahu tugasnya.",
  ESFJ: "Si Konsul — tuan rumah sejati; suka trip keluarga dan momen kebersamaan.",
  ISTP: "Si Virtuoso — praktis dan tangkas; suka aktivitas fisik dan eksplorasi bebas.",
  ISFP: "Si Petualang — estetik dan tenang; suka alam, seni, dan golden hour.",
  ESTP: "Si Pengusaha — adrenalin tinggi; olahraga air, tantangan, aksi spontan.",
  ESFP: "Si Penghibur — jiwa pesta; pantai ramai, musik, dan orang-orang baru.",
};
