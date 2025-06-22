import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Trash2, Star } from "lucide-react";
import AddReviewButton from "@/components/buttons/AddReview";
import type { Review, Product } from "@/lib/types";

interface DecodedToken {
  sub: number;
}

interface ReviewsSectionProps {
  product: Product;
  token: string | null;
  decodedToken: DecodedToken | null;
  onDeleteReview: () => void;
  onReviewAdded: () => void;
}

export function ReviewsSection({
  product,
  token,
  decodedToken,
  onDeleteReview,
  onReviewAdded,
}: ReviewsSectionProps) {
  return (
    <div className="p">
      <h3 className="text-2xl font-bold mb-4">Reviews</h3>
      {token && (
        <Popover>
          <PopoverTrigger asChild>
            <Button className="mb-4">Add Review</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <AddReviewButton productId={product.id} onSuccess={onReviewAdded} />
          </PopoverContent>
        </Popover>
      )}
      {(product.reviews as Review[]).length > 0 ? (
        <ul className="space-y-4">
          {(product.reviews as Review[]).map((review) => (
            <li
              key={review.id}
              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {review.text}
                  </p>
                </div>
                {decodedToken &&
                  review.createdbyUserId === decodedToken.sub && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={onDeleteReview}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
} 