import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { getURL } from "@/lib/helper";

interface DeleteProductProps {
  id: number;
  name: string;
  onDelete: () => void;
}

function DeleteProduct({ id, name, onDelete }: DeleteProductProps) {
  const { toast } = useToast();

  const handleDeleteProduct = async () => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    try {
      const response = await fetch(`${getURL()}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onDelete();

        console.log("Product deleted successfully");
      } else {
        console.error("Error deleting the product");
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant={"outline"}>
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {name}{" "}
              and cannot be restored.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteProduct();
                toast({
                  title: "Item permanently deleted",
                  description: `${name} deleted`,
                });
              }}
            >
              Continue <Trash2 className="ml-1" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DeleteProduct;
