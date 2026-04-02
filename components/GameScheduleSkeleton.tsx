/**
 * GameScheduleSkeleton.tsx
 * Skeleton loading state that matches GameRow layout
 * Shows 5 animated placeholder rows while game data is being fetched
 */

export default function GameScheduleSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden shadow-xl">
      {/* Sport Tab Navigation Skeleton */}
      <div className="flex gap-2 border-b border-neutral-800 bg-neutral-950 p-3 md:p-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="px-3 py-2 md:px-4 md:py-2.5 rounded-md bg-neutral-800 animate-pulse"
            style={{ width: '60px', height: '32px' }}
          />
        ))}
      </div>

      {/* Games List Skeleton */}
      <div className="overflow-y-auto max-h-96">
        {[1, 2, 3, 4, 5].map((rowNum) => (
          <div
            key={rowNum}
            className="flex items-center justify-between gap-3 border-b border-neutral-800 py-4 px-4 md:gap-4 md:px-6"
          >
            {/* Home Team Skeleton */}
            <div className="flex items-center gap-2 flex-1 min-w-0 md:gap-3">
              <div className="w-6 h-6 rounded bg-neutral-800 flex-shrink-0 animate-pulse" />
              <div className="h-4 bg-neutral-800 rounded flex-1 animate-pulse" />
            </div>

            {/* VS Skeleton */}
            <div className="w-6 h-4 bg-neutral-800 rounded flex-shrink-0 animate-pulse" />

            {/* Away Team Skeleton */}
            <div className="flex items-center gap-2 flex-1 min-w-0 justify-end md:gap-3">
              <div className="h-4 bg-neutral-800 rounded flex-1 animate-pulse" />
              <div className="w-6 h-6 rounded bg-neutral-800 flex-shrink-0 animate-pulse" />
            </div>

            {/* Time Skeleton */}
            <div className="h-4 w-20 bg-neutral-800 rounded flex-shrink-0 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="border-t border-neutral-800 bg-neutral-950 px-4 py-2 text-center">
        <div className="h-3 w-40 bg-neutral-800 rounded mx-auto animate-pulse" />
      </div>
    </div>
  );
}
