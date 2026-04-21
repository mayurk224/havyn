import React from "react";
import { Card } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { Heart, Plus } from "lucide-react";
import { CardContent, CardTitle } from "./ui/card";

const ProductCard = ({ product }) => {
  return (
    <Card
      key={product.id}
      className="premium-card bg-background group border-none shadow-sm rounded-3xl overflow-hidden p-0"
    >
      <div className="relative overflow-hidden">
        <AspectRatio ratio={1 / 1}>
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
          />
        </AspectRatio>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-red-500 hover:scale-110 border-white/20 border"
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <CardContent className="p-8">
        <div className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] mb-2 leading-none">
          {product.category}
        </div>
        <CardTitle className="text-2xl font-bold mb-2 tracking-tight line-clamp-1">
          {product.title}
        </CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-1 mb-8 leading-normal">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-2xl font-black tracking-tighter">
            {product.price}
          </span>
          <Button
            size="icon"
            className="h-12 w-12 rounded-2xl shadow-xl shadow-primary/20 hover:scale-110 transition-transform flex shrink-0"
            aria-label="Add to cart"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
