import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { MinusCircle, PlusCircle } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdBy: string;
}

interface CartItem {
  id: number;
  totalPrice: number;
  quantity: number;
  product: Product;
}

interface CartData {
  id: number;
  items: CartItem[];
}

const CartComponent: React.FC = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const token = localStorage.getItem("JWT");
  const { toast } = useToast();
  const fetchCartData = async () => {
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    const apiUrl = "http://localhost:3000/cart";

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch cart data. Status: ${response.status}`
        );
      }

      const responseData: CartData = await response.json();
      setCartData(responseData);
    } catch (error) {
      console.error("Error fetching cart data:");
    }
  };
  const handleRemoveFromCart = (productId: number) => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }
    fetch(`http://localhost:3000/cart/delete/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchCartData();
          console.log("Cart item removed successfully");
        } else {
          console.error("Error removing item from Cart");
        }
      })
      .catch((error) => {
        console.error("Error removing item from Cart", error);
      });
  };
  const handleIncreaseQuantity = async (productId: number) => {
    const token = localStorage.getItem("JWT");

    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    const quantity = 1; // replace with the desired quantity

    const apiUrl = `http://localhost:3000/cart/increase/${productId}`;
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
      console.log("Item added to cart:", responseData);
      fetchCartData();
    } catch (error) {
      console.error("Error adding item to cart:");
    }
  };
  const handleDecreaseQuantity = (productId: number) => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }
    fetch(`http://localhost:3000/cart/reduce/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchCartData();
          console.log("One item removed successfully");
        } else {
          console.error("Error removing one item from Cart");
        }
      })
      .catch((error) => {
        console.error("Error removing item from Cart", error);
      });
  };
  useEffect(() => {
    fetchCartData();
  }, [token]);

  return (
    <div className="min-h-screen">
      <h1 className="p-4  text-foreground text-xl font-bold tracking-tighter sm:text-4xl md:text-3xl lg:text-4xl/none">
        Cart Information
      </h1>{" "}
      {cartData && cartData.items.length > 0 ? (
        <ul>
          {cartData.items.map((item) => (
            <Card key={item.id} className="border m-2 p-2 mb-4">
              <CardContent>
                <p>Product: {item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.totalPrice}</p>
                <div className="flex">
                  <Button
                    className="mt-2 p-2 mr-2"
                    onClick={() => handleDecreaseQuantity(item.product.id)}
                  >
                    <MinusCircle />
                  </Button>
                  <Button
                    className="mt-2 p-2"
                    onClick={() => handleIncreaseQuantity(item.product.id)}
                  >
                    <PlusCircle />{" "}
                  </Button>
                </div>
                <Button
                  variant={"secondary"}
                  className="mt-2 p-2"
                  onClick={() => {
                    handleRemoveFromCart(item.product.id);
                    toast({
                      title: "Removed from Cart",
                      description: item.product.name + " Removed",
                    });
                  }}
                >
                  Remove from Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </ul>
      ) : cartData ? (
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-foreground text-xl font-semibold tracking-tighter sm:text-2xl md:text-3xl lg:text-2xl/none">
            Your Cart is empty.
          </h1>
        </div>
      ) : (
        <div className=" min-h-screen flex flex-col items-center justify-center ">
          <h1 className="text-foreground text-xl font-semibold tracking-tighter sm:text-2xl md:text-3xl lg:text-2xl/none">
            Loading your Cart....
          </h1>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
