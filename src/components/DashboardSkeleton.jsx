const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-3 w-48" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-40 rounded-xl" />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4"
          >
            <div className="flex justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-12 w-12 rounded-2xl" />
            </div>
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 flex flex-col min-h-[380px]">
          <div className="flex justify-between mb-8">
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-5 w-5" />
          </div>
          <div className="h-[320px] w-full">
            <Skeleton className="h-full w-full rounded-2xl" />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 h-[400px] space-y-6">
          <Skeleton className="h-6 w-40" />

          <div className="flex-1 min-h-[220px] flex items-center justify-center">
            <Skeleton className="h-40 w-40 rounded-full" />
          </div>

          <Skeleton className="h-20 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

const Skeleton = ({ className }) => (
  <div className={`bg-slate-200 animate-pulse rounded-xl ${className}`} />
);

export default DashboardSkeleton;
