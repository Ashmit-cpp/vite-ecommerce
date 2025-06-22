import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAddProductForm } from "./use-add-product-form";

export default function AddProductPage(): JSX.Element {
  const { formData, handleInputChange, handleFormSubmit } = useAddProductForm();

  return (
    <Card className="p-4 my-16 mx-auto max-w-[750px] space-y-2 opacity-80">
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
              type="text"
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

          <Button className="w-full" type="submit">
            Add product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 