"use client";

import type { TicketSearchResultsType } from "@/lib/queries/getTicketSearchResult";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedUniqueValues,
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
import { CircleCheckIcon, CircleXIcon, ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Filter from "@/components/react-table/Filter";

type Props = {
  data: TicketSearchResultsType;
};

type RowType = TicketSearchResultsType[0];

export default function TicketTable({ data }: Props) {
    const router = useRouter();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const [sorting, setSorting] = useState<SortingState>([
        {
            id: "ticketDate",
            desc: false, // false for ascending
        }
    ])

    const columnHeadersArray: Array<keyof RowType> = [
        "ticketDate",
        "title",
        "tech",
        "firstName",
        "lastName",
        "email",
        "completed",
    ];

  const columnHelper = createColumnHelper<RowType>();

  const columns = columnHeadersArray.map((columName) => {
    return columnHelper.accessor(
      (row) => {
        // transformational
        const value = row[columName];
        if (columName === "ticketDate" && value instanceof Date) {
          return value.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
        if (columName === "completed") {
          return value ? "COMPLETED" : "OPEN";
        }
        return value;
      },
      {
        id: columName,
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="p-1 w-full flex justify-between" 
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    { columName[0].toUpperCase() + columName.slice(1)}
                    { column.getIsSorted() === "asc" && (
                        <ArrowUp className="ml-2 g-4 w-4"/>
                    )}
                    { column.getIsSorted() === "desc" && (
                        <ArrowDown className="ml-2 g-4 w-4"/>
                    )}
                    { column.getIsSorted() !== "desc" && column.getIsSorted() !== "asc" && (
                        <ArrowUpDown className="ml-2 g-4 w-4"/>
                    )}
                </Button>
            )
        },
        cell: ({ getValue }) => {
          // presentational
          const value = getValue();
          if (columName === "completed") {
            return (
              <div className="grid place-content-center">
                {value === "OPEN" ? (
                  <CircleXIcon className="opacity-25 text-red-400" />
                ) : (
                  <CircleCheckIcon className="text-green-600" />
                )}
              </div>
            );
          }
          return value;
        },
      }
    );
  });

  const table = useReactTable({
    data,
    columns,
    state : {
        sorting,
        columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues : getFacetedUniqueValues(),
    getSortedRowModel : getSortedRowModel(),
  });

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className=" rounded-lg overflow-hidden border border-border">
        <Table className="border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-gray-700/60 text-center text-white p-2"
                  > 
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                    { header.column.getCanFilter() ? (
                        <div className="mt-2">
                            <Filter column={header.column}/>
                        </div>
                    ) : null}
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
                  router.push(`/tickets/form?ticketId=${row.original.id}`)
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex basis-1/3 items-center">
          <p className="whitespace-nowrap font-bold">
            {`Page ${
              table.getState().pagination.pageIndex + 1
            } of ${table.getPageCount()}`}
            &nbsp;&nbsp;
            {`[${table.getFilteredRowModel().rows.length} ${
              table.getFilteredRowModel().rows.length !== 1
                ? "total results"
                : "result"
            }]`}
          </p>
        </div>
        {/* Right side */}
        <div className="flex basis-1/3 justify-end space-x-1">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => table.resetSorting()}
          >
            Reset Sorting
          </Button>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => table.resetColumnFilters()}
          >
            Reset Filters
          </Button>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
