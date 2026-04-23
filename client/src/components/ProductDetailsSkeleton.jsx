import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { AspectRatio } from "./ui/aspect-ratio";

const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow">
        <section className="mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              <AspectRatio ratio={1 / 1}>
                <Skeleton className="h-full w-full rounded-3xl" />
              </AspectRatio>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-24 w-24 rounded-2xl" />
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-12 w-80" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                  <Skeleton className="h-14 w-48 rounded-2xl" />
                </div>

                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Separator orientation="vertical" className="h-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              <Separator />

              <div className="w-full space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Skeleton className="h-5 w-32" />
                    <div className="flex gap-3">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-10 w-16 rounded-full" />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-5 w-32" />
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-12 w-12 rounded-xl" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-2xl" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetailsSkeleton;
