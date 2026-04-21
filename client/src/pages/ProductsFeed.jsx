import { useState, useEffect } from "react";
// import { productService } from '../services/product.service'; // Your API service
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
        // Here we pass our state to the service hook which builds the URL:
        // /api/products?page=1&category=Shirts&sort=newest&search=
        // const response = await productService.getProducts({ page, category, sort, search });

        // Simulating the backend response shape we built earlier
        const mockResponse = {
          data: [
            {
              _id: "1",
              title: "Heavyweight Tee",
              basePrice: 25,
              vendorId: { vendorDetails: { storeName: "Midnight Denim" } },
              images: [
                {
                  url: "https://via.placeholder.com/400x500/18181b/ffffff?text=Product+Image",
                },
              ],
            },
            {
              _id: "2",
              title: "Utility Cargo Pants",
              basePrice: 65,
              vendorId: { vendorDetails: { storeName: "Streetwear Hub" } },
              images: [
                {
                  url: "https://via.placeholder.com/400x500/18181b/ffffff?text=Product+Image",
                },
              ],
            },
            {
              _id: "3",
              title: "Minimalist Hoodie",
              basePrice: 45,
              vendorId: { vendorDetails: { storeName: "Midnight Denim" } },
              images: [
                {
                  url: "https://via.placeholder.com/400x500/18181b/ffffff?text=Product+Image",
                },
              ],
            },
            {
              _id: "4",
              title: "Canvas Tote",
              basePrice: 15,
              vendorId: { vendorDetails: { storeName: "Basics Co" } },
              images: [
                {
                  url: "https://via.placeholder.com/400x500/18181b/ffffff?text=Product+Image",
                },
              ],
            },
          ],
          pagination: { totalPages: 3, currentPage: page },
        };

        setProducts(mockResponse.data);
        setTotalPages(mockResponse.pagination.totalPages);
      } catch (err) {
        setError("Failed to load products.");
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
    <div className="min-h-screen p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* --- Header & Search --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 pb-6 border-b gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase">
              Catalog
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover pieces from independent creators.
            </p>
          </div>
          <div className="w-full md:w-72">
            <Input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full"
            />
          </div>
        </div>

        {/* --- Toolbar: Filters & Sorting --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
            {["All", "Shirts", "Pants", "Outerwear", "Accessories"].map(
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
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="block group"
            >
              <ProductCard
                product={{
                  id: product._id,
                  title: product.title,
                  image:
                    product.images?.[0]?.url ||
                    "https://via.placeholder.com/400x500/18181b/ffffff?text=Product+Image",
                  category:
                    product.vendorId?.vendorDetails?.storeName ||
                    "Unknown Store",
                  description: "", // Description placeholder, not currently provided by basic feed Mock
                  price: `$${product.basePrice.toFixed(2)}`,
                }}
              />
            </Link>
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
