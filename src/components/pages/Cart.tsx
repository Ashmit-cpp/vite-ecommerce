import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { getURL } from "@/lib/helper";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const getTotalSum = (): number => {
    if (!cartData) {
      return 0;
    }
    return cartData.items.reduce((sum, item) => sum + item.totalPrice, 0);
  };

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

  const handleIncreaseQuantity = async (productId: number) => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    const quantity = 1; // replace with the desired quantity

    const apiUrl = `${getURL()}/cart/increase/${productId}`;
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
      // console.log("Item added to cart:", responseData);
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
    fetch(`${getURL()}/cart/reduce/${productId}`, {
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
    <div className="">
      {cartData && cartData.items.length > 0 ? (
        <div className="m-2 max-h-[420px] flex flex-col items-center justify-center">
          <Table className="rounded-3xl bg-slate-300 dark:bg-slate-700 bg-opacity-30 dark:bg-opacity-30 backdrop-blur-lg backdrop-filter">
            <TableCaption>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary">
                  Total : ${getTotalSum()}
                </h1>
              </div>
            </TableCaption>
            <TableHeader>
              <TableRow className=" text-sm  md:text-base lg:text-lg">
                <TableHead className="text-center sm:w-[500px] sm:text-left">
                  Product
                </TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Sub Total</TableHead>
                <TableHead className="text-right">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartData.items.map((item) => (
                <TableRow key={item.id} className="">
                  <TableCell
                    className="font-medium cursor-pointer"
                    onClick={() =>
                      window.open(`/product/${item.product.id}`, "_blank")
                    }
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-3xl mb-2 sm:mb-0"
                      />
                      <h1 className="text-xs sm:sm md:text-base lg:text-lg xl:text-lg">
                        {item.product.name}
                      </h1>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center justify-center sm:flex-row">
                      <Button
                        className="p-1 w-6 h-6 md:w-8 md:h-8"
                        onClick={() => handleDecreaseQuantity(item.product.id)}
                      >
                        <MinusCircle />
                      </Button>
                      <h1 className="p-1 text-sm md:p-2 lg:text-lg xl:text-lg">
                        {item.quantity}
                      </h1>
                      <Button
                        className="p-1 w-6 h-6 md:w-8 md:h-8"
                        onClick={() => handleIncreaseQuantity(item.product.id)}
                      >
                        <PlusCircle />
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell className="text-center p-2 font-semibold text-xs md:text-base lg:text-lg xl:text-lg">
                    ₹{item.product.price} X {item.quantity} = ₹{item.totalPrice}
                  </TableCell>
                  <TableCell className="text-right text-xs sm:sm md:text-md lg:text-lg xl:text-lg">
                    <Button
                      variant={"outline"}
                      className="p-1 w-8 h-8md:w-8 md:h-8"
                      onClick={() => {
                        handleRemoveFromCart(item.product.id);
                        toast({
                          title: "Removed from Cart",
                          description: item.product.name + " Removed",
                        });
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
