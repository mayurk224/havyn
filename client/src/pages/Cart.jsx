import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router";
import { toast } from "sonner";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowLeft,
  Tag,
  ChevronRight,
  Package,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

// ── Mock cart items ────────────────────────────────────────────────────
const INITIAL_ITEMS = [
  {
    id: 1,
    title: "Urban Minimalist Sneaker",
    description: "Breathable mesh and premium leather details.",
    price: 120.0,
    image: "/images/products/sneaker.png",
    category: "Shoes",
    size: "M",
    color: "White",
    quantity: 1,
  },
  {
    id: 2,
    title: "Signature Mesh Watch",
    description: "Timeless design with a modern silver strap.",
    price: 250.0,
    image: "/images/products/watch.png",
    category: "Accessories",
    size: "OS",
    color: "Silver",
    quantity: 2,
  },
  {
    id: 3,
    title: "Desert Leather Tote",
    description: "Handcrafted Italian leather for daily use.",
    price: 180.0,
    image: "/images/products/bag.png",
    category: "Travel",
    size: "OS",
    color: "Tan",
    quantity: 1,
  },
];

const PERKS = [
  { icon: Package, label: "Free Shipping", sub: "On orders over $200" },
  { icon: RotateCcw, label: "Free Returns", sub: "Within 30 days" },
  { icon: ShieldCheck, label: "Secure Checkout", sub: "256-bit SSL encrypted" },
];

