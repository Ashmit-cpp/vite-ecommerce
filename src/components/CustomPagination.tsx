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
  generatePaginationLink: (page: number) => string;
}


const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  generatePaginationLink,
}) => {
  return (
    <Pagination className="p-2">
      <PaginationContent>
        {currentPage !== 1 ? (
          <PaginationPrevious href="#" onClick={handlePreviousPage} />
        ) : null}
        {/* {currentPage - 1 > 1 ? (
          <PaginationLink href={generatePaginationLink(1)}>
            <PaginationEllipsis />
          </PaginationLink>
        ) : null}
        {currentPage > 1 ? (
          <PaginationLink href={generatePaginationLink(currentPage - 1)}>
            {currentPage - 1}
          </PaginationLink>
        ) : null}
        <PaginationLink href="#" isActive>
          {currentPage}
        </PaginationLink>
        {currentPage < totalPages ? (
          <PaginationLink href={generatePaginationLink(currentPage + 1)}>
            {currentPage + 1}
          </PaginationLink>
        ) : null}
        {totalPages - currentPage > 1 ? (
          <PaginationLink onclick={handlePageClick(currenypage)}>
            <PaginationEllipsis />
          </PaginationLink>
        ) : null} */}
        {currentPage < totalPages ? (
          <PaginationNext href="#" onClick={handleNextPage} />
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
