"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";

/** Clique veio de controle interativo — não abrir modal de edição na linha. */
function isInteractiveTableCellTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      [
        "button",
        "a[href]",
        "input",
        "select",
        "textarea",
        "label",
        '[role="button"]',
        '[role="combobox"]',
        '[role="menuitem"]',
        '[role="menuitemcheckbox"]',
        '[role="switch"]',
        "[data-table-row-click-ignore]",
      ].join(", "),
    ),
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setAction?: (newAction: ModalAction) => void;
  /** Com `setAction`, em telas estreitas (&lt; md) o toque na linha abre o modal de edição. */
  setSelectedObject?: (row: NoInfer<TData>) => void;
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
  setSelectedObject,
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
  const [narrowScreen, setNarrowScreen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setNarrowScreen(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const rowTapOpensEdit =
    narrowScreen && Boolean(setAction) && Boolean(setSelectedObject);

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
                  className={cn(rowTapOpensEdit && "cursor-pointer md:cursor-default")}
                  onClick={(event) => {
                    if (!rowTapOpensEdit || !setAction || !setSelectedObject) return;
                    if (isInteractiveTableCellTarget(event.target)) return;
                    const original = row.original as { id?: unknown };
                    const id = original?.id;
                    if (id === undefined || id === null || String(id).trim() === "") return;
                    setSelectedObject(row.original);
                    setAction(ModalAction.Update);
                  }}
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
