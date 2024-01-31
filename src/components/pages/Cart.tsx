import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";

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

  useEffect(() => {
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

    fetchCartData();
  }, [token]);

  return (
    <div>
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
                <p>Price: {item.product.price}</p>
                {/* Add more information as needed */}
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
