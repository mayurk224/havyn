import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, PackageOpen } from "lucide-react";
import wishlistService from "@/services/wishlist.service";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/hooks/useAuth";

const Wishlist = () => {
  const { user, loading: isAuthLoading, setUser } = useAuth();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!user) {
      return;
    }

    const loadWishlist = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await wishlistService.getWishlist();
        setItems(response.data || []);
        setUser((currentUser) => currentUser ? ({
          ...currentUser,
          wishlist: response.wishlistIds,
        }) : currentUser);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        const message = err?.response?.status === 401
          ? "Please log in to view your wishlist."
          : "Failed to load wishlist items.";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlist();
  }, [isAuthLoading, setUser, user]);

  const visibleItems = user?.wishlist
    ? items.filter((item) => user.wishlist.includes(item._id || item.id))
    : [];

  const emptyStateMessage = user
    ? error
    : "Please log in to view your wishlist.";
  const showLoading = isAuthLoading || (Boolean(user) && isLoading);

  if (showLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center" aria-busy="true" aria-live="polite">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
            <p className="text-muted-foreground animate-pulse">Loading your wishlist...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow container mx-auto px-8 py-12" id="main-content">
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-3xl bg-muted/30" role="status">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6" aria-hidden="true">
              <PackageOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Log in to view your wishlist</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Sign in to save products and keep your wishlist in sync across refreshes and sessions.
            </p>
            <Button size="lg" className="rounded-2xl px-8" asChild>
              <Link to="/login">Go to Login</Link>
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

      <main className="flex-grow container mx-auto px-8 py-12" id="main-content">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">My Wishlist</h1>
            <p className="text-muted-foreground" aria-live="polite">
              {visibleItems.length} {visibleItems.length === 1 ? "item" : "items"} saved for later
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/products" aria-label="Back to products catalog">Continue Shopping</Link>
          </Button>
        </div>

        {error && user ? (
          <div className="mb-6 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
            {error}
          </div>
        ) : null}

        {visibleItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-3xl bg-muted/30" role="status">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6" aria-hidden="true">
              <PackageOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">{user ? "Your wishlist is empty" : "Log in to view your wishlist"}</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              {user
                ? "Looks like you haven't added anything to your wishlist yet. Start exploring our collection and save your favorites!"
                : emptyStateMessage}
            </p>
            <Button size="lg" className="rounded-2xl px-8" asChild>
              <Link to={user ? "/products" : "/login"}>{user ? "Browse Products" : "Go to Login"}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list" aria-label="Wishlist items">
            {visibleItems.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
