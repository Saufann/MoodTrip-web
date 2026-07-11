import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Bagaimana MoodTrip menangani datamu.",
};

export default function PrivasiPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <span className="chip bg-primary/10 font-semibold text-primary">
        Legal
      </span>
      <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
        Kebijakan Privasi
      </h1>
      <p className="mt-2 text-sm text-muted">Terakhir diperbarui: Juli 2026</p>

      <div className="mt-8 space-y-6 leading-relaxed text-ink/85">
        <section>
          <h2 className="font-bold text-ink">Data yang kami simpan</h2>
          <p className="mt-2 text-sm">
            Profil (nama, tag minat, hasil tes kepribadian), wishlist,
            keranjang, review, itinerary, dan riwayat pesanan disimpan secara
            lokal di browser perangkatmu (localStorage). Data ini tidak dikirim
            ke server MoodTrip dan bisa kamu hapus kapan saja lewat pengaturan
            browser (Clear Site Data).
          </p>
        </section>
        <section>
          <h2 className="font-bold text-ink">Pemesanan via WhatsApp</h2>
          <p className="mt-2 text-sm">
            Saat kamu memesan paket atau checkout, detail pesanan diteruskan ke
            WhatsApp admin MoodTrip atas tindakanmu sendiri. Percakapan tunduk
            pada kebijakan privasi WhatsApp.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-ink">Layanan pihak ketiga</h2>
          <p className="mt-2 text-sm">
            Sebagian gambar dimuat dari Unsplash dan font dari Google Fonts.
            Layanan tersebut dapat mencatat alamat IP sesuai kebijakan
            masing-masing. Kami tidak memasang iklan maupun pelacak analitik
            pihak ketiga.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-ink">Perubahan kebijakan</h2>
          <p className="mt-2 text-sm">
            Kebijakan ini dapat berubah seiring bertambahnya fitur (mis. saat
            login/akun tersedia). Perubahan akan diumumkan di halaman ini.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-ink">Kontak</h2>
          <p className="mt-2 text-sm">
            Pertanyaan tentang privasi: WhatsApp 0857-3773-6349 · Mataram,
            Lombok, NTB.
          </p>
        </section>
      </div>
    </div>
  );
}
