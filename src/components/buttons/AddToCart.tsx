import { useToast } from "../ui/use-toast";
import { useDispatch } from "react-redux";
import { incrementNotification } from "@/redux/slices/notificationSlice";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getURL } from "@/lib/helper";

interface AddToCartProps {
  product: {
    id: number;
    price: number;
    name: string;
  };
}

function AddToCart({ product }: AddToCartProps) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [tokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    if (token) {
      setTokenFound(true);
    }
  }, []);
  const handleAddToCart = async (productId: number, productPrice: number) => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    try {
      const quantity = 1;

      const apiUrl = `${getURL()}/cart/add/${productId}`;
      const requestBody = {
        totalPrice: productPrice,
        quantity: quantity.toString(),
      };
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
      toast({
        title: "Added to Cart",
        description: product.name + " Added",
      });
      dispatch(incrementNotification());
      setAdded(true);

      console.log("Item added to cart:", responseData);
    } catch (error) {
      console.error("Error adding item to cart:");
    }
  };
  return (
    <>
      {" "}
      {tokenFound ? (
        <Button
          variant={"default"}
          className="mt-2 mr-2 p-2"
          onClick={() => {
            handleAddToCart(product.id, product.price);
          }}
        >
          {" "}
          {added ? "Added to Cart" : "Add to Cart"}
        </Button>
      ) : (
        <Button
          variant={"default"}
          className="mt-2 mr-2 p-2"
          onClick={() => {
            toast({
              title: "Please login in order to continue.",
            });
          }}
        >
          Add to Cart
        </Button>
      )}
    </>
  );
}

export default AddToCart;
