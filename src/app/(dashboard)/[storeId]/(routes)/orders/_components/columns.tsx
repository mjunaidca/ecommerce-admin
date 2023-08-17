"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "phone",
  },
  {
    accessorKey: "address",
    header: "address",
  },
  {
    accessorKey: "totalPrice",
    header: "totalPrice",
  },
  {
    accessorKey: "isPaid",
    header: "isPaid",
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Date",
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
