// ProductItem.tsx
import React from "react";
import { Card, CardContent } from "./ui/card";
import AddToCart from "./buttons/addToCart";
import AddToWishlist from "./buttons/AddToWishlist";

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
    <Card key={product.id} className="border p-2 mb-4 ">
      <CardContent>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="mb-4 max-w-full"
        />
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
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
  );
};

export default ProductItem;
