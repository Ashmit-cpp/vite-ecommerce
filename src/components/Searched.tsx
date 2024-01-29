import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

function Searched() {
  let params = useParams();

  console.log(params.search);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/?searchTerm=${encodeURIComponent(
            params.search!
          )}&page=1&limit=5`
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (params.search) {
      fetchData();
    }
  }, [params.search]);

  return (
    <div>
      <h2 className="p-2 font-semibold	">
        Search Results for "{params.search}"
      </h2>
      <ul>
        {searchResults.map((result) => (
          <div key={result.id} className="border p-2 mb-4">
            <img
              src={result.imageUrl}
              alt={result.name}
              className="mb-4 max-w-full"
            />
            <h3 className="text-lg font-bold">{result.name}</h3>
            <p className="text-gray-600">{result.description}</p>
            <p className="text-green-600 font-bold">${result.price}</p>
            <p>Stock: {result.stock}</p>
            <p>Created By: {result.createdBy}</p>
            {result.reviews.length > 0 && (
              <div>
                <h4 className="font-bold mt-2">Reviews:</h4>
                <ul>
                  {result.reviews.map((review) => (
                    <li key={review.id} className="mb-2">
                      <p>{review.text}</p>
                      <p>Rating: {review.rating}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </ul>
      <PaginationSection />
    </div>
  );
}

export function PaginationSection() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Searched;
