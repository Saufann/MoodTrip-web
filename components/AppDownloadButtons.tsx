// Tombol unduh aplikasi. Ganti href dengan link Play Store / App Store
// saat aplikasi sudah rilis.

const PLAY_STORE_URL = "#"; // TODO: link Play Store
const APP_STORE_URL = "#"; // TODO: link App Store

export default function AppDownloadButtons({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const style = light
    ? "bg-white text-ink"
    : "bg-ink text-white";
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={PLAY_STORE_URL}
        title="Segera hadir di Google Play"
        className={`flex items-center gap-3 rounded-xl px-5 py-2.5 transition-all hover:scale-[1.02] hover:shadow-card ${style}`}
      >
        <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.6 1.8 13.7 12 3.6 22.2c-.4-.2-.6-.7-.6-1.2V3c0-.5.2-1 .6-1.2Zm11.5 8.8 2.6-2.6 3.3 1.9c.9.5.9 1.7 0 2.2l-3.3 1.9-2.6-2.6-.4-.4.4-.4ZM5.2 1.3l9.1 9.1-2 2L5.2 1.3c0-.1 0 0 0 0Zm9.1 12.3-9.1 9.1 7.1-11.1 2 2Z" />
        </svg>
        <span className="text-left leading-tight">
          <span className="block text-[10px] uppercase tracking-wide opacity-75">
            Dapatkan di
          </span>
          <span className="block text-sm font-bold">Google Play</span>
        </span>
      </a>
      <a
        href={APP_STORE_URL}
        title="Segera hadir di App Store"
        className={`flex items-center gap-3 rounded-xl px-5 py-2.5 transition-all hover:scale-[1.02] hover:shadow-card ${style}`}
      >
        <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 12.54c0-2.3 1.88-3.4 1.97-3.46-1.08-1.57-2.75-1.79-3.34-1.81-1.4-.15-2.76.84-3.48.84-.73 0-1.83-.82-3.02-.8-1.53.02-2.96.91-3.75 2.29-1.62 2.8-.41 6.93 1.14 9.2.77 1.11 1.68 2.36 2.87 2.31 1.16-.05 1.6-.74 3-.74 1.4 0 1.79.74 3 .72 1.25-.02 2.04-1.12 2.8-2.24.89-1.29 1.25-2.55 1.27-2.61-.03-.01-2.43-.93-2.46-3.7ZM14.75 5.6c.63-.78 1.06-1.85.94-2.93-.91.04-2.05.62-2.71 1.39-.58.68-1.1 1.79-.96 2.84 1.02.08 2.07-.52 2.73-1.3Z" />
        </svg>
        <span className="text-left leading-tight">
          <span className="block text-[10px] uppercase tracking-wide opacity-75">
            Unduh di
          </span>
          <span className="block text-sm font-bold">App Store</span>
        </span>
      </a>
    </div>
  );
}
