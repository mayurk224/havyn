import CustomCarousel from "@/components/CustomCarousel";
import Navbar from "@/components/Navbar";
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Plus } from "lucide-react";

const Home = () => {
  const slides = [
    {
      title: "Elevate Your Living Space",
      description:
        "Discover a curated collection of minimalist furniture that blends functionality with timeless design aesthetics.",
      image: "/images/living_room.png",
    },
    {
      title: "Sustainable Fashion Redefined",
      description:
        "Explore our latest eco-friendly arrivals designed for comfort, style, and a conscious lifestyle.",
      image: "/images/fashion.png",
    },
    {
      title: "Precision in Every Detail",
      description:
        "Modern timepieces that combine innovative technology with classic craftsmanship for the discerning professional.",
      image: "/images/product.png",
    },
  ];

  const products = [
    {
      id: 1,
      title: "Urban Minimalist Sneaker",
      description: "Breathable mesh and premium leather details.",
      price: "$120.00",
      image: "/images/products/sneaker.png",
      category: "Shoes",
    },
    {
      id: 2,
      title: "Signature Mesh Watch",
      description: "Timeless design with a modern silver strap.",
      price: "$250.00",
      image: "/images/products/watch.png",
      category: "Accessories",
    },
    {
      id: 3,
      title: "Desert Leather Tote",
      description: "Handcrafted Italian leather for daily use.",
      price: "$180.00",
      image: "/images/products/bag.png",
      category: "Travel",
    },
    {
      id: 4,
      title: "Nightshade Sunglasses",
      description: "UV protection with a classic aesthetic frame.",
      price: "$95.00",
      image: "/images/products/sunglasses.png",
      category: "Accessories",
    },
  ];

  const sunshineStyles = [
    { id: 1, image: "/images/fashion.png", title: "Floral Breeze" },
    { id: 2, image: "/images/featured/fashion1.png", title: "Summer Linen" },
    { id: 3, image: "/images/products/sunglasses.png", title: "Golden Hour" },
    { id: 4, image: "/images/featured/fashion2.png", title: "Coastal Chic" },
    { id: 5, image: "/images/products/bag.png", title: "Weekend Getaway" },
    { id: 6, image: "/images/products/sneaker.png", title: "Urban Explorer" },
    { id: 7, image: "/images/living_room.png", title: "Open Space" },
    { id: 8, image: "/images/product.png", title: "Modern Vibe" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="hero-carousel">
          <CustomCarousel slides={slides} />
        </section>
        <section className="featured py-24">
          <div className="max-w-4xl mx-auto text-center mb-20 px-4">
            <h1 className="text-5xl md:text-7xl font-semibold mb-8 featured-title-gradient">
              Fresh Fashion at Modern Vibes
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Our collection is constantly updated with the latest trends and
              timeless pieces. Ensure you're always on point with the latest
              drops. Shop now and let your fashion sense shine.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 ">
            {/* Left Card: Image on Top */}
            <Card className="premium-card overflow-hidden rounded-[3rem] bg-card group border-none shadow-none p-0">
              <AspectRatio
                ratio={4 / 5}
                className="overflow-hidden rounded-[2.5rem]"
              >
                <img
                  src="/images/featured/fashion1.png"
                  alt="New Arrivals"
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <CardContent className="pt-10 pb-6 px-4">
                <div className="inline-block px-4 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold mb-4 tracking-[0.2em] uppercase">
                  New Arrivals
                </div>
                <h3 className="text-4xl font-bold mb-4 tracking-tight">
                  Urban Essentials
                </h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-md">
                  Where street culture meets high-end craft. Discover the
                  collection that defines the modern urban aesthetic.
                </p>
                <Button
                  size="lg"
                  className="rounded-full px-10 h-14 text-lg font-semibold hover:scale-105 transition-transform shadow-xl shadow-primary/10"
                >
                  Shop Streetwear
                </Button>
              </CardContent>
            </Card>

            {/* Right Card: Text on Top */}
            <Card className="premium-card overflow-hidden rounded-[3rem] bg-card group flex flex-col border-none shadow-none mt-0 lg:mt-24 p-0">
              <CardContent className="pt-6 pb-10 px-4 order-2 lg:order-1">
                <div className="inline-block px-4 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold mb-4 tracking-[0.2em] uppercase">
                  Curated Staples
                </div>
                <h3 className="text-4xl font-bold mb-4 tracking-tight">
                  Luxury Basics
                </h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-md">
                  Elevated pieces designed for effortless versatility. Premium
                  fabrics met with timeless silhouettes.
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-10 h-14 text-lg font-semibold border-2 hover:bg-primary hover:text-white hover:scale-105 transition-all"
                >
                  Explore Luxury
                </Button>
              </CardContent>
              <div className="order-1 lg:order-2">
                <AspectRatio
                  ratio={4 / 5}
                  className="overflow-hidden rounded-[2.5rem]"
                >
                  <img
                    src="/images/featured/fashion2.png"
                    alt="Luxury Staples"
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            </Card>
          </div>
        </section>
        <section className="products pb-24 bg-muted/10">
          <div className="px-4">
            <div className="mb-16">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight featured-title-gradient mb-6">
                Browse all you need
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl  leading-relaxed">
                Shop the latest trends and timeless pieces from our collection.
                Elevate your style with our curated selection.
              </p>
            </div>

            <div className="flex gap-3 mb-16 flex-wrap">
              {["All", "Shoes", "Accessories", "Travel", "Apparel"].map(
                (cat) => (
                  <Badge
                    key={cat}
                    variant={cat === "All" ? "default" : "outline"}
                    className="px-8 py-2.5 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all text-sm font-bold shadow-sm"
                  >
                    {cat}
                  </Badge>
                ),
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {products.map((product) => (
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
              ))}
            </div>

            <div className="mt-20 text-center">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-16 h-16 text-xl font-black border-2 hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-lg"
              >
                View All Collection
              </Button>
            </div>
          </div>
        </section>

        {/* Redesigned Sunshine Styles Section */}
        <section className="py-24 overflow-hidden bg-background">
          <div className="container mx-auto px-4 mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 featured-title-gradient">
              Styles that welcome sunshine's return
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Recently released products are light, colorful, and comfortable,
              perfect for enjoying the outdoors in pleasant weather. Designed
              for the warm, sunny days of spring and summer.
            </p>
          </div>

          <div className="marquee-container relative px-4">
            <div className="marquee-content py-10">
              {[...sunshineStyles, ...sunshineStyles].map((item, index) => (
                <Card
                  key={`${item.id}-${index}`}
                  className="w-[300px] shrink-0 premium-card bg-card border-none overflow-hidden rounded-[2.5rem] shadow-none group"
                >
                  <AspectRatio ratio={3 / 4}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <h4 className="text-white text-2xl font-bold tracking-tight mb-2">
                        {item.title}
                      </h4>
                      <div className="w-10 h-1 bg-primary rounded-full" />
                    </div>
                  </AspectRatio>
                </Card>
              ))}
            </div>

            {/* Gradient Fades for Smooth Scroll Edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
