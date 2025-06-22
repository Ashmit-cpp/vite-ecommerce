import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getURL } from "@/lib/helper";

export interface WishlistItem {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdBy: string;
  imageUrl: string;
}

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${getURL()}/wishlist/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWishlistItems(data.products || []);
      } else {
        console.error("Error fetching wishlist");
        toast({
          title: "Error",
          description: "Could not fetch your wishlist.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching wishlist", error);
      toast({
        title: "Error",
        description: "Could not fetch your wishlist.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleRemoveFromWishlist = async (
    productId: number,
    productName: string
  ) => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }
    try {
      const response = await fetch(`${getURL()}/wishlist/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast({
          title: "Removed from Wishlist",
          description: `${productName} has been removed from your wishlist.`,
        });
        fetchWishlist();
      } else {
        throw new Error("Failed to remove item from wishlist");
      }
    } catch (error) {
      console.error("Error removing item from wishlist", error);
      toast({
        title: "Error",
        description: "Could not remove item from wishlist.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return { wishlistItems, loading, handleRemoveFromWishlist, fetchWishlist };
} 