import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getURL } from "@/lib/helper";
import { Product } from "@/lib/types";

export function useMyProducts() {
  const { toast } = useToast();
  const [myproducts, setMyProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyProducts = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      setLoading(false);
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
        setMyProducts(data);
      } else {
        console.error("Error fetching my products");
      }
    } catch (error) {
      console.error("Error fetching my products", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = async (updatedData: Product) => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    try {
      const response = await fetch(`${getURL()}/products/${updatedData.id}`, {
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
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Product updated successfully.",
        });
        await fetchMyProducts();
      } else {
        throw new Error(data.message || "Updating product failed");
      }
    } catch (error) {
      console.error("Error while updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, [fetchMyProducts]);

  return { myproducts, loading, fetchMyProducts, updateProduct };
} 