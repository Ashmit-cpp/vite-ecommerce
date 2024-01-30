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
import { Button } from "../ui/button";
import ProductItem from "../ProductItem";

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
      <ul className="flex flex-wrap justify-between py-8 px-4">
        {searchResults.map((result) => (
          <ProductItem key={result.id} product={result} />
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