// ── Cart Item Row ──────────────────────────────────────────────────────
const CartItem = ({ item, onQtyChange, onRemove }) => (
  <Card className="premium-card border-none shadow-sm rounded-3xl overflow-hidden p-0 bg-background">
    <CardContent className="p-0">
      <div className="flex gap-0 items-stretch">
        {/* Image */}
        <Link
          to={`/products/${item.id}`}
          className="w-36 sm:w-44 shrink-0 overflow-hidden rounded-l-3xl"
        >
          <AspectRatio ratio={1 / 1} className="h-full">
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
            />
          </AspectRatio>
        </Link>

        {/* Details */}
        <div className="flex flex-col flex-grow p-5 sm:p-6 gap-3 min-w-0">
          {/* Top row */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] mb-1 leading-none">
                {item.category}
              </div>
              <Link to={`/products/${item.id}`}>
                <h3 className="text-base sm:text-lg font-bold tracking-tight line-clamp-1 hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </Link>
              <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1">
                {item.description}
              </p>
            </div>
            <button
              id={`remove-item-${item.id}`}
              aria-label="Remove item"
              onClick={() => onRemove(item.id)}
              className="text-muted-foreground hover:text-destructive transition-colors shrink-0 mt-0.5"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="rounded-full text-xs font-medium px-3 py-0.5"
            >
              Size: {item.size}
            </Badge>
            <Badge
              variant="secondary"
              className="rounded-full text-xs font-medium px-3 py-0.5"
            >
              {item.color}
            </Badge>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-auto pt-1">
            {/* Qty stepper */}
            <div className="flex items-center gap-1 bg-muted/60 rounded-2xl px-1 py-1">
              <button
                id={`dec-qty-${item.id}`}
                aria-label="Decrease quantity"
                onClick={() => onQtyChange(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="h-7 w-7 rounded-xl flex items-center justify-center hover:bg-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-6 text-center text-sm font-bold tabular-nums">
                {item.quantity}
              </span>
              <button
                id={`inc-qty-${item.id}`}
                aria-label="Increase quantity"
                onClick={() => onQtyChange(item.id, item.quantity + 1)}
                className="h-7 w-7 rounded-xl flex items-center justify-center hover:bg-background transition-colors"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            {/* Price */}
            <span className="text-lg sm:text-xl font-black tracking-tighter">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// ── Order Summary ──────────────────────────────────────────────────────
const OrderSummary = ({
  items,
  couponCode,
  setCouponCode,
  couponApplied,
  onApplyCoupon,
  onCheckout,
}) => {
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 200 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  return (
    <Card className="premium-card border-none shadow-sm rounded-3xl bg-background sticky top-24">
      <CardContent className="p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-black tracking-tight">Order Summary</h2>

        {/* Line items */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)
            </span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>

          {couponApplied && (
            <div className="flex justify-between text-emerald-600">
              <span className="font-medium flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" /> Coupon (10%)
              </span>
              <span className="font-semibold">-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span
              className={
                shipping === 0
                  ? "text-emerald-600 font-semibold"
                  : "font-semibold"
              }
            >
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-black text-lg tracking-tight">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Coupon */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Promo Code
          </p>
          <div className="flex gap-2">
            <Input
              id="coupon-input"
              placeholder="e.g. HAVYN10"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="rounded-xl h-10 text-sm"
              disabled={couponApplied}
            />
            <Button
              id="apply-coupon-btn"
              variant={couponApplied ? "secondary" : "outline"}
              className="rounded-xl h-10 px-4 text-sm font-bold shrink-0"
              onClick={onApplyCoupon}
              disabled={couponApplied}
            >
              {couponApplied ? "Applied" : "Apply"}
            </Button>
          </div>
          {couponApplied && (
            <p className="text-xs text-emerald-600 font-medium">
              ✓ Code applied — 10% off your order!
            </p>
          )}
        </div>

        {/* CTA */}
        <Button
          id="checkout-btn"
          size="lg"
          className="w-full rounded-2xl h-14 text-base font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
          onClick={onCheckout}
        >
          Checkout <ChevronRight className="h-5 w-5 ml-1" />
        </Button>

        {/* Perks */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {PERKS.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-1.5"
            >
              <div className="h-8 w-8 rounded-xl bg-muted flex items-center justify-center">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-[10px] font-bold leading-tight">{label}</p>
              <p className="text-[9px] text-muted-foreground leading-tight hidden sm:block">
                {sub}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ── Empty State ────────────────────────────────────────────────────────
const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-32 text-center gap-6">
    <div className="relative">
      <div className="h-28 w-28 rounded-full bg-muted flex items-center justify-center">
        <ShoppingBag className="h-14 w-14 text-muted-foreground/50" />
      </div>
      <div className="absolute -top-1 -right-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-black">
        0
      </div>
    </div>
    <div className="space-y-2">
      <h2 className="text-2xl font-black tracking-tight">Your cart is empty</h2>
      <p className="text-muted-foreground text-base max-w-xs">
        Looks like you haven't added anything yet. Browse the collection and
        find something you love.
      </p>
    </div>
    <Link to="/products">
      <Button
        id="browse-products-btn"
        size="lg"
        className="rounded-full px-10 h-14 text-base font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
      >
        Browse Collection
      </Button>
    </Link>
  </div>
);

// ── Main Cart Page ─────────────────────────────────────────────────────
const Cart = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const totalQty = items.reduce((a, i) => a + i.quantity, 0);

  const handleQtyChange = (id, newQty) => {
    if (newQty < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart.");
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim().toLowerCase() === "havyn10") {
      setCouponApplied(true);
      toast.success("Coupon applied! 10% off your order.");
    } else {
      toast.error("Invalid coupon code. Try HAVYN10.");
    }
  };

  const handleCheckout = () => {
    toast.info("Checkout coming soon!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="mb-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <div className="flex items-baseline gap-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight featured-title-gradient">
              Your Cart
            </h1>
            {totalQty > 0 && (
              <Badge className="rounded-full px-3 py-1 text-sm font-bold">
                {totalQty} {totalQty === 1 ? "item" : "items"}
              </Badge>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
            {/* Cart Items */}
            <section aria-label="Cart items" className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQtyChange={handleQtyChange}
                  onRemove={handleRemove}
                />
              ))}

              {/* Clear cart */}
              <div className="flex justify-end pt-2">
                <Button
                  id="clear-cart-btn"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive transition-colors rounded-xl gap-1.5 text-xs font-semibold"
                  onClick={() => {
                    setItems([]);
                    toast.success("Cart cleared.");
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear all items
                </Button>
              </div>
            </section>

            {/* Order Summary */}
            <aside aria-label="Order summary">
              <OrderSummary
                items={items}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                couponApplied={couponApplied}
                onApplyCoupon={handleApplyCoupon}
                onCheckout={handleCheckout}
              />
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
