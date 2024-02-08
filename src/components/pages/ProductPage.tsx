import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "../buttons/AddToCart";
import AddToWishlist from "../buttons/AddToWishlist";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Trash2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { getURL } from "@/lib/helper";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import AddReviewButton from "../buttons/AddReview";

interface Review {
  id: number;
  text: string;
  rating: number;
  createdbyUserId: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  reviews: Review[];
}
interface DecodedToken {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState<string>("");
  const [reviewRating, setReviewRating] = useState<number>(0);
  let params = useParams();
  const { toast } = useToast();
  const token: string | null = localStorage.getItem("JWT");
  let sub: DecodedToken | null = null; // Initialize sub with null
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

  return (
    <div className="min-h-screen flex justify-center align-middle">
      <div className="my-20">
        {loading ? (
          <h1 className="flex justify-center mt-24 min-h-screen text-slate-700 dark:text-slate-200 opacity-75 text-lg font-semibold tracking-tighter sm:text-3xl md:text-3xl lg:text-4xl/none">
            Loading...
          </h1>
        ) : product ? (
          <div className="m-8 bg-white dark:bg-slate-800 border-2 border-primary p-8 md:flex">
            <div className="p-8 mr-4 border-4 border-solid bg-white ">
              <img src={product.imageUrl} alt={product.name} width={200} />
            </div>
            <div className="flex-col justify-between p-8 pb-2">
              <h2 className="text-3xl font-bold mb-2 ">{product.name}</h2>
              <h2 className="mb-4">{product.description}</h2>
              <p className="text-lg  mb-2">Price: ₹{product.price}</p>
              <p className="text-lg mb-2">In Stock: {product.stock}</p>
              <h3 className="text-lg font-bold">Reviews</h3>
              {product.reviews.length > 0 ? (
                <ul className="flex-row">
                  {product.reviews.map((review) => (
                    <li
                      key={review.id}
                      className="gap-4 p-2 rounded-lg border-4 border-primary/40 mb-4"
                    >
                      <div className="flex justify-between">
                        <div className="">
                          <h1 className="font-semibold">
                            Rating: {review.rating}
                          </h1>
                          <h1>{review.text}</h1>
                        </div>
                        <div className="p-2">
                          {sub && review.createdbyUserId === sub.sub && (
                            <Button
                              size={"icon"}
                              onClick={() => {
                                handleDeleteReview();
                                toast({
                                  title: "Review deleted successfully.",
                                });
                              }}
                            >
                              <Trash2 />
                            </Button>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews yet.</p>
              )}

              <div className="flex-col">
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
                {token && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="my-2">Add Review</Button>
                    </PopoverTrigger>
                    <PopoverContent
                      sideOffset={4}
                      className="p-4 rounded-xl border-2 border-primary "
                    >
                      <AddReviewButton
                        productId={product.id}
                        onSuccess={fetchData}
                      />
                    </PopoverContent>
                  </Popover>
                )}
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
