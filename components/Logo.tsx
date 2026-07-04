import Link from "next/link";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-dark font-extrabold text-white shadow-soft ${className}`}
    >
      M
    </span>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <LogoMark />
      <span
        className={`text-lg font-extrabold tracking-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        Mood<span className="text-primary">Trip</span>
      </span>
    </Link>
  );
}
