"use client";

import type { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import { DatePickerForm } from "../inputs/DatePickerForm";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SelectForm from "../inputs/SelectForm";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setAction?: (newAction: ModalAction) => void;

  form?: UseFormReturn;
  options?: { id: string; name: string }[]
}

export function DataTableToolbar<TData>({
  table,
  setAction,
  form,
  options,
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
