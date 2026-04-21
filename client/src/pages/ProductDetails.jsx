import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductImageGallery from "@/components/ProductImageGallery";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Star,
  Heart,
  Truck,
  Calendar,
  Package,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

const ProductDetails = () => {
  // Sample images from public folder
  const productImages = [
    "/images/products/bag.png",
    "/images/products/sneaker.png",
    "/images/products/sunglasses.png",
    "/images/products/watch.png",
  ];

  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("m");

  const colors = [
    { id: "black", name: "Phantom Black", class: "bg-black" },
    { id: "silver", name: "Arctic Silver", class: "bg-slate-300" },
    { id: "navy", name: "Deep Navy", class: "bg-blue-900" },
  ];

  const sizes = ["s", "m", "l", "xl"];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* Product Gallery Section */}
        <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav
              className="flex text-sm text-muted-foreground"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center space-x-2">
                <li>
                  <a href="/" className="hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <span className="mx-2 text-muted-foreground/40">/</span>
                </li>
                <li>
                  <a
                    href="/products"
                    className="hover:text-primary transition-colors"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <span className="mx-2 text-muted-foreground/40">/</span>
                </li>
                <li className="font-medium text-foreground">
                  Premium Collection
                </li>
              </ol>
            </nav>
          </div>

          <ProductImageGallery images={productImages} label="Best Seller" />
        </section>
        <section className="product-info mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-20">
                <div>
                <Badge variant="secondary" className="mb-2">
                  New Arrival
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                  Premium Urban Backpack
                </h1>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <Heart className="h-5 w-5" />
              </Button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground line-through">
                    $150.00
                  </p>
                  <h2 className="text-4xl font-bold text-primary">$100.00</h2>
                </div>
                <Button
                  size="lg"
                  className="h-14 px-12 text-lg font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                >
                  Add to Cart
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <Star className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">
                (124 Reviews)
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> In Stock
              </span>
            </div>
          </div>

          <Separator />

          {/* Pricing & CTA */}

          <div className="w-1/2 space-y-5 mt-10">
            {/* Variants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label className="text-base font-semibold text-foreground uppercase tracking-wider">
                  Select Color:{" "}
                  <span className="text-muted-foreground font-normal normal-case ml-2">
                    {colors.find((c) => c.id === selectedColor)?.name}
                  </span>
                </Label>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="flex gap-3"
                >
                  {colors.map((color) => (
                    <div key={color.id} className="flex items-center">
                      <RadioGroupItem
                        value={color.id}
                        id={`color-${color.id}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`color-${color.id}`}
                        className={`
                        w-10 h-10 rounded-full cursor-pointer ring-offset-2 transition-all
                        ${color.class}
                        ${selectedColor === color.id ? "ring-2 ring-primary scale-110" : "ring-1 ring-transparent hover:scale-105"}
                      `}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold text-foreground uppercase tracking-wider">
                  Select Size:{" "}
                  <span className="text-muted-foreground font-normal normal-case ml-2 capitalize">
                    {selectedSize}
                  </span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className={`
                      w-12 h-12 uppercase font-medium transition-all
                      ${selectedSize === size ? "shadow-md shadow-primary/10" : "hover:bg-muted"}
                    `}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Elevate your daily commute with our Premium Urban Backpack.
                Crafted from water-resistant ballistic nylon, this versatile
                companion features a dedicated 16" laptop sleeve, quick-access
                pockets, and ergonomic padded straps for all-day comfort.
              </p>
            </div>

            <Separator />

            {/* Shipping & Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Truck,
                  label: "Fast Delivery",
                  sub: "2-4 Business Days",
                },
                {
                  icon: Calendar,
                  label: "Estimated Arrival",
                  sub: "Apr 24 - Apr 26",
                },
                { icon: Package, label: "Package Weight", sub: "1.2 kg" },
                {
                  icon: RotateCcw,
                  label: "Return Policy",
                  sub: "30 Days Free Return",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <item.icon className="h-5 w-5 mt-0.5 text-primary" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
