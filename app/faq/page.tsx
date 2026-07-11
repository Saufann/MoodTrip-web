import type { Metadata } from "next";
import { WHATSAPP } from "@/lib/store";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Pertanyaan yang sering diajukan tentang MoodTrip.",
};

const FAQS = [
  {
    q: "Apa itu MoodTrip?",
    a: "MoodTrip adalah platform smart tourism untuk Mataram & Lombok yang mencocokkan paket wisata, kuliner, dan tempat dengan mood serta kepribadianmu — lewat tes kepribadian dan tag minat.",
  },
  {
    q: "Apakah MoodTrip yang menjalankan trip-nya?",
    a: "Tidak. Kami kurator, bukan operator. Semua paket dijalankan oleh mitra lokal tepercaya; MoodTrip membantu mencocokkan dan meneruskan pemesananmu.",
  },
  {
    q: "Bagaimana cara memesan paket wisata?",
    a: "Klik paket yang kamu suka → isi nama, tanggal, dan jumlah peserta → pesanan diteruskan ke admin via WhatsApp untuk konfirmasi ketersediaan dan pembayaran.",
  },
  {
    q: "Apakah tes kepribadiannya akurat?",
    a: "Tes Galen dan MBTI kami adalah versi ringkas (20 pertanyaan) untuk keperluan rekomendasi wisata — bukan alat diagnosis psikologis. Anggap sebagai kompas, bukan peta lengkap.",
  },
  {
    q: "Di mana data profil dan wishlist saya disimpan?",
    a: "Saat ini di perangkatmu sendiri (browser). Data tidak dikirim ke server. Fitur login untuk sinkronisasi antar perangkat akan hadir kemudian.",
  },
  {
    q: "Bagaimana cara pembayarannya?",
    a: "Untuk saat ini pembayaran dikoordinasikan via WhatsApp dengan admin (transfer/QRIS). Pembayaran online langsung di web akan menyusul.",
  },
  {
    q: "Apakah bisa request paket custom?",
    a: "Bisa! Hubungi kami via WhatsApp dan ceritakan mood liburanmu — kami carikan mitra yang pas.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <span className="chip bg-primary/10 font-semibold text-primary">
        Bantuan
      </span>
      <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
        Pertanyaan yang Sering Diajukan
      </h1>

      <div className="mt-8 space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className="group card p-0">
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden
                className="grid h-7 w-7 flex-none place-items-center rounded-full bg-cream text-primary transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
              {f.a}
            </p>
          </details>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        Masih ada pertanyaan?{" "}
        <a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:underline"
        >
          Chat kami di WhatsApp
        </a>
      </p>
    </div>
  );
}
