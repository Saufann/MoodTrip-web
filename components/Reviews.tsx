"use client";

// Review spot.
// - Supabase aktif  → baca/tulis tabel spot_reviews, WAJIB login untuk menulis.
// - Supabase kosong → mode demo: review anonim tersimpan lokal (perilaku lama).

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { SeedReview } from "@/lib/details";
import { supabase, isSupabaseReady } from "@/lib/supabase";
import { useUser } from "@/components/useUser";
import {
  UserReview,
  getUserReviews,
  addUserReview,
  removeUserReview,
  STORE_EVENT,
} from "@/lib/store";

type Item = {
  key: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  mine: boolean;
  dbId?: number;
  localIndex?: number;
};

export default function Reviews({
  spotId,
  seed,
}: {
  spotId: number;
  seed: SeedReview[];
}) {
  const { user } = useUser();
  const [dbItems, setDbItems] = useState<Item[]>([]);
  const [localItems, setLocalItems] = useState<UserReview[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");

  const loadDb = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("spot_reviews")
      .select("id, rating, body, created_at, user_id, profiles(name)")
      .eq("spot_id", spotId)
      .order("created_at", { ascending: false });
    if (!data) return;
    setDbItems(
      data.map((r) => {
        const profile = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
        return {
          key: `db-${r.id}`,
          dbId: r.id,
          name: profile?.name || "Traveler",
          rating: r.rating,
          text: r.body,
          date: new Date(r.created_at).toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          }),
          mine: user?.id === r.user_id,
        };
      })
    );
  }, [spotId, user?.id]);

  useEffect(() => {
    loadDb();
  }, [loadDb]);

  useEffect(() => {
    const update = () => setLocalItems(getUserReviews(spotId));
    update();
    window.addEventListener(STORE_EVENT, update);
    return () => window.removeEventListener(STORE_EVENT, update);
  }, [spotId]);

  // Mode demo memakai review lokal; mode Supabase memakai DB
  const userItems: Item[] = isSupabaseReady
    ? dbItems
    : localItems.map((r, i) => ({
        key: `local-${i}`,
        localIndex: i,
        name: r.name,
        rating: r.rating,
        date: r.date,
        text: r.text,
        mine: true,
      }));

  const seedItems: Item[] = seed.map((r, i) => ({
    key: `seed-${i}`,
    name: r.name,
    rating: r.rating,
    date: r.date,
    text: r.text,
    mine: false,
  }));

  const all = [...userItems, ...seedItems];
  const avg =
    all.length > 0
      ? Math.round((all.reduce((s, r) => s + r.rating, 0) / all.length) * 10) / 10
      : 0;

  const canWrite = !isSupabaseReady || user !== null;
  const alreadyReviewed = isSupabaseReady && dbItems.some((r) => r.mine);

  async function submit(r: { name: string; rating: number; text: string }) {
    setNotice("");
    if (isSupabaseReady && supabase && user) {
      const { error } = await supabase.from("spot_reviews").insert({
        spot_id: spotId,
        user_id: user.id,
        rating: r.rating,
        body: r.text,
      });
      if (error) {
        setNotice(
          error.code === "23505"
            ? "Kamu sudah pernah me-review tempat ini — hapus dulu untuk menulis ulang."
            : "Gagal mengirim review. Coba lagi."
        );
        return;
      }
      await loadDb();
    } else {
      const now = new Date().toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });
      addUserReview(spotId, { name: r.name, rating: r.rating, date: now, text: r.text });
    }
    setShowForm(false);
  }

  async function remove(item: Item) {
    if (item.dbId && supabase) {
      await supabase.from("spot_reviews").delete().eq("id", item.dbId);
      await loadDb();
    } else if (item.localIndex !== undefined) {
      removeUserReview(spotId, item.localIndex);
    }
  }

  return (
    <section className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-ink">Review</h2>
          {all.length > 0 && (
            <p className="mt-1 flex items-center gap-2 text-sm text-muted">
              <span className="text-lg font-extrabold text-accent">★ {avg}</span>
              dari {all.length} review
            </p>
          )}
        </div>
        {canWrite ? (
          <button
            onClick={() => setShowForm(!showForm)}
            disabled={alreadyReviewed && !showForm}
            className="btn-outline py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            title={alreadyReviewed ? "Kamu sudah me-review tempat ini" : ""}
          >
            {showForm
              ? "Batal"
              : alreadyReviewed
              ? "✓ Sudah direview"
              : "✍️ Tulis Review"}
          </button>
        ) : (
          <Link href="/masuk" className="btn-outline py-2 text-sm">
            🔒 Masuk untuk menulis review
          </Link>
        )}
      </div>

      {notice && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {notice}
        </p>
      )}

      {showForm && canWrite && (
        <ReviewForm
          askName={!isSupabaseReady}
          defaultName={user?.user_metadata?.name ?? ""}
          onSubmit={submit}
        />
      )}

      {all.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-line bg-cream/50 p-6 text-center text-sm text-muted">
          Belum ada review. Jadilah yang pertama!
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {all.map((r) => (
            <ReviewCard key={r.key} r={r} onDelete={r.mine ? () => remove(r) : undefined} />
          ))}
        </div>
      )}
    </section>
  );
}

