// CustomPagination.tsx
import React from "react";
import {
  Pagination,
  PaginationContent,
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

// const CustomPagination: React.FC<CustomPaginationProps> = ({
//   currentPage,
//   totalPages,
//   handlePreviousPage,
//   handleNextPage,
// }) => {
//   return (
//     <Pagination className="p-2 cursor-pointer	">
//       <PaginationContent>
//         {currentPage !== 1 ? (
//           <PaginationPrevious onClick={handlePreviousPage} />
//         ) : null}
//         {currentPage > 1 ? (
//           <PaginationLink onClick={handlePreviousPage}>
//             {currentPage - 1}
//           </PaginationLink>
//         ) : null}
//         <PaginationLink isActive>{currentPage}</PaginationLink>
//         {currentPage < totalPages ? (
//           <PaginationLink onClick={handleNextPage}>
//             {" "}
//             {currentPage + 1}
//           </PaginationLink>
//         ) : null}
//         {currentPage > totalPages ? (
//           <PaginationLink onClick={handlePreviousPage}>
//             {currentPage + 1}
//           </PaginationLink>
//         ) : null}
//         {currentPage < totalPages ? (
//           <PaginationNext onClick={handleNextPage} />
//         ) : null}
//       </PaginationContent>
//     </Pagination>
//   );
// };

// export default CustomPagination;

//other way
const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => {
  const renderPaginationLink = (pageNumber: number) => (
    <PaginationLink
      key={pageNumber}
      onClick={
        pageNumber === currentPage
          ? undefined
          : () => handlePageClick(pageNumber)
      }
      isActive={pageNumber === currentPage}
    >
      {pageNumber}
    </PaginationLink>
  );

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    if (pageNumber < currentPage) handlePreviousPage();
    else if (pageNumber > currentPage) handleNextPage();
  };

  return (
    <Pagination className="p-4 cursor-pointer">
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationPrevious onClick={handlePreviousPage} />
        )}
        {currentPage > 1 && renderPaginationLink(currentPage - 1)}
        {renderPaginationLink(currentPage)}
        {currentPage < totalPages && renderPaginationLink(currentPage + 1)}
        {currentPage < totalPages && (
          <PaginationNext onClick={handleNextPage} />
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
