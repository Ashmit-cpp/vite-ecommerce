// CustomPagination.tsx
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <Pagination className="p-2 cursor-pointer	">
      <PaginationContent>
        {currentPage !== 1 ? (
          <PaginationPrevious onClick={handlePreviousPage} />
        ) : null}
        {currentPage > 1 ? (
          <PaginationLink onClick={handlePreviousPage}>
            {currentPage - 1}
          </PaginationLink>
        ) : null}
        <PaginationLink isActive>{currentPage}</PaginationLink>
        {currentPage < totalPages ? (
          <PaginationLink onClick={handleNextPage}>
            {" "}
            {currentPage + 1}
          </PaginationLink>
        ) : null}
        {currentPage > totalPages ? (
          <PaginationLink onClick={handlePreviousPage}>
            {currentPage + 1}
          </PaginationLink>
        ) : null}
        {currentPage < totalPages ? (
          <PaginationNext onClick={handleNextPage} />
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
