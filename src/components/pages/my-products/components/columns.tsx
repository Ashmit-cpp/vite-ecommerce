import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/lib/types";
import DeleteProduct from "@/components/buttons/DeleteProduct";
import EditProduct from "@/components/buttons/EditProduct";

type getColumnsProps = {
  onUpdate: (product: Product) => void;
  onDelete: () => void;
};

export const getColumns = ({
  onUpdate,
  onDelete,
}: getColumnsProps): ColumnDef<Product>[] => [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "stock",
    header: "Left Stock",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => (
      <EditProduct initialData={row.original} onUpdate={onUpdate} />
    ),
  },
  {
    accessorKey: "remove",
    header: "Remove",
    cell: ({ row }) => (
      <DeleteProduct
        id={row.original.id}
        name={row.original.name}
        onDelete={onDelete}
      />
    ),
  },
];
