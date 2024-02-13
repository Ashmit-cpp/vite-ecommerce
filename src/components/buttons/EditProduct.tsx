import React, { useState } from "react";
import { SquarePen } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Product } from "@/lib/types";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
} from "../ui/alert-dialog";

interface EditProductProps {
  initialData: Product;
  onUpdate: (data: Product) => void;
}

function EditProduct({ initialData, onUpdate }: EditProductProps) {
  const [formData, setFormData] = useState({
    id: initialData.id,
    name: initialData.name,
    description: initialData.description,
    imageUrl: initialData.imageUrl,
    price: initialData.price,
    stock: initialData.stock,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant={"outline"}>
            <SquarePen />
          </Button>{" "}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update your product</AlertDialogTitle>
            <AlertDialogDescription>
              Changes made below can not be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <div className="space-y-1"></div>
            <form
              className="space-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                onUpdate(formData);
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    className="col-span-2 h-8"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    className="col-span-2 h-8"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="stock">Left Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock.toString()}
                    className="col-span-2 h-8"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price.toString()}
                    className="col-span-2 h-8"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="items-center py-2">
                <Label htmlFor="imageUrl">
                  {" "}
                  <h1 className="pb-2">Enter Image URL</h1>
                </Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  className="col-span-2 h-8"
                  onChange={handleInputChange}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">
                  Update product
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default EditProduct;
