import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "../buttons/AddToCart";
import AddToWishlist from "../buttons/AddToWishlist";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

interface Review {
  id: number;
  text: string;
  rating: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdBy: string;
  reviews: Review[];
}

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState<string>(""); // State to store review text
  const [reviewRating, setReviewRating] = useState<number>(0); // State to store review rating
  let params = useParams();
  const { toast } = useToast();

  const AddReview = async () => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }
    try {
      if (!reviewText || !reviewRating) {
        console.error("Please provide both review text and rating.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/products/addreview/${params.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: reviewText,
            rating: reviewRating,
          }),
        }
      );

      if (!response.ok) {
        console.error("Error adding review:", response.statusText);
        // Handle the error as needed (show a message, etc.)
        return;
      }

      console.log("Review added successfully!");
      setReviewText("");
      setReviewRating(0);
      fetchData();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${params.id!}`
      );
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

  return (
    <div className=" flex justify-center align-middle">
      <div className="my-20">
        {loading ? (
          <p>Loading...</p>
        ) : product ? (
          <div className="flex bg-white dark:bg-slate-800 border-2 border-primary p-8">
            <div className="p-8 mr-4 border-4 border-solid bg-white ">
              <img src={product.imageUrl} alt={product.name} width={200} />
            </div>
            <div className="p-8 pb-2">
              <h2 className="text-3xl font-bold mb-2 ">{product.name}</h2>
              <h2 className="mb-4">{product.description}</h2>
              <p className="text-lg text-green-600 font-semibold mb-2">
                Price: ${product.price}
              </p>
              <p className="text-lg mb-2">Stock: {product.stock}</p>
              <p className="text-lg mb-4">Created By: {product.createdBy}</p>
              <h3 className="text-lg font-bold">Reviews</h3>
              {product.reviews.length > 0 ? (
                <ul>
                  {product.reviews.map((review) => (
                    <li
                      key={review.id}
                      className="gap-4 p-2 rounded-lg border-4 mb-4"
                    >
                      <h1 className="font-semibold">Rating: {review.rating}</h1>
                      <h1>{review.text}</h1>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews yet.</p>
              )}

              <div>
                <AddToCart
                  product={{
                    id: product.id,
                    price: product.price,
                    name: product.name,
                  }}
                />{" "}
                <AddToWishlist
                  product={{
                    id: product.id,
                    price: product.price,
                    name: product.name,
                  }}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button>Add Review</Button>
                  </PopoverTrigger>
                  <PopoverContent sideOffset={4}>
                    <div className="p-4 border-2 border-primary border-double rounded-xl bg-gray-200 dark:bg-gray-900">
                      <div className="flex  flex-col w-full gap-2">
                        <h1>Write your review below:</h1>
                        <Input
                          type="text"
                          placeholder="Write your review here"
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                        />
                        <h1>Add rating below:</h1>
                        <Input
                          type="number"
                          placeholder="Rating (1-5)"
                          value={reviewRating}
                          onChange={(e) => {
                            const ratingValue = parseInt(e.target.value, 10);
                            // Check if the rating is within the valid range (1-5)
                            if (
                              !isNaN(ratingValue) &&
                              ratingValue >= 1 &&
                              ratingValue <= 5
                            ) {
                              setReviewRating(ratingValue);
                            }
                          }}
                        />
                        <Button
                          onClick={() => {
                            AddReview();
                            toast({
                              title: "Review added",
                            });
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-red-500">Product not found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
