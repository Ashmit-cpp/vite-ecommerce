import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "@/components/ui/use-toast";
import { getURL } from "@/lib/helper";

interface FormData {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export function useAddProductForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    stock: 0,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === "number" ? Number(value) : value,
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      toast({
        title: "Authentication Error",
        description: "You must be logged in to add a product.",
        variant: "destructive",
      });
      return;
    }

    fetch(`${getURL()}/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        imageUrl: formData.imageUrl,
        stock: Number(formData.stock),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response
            .json()
            .then((err) => {
              throw new Error(
                err.message || `HTTP error! status: ${response.status}`
              );
            });
        }
        return response.json();
      })
      .then((data) => {
        toast({
          title: "Product created successfully!",
        });
        console.log("Product added:", data);
        setFormData({
          name: "",
          description: "",
          price: 0,
          imageUrl: "",
          stock: 0,
        });
      })
      .catch((error) => {
        toast({
          title: "Error adding product",
          description: error.message,
          variant: "destructive",
        });
        console.error("Error while adding product:", error);
      });
  };

  return {
    formData,
    handleInputChange,
    handleFormSubmit,
  };
} 