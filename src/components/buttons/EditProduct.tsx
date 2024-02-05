import React, { FormEvent, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { SquarePen } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface EditProductProps {
  initialData: {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
  };
  onUpdate: (data: {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
  }) => void;
}

function EditProduct({ initialData, onUpdate }: EditProductProps) {
  const [formData, setFormData] = useState({
    id: initialData.id,
    name: initialData.name,
    description: initialData.description,
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
      <Popover>
        <PopoverTrigger>
          <Button variant={"outline"}>
            <SquarePen />
          </Button>{" "}
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={12}
          className="w-50 p-2 rounded-xl  bg-secondary border-2 border-primary"
        >
          <div className="grid gap-4">
            <div className="space-y-2"></div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                onUpdate(formData);
              }}
            >
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    className="col-span-2 h-8"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    className="col-span-2 h-8"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="stock">Left Stock</Label>
                  <Input
                    id="stock"
                    value={formData.stock.toString()}
                    className="col-span-2 h-8"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price.toString()}
                    className="col-span-2 h-8"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <Button type="submit">Update product</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default EditProduct;
