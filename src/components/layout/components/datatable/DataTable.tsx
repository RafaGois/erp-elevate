"use client";

import type { ReactNode } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import { DataTableToolbar } from "./DataTableToolbar";
import { DataTablePagination } from "./DataTablePagination";
import ModalAction from "@/lib/enums/modalAction";
import { UseFormReturn } from "react-hook-form";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setAction?: (newAction: ModalAction) => void;
  /** Conteúdo opcional antes do campo de busca (ex.: filtros específicos da rota). */
  toolbarStart?: ReactNode;
  form?: UseFormReturn<any>;
  options?: { id: string; name: string }[];
  statusFilterOptions?: { id: string; name: string }[];
  hiddenStatusIds?: string[];
  onToggleStatusFilter?: (statusId: string) => void;
  responsibleFilterOptions?: { id: string; name: string }[];
  hiddenResponsibleIds?: string[];
  onToggleResponsibleFilter?: (responsibleId: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setAction,
  toolbarStart,
  form,
  options,
  statusFilterOptions,
  hiddenStatusIds,
  onToggleStatusFilter,
  responsibleFilterOptions,
  hiddenResponsibleIds,
  onToggleResponsibleFilter,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div>
      <DataTableToolbar
        table={table}
        setAction={setAction}
        toolbarStart={toolbarStart}
        form={form}
        options={options}
        statusFilterOptions={statusFilterOptions}
        hiddenStatusIds={hiddenStatusIds}
        onToggleStatusFilter={onToggleStatusFilter}
        responsibleFilterOptions={responsibleFilterOptions}
        hiddenResponsibleIds={hiddenResponsibleIds}
        onToggleResponsibleFilter={onToggleResponsibleFilter}
      />
      <div className="rounded border">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                  Nenhum Resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
