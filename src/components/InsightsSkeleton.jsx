const InsightsSkeleton = () => {
  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="size-5 rounded-lg" />
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="h-3 w-64" />
        </div>
      </div>

      {/* Spending Concentration */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-4 shadow-lg">
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="size-18 rounded-3xl bg-white/5 border border-white/10 shrink-0" />

          <div className="flex-1 w-full text-center md:text-left space-y-2">
            <div className="bg-white/10 h-4 w-40 rounded-lg animate-pulse" />
            <div className="space-y-2">
              <div className="bg-white/5 h-3 w-full rounded-md animate-pulse" />
              <div className="bg-white/5 h-3 w-[80%] rounded-md animate-pulse" />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full md:w-32">
            <div className="bg-white/10 h-2 w-16 rounded mb-2" />
            <div className="bg-white/10 h-8 w-20 rounded mb-2" />
            <div className="bg-white/10 h-1.5 w-full rounded-full" />
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm space-y-3"
          >
            <Skeleton className="size-8 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-slate-50 border border-slate-100 p-5 rounded-[2rem] flex gap-4"
          >
            <Skeleton className="size-10 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[90%]" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skeleton = ({ className }) => (
  <div className={`bg-slate-200 animate-pulse rounded-xl ${className}`} />
);

export default InsightsSkeleton;
