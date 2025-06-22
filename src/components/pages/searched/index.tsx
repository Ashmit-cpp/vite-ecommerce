import ProductItem from "@/components/ProductItem";
import CustomPagination from "@/components/CustomPagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearched } from "./use-searched";
import { Loader2 } from "lucide-react";

export default function SearchedPage() {
  const {
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
  } = useSearched();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {searchResults.length === 0 ? (
        <div className="min-h-screen flex-grow flex flex-col items-center justify-center">
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
              <Select value={sortBy} onValueChange={setSortBy}>
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
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="max-w-fit">
                  <SelectValue placeholder="Order" />
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
          <ul className="flex flex-wrap justify-evenly gap-4 py-8">
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