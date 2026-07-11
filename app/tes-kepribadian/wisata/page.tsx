"use client";

import { useState } from "react";
import Link from "next/link";
import { QUIZ, scorePersona, PersonaId, Persona } from "@/lib/personas";
import { saveProfile } from "@/lib/profile";

export default function TesWisataPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PersonaId[]>([]);
  const [result, setResult] = useState<Persona | null>(null);

  function choose(persona: PersonaId) {
    const next = [...answers, persona];
    setAnswers(next);
    if (step + 1 < QUIZ.length) {
      setStep(step + 1);
    } else {
      const r = scorePersona(next);
      setResult(r);
      saveProfile({ persona: r.name }); // simpan sebagai tag profil
    }
  }

  function restart() {
    setStep(0);
    setAnswers([]);
    setResult(null);
  }

  if (result) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <div className="animate-fade-up rounded-3xl border border-line bg-white p-8 text-center shadow-card">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-6xl">
            {result.emoji}
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted">
            Persona travel-mu
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-primary sm:text-4xl">
            {result.name}
          </h1>
          <p className="mx-auto mt-2 max-w-md leading-relaxed text-ink/80">
            {result.tagline}
          </p>
          <p className="mt-3 text-xs text-muted">
            ✓ Tersimpan sebagai tag di{" "}
            <Link href="/profil" className="font-semibold text-primary hover:underline">
              profilmu
            </Link>
          </p>

          <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
            <RecCard title="Paket Wisata" items={result.recommendations.paket} highlight />
            <RecCard title="Aksesoris" items={result.recommendations.aksesoris} />
            <RecCard title="Kuliner" items={result.recommendations.makanan} />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={`/paket?persona=${encodeURIComponent(result.name)}`}
              className="btn-accent"
            >
              Pesan Paket Rekomendasi
            </Link>
            <button onClick={restart} className="btn-outline">
              ↺ Ulangi Tes
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUIZ[step];
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <Link href="/tes-kepribadian" className="text-sm text-muted hover:text-primary">
        ← Semua tes
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-muted">
          Pertanyaan {step + 1} dari {QUIZ.length}
        </p>
        <p className="text-sm font-semibold text-primary">
          {Math.round(((step + 1) / QUIZ.length) * 100)}%
        </p>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={QUIZ.length}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-500"
          style={{ width: `${((step + 1) / QUIZ.length) * 100}%` }}
        />
      </div>

      <h1
        key={step}
        className="mt-8 animate-fade-up text-2xl font-bold text-ink sm:text-3xl"
      >
        {q.question}
      </h1>
      <div key={`opts-${step}`} className="mt-6 grid animate-fade-up gap-3">
        {q.options.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => choose(opt.persona)}
            className="group flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4 text-left font-medium text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
          >
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-cream text-sm font-bold text-muted transition-colors group-hover:bg-primary group-hover:text-white">
              {String.fromCharCode(65 + i)}
            </span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function RecCard({
  title,
  items,
  highlight,
}: {
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight ? "border-accent bg-accent/5" : "border-line bg-cream"
      }`}
    >
      <div className="font-bold text-ink">{title}</div>
      <ul className="mt-2 space-y-1 text-sm text-muted">
        {items.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}
