import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SettingsLoading() {
  return (
    <div className="container py-6 md:py-8 max-w-7xl mx-auto">
      <div className="space-y-2 mb-8">
        <Skeleton className="h-8 w-[150px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />

        <Card className="mb-6">
          <CardHeader>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-[240px]" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-[240px]" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-[240px]" />
              </div>
            </div>
          </CardContent>
          <div className="px-6 py-4 border-t">
            <Skeleton className="h-10 w-32" />
          </div>
        </Card>
      </div>
    </div>
  )
}
