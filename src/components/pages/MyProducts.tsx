import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getURL } from "@/lib/helper";
import { Product } from "@/lib/types";
import DataTable from "../DataTable";
import DeleteProduct from "../buttons/DeleteProduct";
import EditProduct from "../buttons/EditProduct";
import { useToast } from "../ui/use-toast";

function MyProducts() {
  const { toast } = useToast();
  const [myproducts, setmyProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const updateProduct = (updatedData: Product) => {
    // Find th of the updated product in the state
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

      fetch(`${getURL()}/products/${updatedData.id}`, {
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
            toast({
              title: "Product updated successfully.",
            });
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
      const response = await fetch(`${getURL()}/products/productby`, {
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

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "stock",
        header: "Left Stock",
      },
      {
        accessorKey: "price",
        header: "Price",
      },

      {
        accessorKey: "edit",
        header: "Edit",
        cell: ({ row }) => {
          return (
            <div>
              <EditProduct
                initialData={row.original}
                onUpdate={updateProduct}
              />
            </div>
          );
        },
      },
      {
        accessorKey: "remove",
        header: "Remove",
        cell: ({ row }) => {
          return (
            <div>
              <DeleteProduct
                id={row.original.id}
                name={row.original.name}
                onDelete={fetchMyProducts}
              />
            </div>
          );
        },
      },
    ],
    []
  );
  return (
    <div className="p-2 min-h-screen">
      <div className="flex p-4 mt-4 justify-between">
        <h1 className=" text-slate-700 dark:text-slate-200 opacity-75 text-lg font-semibold tracking-tighter sm:text-3xl md:text-3xl lg:text-4xl/none">
          Manage your products
        </h1>
        <Link to="/addproducts">
          {" "}
          <Button>
            {" "}
            <PlusCircle className="mr-2" />
            <h1 className=" text-xs sm:text-base md:text-lg lg:text-xl/none">
              Add Products
            </h1>
          </Button>
        </Link>
      </div>
      <Separator />
      <Separator />
      {loading ? (
        <h1 className="flex justify-center align-middle min-h-screen mt-24 text-slate-700 dark:text-slate-200 opacity-75 text-lg font-semibold tracking-tighter sm:text-3xl md:text-3xl lg:text-4xl/none">
          Loading...
        </h1>
      ) : myproducts && myproducts.length > 0 ? (
        <DataTable columns={columns} data={myproducts} />
      ) : (
        <h1 className="flex justify-center mt-24 min-h-screen text-slate-700 dark:text-slate-200 opacity-75 text-lg font-semibold tracking-tighter sm:text-3xl md:text-3xl lg:text-4xl/none">
          No products Added.
        </h1>
      )}
    </div>
  );
}

export default MyProducts;
