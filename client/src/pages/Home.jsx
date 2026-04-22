import CustomCarousel from "@/components/CustomCarousel";
import Navbar from "@/components/Navbar";
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

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
      price: 120.00,
      image: "/images/products/sneaker.png",
      category: "Shoes",
    },
    {
      id: 2,
      title: "Signature Mesh Watch",
      description: "Timeless design with a modern silver strap.",
      price: 250.00,
      image: "/images/products/watch.png",
      category: "Accessories",
    },
    {
      id: 3,
      title: "Desert Leather Tote",
      description: "Handcrafted Italian leather for daily use.",
      price: 180.00,
      image: "/images/products/bag.png",
      category: "Travel",
    },
    {
      id: 4,
      title: "Nightshade Sunglasses",
      description: "UV protection with a classic aesthetic frame.",
      price: 95.00,
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

  const blogPosts = [
    {
      id: 1,
      title: "Mastering the Art of Sustainable Streetwear Fashion Trends",
      date: "Oct 12, 2023",
      category: "Fashion",
      description:
        "Dive into the world of sustainable streetwear and discover how you can stay trendy while being environmentally conscious. From organic cotton threads to recycled polyester blends, we explore the best brands and styles that are making a difference in the fashion industry today.",
      image: "/images/fashion.png",
    },
    {
      id: 2,
      title: "The Ultimate Guide to Modern Living Room Aesthetics",
      date: "Oct 15, 2023",
      category: "Interior",
      description:
        "Transform your living space with our comprehensive guide to modern aesthetics. Learn about minimalist furniture, color palettes that soothe the soul, and how to incorporate greenery into your home for a refreshing vibe that impresses every guest who walks through your door.",
      image: "/images/living_room.png",
    },
    {
      id: 3,
      title: "Essential Accessories for the Discerning Professional",
      date: "Oct 18, 2023",
      category: "Lifestyle",
      description:
        "Every professional needs a set of reliable accessories. We take a look at the top watches, bags, and tech gadgets that combine functionality with high-end design. Elevate your daily routine and make a lasting impression in the boardroom with these carefully curated pieces.",
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
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight featured-title-gradient mb-6 leading-snug">
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
                <ProductCard key={product.id} product={product} />
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
        <section className="blog py-24 bg-muted/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 featured-title-gradient">
                Read Super Blog
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                Dive into a sea of stylish outfits that promise to impress and
                delight with their cool and trendy selections. Stay updated with
                the latest fashion insights and home design tips.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="premium-card bg-background border-none shadow-sm rounded-[2.5rem] overflow-hidden group flex flex-col p-0"
                >
                  <div className="relative overflow-hidden shrink-0">
                    <AspectRatio ratio={16 / 10}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                      />
                    </AspectRatio>
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-white/90 backdrop-blur-md text-black hover:bg-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-8 flex flex-col flex-grow">
                    <div className="text-xs font-medium text-muted-foreground mb-4 font-mono">
                      {post.date}
                    </div>
                    <CardTitle className="text-2xl font-bold mb-4 tracking-tight line-clamp-2 leading-snug">
                      {post.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-base mb-8 line-clamp-5 leading-relaxed">
                      {post.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-muted/50">
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary font-bold text-lg group/btn hover:no-underline"
                      >
                        Read Post
                        <span className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1">
                          →
                        </span>
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
                View More Blogs
              </Button>
            </div>
          </div>
        </section>
        <section className="relative w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-8 md:p-12 lg:p-16 shadow-2xl transition-all duration-500 hover:shadow-primary/5 group">
          {/* Decorative Gradients */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/15 transition-colors duration-700" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-24">
            {/* Left Section: Content & Subscribe */}
            <div className="w-full lg:max-w-2xl space-y-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] tracking-tight text-center lg:text-left">
                Get 50% Off All Outfits. <br className="hidden md:block" />
                <span className="text-zinc-500">Join Now Immediately.</span>
              </h2>

              <div className="relative max-w-md mx-auto lg:mx-0 group/input focus-within:scale-[1.02] transition-all duration-500">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity" />
                <div className="relative flex items-center">
                  <Input
                    type="email"
                    placeholder="Enter your email here..."
                    className="h-16 rounded-full bg-white/5 border-white/10 pl-8 pr-32 text-white placeholder:text-zinc-500 focus-visible:ring-primary/50 focus-visible:bg-white/10 transition-all border-2"
                  />
                  <Button className="absolute right-2 h-12 rounded-full px-8 font-bold bg-white text-black hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-lg">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Section: Description */}
            <div className="w-full lg:max-w-[280px] text-center lg:text-right lg:self-end">
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
                Unlock exclusive access to a limited-time offer: enjoy a 50%
                discount on all outfits when you join today. Perfect for any
                occasion.
              </p>
              <div className="mt-4 flex justify-center lg:justify-end gap-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
