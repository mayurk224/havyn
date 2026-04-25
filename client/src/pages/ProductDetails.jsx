import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductImageGallery from "@/components/ProductImageGallery";
import WishlistButton from "@/components/WishlistButton";
import ProductDetailsSkeleton from "@/components/ProductDetailsSkeleton";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link, useParams } from "react-router";
import { productService } from "@/services/product.service";
import cartService from "@/services/cart.service";
import {
  Truck,
  Calendar,
  Package,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await productService.getProductById(id);
        const nextProduct = response?.data || null;

        setProduct(nextProduct);

        const firstVariant = nextProduct?.variants?.[0];
        setSelectedColor(firstVariant?.color || "");
        setSelectedSize(firstVariant?.size?.toLowerCase() || "");
      } catch (err) {
        setProduct(null);
        setError(
          err?.response?.data?.message || "Failed to load product details.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedVariant || !inStock) return;

    setIsAddingToCart(true);
    setCartMessage({ type: "", text: "" });

    try {
      await cartService.addToCart({
        productId: product._id || product.id,
        size: selectedVariant.size,
        color: selectedVariant.color,
        quantity: 1,
      });
      setCartMessage({ type: "success", text: "Added to cart!" });

      // Emit event for Navbar popup
      const image = product?.images?.[0]?.url || "https://via.placeholder.com/900x900/18181b/ffffff?text=Product+Image";
      window.dispatchEvent(new CustomEvent("productAddedToCart", {
        detail: {
          product: {
            title: product.title,
            image: image
          }
        }
      }));
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Failed to add to cart. Please try again.";
      setCartMessage({ type: "error", text: msg });
    } finally {
      setIsAddingToCart(false);
      // Clear message after 3 seconds
      setTimeout(() => setCartMessage({ type: "", text: "" }), 3000);
    }
  };

  const productImages =
    product?.images?.map((image) => image.url).filter(Boolean) || [];
  const fallbackImage =
    "https://via.placeholder.com/900x900/18181b/ffffff?text=Product+Image";
  const galleryImages =
    productImages.length > 0 ? productImages : [fallbackImage];

  const variantColors = Array.from(
    new Set((product?.variants || []).map((variant) => variant.color).filter(Boolean)),
  );
  const variantSizes = Array.from(
    new Set(
      (product?.variants || [])
        .filter((variant) => !selectedColor || variant.color === selectedColor)
        .map((variant) => variant.size)
        .filter(Boolean),
    ),
  );
  const selectedVariant =
    product?.variants?.find(
      (variant) =>
        variant.color === selectedColor &&
        variant.size?.toLowerCase() === selectedSize,
    ) || product?.variants?.[0];
  const displayPrice = selectedVariant?.price ?? product?.basePrice ?? 0;
  const inStock = (selectedVariant?.stock ?? 0) > 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background" aria-busy="true" aria-live="polite">
        <Navbar />
        <main className="flex-grow">
          <ProductDetailsSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-xl mx-auto border rounded-2xl p-8 text-center space-y-4">
            <h1 className="text-2xl font-bold">Product unavailable</h1>
            <p className="text-muted-foreground">
              {error || "We couldn't find this product."}
            </p>
            <Button asChild>
              <Link to="/products">Back to products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                  <Link to="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <span className="mx-2 text-muted-foreground/40">/</span>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-primary transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <span className="mx-2 text-muted-foreground/40">/</span>
                </li>
                <li className="font-medium text-foreground">
                  {product.title}
                </li>
              </ol>
            </nav>
          </div>

          <ProductImageGallery images={galleryImages} label={product.category} />
        </section>
        <section className="product-info mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-20">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {product.category}
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    {product.title}
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Sold by{" "}
                    {product.vendorId?.vendorDetails?.storeName || "Unknown Store"}
                  </p>
                </div>
                <WishlistButton
                  productId={product._id || product.id}
                  className="h-10 w-10 border border-input bg-background hover:opacity-100"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Price
                  </p>
                  <h2 className="text-4xl font-bold text-primary">
                    ${displayPrice.toFixed(2)}
                  </h2>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button
                    size="lg"
                    className="h-14 px-12 text-lg font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                    disabled={!inStock || isAddingToCart}
                    onClick={handleAddToCart}
                  >
                    {isAddingToCart
                      ? "Adding…"
                      : inStock
                      ? "Add to Cart"
                      : "Out of Stock"}
                  </Button>
                  {cartMessage.text && (
                    <p
                      className={`text-sm font-medium ${
                        cartMessage.type === "success"
                          ? "text-emerald-600"
                          : "text-destructive"
                      }`}
                    >
                      {cartMessage.text}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {product.variants?.length || 0} variants available
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span
                className={`text-sm font-medium flex items-center gap-1 ${inStock ? "text-emerald-600" : "text-destructive"
                  }`}
              >
                <ShieldCheck className="h-4 w-4" />
                {inStock ? `In Stock (${selectedVariant?.stock ?? 0})` : "Out of Stock"}
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
                    {selectedColor || "Not available"}
                  </span>
                </Label>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={(nextColor) => {
                    setSelectedColor(nextColor);

                    const nextSizes = Array.from(
                      new Set(
                        (product?.variants || [])
                          .filter((variant) => !nextColor || variant.color === nextColor)
                          .map((variant) => variant.size)
                          .filter(Boolean),
                      ),
                    );

                    if (
                      nextSizes.length > 0 &&
                      !nextSizes.some((size) => size.toLowerCase() === selectedSize)
                    ) {
                      setSelectedSize(nextSizes[0].toLowerCase());
                    }
                  }}
                  className="flex gap-3"
                >
                  {variantColors.map((color) => (
                    <div key={color} className="flex items-center">
                      <RadioGroupItem
                        value={color}
                        id={`color-${color}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`color-${color}`}
                        className={`px-4 py-2 rounded-full border cursor-pointer ring-offset-2 transition-all text-sm ${selectedColor === color
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:bg-muted"
                          }`}
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold text-foreground uppercase tracking-wider">
                  Select Size:{" "}
                  <span className="text-muted-foreground font-normal normal-case ml-2 capitalize">
                    {selectedSize || "Not available"}
                  </span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {variantSizes.map((size) => (
                    <Button
                      key={size}
                      variant={
                        selectedSize === size.toLowerCase() ? "default" : "outline"
                      }
                      className={`
                      w-12 h-12 uppercase font-medium transition-all
                      ${selectedSize === size.toLowerCase()
                          ? "shadow-md shadow-primary/10"
                          : "hover:bg-muted"
                        }
                    `}
                      onClick={() => setSelectedSize(size.toLowerCase())}
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
                {product.description}
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
                  sub: "Calculated at checkout",
                },
                {
                  icon: Package,
                  label: "Store",
                  sub: product.vendorId?.vendorDetails?.storeName || "Unknown Store",
                },
                {
                  icon: RotateCcw,
                  label: "Return Policy",
                  sub: "Return policy shared at checkout",
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
