import React from "react";
import { Card } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { CardContent, CardTitle } from "./ui/card";
import { toast } from "sonner";
import { Link } from "react-router";
import WishlistButton from "./WishlistButton";

const ProductCard = ({ product }) => {
  const productId = product._id ?? product.id;

  const primaryImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url || product.image || "https://via.placeholder.com/400";
  let price = product.basePrice || product.price || 0;

  // Format price display to avoid duplicate dollar signs
  const displayPrice = typeof price === 'number' 
    ? price.toFixed(2) 
    : (typeof price === 'string' && price.startsWith('$') ? price.substring(1) : price);

  return (
    <Card
      key={productId}
      className="premium-card bg-background group border-none shadow-sm rounded-3xl overflow-hidden p-0"
    >
      <div className="relative overflow-hidden">
        <Link to={`/products/${productId}`}>
          <AspectRatio ratio={1 / 1}>
            <img
              src={primaryImage}
              alt={product.title}
              className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
            />
          </AspectRatio>
        </Link>
        <WishlistButton 
          productId={productId} 
          className="absolute top-4 right-4 z-10 h-10 w-10" 
        />
      </div>
      <CardContent className="p-8">
        <div className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] mb-2 leading-none">
          {product.category}
        </div>
        <Link to={`/products/${productId}`}>
          <CardTitle className="text-2xl font-bold mb-2 tracking-tight line-clamp-1 hover:text-primary transition-colors">
            {product.title}
          </CardTitle>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-1 mb-8 leading-normal">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-2xl font-black tracking-tighter">
            ${displayPrice}
          </span>
          <Button
            size="icon"
            className="h-12 w-12 rounded-2xl shadow-xl shadow-primary/20 hover:scale-110 transition-transform flex shrink-0"
            aria-label="Add to cart"
            onClick={(e) => {
              e.preventDefault();
              toast.info("Add to cart coming soon!");
            }}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

