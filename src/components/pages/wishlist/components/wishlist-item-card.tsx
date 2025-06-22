import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddToCart from "@/components/buttons/AddToCart";
import type { WishlistItem } from "../use-wishlist";

interface WishlistItemCardProps {
  product: WishlistItem;
  onRemove: (productId: number, productName: string) => void;
}

export function WishlistItemCard({ product, onRemove }: WishlistItemCardProps) {
  return (
    <Card key={product.id} className="border p-1 mb-4 w-80">
      <CardContent className="flex flex-col flex-wrap ">
        <div className="p-8 md:flex">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="my-4 px-8 h-44 cursor-pointer"
            onClick={() => window.open(`/product/${product.id}`, "_blank")}
          />
        </div>
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p>{product.description}</p>
        <p className="text-green-600 font-bold">₹{product.price}</p>
        <p>Stock: {product.stock}</p>
        <AddToCart
          product={{
            id: product.id,
            price: product.price,
            name: product.name,
          }}
        />
        <Button
          variant={"secondary"}
          className="mt-2 p-2"
          onClick={() => onRemove(product.id, product.name)}
        >
          Remove from wishlist
        </Button>
      </CardContent>
    </Card>
  );
} 