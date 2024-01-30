import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface WishlistItem {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdBy: string;
  imageUrl: string;
}

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchWishlist = async () => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/wishlist/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWishlistItems(data.products);
        setLoading(false);
      } else {
        console.error("Error fetching wishlist");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching wishlist", error);
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = (productId: number) => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }
    fetch(`http://localhost:3000/wishlist/remove/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchWishlist();
          console.log("Wishlist item removed successfully");
        } else {
          console.error("Error removing item from wishlist");
        }
      })
      .catch((error) => {
        console.error("Error removing item from wishlist", error);
      });
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2">
      <h1 className="py-8 pl-4 text-xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-4xl/none">
        Your Wishlist
      </h1>
      <ul className="flex flex-wrap justify-between py-4 px-4">
        {wishlistItems.reverse().map((product: WishlistItem) => (
          <Card key={product.id} className="border p-2 mb-4">
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
              <Button variant={"default"} className="mt-2 mr-2 p-2">
                Add to Cart
              </Button>{" "}
              <Button
                variant={"secondary"}
                className="mt-2 p-2"
                onClick={() => handleRemoveFromWishlist(product.id)}
              >
                {" "}
                Remove from wishlist
              </Button>{" "}
            </CardContent>
          </Card>
        ))}
      </ul>
    </div>
  );
}

export default Wishlist;
