"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SPOTS } from "@/lib/spots";
import { useLiveRestos } from "@/components/useLiveRestos";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[70vh] w-full animate-pulse place-items-center rounded-[2rem] border border-line bg-cream text-muted">
      Memuat peta...
    </div>
  ),
});

const LEGEND = [
  { label: "Alam & lainnya", color: "#126C62" },
  { label: "Pantai & pulau", color: "#1D7CB0" },
  { label: "Budaya & landmark", color: "#9668A8" },
  { label: "Kuliner & resto (pudar = tutup)", color: "#E65A3D" },
];

export default function PetaPage() {
  const [showWisata, setShowWisata] = useState(true);
  const [showKuliner, setShowKuliner] = useState(true);
  const { restos: RESTOS } = useLiveRestos();

  const { spots, restos } = useMemo(() => {
    const isKulinerSpot = (c: string) =>
      c.toLowerCase().includes("kuliner") || c.toLowerCase().includes("kafe");
    return {
      spots: SPOTS.filter((s) =>
        isKulinerSpot(s.category) ? showKuliner : showWisata
      ),
      restos: showKuliner ? RESTOS : [],
    };
  }, [showWisata, showKuliner, RESTOS]);

  const openCount = RESTOS.filter((r) => r.isOpen).length;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">
            Peta Wisata Lombok
          </h1>
          <p className="mt-2 text-muted">
            Spot wisata dan kuliner dalam satu peta — {openCount} dari{" "}
            {RESTOS.length} resto mitra sedang buka.
          </p>
        </div>
        <Link href="/jelajah" className="btn-outline py-2 text-sm">
          ☰ Lihat sebagai daftar
        </Link>
      </div>

      {/* Toggle layer */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <LayerChip
          active={showWisata}
          onClick={() => setShowWisata(!showWisata)}
          label="🏝️ Tempat wisata"
        />
        <LayerChip
          active={showKuliner}
          onClick={() => setShowKuliner(!showKuliner)}
          label="🍽️ Kuliner & resto"
        />
        <span className="hidden text-xs text-muted sm:block">
          — klik untuk sembunyikan/tampilkan layer
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="h-3 w-3 rounded-full border-2 border-white shadow-soft"
              style={{ backgroundColor: l.color }}
            />
            {l.label}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <MapView spots={spots} restos={restos} />
      </div>
    </div>
  );
}

function LayerChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "border-primary bg-primary text-white shadow-glow"
          : "border-line bg-white text-muted line-through hover:border-primary hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}
