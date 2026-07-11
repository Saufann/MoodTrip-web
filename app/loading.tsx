export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-5 py-12">
      <div className="h-9 w-64 rounded-xl bg-line" />
      <div className="mt-3 h-4 w-96 max-w-full rounded-lg bg-line/70" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-line">
            <div className="h-48 bg-line/60" />
            <div className="space-y-3 p-4">
              <div className="h-5 w-3/4 rounded-lg bg-line" />
              <div className="h-4 w-full rounded-lg bg-line/70" />
              <div className="h-4 w-1/2 rounded-lg bg-line/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
