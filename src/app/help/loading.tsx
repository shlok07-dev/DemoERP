import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function HelpLoading() {
  return (
    <div className="container py-6 md:py-8 max-w-7xl mx-auto">
      <div className="space-y-2 mb-8">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-12 w-full" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />

        <div className="space-y-2 mb-6">
          <Skeleton className="h-6 w-[180px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Skeleton className="h-9 w-9 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-[180px]" />
                      <Skeleton className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-2 mb-6">
          <Skeleton className="h-6 w-[180px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <Skeleton className="w-full h-[120px]" />
              <CardContent className="p-4">
                <Skeleton className="h-5 w-[90%]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
