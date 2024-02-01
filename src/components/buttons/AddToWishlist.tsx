import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface AddToWishlistProps {
  product: {
    id: number;
    price: number;
    name: string;
  };
}

function AddToWishlist({ product }: AddToWishlistProps) {
  const { toast } = useToast();

  const handleAddToWishlist = () => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    fetch(`http://localhost:3000/wishlist/add/${product.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Wishlist item added successfully");
      })
      .catch((error) => {
        console.error("Error adding item to wishlist", error);
      });
  };

  return (
    <Button
      variant={"secondary"}
      className="mt-2 mr-4 p-2"
      onClick={() => {
        handleAddToWishlist();
        toast({
          title: "Added to Wishlist",
          description: product.name + " Added",
        });
      }}
    >
      {" "}
      Add to wishlist
    </Button>
  );
}

export default AddToWishlist;