function ReviewCard({ r, onDelete }: { r: Item; onDelete?: () => void }) {
  return (
    <article className={`card p-5 ${r.mine ? "ring-1 ring-primary/25" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-primary/10 font-bold text-primary">
          {r.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2 font-semibold text-ink">
            {r.name}
            {r.mine && (
              <span className="chip bg-primary/10 text-[10px] font-bold text-primary">
                Kamu
              </span>
            )}
          </div>
          <div className="text-xs text-muted">{r.date}</div>
        </div>
        <div className="ml-auto text-sm font-bold text-accent">
          {"★".repeat(r.rating)}
          <span className="text-line">{"★".repeat(5 - r.rating)}</span>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink/85">{r.text}</p>
      {r.mine && onDelete && (
        <button
          onClick={onDelete}
          className="mt-3 text-xs font-medium text-muted transition-colors hover:text-accent"
        >
          🗑 Hapus review ini
        </button>
      )}
    </article>
  );
}

function ReviewForm({
  askName,
  defaultName,
  onSubmit,
}: {
  askName: boolean;
  defaultName: string;
  onSubmit: (r: { name: string; rating: number; text: string }) => void;
}) {
  const [name, setName] = useState(defaultName);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const valid = (!askName || name.trim() !== "") && text.trim() !== "";

  return (
    <div className="card mt-5 animate-fade-up p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {askName && (
          <div>
            <label htmlFor="rev-nama" className="mb-1.5 block text-sm font-medium text-ink">
              Nama
            </label>
            <input
              id="rev-nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama kamu"
              className="w-full rounded-xl border border-line px-4 py-2.5 outline-none transition-colors focus:border-primary"
            />
          </div>
        )}
        <div>
          <span className="mb-1.5 block text-sm font-medium text-ink">Rating</span>
          <div className="flex gap-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} bintang`}
                onClick={() => setRating(n)}
                className={`text-2xl transition-transform hover:scale-110 ${
                  n <= rating ? "text-accent" : "text-line"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="rev-text" className="mb-1.5 block text-sm font-medium text-ink">
          Review kamu
        </label>
        <textarea
          id="rev-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Ceritakan pengalamanmu di sini..."
          className="w-full resize-none rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-primary"
        />
      </div>
      <button
        onClick={() => valid && onSubmit({ name: name.trim(), rating, text: text.trim() })}
        disabled={!valid}
        className={`btn mt-4 ${
          valid
            ? "bg-primary text-white hover:bg-primary-dark"
            : "cursor-not-allowed bg-line text-muted"
        }`}
      >
        Kirim Review
      </button>
      <p className="mt-2 text-xs text-muted">
        {askName
          ? "Mode demo: review tersimpan di perangkat ini."
          : "Review tampil dengan nama profilmu dan tersimpan di akunmu."}
      </p>
    </div>
  );
}
