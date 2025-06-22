import { useState, useEffect, useCallback } from "react";
import { getURL } from "@/lib/helper";
import { CartData } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PlrmySGwwWBuHRECcSV495BH073VGbIU4XJY029YwiHTqy9Chi82KQBAcN3zTsPRc1jsBEESKuIUUhHEGJU5kuK00bRK4hL8j"
);

export function useCart() {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const token = localStorage.getItem("JWT");

  const fetchCartData = useCallback(async () => {
    if (!token) {
      console.error("JWT token not found in localStorage");
      setLoading(false);
      return;
    }
    setLoading(true);
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
      setCartData(responseData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleRemoveFromCart = async (productId: number) => {
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }
    try {
      const response = await fetch(`${getURL()}/cart/delete/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchCartData();
        toast({ title: "Item removed from cart." });
      } else {
        throw new Error("Error removing item from Cart");
      }
    } catch (error) {
      console.error("Error removing item from Cart", error);
      toast({
        title: "Error",
        description: "Could not remove item from cart.",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
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
          body: JSON.stringify(cartData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to create checkout session. Status: ${response.status}`
        );
      }
      const { id: sessionId } = await response.json();
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

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  return { cartData, loading, fetchCartData, handleRemoveFromCart, handleCheckout };
} 