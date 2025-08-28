import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronUp, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FacetedFilterConfig {
  columnId: string;
  label?: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  searchColumn?: string;
  enableRowSelection?: boolean;
  facetedFilters?: FacetedFilterConfig[];
  pageSizeOptions?: number[];
}

function exportRowsToCsv<TData>(rows: any[], filename = "export.csv") {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(",")]
    .concat(
      rows.map((row) =>
        headers
          .map((field) => {
            const value = row[field];
            if (value == null) return "";
            const cell = String(value).replace(/"/g, '""');
            return /[",\n]/.test(cell) ? `"${cell}"` : cell;
          })
          .join(","),
      ),
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchColumn,
  enableRowSelection = false,
  facetedFilters = [],
  pageSizeOptions = [10, 20, 50, 100],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});
  const [pageSize, setPageSize] = useState<number>(pageSizeOptions[0] ?? 10);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableRowSelection: enableRowSelection,
    globalFilterFn: "includesString",
    debugTable: process.env.NODE_ENV === "development",
    initialState: {
      pagination: {
        pageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
      columnVisibility,
    },
  });

  // Keep table pageSize in sync when selector changes
  if (table.getState().pagination.pageSize !== pageSize) {
    table.setPageSize(pageSize);
  }

  const selectedRowsData = useMemo(() => {
    return table
      .getFilteredSelectedRowModel()
      .rows.map((r) => r.original as Record<string, unknown>);
  }, [table.getFilteredSelectedRowModel().rows]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={searchPlaceholder}
              value={
                searchColumn
                  ? ((table
                      .getColumn(searchColumn)
                      ?.getFilterValue() as string) ?? "")
                  : (globalFilter ?? "")
              }
              onChange={(event) => {
                const value = event.target.value;

                if (searchColumn) {
                  table.getColumn(searchColumn)?.setFilterValue(value);
                } else {
                  setGlobalFilter(value);
                }
              }}
              className="pl-10"
            />
          </div>

          {enableRowSelection &&
            table.getFilteredSelectedRowModel().rows.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportRowsToCsv(selectedRowsData as any[])}
                title="Export selected to CSV"
              >
                Export CSV
              </Button>
            )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {table.getAllLeafColumns().map((column) => (
            <label
              key={column.id}
              className="text-xs text-muted-foreground flex items-center gap-1"
            >
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={(e) => column.toggleVisibility(e.target.checked)}
              />
              {(() => {
                const h = column.columnDef.header as unknown;
                if (typeof h === "string") return h;
                if (typeof h === "number") return String(h);
                return column.id;
              })()}
            </label>
          ))}
        </div>
      </div>

      {facetedFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {facetedFilters.map(({ columnId, label }) => {
            const column = table.getColumn(columnId);
            if (!column) return null;
            const uniqueValuesMap = column.getFacetedUniqueValues?.();
            const options = uniqueValuesMap
              ? Array.from(uniqueValuesMap.keys())
              : [];

            return (
              <div key={columnId} className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {label ?? columnId}
                </span>
                <Select
                  value={(column.getFilterValue() as string) ?? ""}
                  onValueChange={(val) =>
                    column.setFilterValue(val || undefined)
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    {options.map((opt) => (
                      <SelectItem key={String(opt)} value={String(opt)}>
                        {String(opt) || "(empty)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </div>
      )}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center space-x-2">
                          {header.column.getCanSort() ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="-ml-3 h-8 data-[state=open]:bg-accent"
                              onClick={() => header.column.toggleSorting()}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              {header.column.getIsSorted() === "desc" && (
                                <ChevronDown className="ml-2 h-4 w-4" />
                              )}
                              {header.column.getIsSorted() === "asc" && (
                                <ChevronUp className="ml-2 h-4 w-4" />
                              )}
                              {header.column.getIsSorted() === false && (
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                              )}
                            </Button>
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <div>
            Showing {table.getFilteredRowModel().rows.length} of {data.length}{" "}
            row(s)
          </div>
          {enableRowSelection && (
            <div>
              Selected: {table.getFilteredSelectedRowModel().rows.length}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => setPageSize(Number(v))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((ps) => (
                  <SelectItem key={ps} value={String(ps)}>
                    {ps}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
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
