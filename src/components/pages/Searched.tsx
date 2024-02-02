import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../ProductItem";
import CustomPagination from "../CustomPagination";

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

  console.log(params);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

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

    const fetchTotalData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/?searchTerm=${encodeURIComponent(
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
  }, [params.search, currentPage]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <h2 className="p-2 mt-4 font-bold">
        Search Results for "{params.search}"
      </h2>
      {searchResults.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-foreground text-xl font-semibold tracking-tighter sm:text-2xl md:text-3xl lg:text-2xl/none">
            No results found for "{params.search}"
          </h1>
        </div>
      ) : (
        <>
          <ul className="flex flex-wrap justify-evenly gap-4 py-4 px-4">
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
