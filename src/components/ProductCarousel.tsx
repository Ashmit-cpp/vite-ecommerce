import React, { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/CarouselCard";
import { getURL } from "@/lib/helper";


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdBy: string;
  reviews: { id: number; rating: number; comment: string }[];
}

const ProductCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getURL()}/products?searchTerm=mouse&page=1&limit=6&sortBy=price&sortOrder=desc`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full max-w"
      >
        <CarouselContent className="-ml-1">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="mb-4 object-cover max-w-full cursor-pointer"
                      onClick={() =>
                        window.open(`/product/${product.id}`, "_blank")
                      }
                    />
                    <div className="text-center">
                      <h2 className="text-xl font-semibold mb-2">
                        {product.name}
                      </h2>
                      <p className="text-sm mb-2">{product.description}</p>
                      <p className="text-lg text-green-600">
                        {" "}
                        ₹{product.price.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
