import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

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
  const { toast } = useToast();

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

  const handleAddToCart = async (productId: number) => {
    const token = localStorage.getItem("JWT");

    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    const quantity = 1; // replace with the desired quantity

    const apiUrl = `http://localhost:3000/cart/add/${productId}`;
    const requestBody = {
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
  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className=" min-h-screen flex flex-col items-center justify-center ">
        <h1 className="text-foreground text-xl font-semibold tracking-tighter sm:text-2xl md:text-3xl lg:text-2xl/none">
          Loading....
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="pt-4 pl-4 text-foreground text-xl font-bold tracking-tighter sm:text-4xl md:text-3xl lg:text-4xl/none">
        Your Wishlist
      </h1>
      {wishlistItems.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="p-8 text-foreground text-xl font-semibold tracking-tighter sm:text-2xl md:text-3xl lg:text-2xl/none">
            Your wishlist is empty.
          </h1>
        </div>
      ) : (
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
                <Button
                  variant={"default"}
                  className="mt-2 mr-2 p-2"
                  onClick={() => {
                    handleAddToCart(product.id);
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
                    handleRemoveFromWishlist(product.id);
                    toast({
                      title: "Removed from Wishlist",
                      description: product.name + " Removed",
                    });
                  }}
                >
                  {" "}
                  Remove from wishlist
                </Button>{" "}
              </CardContent>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Wishlist;
