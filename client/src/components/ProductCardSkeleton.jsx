import React from "react";
import { Card, CardContent } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <Card className="premium-card bg-background border-none shadow-sm rounded-3xl overflow-hidden p-0">
      <div className="relative overflow-hidden">
        <AspectRatio ratio={1 / 1}>
          <Skeleton className="h-full w-full" />
        </AspectRatio>
      </div>
      <CardContent className="p-8">
        <Skeleton className="h-3 w-20 mb-2" />
        <Skeleton className="h-8 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-8" />
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-12 w-12 rounded-2xl" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
