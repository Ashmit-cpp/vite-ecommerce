import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../ProductItem";
import CustomPagination from "../CustomPagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getURL } from "@/lib/helper";

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
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>(""); // State to hold sorting criteria
  const [sortOrder, setSortOrder] = useState<string>("asc"); // State to hold sorting order

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getURL()}/products/?searchTerm=${encodeURIComponent(
            params.search!
          )}&page=${currentPage}&limit=4&sortBy=${sortBy}&sortOrder=${sortOrder}`
        );

        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const fetchTotalData = async () => {
      try {
        const response = await fetch(
          `${getURL()}/products/?searchTerm=${encodeURIComponent(
            params.search!
          )}`
        );
        const totalData = await response.json();
        setTotalItems(totalData.length); // Assuming the total count is available as the length of the array
      } catch (error) {
        console.error("Error fetching total data:", error);
      }
    };

    if (params.search) {
      fetchData();
      fetchTotalData();
    }
  }, [params.search, currentPage, sortBy, sortOrder]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      {searchResults.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-foreground text-xl font-semibold tracking-tighter sm:text-2xl md:text-3xl lg:text-2xl/none">
            No results found for "{params.search}"
          </h1>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-between align-middle mx-14 mt-8">
            <h1 className="text-foreground text-xl font-bold sm:text-2xl md:text-3xl lg:text-2xl/none">
              Search Results for "{params.search}"
            </h1>
            <div className="flex gap-2 my-2">
              <Select
                value={sortBy}
                onValueChange={(
                  value: string | ChangeEvent<HTMLSelectElement>
                ) =>
                  typeof value === "string"
                    ? setSortBy(value)
                    : setSortBy(value.target.value)
                }
              >
                <SelectTrigger className="max-w-fit">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={sortOrder}
                onValueChange={(
                  value: string | ChangeEvent<HTMLSelectElement>
                ) =>
                  typeof value === "string"
                    ? setSortOrder(value)
                    : setSortOrder(value.target.value)
                }
              >
                <SelectTrigger className="max-w-fit">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <ul className="flex flex-wrap justify-evenly gap-4 p-2">
            {searchResults.map((result) => (
              <ProductItem key={result.id} product={result} />
            ))}
          </ul>
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </>
      )}
    </div>
  );
}

export default Searched;
