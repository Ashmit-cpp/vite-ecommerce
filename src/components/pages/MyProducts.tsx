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
import { PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import DeleteProduct from "../buttons/DeleteProduct";
import EditProduct from "../buttons/EditProduct";
import { ScrollArea } from "../ui/scroll-area";

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
  const updateProduct = (updatedData: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    stock: number;
  }) => {
    // Find the index of the updated product in the state
    const updatedIndex = myproducts.findIndex(
      (product) => product.id == updatedData.id
    );

    if (updatedIndex !== -1) {
      // Create a copy of the state array
      const updatedProducts = [...myproducts];
      // Update the product at the found index
      updatedProducts[updatedIndex] = {
        ...updatedProducts[updatedIndex],
        ...updatedData,
      };
      // Update the state with the new array
      setmyProducts(updatedProducts);
      const token = localStorage.getItem("JWT");
      if (!token) {
        console.error("JWT token not found in localStorage");
        return;
      }

      fetch(`http://localhost:3000/products/${updatedData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedData.name,
          description: updatedData.description,
          imageUrl: updatedData.imageUrl,
          price: updatedData.price,
          stock: updatedData.stock,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            console.log("Product updated:", data);
          } else {
            console.error("updating product failed:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error while updating product:", error);
        });
    }
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
        <h1 className=" text-slate-700 dark:text-slate-200 opacity-75 text-lg font-semibold tracking-tighter sm:text-3xl md:text-3xl lg:text-4xl/none">
          Manage your products
        </h1>
        <Link to="/addproducts">
          {" "}
          <Button>
            {" "}
            <PlusCircle className="mr-2" />
            <h1 className="  text-xs tracking-tighter sm:text-base md:text-lg lg:text-xl/none">
              Add Products
            </h1>
          </Button>
        </Link>
      </div>
      <Separator />
      <Separator />

      {loading ? (
        <p>Loading...</p>
      ) : myproducts && myproducts.length > 0 ? (
        <ScrollArea className="min-h-screen pr-4 m-2 max-h-[420px] flex flex-col items-center justify-center ">
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
                <TableHead className="text-right">Edit</TableHead>
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
                      <h1 className=" text-base"> {item.stock}</h1>
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
                    <DeleteProduct
                      id={item.id}
                      name={item.name}
                      onDelete={fetchMyProducts}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <EditProduct initialData={item} onUpdate={updateProduct} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default MyProducts;
