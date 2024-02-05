import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

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
  const handleDeleteProduct = async (productId: number) => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }
    fetch(`http://localhost:3000/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchMyProducts();
          console.log("Product deleted successfully");
        } else {
          console.error("Error deleting my product");
        }
      })
      .catch((error) => {
        console.error("Error deleting product", error);
      });
  };
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
      <div className="flex p-4 mt-4 justify-between">
        <h1 className=" text-slate-700 dark:text-slate-200 opacity-75 text-xl font-semibold tracking-tighter sm:text-4xl md:text-3xl lg:text-4xl/none">
          Manage your products
        </h1>
        <Link to="/addproducts">
          {" "}
          <Button>
            {" "}
            <PlusCircle className="mr-2" /> Add Product
          </Button>
        </Link>
      </div>
      <Separator />
      <Separator />

      {loading ? (
        <p>Loading...</p>
      ) : myproducts && myproducts.length > 0 ? (
        <div className="min-h-screen m-2 max-h-[420px] flex flex-col items-center justify-center ">
          <Table className="rounded-3xl bg-slate-300 dark:bg-slate-700 bg-opacity-30 dark:bg-opacity-30 backdrop-blur-lg backdrop-filter">
            <TableHeader>
              <TableRow className=" text-sm  md:text-base lg:text-lg">
                <TableHead className="text-center sm:w-[500px] sm:text-left">
                  Your Products
                </TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead className="text-center">Left Stock</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-right">Delete</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {myproducts.map((item: Product) => (
                <TableRow key={item.id}>
                  <TableCell
                    className="font-medium cursor-pointer"
                    onClick={() => window.open(`/product/${item.id}`, "_blank")}
                  >
                    {" "}
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-3xl mb-2 sm:mb-0"
                      />
                      <h1 className="text-xs sm:sm md:text-base lg:text-lg xl:text-lg">
                        {item.name}
                      </h1>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <h1 className="p-1 text-sm md:p-2 lg:text-lg xl:text-lg">
                      {item.description}
                    </h1>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center	justify-center">
                      {/* <Button
                      className="p-2"
                      // onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <MinusCircle />
                    </Button> */}
                      <h1 className=" text-base"> {item.stock}</h1>
                      {/* <Button
                      className="p-2"
                      // onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      <PlusCircle />{" "}
                    </Button> */}
                    </div>
                  </TableCell>
                  <TableCell className="text-xl">
                    <h1 className="text-center p-1 text-base md:p-2 lg:text-lg xl:text-lg">
                      {" "}
                      ${item.price}
                    </h1>
                  </TableCell>

                  <TableCell className="text-right">
                    {" "}
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant={"outline"}>
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your product and can not be restored.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleDeleteProduct(item.id);
                              toast({
                                title: "Item permanently deleted",
                                description: item.name + " deleted",
                              });
                            }}
                          >
                            {" "}
                            Continue
                            <Trash2 className="ml-1" />
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default MyProducts;
