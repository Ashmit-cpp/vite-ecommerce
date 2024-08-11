import React, { useState, useEffect } from "react";
import { getURL } from "@/lib/helper";
import CartTable from "../CartTable";
import { CartData } from "@/lib/types";
import { Button } from "../ui/button";
import { DrawerFooter, DrawerClose } from "../ui/drawer";
import { useToast } from "../ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";

const CartComponent: React.FC = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const { toast } = useToast();

  const stripePromise = loadStripe(
    "pk_test_51PlrmySGwwWBuHRECcSV495BH073VGbIU4XJY029YwiHTqy9Chi82KQBAcN3zTsPRc1jsBEESKuIUUhHEGJU5kuK00bRK4hL8j"
  );
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

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const token = localStorage.getItem("JWT");

    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    try {
      const response = await fetch(
        `${getURL()}/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cartData), // Pass the cart data to backend
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to create checkout session. Status: ${response.status}`
        );
      }

      const { id: sessionId } = await response.json();

      // Redirect to Stripe checkout
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.error("Stripe checkout error:", error);
          toast({
            title: "Error",
            description: "Failed to redirect to Stripe checkout.",
          });
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };
  return (
    <div className="">
      {cartData && cartData.items.length > 0 ? (
        <div className="m-2 max-h-[420px] flex flex-col items-center justify-center">
          <CartTable
            cartData={cartData}
            fetchCartData={fetchCartData}
            handleRemoveFromCart={handleRemoveFromCart}
          />
          <DrawerFooter className="p-2">
            <DrawerClose>
              <Button onClick={handleCheckout}>Checkout</Button>
            </DrawerClose>
          </DrawerFooter>
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
