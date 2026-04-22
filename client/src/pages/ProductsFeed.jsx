import { useState, useEffect } from "react";
import { productService } from "../services/product.service";
import { Link } from "react-router";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import ProductCard from "../components/ProductCard";
import Navbar from "@/components/Navbar";

const ProductsFeed = () => {
  // --- State Management ---
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination & Filters State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  // --- Data Fetching ---
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await productService.getProducts({
          page,
          category,
          sort,
          search,
        });

        setProducts(response?.data || []);
        setTotalPages(response?.pagination?.totalPages || 1);
      } catch (err) {
        setProducts([]);
        setTotalPages(1);
        setError(
          err?.response?.data?.message || "Failed to load products.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    // We add a tiny delay to prevent spamming the API while typing a search
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [page, category, sort, search]); // Re-run effect when any of these change

  // --- Handlers ---
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1); // Always reset to page 1 when changing filters
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-8">

        {/* --- Toolbar: Filters & Sorting --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div className="w-full sm:max-w-sm">
            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search products..."
              className="w-full"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
            {["All", "Shirts", "Pants", "Outerwear", "Accessories", "Footwear"].map(
              (cat) => (
                <Button
                  key={cat}
                  variant={
                    category === cat || (category === "" && cat === "All")
                      ? "default"
                      : "outline"
                  }
                  onClick={() => handleCategoryChange(cat === "All" ? "" : cat)}
                  className="rounded-full px-6"
                >
                  {cat}
                </Button>
              ),
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="w-full sm:w-48 shrink-0">
            <Select
              value={sort}
              onValueChange={(value) => {
                setSort(value);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Latest Arrivals</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="oldest">Archival</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* --- Error & Loading States --- */}
        {error && (
          <div className="p-4 border text-center mb-8 text-destructive">
            {error}
          </div>
        )}

        {/* --- Product Grid --- */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                id: product._id,
                title: product.title,
                image:
                  product.images?.[0]?.url ||
                  "https://via.placeholder.com/400x500/18181b/ffffff?text=Product+Image",
                category: product.category || "Uncategorized",
                description:
                  product.description ||
                  product.vendorId?.vendorDetails?.storeName ||
                  "",
                price: product.basePrice,
              }}
            />
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && products.length === 0 && (
          <div className="py-20 text-center border border-dashed rounded-xl">
            <p className="opacity-50 uppercase tracking-widest text-sm">
              No items found matching your criteria.
            </p>
          </div>
        )}

        {/* --- Pagination --- */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="uppercase text-xs font-bold tracking-widest"
            >
              Prev
            </Button>
            <span className="text-muted-foreground font-mono text-sm">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="uppercase text-xs font-bold tracking-widest"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsFeed;
