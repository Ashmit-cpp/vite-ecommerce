import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { useMyProducts } from "./use-my-products";
import { getColumns } from "./components/columns";

export default function MyProductsPage() {
  const { myproducts, loading, fetchMyProducts, updateProduct } =
    useMyProducts();

  const columns = getColumns({
    onUpdate: updateProduct,
    onDelete: fetchMyProducts,
  });

  return (
    <div className="p-2 min-h-screen">
      <div className="flex p-4 mt-4 justify-between">
        <h1 className=" text-slate-700 dark:text-slate-200 opacity-75 text-lg font-semibold tracking-tighter sm:text-3xl md:text-3xl lg:text-4xl/none">
          Manage your products
        </h1>
        <Link to="/addproducts">
          <Button>
            <PlusCircle className="mr-2" />
            <h1 className=" text-xs sm:text-base md:text-lg lg:text-xl/none">
              Add Products
            </h1>
          </Button>
        </Link>
      </div>
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