import React, { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const CustomCarousel = ({ 
  slides = [], 
  autoplayInterval = 5000, 
  loop = true,
  className 
}) => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  // Sync content with active slide
  const onSelect = useCallback((api) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const plugin = React.useRef(
    Autoplay({ delay: autoplayInterval, stopOnInteraction: true })
  );

  const activeSlide = slides[current] || {};

  return (
    <div className={cn("relative w-full transition-all duration-500 overflow-hidden", className)}>
      {/* Header Section: Content (Left) & Navigation (Right) */}
      {/* Header Section: Now Overlaid */}
      <div className="absolute inset-0 z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 p-8 md:p-16 lg:p-20 group pointer-events-none">
        {/* Content Box */}
        <div className="flex-1 max-w-2xl pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-white text-xs font-semibold mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            New Arrivals
          </div>
          
          <div className="relative overflow-hidden min-h-[140px] md:min-h-[160px]">
            <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700" key={current + '-title'}>
              {activeSlide.title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl drop-shadow-md animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150" key={current + '-desc'}>
              {activeSlide.description}
            </p>
          </div>
          
          <div className="flex gap-4 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Button size="lg" className="rounded-full px-8 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105">
              Shop Collection
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 font-semibold hover:bg-muted/50 transition-all">
              Learn More
            </Button>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col items-center gap-6 pointer-events-auto">
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-2 text-white border-white/20 bg-white/10 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30"
              onClick={() => api?.scrollPrev()}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-2 text-white border-white/20 bg-white/10 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30"
              onClick={() => api?.scrollNext()}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Progress Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-1.5 transition-all duration-300 rounded-full",
                  current === index 
                    ? "w-8 bg-white" 
                    : "w-2 bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Slider Section */}
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          loop,
          align: "center",
        }}
        className="w-full"
      >
        <CarouselContent className="">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="relative aspect-[21/9] md:aspect-[16/7] w-full overflow-hidden rounded-[2.5rem] shadow-2xl border bg-muted/30">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="object-cover w-full h-full"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                {/* Stronger Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent opacity-80 pointer-events-none" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
