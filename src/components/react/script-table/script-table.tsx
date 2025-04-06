import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Script } from "@/types/script";
import { useState } from "react";
import { Input } from "../../ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Typography } from "../typography";

export const ScriptTable = ({ scripts }: { scripts: Script[] }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: scripts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "auto",
    state: {
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="space-y-4">
      <div className="relative flex items-center">
        <SearchIcon
          className={cn(
            "absolute left-3 h-4 w-4 shrink-0 opacity-50",
            globalFilter !== "" && "hidden",
          )}
        />
        <Input
          type="text"
          onChange={(event) => table.setGlobalFilter(String(event.target.value))}
          placeholder="Search by name, author"
          className="placeholder:pl-5"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
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
                onClick={() => {
                  window.location.href = `/scripts/${row.original.id}`;
                }}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <Typography variant="caption">No results.</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
