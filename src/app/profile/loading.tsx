import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProfileLoading() {
  return (
    <div className="container py-6 md:py-8 max-w-7xl mx-auto">
      <div className="space-y-2 mb-8">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile sidebar skeleton */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Skeleton className="h-24 w-24 rounded-full mb-4" />
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-4 w-28 mb-6" />

                <div className="w-full space-y-4">
                  <div className="flex justify-between py-2 border-t">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between py-3 px-6 border-t">
                    <div className="w-full">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content skeleton */}
        <div className="md:col-span-2">
          <div className="mb-6">
            <Skeleton className="h-10 w-full" />
          </div>

          <Card className="mb-6">
            <CardHeader>
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 border-t">
              <Skeleton className="h-10 w-32" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
