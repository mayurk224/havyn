import React, { useState, useEffect } from 'react';

/**
 * ProductImageGallery - A modern, premium product image gallery
 * @param {Object} props
 * @param {string[]} props.images - Array of image URLs (min 4 recommended)
 * @param {string} props.label - Badge label for the main image (e.g., "Hoodie")
 */
const ProductImageGallery = ({ images = [], label = "" }) => {
  const [mainImage, setMainImage] = useState(images[0] || '');
  const [isChanging, setIsChanging] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  // Reset main image if images prop changes
  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square rounded-2xl bg-muted animate-pulse flex items-center justify-center text-muted-foreground">
        No images available
      </div>
    );
  }

  const handleImageChange = (newImg) => {
    if (newImg === mainImage) return;
    setIsChanging(true);
    // Short delay to allow the fade-out effect
    setTimeout(() => {
      setMainImage(newImg);
      setIsChanging(false);
    }, 250);
  };

  const handleImageLoad = (src) => {
    setLoadedImages(prev => ({ ...prev, [src]: true }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5 w-full select-none">
      {/* 
        Main Image Section (Left)
        Takes ~60% width on desktop (3/5 columns)
      */}
      <div className="md:col-span-2 relative group overflow-hidden rounded-2xl h-[520px]">
        <div className="w-full h-full relative overflow-hidden">
          {/* Skeleton for main image */}
          {!loadedImages[mainImage] && (
            <div className="absolute inset-0 bg-muted animate-pulse z-10" />
          )}
          
          <img
            src={mainImage}
            alt="Product Focus"
            onLoad={() => handleImageLoad(mainImage)}
            className={`w-full h-full object-cover transition-all duration-500 ease-in-out cursor-pointer group-hover:scale-105 ${
              isChanging ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
            } ${loadedImages[mainImage] ? '' : 'invisible'}`}
          />
        </div>

        {/* Tag Label Overlay */}
        {label && (
          <div className="absolute top-4 right-4 bg-white/95 dark:bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-black/5 dark:border-white/10 z-20 pointer-events-none">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-foreground/90">
              {label}
            </span>
          </div>
        )}
      </div>

      {/* 
        Secondary Images Grid (Right)
        Takes ~40% width on desktop (2/5 columns)
      */}
      <div className="md:col-span-3 grid grid-cols-2 grid-rows-2 gap-4 md:gap-5">
        {/* Top 2 Thumbnail Images */}
        {[0, 1].map((idx) => {
          const img = images[idx + 1] || images[0]; // Fallback to main if not enough images
          return (
            <div
              key={`thumb-top-${idx}`}
              onClick={() => handleImageChange(img)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-muted/20 border-2 transition-all duration-300 h-[250px] ${
                mainImage === img ? 'border-primary/50' : 'border-transparent'
              }`}
            >
              {!loadedImages[img] && (
                <div className="absolute inset-0 bg-muted animate-pulse z-0" />
              )}
              <img
                src={img}
                alt={`Product view ${idx + 1}`}
                onLoad={() => handleImageLoad(img)}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  loadedImages[img] ? 'opacity-100' : 'opacity-0'
                }`}
              />
              
            </div>
          );
        })}

        {/* Bottom Full-width Thumbnail Image */}
        <div
          onClick={() => handleImageChange(images[3] || images[images.length - 1] || images[0])}
          className={`col-span-2 relative group overflow-hidden rounded-2xl cursor-pointer  bg-muted/20 border-2 transition-all duration-300 h-[250px] ${
            mainImage === (images[3] || images[images.length - 1]) ? 'border-primary/50' : 'border-transparent'
          }`}
        >
          {/* Logic to choose the 4th image or the last one or the first as fallback */}
          {(() => {
            const bottomImg = images[3] || images[images.length - 1] || images[0];
            return (
              <>
                {!loadedImages[bottomImg] && (
                  <div className="absolute inset-0 bg-muted animate-pulse z-0" />
                )}
                <img
                  src={bottomImg}
                  alt="Product view main"
                  onLoad={() => handleImageLoad(bottomImg)}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    loadedImages[bottomImg] ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </>
            );
          })()}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;

