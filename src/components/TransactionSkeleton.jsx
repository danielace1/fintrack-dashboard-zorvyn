const TransactionsSkeleton = () => {
  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <Skeleton className="h-10 flex-1 rounded-xl" />
        <Skeleton className="h-10 w-40 rounded-xl" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <th key={i} className="px-4 md:px-6 py-4">
                    <Skeleton className="h-3 w-16" />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {[1, 2, 3, 4, 5, 6, 7].map((row) => (
                <tr key={row}>
                  <td className="px-4 md:px-6 py-4">
                    <Skeleton className="h-3 w-4" />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-2 w-16" />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-20 rounded-lg" />
                  </td>

                  <td className="px-6 py-4">
                    <Skeleton className="h-3 w-20" />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Skeleton className="h-3 w-16 ml-auto" />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Skeleton className="h-8 w-8 rounded-lg ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Skeleton = ({ className }) => (
  <div className={`bg-slate-200 animate-pulse rounded-lg ${className}`} />
);

export default TransactionsSkeleton;
