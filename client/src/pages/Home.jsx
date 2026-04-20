import CustomCarousel from "@/components/CustomCarousel";
import Navbar from "@/components/Navbar";
import React from "react";

const Home = () => {
  const slides = [
    {
      title: "Elevate Your Living Space",
      description: "Discover a curated collection of minimalist furniture that blends functionality with timeless design aesthetics.",
      image: "/images/living_room.png"
    },
    {
      title: "Sustainable Fashion Redefined",
      description: "Explore our latest eco-friendly arrivals designed for comfort, style, and a conscious lifestyle.",
      image: "/images/fashion.png"
    },
    {
      title: "Precision in Every Detail",
      description: "Modern timepieces that combine innovative technology with classic craftsmanship for the discerning professional.",
      image: "/images/product.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="hero-carousel">
          <CustomCarousel slides={slides} />
        </section>
      </main>
    </div>
  );
};

export default Home;
