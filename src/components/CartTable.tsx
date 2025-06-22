import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
import { CartData, Product } from "@/lib/types";
import { getURL } from "@/lib/helper";
import { useNavigate } from "react-router-dom";

type Item = {
  id: number;
  quantity: number;
  totalPrice: number;
  product: Product;
};

type ResponseBody = {
  id: number;
  items: Item[];
};

type CartTableProps = {
  cartData: CartData;
  fetchCartData: () => void;
  handleRemoveFromCart: (productId: number) => void;
};

function CartTable({
  cartData,
  fetchCartData,
  handleRemoveFromCart,
}: CartTableProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleIncreaseQuantity = async (productId: number) => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    const quantity = 1;
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

      const responseData: ResponseBody = await response.json();
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

  const getTotalSum = (): number => {
    if (!cartData) {
      return 0;
    }
    return cartData.items.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  return (
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
              onClick={() => navigate(`/product/${item.product.id}`)}
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
  );
}

export default CartTable;
