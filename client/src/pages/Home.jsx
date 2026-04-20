import CustomCarousel from "@/components/CustomCarousel";
import Navbar from "@/components/Navbar";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="hero-carousel">
          <CustomCarousel slides={slides} />
        </section>
        <section className="featured py-24">
          <div className="max-w-4xl mx-auto text-center mb-20 px-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 featured-title-gradient">
              Fresh Fashion at Modern Vibes
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Our collection is constantly updated with the latest trends and
              timeless pieces. Ensure you're always on point with the latest drops.
              Shop now and let your fashion sense shine.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-7xl mx-auto">
            {/* Left Card: Image on Top */}
            <Card className="premium-card overflow-hidden rounded-[3rem] bg-card group border-none shadow-none">
              <AspectRatio ratio={4 / 5} className="overflow-hidden rounded-[2.5rem]">
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
                <h3 className="text-4xl font-bold mb-4 tracking-tight">Urban Essentials</h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-md">
                   Where street culture meets high-end craft. Discover the collection that defines the modern urban aesthetic.
                </p>
                <Button size="lg" className="rounded-full px-10 h-14 text-lg font-semibold hover:scale-105 transition-transform shadow-xl shadow-primary/10">
                  Shop Streetwear
                </Button>
              </CardContent>
            </Card>

            {/* Right Card: Text on Top */}
            <Card className="premium-card overflow-hidden rounded-[3rem] bg-card group flex flex-col border-none shadow-none mt-0 lg:mt-24">
              <CardContent className="pt-6 pb-10 px-4 order-2 lg:order-1">
                <div className="inline-block px-4 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold mb-4 tracking-[0.2em] uppercase">
                  Curated Staples
                </div>
                <h3 className="text-4xl font-bold mb-4 tracking-tight">Luxury Basics</h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-md">
                   Elevated pieces designed for effortless versatility. Premium fabrics met with timeless silhouettes.
                </p>
                <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg font-semibold border-2 hover:bg-primary hover:text-white hover:scale-105 transition-all">
                  Explore Luxury
                </Button>
              </CardContent>
              <div className="order-1 lg:order-2">
                <AspectRatio ratio={4 / 5} className="overflow-hidden rounded-[2.5rem]">
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
      </main>
    </div>
  );
};

export default Home;
