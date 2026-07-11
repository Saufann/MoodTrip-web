import Link from "next/link";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo.svg"
      alt=""
      aria-hidden
      className={`rounded-xl ${className}`}
    />
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
        Mood<span className={light ? "text-white" : "text-primary"}>Trip</span>
      </span>
    </Link>
  );
}
