// ProductItem.tsx
import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useToast } from "./ui/use-toast";

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
interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { toast } = useToast();

  const handleAddToCart = async (productId: number, productPrice: number) => {
    const token = localStorage.getItem("JWT");

    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    const quantity = 1; // replace with the desired quantity

    const apiUrl = `http://localhost:3000/cart/add/${productId}`;
    const requestBody = {
      totalPrice: productPrice,
      quantity: quantity.toString(),
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to add item to cart. Status: ${response.status}`
        );
      }

      const responseData = await response.json();
      // Handle the response data as needed (update state, show success message, etc.)
      console.log("Item added to cart:", responseData);
    } catch (error) {
      console.error("Error adding item to cart:");
    }
  };

  const handleAddToWishlist = () => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    fetch(`http://localhost:3000/wishlist/add/${product.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Wishlist item added successfully");
      })
      .catch((error) => {
        console.error("Error adding item to wishlist", error);
      });
  };

  return (
    <Card key={product.id} className="border p-2 mb-4 ">
      <CardContent>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="mb-4 max-w-full"
        />
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-green-600 font-bold">${product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>Created By: {product.createdBy}</p>
        <Button
          variant={"default"}
          className="mt-2 mr-2 p-2"
          onClick={() => {
            handleAddToCart(product.id, product.price);
            toast({
              title: "Added to Cart",
              description: product.name + " Added",
            });
          }}
        >
          {" "}
          Add to Cart
        </Button>{" "}
        <Button
          variant={"secondary"}
          className="mt-2 p-2"
          onClick={() => {
            handleAddToWishlist();
            toast({
              title: "Added to Wishlist",
              description: product.name + " Added",
            });
          }}
        >
          {" "}
          Add to wishlist
        </Button>{" "}
        {product.reviews.length > 0 && (
          <div>
            <h4 className="font-bold mt-2">Reviews:</h4>
            <ul>
              {product.reviews.map((review) => (
                <li key={review.id} className="mb-2">
                  <p>{review.text}</p>
                  <p>Rating: {review.rating}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductItem;
