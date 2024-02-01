import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
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
      console.log(responseData);
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
      <h1 className="p-4 mt-8 text-slate-700 dark:text-slate-200 opacity-75 text-xl font-semibold tracking-tighter sm:text-4xl md:text-3xl lg:text-4xl/none">
        Your Cart
      </h1>{" "}
      {cartData && cartData.items.length > 0 ? (
        <div className="m-4 ">
          <Table className="rounded-3xl bg-slate-100 dark:bg-slate-700 bg-opacity-30 dark:bg-opacity-30 backdrop-blur-lg backdrop-filter">
            <TableCaption>
              {" "}
              <div>
                <h1 className="text-xl font-semibold p-2 mb-4 text-primary ">
                  Total : ${getTotalSum()}
                </h1>
                <Button>Checkout</Button>
              </div>
            </TableCaption>
            <TableHeader>
              <TableRow className="text-xl">
                <TableHead className="w-[300px] ">Product</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Sub Total</TableHead>
                <TableHead className="w-[8px] text-right">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartData.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex gap-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="mb-4 rounded-3xl max-w-[50px]"
                      />
                      <h1 className="align-middle"> {item.product.name}</h1>
                      {/* <h1>{item.product.description}</h1> */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center	justify-center">
                      <Button
                        className="p-2"
                        onClick={() => handleDecreaseQuantity(item.product.id)}
                      >
                        <MinusCircle />
                      </Button>
                      <h1 className="px-4 text-xl"> {item.quantity}</h1>
                      <Button
                        className="p-2"
                        onClick={() => handleIncreaseQuantity(item.product.id)}
                      >
                        <PlusCircle />{" "}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 text-xl">
                    ${item.product.price}
                  </TableCell>
                  <TableCell className="px-4 text-xl">
                    ${item.totalPrice}
                  </TableCell>
                  <TableCell className="w-[80px] text-right">
                    {" "}
                    <Button
                      variant={"outline"}
                      className="mt-2 p-2"
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
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-foreground text-xl font-semibold tracking-tighter sm:text-2xl md:text-3xl lg:text-2xl/none">
            Your Cart is empty.
          </h1>
        </div>
      ) : (
        <div className=" min-h-screen flex flex-col items-center justify-center ">
          <h1 className="text-foreground text-xl font-semibold tracking-tighter sm:text-2xl md:text-3xl lg:text-2xl/none">
            Add items to you Cart.
          </h1>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
