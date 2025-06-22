import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getURL } from "@/lib/helper";
import type { Product } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

interface DecodedToken {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

export function useProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { toast } = useToast();
  const token: string | null = localStorage.getItem("JWT");

  let decodedToken: DecodedToken | null = null;
  if (token) {
    decodedToken = jwtDecode(token);
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${getURL()}/products/${params.id!}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  const handleDeleteReview = async () => {
    try {
      const response = await fetch(
        `${getURL()}/products/deletereview/${params.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error deleting review: ${response.statusText}`);
      }
      toast({
        title: "Review deleted successfully.",
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast({
        title: "Error",
        description: "Failed to delete review.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { product, loading, fetchData, handleDeleteReview, token, decodedToken };
} 