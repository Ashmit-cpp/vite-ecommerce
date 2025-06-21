"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Trash2, Star } from "lucide-react";
import { getURL } from "@/lib/helper";
import type { Product, Review } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import AddToCart from "@/components/buttons/AddToCart";
import AddToWishlist from "@/components/buttons/AddToWishlist";
import AddReviewButton from "@/components/buttons/AddReview";

interface DecodedToken {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setReviewText] = useState<string>("");
  const [, setReviewRating] = useState<number>(0);
  const params = useParams();
  const { toast } = useToast();
  const token: string | null = localStorage.getItem("JWT");
  let sub: DecodedToken | null = null;
  if (token) {
    const decodedToken: DecodedToken = jwtDecode(token);
    sub = decodedToken;
  }

  const handleDeleteReview = async () => {
    try {
      const response = await fetch(
        `${getURL()}/products/deletereview/${params.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Error deleting review:", response.statusText);
        return;
      }
      toast({
        title: "Review deleted successfully.",
      });
      setReviewText("");
      setReviewRating(0);
      fetchData();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${getURL()}/products/${params.id!}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-slate-700 dark:text-slate-200 opacity-75 text-lg font-semibold tracking-tighter sm:text-3xl md:text-3xl lg:text-4xl/none">
          Loading...
        </h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden p-5 md:flex " >
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
            <Separator className="my-2" />
            <div className="p">
              <h3 className="text-2xl font-bold mb-4">Reviews</h3>
              {token && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="mb-4">Add Review</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <AddReviewButton
                      productId={product.id}
                      onSuccess={fetchData}
                    />
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
                        {sub && review.createdbyUserId === sub.sub && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleDeleteReview}
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
          </div>
        </div>
  
  );
};

export default ProductPage;
