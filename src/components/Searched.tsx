import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";

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
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    console.log("next");
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/?searchTerm=${encodeURIComponent(
            params.search!
          )}&page=${currentPage}&limit=4`
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
  }, [params.search, currentPage]);

  const totalPages = 10;
  const pageNumber = currentPage;

  const generatePaginationLink = (page: number) => {
    return `/products/?page=${page}`;
  };

  return (
    <div>
      <h2 className="p-2 font-semibold	">
        Search Results for "{params.search}"
      </h2>
      <ul className="grid grid-cols-4 gap-4 py-8 px-4">
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
            <Button variant={"secondary"} className="mt-2 p-2">
              Add to Cart
            </Button>
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

      <Pagination className="p-8">
        <PaginationContent>
          {pageNumber !== 1 ? (
            <PaginationPrevious href="#" onClick={handlePreviousPage} />
          ) : null}
          {pageNumber - 1 > 1 ? (
            <PaginationLink href={generatePaginationLink(1)}>
              <PaginationEllipsis />
            </PaginationLink>
          ) : null}
          {pageNumber > 1 ? (
            <PaginationLink href={generatePaginationLink(pageNumber - 1)}>
              {pageNumber - 1}
            </PaginationLink>
          ) : null}
          <PaginationLink href="#" isActive>
            {pageNumber}
          </PaginationLink>
          {pageNumber < totalPages ? (
            <PaginationLink href={generatePaginationLink(pageNumber + 1)}>
              {pageNumber + 1}
            </PaginationLink>
          ) : null}
          {totalPages - pageNumber > 1 ? (
            <PaginationLink href={generatePaginationLink(totalPages)}>
              <PaginationEllipsis />
            </PaginationLink>
          ) : null}
          {pageNumber < totalPages ? (
            <PaginationNext href="#" onClick={handleNextPage} />
          ) : null}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Searched;
