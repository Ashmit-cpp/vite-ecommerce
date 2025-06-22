import { useProductPage } from "./use-product-page";
import { ReviewsSection } from "./components/reviews-section";
import AddToCart from "@/components/buttons/AddToCart";
import AddToWishlist from "@/components/buttons/AddToWishlist";
import { Loader2 } from "lucide-react";

export default function ProductPage() {
  const { product, loading, fetchData, handleDeleteReview, token, decodedToken } =
    useProductPage();

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-32">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center mt-32 flex-grow">
        <p className="text-red-500 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 flex p-5 flex-col">
      <div className="md:w-1/2">
        <img
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-[500px] object-contain"
        />
      </div>
      <div className="md:w-1/2 p-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {product.description}
          </p>
          <p className="text-2xl font-bold mb-4">₹{product.price}</p>
          <p className="mb-4">In Stock: {product.stock}</p>
          <div className="flex space-x-2 mb-6">
            <AddToCart
              product={{
                id: product.id,
                price: product.price,
                name: product.name,
              }}
            />
            <AddToWishlist
              product={{
                id: product.id,
                price: product.price,
                name: product.name,
              }}
            />
          </div>
        </div>
      </div>
      <ReviewsSection
        product={product}
        token={token}
        decodedToken={decodedToken}
        onDeleteReview={handleDeleteReview}
        onReviewAdded={fetchData}
      />
    </div>
  );
} 