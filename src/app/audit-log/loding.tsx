import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto py-4 px-4 md:py-6 md:px-6">
      <div className="flex flex-col space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
        </div>

        {/* Search Bar Skeleton */}
        <Skeleton className="h-10 w-full" />

        {/* Table Skeleton */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b last:border-0">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
