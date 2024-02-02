// ProductItem.tsx
import React from "react";
import { Card, CardContent } from "./ui/card";
import AddToWishlist from "./buttons/AddToWishlist";
import AddToCart from "./buttons/AddToCart";

interface Review {
  id: number;
  text: string;
  rating: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdBy: string;
  reviews: Review[];
}
interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <ul className="flex flex-wrap justify-evenly gap-2 py-4 ">
      <Card key={product.id} className="border p-1 mb-4 ">
        <CardContent className="flex flex-col flex-wrap ">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="my-4 px-8 min-h-32 cursor-pointer"
            onClick={() => window.open(`/product/${product.id}`, "_blank")}
          />
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p>{product.description}</p>
          <p className="text-green-600 font-bold">${product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Created By: {product.createdBy}</p>
          <div>
            <AddToWishlist
              product={{
                id: product.id,
                price: product.price,
                name: product.name,
              }}
            />
            <AddToCart
              product={{
                id: product.id,
                price: product.price,
                name: product.name,
              }}
            />{" "}
          </div>
          {product.reviews.length > 0 && (
            <div>
              <h4 className="font-bold mt-2">Reviews:</h4>
              <ul>
                {product.reviews.map((review) => (
                  <li key={review.id} className="mb-2">
                    <p>{review.text}</p>
                    <p>Rating: {review.rating}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </ul>
  );
};

export default ProductItem;
