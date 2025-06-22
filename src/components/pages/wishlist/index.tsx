import { useWishlist } from "./use-wishlist";
import { WishlistItemCard } from "./components/wishlist-item-card";
import { Loader2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlistItems, loading, handleRemoveFromWishlist } = useWishlist();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-2">
      <h1 className="p-4 mt-2 text-slate-700 dark:text-slate-200 opacity-75 text-xl font-semibold tracking-tighter sm:text-4xl md:text-3xl lg:text-4xl/none">
        Your Wishlist
      </h1>
      {wishlistItems.length === 0 ? (
        <div className="mt-32 flex-grow flex flex-col items-center justify-center">
          <h1 className="mb-32 text-foreground text-xl font-semibold tracking-tighter sm:text-2xl md:text-3xl lg:text-2xl/none">
            Your wishlist is empty.
          </h1>
        </div>
      ) : (
        <ul className="flex flex-wrap justify-evenly gap-2 py-4 px-4">
          {wishlistItems
            .slice()
            .reverse()
            .map((product) => (
              <li key={product.id}>
                <WishlistItemCard
                  product={product}
                  onRemove={handleRemoveFromWishlist}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
} 