// ProductItem.tsx
import React from "react";
import { Card, CardContent } from "./ui/card";
import AddToWishlist from "./buttons/AddToWishlist";
import AddToCart from "./buttons/AddToCart";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <ul className="flex flex-wrap justify-evenly gap-2 ">
      <Card key={product.id} className="border mb-2 ">
        <CardContent className="flex flex-col flex-wrap ">
          <div className="flex justify-center p-4 md:flex">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="my-4 px-2 h-44  cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            />
          </div>

          <h3 className="text-lg font-bold">{product.name}</h3>
          <p>{product.description}</p>
          <p className="text-green-600 font-bold"> ₹{product.price}</p>
          <p>In Stock: {product.stock} units</p>
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
        </CardContent>
      </Card>
    </ul>
  );
};

export default ProductItem;
