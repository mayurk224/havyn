import React, { useState, useCallback } from "react";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import wishlistService from "@/services/wishlist.service";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";

/**
 * WishlistToggleButton Component
 * 
 * A reusable button to toggle a product in/out of the user's wishlist.
 * Features:
 * - Optimistic UI updates for immediate feedback
 * - Handles rapid clicking/loading states
 * - Smooth transition animations
 * - Accessibility (ARIA labels and roles)
 * - Error handling with state rollback
 */
const WishlistButton = ({ productId, className }) => {
  const { user, setUser, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Check if the product is already in the wishlist
  const isInWishlist = user?.wishlist?.includes(productId);

  const syncWishlist = useCallback((wishlistIds) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return {
        ...currentUser,
        wishlist: wishlistIds,
      };
    });
  }, [setUser]);

  const handleToggle = useCallback(async (e) => {
    // Prevent event bubbling to parent links/cards
    e.preventDefault();
    e.stopPropagation();

    // Check authentication
    if (!user) {
      toast.error("Please login to add items to your wishlist");
      navigate("/login");
      return;
    }

    // Prevent rapid clicks if still processing
    if (isLoading) return;

    const previousWishlist = user.wishlist || [];
    const updatedWishlist = isInWishlist
      ? previousWishlist.filter((id) => id !== productId)
      : [...new Set([...previousWishlist, productId])];

    // --- Optimistic Update ---
    // Update local state immediately for better UX
    setIsLoading(true);
    syncWishlist(updatedWishlist);

    try {
      const response = isInWishlist
        ? await wishlistService.removeFromWishlist(productId)
        : await wishlistService.addToWishlist(productId);

      syncWishlist(response.wishlistIds);

      if (isInWishlist) {
        toast.success("Removed from wishlist");
      } else {
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Wishlist error:", error);

      const status = error?.response?.status;
      const fallbackMessage = !error?.response
        ? "Network error. Your wishlist was restored."
        : status === 401
          ? "Your session expired. Please log in again."
          : "Failed to update wishlist";

      // --- Rollback on Error ---
      // Revert to previous state if API call fails
      syncWishlist(previousWishlist);
      toast.error(error?.response?.data?.message || fallbackMessage);

      if (status === 401) {
        await refreshUser({ silent: true });
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, productId, isInWishlist, navigate, refreshUser, syncWishlist, isLoading]);

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isLoading}
      onClick={handleToggle}
      className={cn(
        "relative rounded-full backdrop-blur-md transition-all duration-300",
        isInWishlist 
          ? "bg-red-500 text-white hover:bg-red-600 scale-100 shadow-lg shadow-red-500/20" 
          : "bg-white/70 opacity-0 group-hover:opacity-100 hover:bg-white hover:text-red-500 hover:scale-110",
        className
      )}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={isInWishlist}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Heart 
          className={cn(
            "h-5 w-5 transition-transform duration-300",
            isInWishlist ? "fill-current scale-110" : "scale-100"
          )} 
        />
      )}
    </Button>
  );
};

export default WishlistButton;
