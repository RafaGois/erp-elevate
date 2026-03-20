"use client";

import type { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import { DatePickerForm } from "../inputs/DatePickerForm";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SelectForm from "../inputs/SelectForm";
import { EyeOff, SlidersHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setAction?: (newAction: ModalAction) => void;

  form?: UseFormReturn;
  options?: { id: string; name: string }[];
  statusFilterOptions?: { id: string; name: string }[];
  hiddenStatusIds?: string[];
  onToggleStatusFilter?: (statusId: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  setAction,
  form,
  options,
  statusFilterOptions,
  hiddenStatusIds = [],
  onToggleStatusFilter,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col md:flex-row md:justify-evenly gap-3 py-4 w-full ">
      <div className="flex flex-1 flex-wrap items-center gap-2 w-full md:w-auto">
        <Input
          placeholder="Filtro..."
          onChange={(event) => {
            return table.setGlobalFilter(event.target.value);
          }}
          className="h-8 min-w-0 flex-1 basis-24 sm:basis-[150px] sm:flex-initial lg:w-[250px]"
        />
        {form && (
          <Form {...form}>
            <form
              className="flex min-w-0 flex-wrap items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <DatePickerForm form={form} />
              {options && (
                <SelectForm
                  form={form}
                  name="select"
                  options={options ?? []}
                />
              )}
              {statusFilterOptions && onToggleStatusFilter && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" size="sm" className="gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Status
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-64 p-3">
                    <p className="mb-2 text-sm font-medium">Filtrar status</p>
                    <div className="space-y-1.5">
                      {statusFilterOptions.map((status) => {
                        const isVisible = !hiddenStatusIds.includes(status.id);
                        return (
                          <button
                            key={status.id}
                            type="button"
                            onClick={() => onToggleStatusFilter(status.id)}
                            className="hover:bg-muted flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm"
                          >
                            <span>{status.name}</span>
                            {!isVisible ? (
                              <EyeOff className="text-muted-foreground h-4 w-4" />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              <Button type="button" variant="outline" size="sm" className=" w-full md:w-auto" onClick={() => form.reset()}>
                Limpar
              </Button>
            </form>
          </Form>
        )}
      </div>
      <div className="w-full md:w-auto">
        <Button className="w-full md:w-auto" onClick={() => setAction?.(ModalAction.Create)}>Novo</Button>
      </div>
    </div>
  );
}
