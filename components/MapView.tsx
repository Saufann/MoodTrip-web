"use client";

// Peta interaktif Leaflet. Dimuat dinamis (ssr: false) dari app/peta/page.tsx.
// CircleMarker dipakai agar tidak perlu aset ikon marker bawaan Leaflet.

import Link from "next/link";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Spot } from "@/lib/spots";
import { Resto } from "@/lib/kuliner";

function markerColor(category: string) {
  const k = category.toLowerCase();
  if (k.includes("kuliner") || k.includes("kafe")) return "#E65A3D";
  if (k.includes("pantai") || k.includes("pulau")) return "#1D7CB0";
  if (k.includes("budaya") || k.includes("landmark")) return "#9668A8";
  return "#126C62";
}

export default function MapView({
  spots,
  restos,
}: {
  spots: Spot[];
  restos: Resto[];
}) {
  // Hindari pin dobel: resto mitra yang juga terdaftar sebagai spot
  // (nama sama) cukup tampil sebagai pin resto (punya status buka/tutup).
  const restoNames = new Set(restos.map((r) => r.name));
  const spotPins = spots.filter((s) => !restoNames.has(s.name));

  return (
    <MapContainer
      center={[-8.65, 116.28]}
      zoom={10}
      scrollWheelZoom
      className="h-[70vh] w-full rounded-[2rem] border border-line shadow-soft"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {spotPins.map((s) => (
        <CircleMarker
          key={`spot-${s.id}`}
          center={[s.lat, s.lng]}
          radius={9}
          pathOptions={{
            color: "#ffffff",
            weight: 2,
            fillColor: markerColor(s.category),
            fillOpacity: 1,
          }}
        >
          <Popup>
            <div style={{ minWidth: 170 }}>
              <strong>{s.name}</strong>
              <div style={{ fontSize: 12, color: "#626F6A", marginTop: 2 }}>
                {s.category} · ★ {s.rating}
              </div>
              <div style={{ fontSize: 12, color: "#626F6A" }}>🕐 {s.hours}</div>
              <Link
                href={`/jelajah/${s.id}`}
                style={{ fontSize: 13, fontWeight: 600, color: "#126C62" }}
              >
                Lihat detail →
              </Link>
            </div>
          </Popup>
        </CircleMarker>
      ))}

      {restos.map((r) => (
        <CircleMarker
          key={`resto-${r.id}`}
          center={[r.lat, r.lng]}
          radius={9}
          pathOptions={{
            color: "#ffffff",
            weight: 2,
            fillColor: "#E65A3D",
            fillOpacity: r.isOpen ? 1 : 0.45,
          }}
        >
          <Popup>
            <div style={{ minWidth: 170 }}>
              <strong>{r.name}</strong>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 3,
                  fontSize: 12,
                  fontWeight: 700,
                  color: r.isOpen ? "#15803D" : "#DC2626",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 99,
                    background: r.isOpen ? "#22C55E" : "#EF4444",
                    display: "inline-block",
                  }}
                />
                {r.isOpen ? "Buka sekarang" : "Sedang tutup"}
              </div>
              <div style={{ fontSize: 12, color: "#626F6A", marginTop: 2 }}>
                🕐 {r.hours} · {r.location}
              </div>
              <Link
                href="/kuliner"
                style={{ fontSize: 13, fontWeight: 600, color: "#126C62" }}
              >
                Lihat menu →
              </Link>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
