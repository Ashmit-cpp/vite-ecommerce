import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  let params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/${params.id!}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <div className=" flex justify-center align-middle">
      <div className="my-9">
        {loading ? (
          <p>Loading...</p>
        ) : product ? (
          <div className="flex bg-gray-200 dark:bg-slate-800 border-2 border-primary ">
            <div className="p-8 mr-4 border-4 border-solid bg-white ">
              <img src={product.imageUrl} alt={product.name} width={200} />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-2 ">{product.name}</h2>
              <h2 className="mb-4">{product.description}</h2>
              <p className="text-lg text-green-600 font-semibold mb-2">
                Price: ${product.price}
              </p>
              <p className="text-lg mb-2">Stock: {product.stock}</p>
              <p className="text-lg mb-4">Created By: {product.createdBy}</p>
              <h3 className="text-xl font-bold mb-2">Reviews</h3>
              <ul>
                {product.reviews.map((review) => (
                  <li key={review.id} className="mb-4">
                    <h1>{review.text}</h1>
                    <h1>Rating: {review.rating}</h1>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-red-500">Product not found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
