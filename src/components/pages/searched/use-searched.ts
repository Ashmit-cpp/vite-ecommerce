import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getURL } from "@/lib/helper";

interface Review {
  id: number;
  text: string;
  rating: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdBy: string;
  reviews: Review[];
}

export function useSearched() {
  const params = useParams();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [params.search, currentPage, sortBy, sortOrder]);

  const fetchTotalData = useCallback(async () => {
    try {
      const response = await fetch(
        `${getURL()}/products/?searchTerm=${encodeURIComponent(
          params.search!
        )}`
      );
      const totalData = await response.json();
      setTotalItems(totalData.length);
    } catch (error) {
      console.error("Error fetching total data:", error);
    }
  }, [params.search]);

  useEffect(() => {
    if (params.search) {
      fetchData();
      fetchTotalData();
    }
  }, [params.search, fetchData, fetchTotalData]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const itemsPerPage = 4;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    searchResults,
    loading,
    params,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    currentPage,
    totalPages,
    handlePreviousPage,
    handleNextPage,
  };
} 