import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { toast, useToast } from "../ui/use-toast";
interface Review {
  id: number;
  text: string;
  rating: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdBy: string;
  reviews: Review[];
}

function MyProducts() {
  const [myproducts, setmyProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMyProducts = async () => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/products/productby", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setmyProducts(data);
        setLoading(false);
      } else {
        console.error("Error fetching my products");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching my products", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div className="p-2">
      <h1 className="p-4 mt-4 text-slate-700 dark:text-slate-200 opacity-75 text-xl font-semibold tracking-tighter sm:text-4xl md:text-3xl lg:text-4xl/none">
        Manage your products
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : myproducts && myproducts.length > 0 ? (
        <Table className="rounded-3xl bg-slate-100 dark:bg-slate-700 bg-opacity-30 dark:bg-opacity-30 backdrop-blur-lg backdrop-filter">
          <TableHeader>
            <TableRow className="text-xl">
              <TableHead className="w-[300px] ">Your Products</TableHead>
              <TableHead className="text-center">Available Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[8px] text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myproducts.map((item: Product) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <div className="flex gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="mb-4 rounded-3xl max-w-[50px]"
                    />
                    <h1 className="align-middle"> {item.name}</h1>
                    {/* <h1>{item.description}</h1> */}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center	justify-center">
                    <Button
                      className="p-2"
                      // onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <MinusCircle />
                    </Button>
                    <h1 className="px-4 text-xl"> {item.stock}</h1>
                    <Button
                      className="p-2"
                      // onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      <PlusCircle />{" "}
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="px-4 text-xl">${item.price}</TableCell>

                <TableCell className="w-[80px] text-right">
                  {" "}
                  <Button
                    variant={"outline"}
                    className="mt-2 p-2"
                    onClick={() => {
                      // handleRemoveFromCart(item.product.id);
                      toast({
                        title: "Removed from Cart",
                        description: item.name + " Removed",
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
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default MyProducts;
