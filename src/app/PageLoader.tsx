/**
 * Fallback shown while a lazily-loaded route chunk is fetched.
 * Mirrors the editorial layout so the transition into a page feels continuous.
 */
export function PageLoader() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="editorial-card min-h-[24rem] animate-pulse p-6 sm:p-8">
          <div className="h-3 w-28 rounded-full bg-foreground/10" />
          <div className="mt-8 h-20 max-w-xl rounded-[1.5rem] bg-foreground/10" />
          <div className="mt-6 grid gap-3">
            <div className="h-4 rounded-full bg-foreground/10" />
            <div className="h-4 max-w-[92%] rounded-full bg-foreground/10" />
            <div className="h-4 max-w-[78%] rounded-full bg-foreground/10" />
          </div>
        </div>
        <div className="ink-panel min-h-[24rem] animate-pulse p-6 sm:p-8">
          <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default PageLoader;
