import { useState, ChangeEvent, FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { toast } from "../ui/use-toast";

interface FormData {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  //   categories: { name: string }[];
}

export default function Component(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    stock: 0,
    // categories: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }
    console.log(formData);

    fetch("http://localhost:3000/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        imageUrl: formData.imageUrl,
        stock: formData.stock,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("Product added:", data);
        } else {
          console.error("Adding product failed:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error while adding product:", error);
      });
  };

  return (
    <Card className="p-4 my-10 mx-auto max-w-[750px] space-y-2 opacity-80">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">Add Product</CardTitle>
        <CardDescription>Enter details about your product</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Product Name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Detail about your product"
              required
              type="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              placeholder="Product Price"
              required
              type="number"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              placeholder="Product Image URL"
              required
              type="url"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              placeholder="Product Stock"
              required
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="categories">Categories</Label>
            <Input
              id="categories"
              placeholder="Comma-separated categories"
              required
              value={formData.categories.map((cat) => cat.name).join(",")}
              onChange={(e) => {
                const categories = e.target.value
                  .split(",")
                  .map((name) => ({ name }));
                setFormData({
                  ...formData,
                  categories,
                });
              }}
            />
          </div> */}

          <Button
            className="w-full"
            type="submit"
            onClick={() => {
              toast({
                title: "Product created",
              });
            }}
          >
            Add product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
