import React, { useState, useEffect } from "react";
import { getURL } from "@/lib/helper";
import CartTable from "../CartTable";
import { CartData } from "@/lib/types";

const CartComponent: React.FC = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const token = localStorage.getItem("JWT");

  const fetchCartData = async () => {
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    const apiUrl = `${getURL()}/cart`;

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
      // console.log(responseData);
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
    fetch(`${getURL()}/cart/delete/${productId}`, {
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

  useEffect(() => {
    fetchCartData();
  }, [token]);

  return (
    <div className="">
      {cartData && cartData.items.length > 0 ? (
        <div className="m-2 max-h-[420px] flex flex-col items-center justify-center">
          <CartTable
            cartData={cartData}
            fetchCartData={fetchCartData}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        </div>
      ) : cartData ? (
        <div className="min-h-32 flex-grow flex flex-col items-center justify-center">
          <h1 className="text-foreground text-xl font- sm:text-2xl md:text-3xl lg:text-2xl/none">
            Your Cart is empty.
          </h1>
        </div>
      ) : (
        <div className="p-4 flex flex-col items-center justify-center ">
          <h1 className="text-foreground text-xl font- sm:text-2xl md:text-3xl lg:text-2xl/none">
            Log in and Add items to you Cart.
          </h1>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
