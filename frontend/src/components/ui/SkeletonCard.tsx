// Skeleton loaders for project cards
export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="skeleton h-4 w-32 rounded" />
        <div className="skeleton h-5 w-20 rounded-full" />
      </div>
      <div className="skeleton h-3 w-full rounded" />
      <div className="skeleton h-3 w-4/5 rounded" />
      <div className="flex gap-2 mt-4">
        <div className="skeleton h-5 w-16 rounded-full" />
        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="skeleton h-3 w-12 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    </div>
  )
}

export function SkeletonProfile() {
  return (
    <div className="flex items-center gap-4 animate-pulse">
      <div className="skeleton w-20 h-20 rounded-full" />
      <div className="space-y-2">
        <div className="skeleton h-6 w-40 rounded" />
        <div className="skeleton h-4 w-60 rounded" />
      </div>
    </div>
  )
}
