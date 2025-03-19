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
import { useRouter, useSearchParams } from "next/navigation";
import { CircleCheckIcon, CircleXIcon, ArrowUpDown, ArrowDown, ArrowUp, RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo, useEffect } from "react";
import Filter from "@/components/react-table/Filter";
import { usePolling } from "@/app/hooks/usePolling";

type Props = {
  data: TicketSearchResultsType;
};

type RowType = TicketSearchResultsType[0];

export default function TicketTable({ data }: Props) {
    const router = useRouter();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const searchParams = useSearchParams()
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [sorting, setSorting] = useState<SortingState>([
        {
            id: "ticketDate",
            desc: false, // false for ascending
        }
    ])

    usePolling(30000, searchParams.get("searchText"))

    const pageIndex = useMemo(() => {
      const page = searchParams.get("page")
      return page ? parseInt(page) - 1 : 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchParams.get("page")])

    const columnHeadersArray: Array<keyof RowType> = [
        "ticketDate",
        "title",
        "tech",
        "firstName",
        "lastName",
        "email",
        "completed",
    ];

  const columnWidths = {
    completed : 100,
    ticketDate : 100,
    title : 250,
    tech : 225,
    email : 225,
  }

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
        size : columnWidths[columName as keyof typeof columnWidths] ?? undefined,
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
        pagination: {
          pageIndex,
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

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh(); // Refresh data
  };

  useEffect(() => {
    if (isRefreshing) {
      // Stop animation after 1 second
      const timeout = setTimeout(() => setIsRefreshing(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isRefreshing]);

  useEffect(() => {
    const currerntPageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();

    if(pageCount <= currerntPageIndex && currerntPageIndex > 0){
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', '1')
      router.replace(`?${params.toString()}`, {scroll: false})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[table.getState().columnFilters])

  return (
      <div className="flex flex-col gap-4 mt-6">
        <div className="rounded-lg overflow-hidden border border-border">
          <Table className="border">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="bg-gray-700/60 text-center text-white p-2"
                      style={{width: header.getSize()}}
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
                              <Filter 
                                  column={header.column}
                                  filteredRaws = {table.getFilteredRowModel().rows.map(row => row.getValue(header.column.id))}
                                />
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
        <div className="flex justify-between items-center gap-1 flex-wrap">
          {/* Left side */}
          <div className="w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
            <p className="whitespace-nowrap font-bold">
              {`Page ${
                table.getState().pagination.pageIndex + 1
              } of ${Math.max(1, table.getPageCount())}`}
              &nbsp;&nbsp;
              {`[${table.getFilteredRowModel().rows.length} ${
                table.getFilteredRowModel().rows.length !== 1
                  ? "total results"
                  : "result"
              }]`}
            </p>
          </div>

          {/* Right side */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
            {/* Buttons Group 1 */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                className="cursor-pointer w-full sm:w-auto"
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                Refresh Data <RefreshCcwIcon className={isRefreshing ? "animate-spin" : ""} />
              </Button>
              <Button
                className="cursor-pointer w-full sm:w-auto"
                variant="outline"
                onClick={() => table.resetSorting()}
              >
                Reset Sorting
              </Button>
              <Button
                className="cursor-pointer w-full sm:w-auto"
                variant="outline"
                onClick={() => table.resetColumnFilters()}
              >
                Reset Filters
              </Button>
            </div>

            {/* Buttons Group 2 */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                className="cursor-pointer w-full sm:w-auto"
                variant="outline"
                onClick={() => {
                  const newIndex = table.getState().pagination.pageIndex - 1;
                  table.setPageIndex(newIndex);
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("page", (newIndex + 1).toString());
                  router.replace(`?${params.toString()}`, { scroll: false });
                }}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                className="cursor-pointer w-full sm:w-auto"
                variant="outline"
                onClick={() => {
                  const newIndex = table.getState().pagination.pageIndex + 1;
                  table.setPageIndex(newIndex);
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("page", (newIndex + 1).toString());
                  router.replace(`?${params.toString()}`, { scroll: false });
                }}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
