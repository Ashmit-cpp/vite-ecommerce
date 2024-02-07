import { useState } from "react";
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
  const [added, setAdded] = useState(false);

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
        setAdded(true);
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
        {
          !added
            ? toast({
                title: "Added to Wishlist",
                description: product.name + " Added",
              })
            : toast({
                title: product.name + " Already Added",
              });
        }
      }}
    >
      {added ? "Added to Wishlist" : "Add to Wishlist"}
    </Button>
  );
}

export default AddToWishlist;
