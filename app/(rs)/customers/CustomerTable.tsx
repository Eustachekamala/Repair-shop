"use client";

import type { selectCustomerSchemaType } from "@/zod-schemas/customer";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

type Props = {
  data: selectCustomerSchemaType[];
};

export default function CustomerTable({ data }: Props) {
  const router = useRouter();

  const columnHeadersArray: Array<keyof selectCustomerSchemaType> = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "city",
    "zip",
  ];

  const columnHelper = createColumnHelper<selectCustomerSchemaType>();

  const columns = columnHeadersArray.map((columName) => {
    return columnHelper.accessor(columName, {
      id: columName,
      header: columName[0].toUpperCase() + columName.slice(1),
    });
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-border">
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-gray-700/60 text-center">
                  <div>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-gray-800/60 dark:hover:bg-gray-700/60"
              onClick={() =>
                router.push(`/customers/form?customerId=${row.original.id}`)
              }
            >
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border">
                        { flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                    </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
