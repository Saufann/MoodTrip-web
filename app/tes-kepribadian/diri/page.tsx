"use client";

// Tes Kepribadian Diri: mode Galen (temperamen) atau MBTI.
// Hasil otomatis tersimpan sebagai tag di profil (lib/profile.ts).

import { useState } from "react";
import Link from "next/link";
import {
  GALEN_QUIZ,
  GALEN_INFO,
  GalenId,
  scoreGalen,
  MBTI_QUIZ,
  MBTI_DESC,
  scoreMbti,
} from "@/lib/tests";
import { saveProfile } from "@/lib/profile";

type Mode = "galen" | "mbti";

export default function TesDiriPage() {
  const [mode, setMode] = useState<Mode | null>(null);

  if (!mode) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16">
        <Link href="/tes-kepribadian" className="text-sm text-muted hover:text-primary">
          ← Semua tes
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
          Tes Kepribadian Diri
        </h1>
        <p className="mt-2 text-muted">
          Pilih kerangka yang mau kamu pakai — hasilnya jadi tag di profilmu.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => setMode("galen")}
            className="card-hover p-7 text-left"
          >
            <div className="text-3xl">🏛️</div>
            <h2 className="mt-3 text-lg font-bold text-ink">Galen</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              4 temperamen klasik: Sanguinis, Koleris, Melankolis, Plegmatis.
              20 pertanyaan, ±3 menit.
            </p>
          </button>
          <button
            onClick={() => setMode("mbti")}
            className="card-hover p-7 text-left"
          >
            <div className="text-3xl">🧩</div>
            <h2 className="mt-3 text-lg font-bold text-ink">MBTI</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              16 tipe kepribadian (mis. INFP, ESTJ). 20 pertanyaan, ±3 menit.
            </p>
          </button>
        </div>
      </div>
    );
  }

  return mode === "galen" ? (
    <GalenTest onBack={() => setMode(null)} />
  ) : (
    <MbtiTest onBack={() => setMode(null)} />
  );
}

// ---------------- Galen ----------------
function GalenTest({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<GalenId[]>([]);
  const [result, setResult] = useState<GalenId | null>(null);

  function choose(type: GalenId) {
    const next = [...answers, type];
    setAnswers(next);
    if (step + 1 < GALEN_QUIZ.length) {
      setStep(step + 1);
    } else {
      const r = scoreGalen(next);
      setResult(r);
      saveProfile({ galen: r });
    }
  }

  if (result) {
    const info = GALEN_INFO[result];
    return (
      <ResultCard
        emoji={info.emoji}
        label="Temperamen kamu"
        title={result}
        desc={info.desc}
        travel={info.travel}
        onRetry={() => {
          setStep(0);
          setAnswers([]);
          setResult(null);
        }}
      />
    );
  }

  return (
    <QuizShell
      onBack={onBack}
      step={step}
      total={GALEN_QUIZ.length}
      question={GALEN_QUIZ[step].question}
    >
      {GALEN_QUIZ[step].options.map((opt, i) => (
        <OptionButton key={opt.label} index={i} onClick={() => choose(opt.type)}>
          {opt.label}
        </OptionButton>
      ))}
    </QuizShell>
  );
}

// ---------------- MBTI ----------------
function MbtiTest({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  function choose(letter: string) {
    const next = [...letters, letter];
    setLetters(next);
    if (step + 1 < MBTI_QUIZ.length) {
      setStep(step + 1);
    } else {
      const r = scoreMbti(next);
      setResult(r);
      saveProfile({ mbti: r });
    }
  }

  if (result) {
    return (
      <ResultCard
        emoji="🧩"
        label="Tipe MBTI kamu"
        title={result}
        desc={MBTI_DESC[result] ?? ""}
        travel=""
        onRetry={() => {
          setStep(0);
          setLetters([]);
          setResult(null);
        }}
      />
    );
  }

  return (
    <QuizShell
      onBack={onBack}
      step={step}
      total={MBTI_QUIZ.length}
      question={MBTI_QUIZ[step].question}
    >
      {MBTI_QUIZ[step].options.map((opt, i) => (
        <OptionButton key={opt.label} index={i} onClick={() => choose(opt.letter)}>
          {opt.label}
        </OptionButton>
      ))}
    </QuizShell>
  );
}

// ---------------- Komponen bersama ----------------
function QuizShell({
  onBack,
  step,
  total,
  question,
  children,
}: {
  onBack: () => void;
  step: number;
  total: number;
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <button onClick={onBack} className="text-sm text-muted hover:text-primary">
        ← Ganti mode tes
      </button>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-muted">
          Pertanyaan {step + 1} dari {total}
        </p>
        <p className="text-sm font-semibold text-primary">
          {Math.round(((step + 1) / total) * 100)}%
        </p>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-500"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>
      <h1
        key={step}
        className="mt-8 animate-fade-up text-2xl font-bold text-ink sm:text-3xl"
      >
        {question}
      </h1>
      <div key={`opts-${step}`} className="mt-6 grid animate-fade-up gap-3">
        {children}
      </div>
    </div>
  );
}

function OptionButton({
  index,
  onClick,
  children,
}: {
  index: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4 text-left font-medium text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
    >
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-cream text-sm font-bold text-muted transition-colors group-hover:bg-primary group-hover:text-white">
        {String.fromCharCode(65 + index)}
      </span>
      {children}
    </button>
  );
}

function ResultCard({
  emoji,
  label,
  title,
  desc,
  travel,
  onRetry,
}: {
  emoji: string;
  label: string;
  title: string;
  desc: string;
  travel: string;
  onRetry: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <div className="animate-fade-up rounded-3xl border border-line bg-white p-8 text-center shadow-card">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-6xl">
          {emoji}
        </div>
        <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted">
          {label}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-primary sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink/80">
          {desc}
        </p>
        {travel && (
          <p className="mx-auto mt-3 max-w-md rounded-2xl bg-cream p-4 text-sm leading-relaxed text-muted">
            💡 {travel}
          </p>
        )}
        <p className="mt-4 text-xs text-muted">
          ✓ Tersimpan sebagai tag di{" "}
          <Link href="/profil" className="font-semibold text-primary hover:underline">
            profilmu
          </Link>
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/jelajah" className="btn-primary">
            Lihat Rekomendasi Tempat
          </Link>
          <button onClick={onRetry} className="btn-outline">
            ↺ Ulangi Tes
          </button>
        </div>
      </div>
    </div>
  );
}
