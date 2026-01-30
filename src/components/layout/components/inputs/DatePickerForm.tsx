"use client";

import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";

export function DatePickerForm({
  form,
  label,
}: {
  form: UseFormReturn;
  label?: string;
}) {
  return (
    <FormField
      control={form.control}
      name="ranges"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "min-w-0 max-w-full pl-3 text-left font-normal sm:w-[240px]",
                    !field?.value?.start && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />

                  <>
                    {field?.value?.from
                      ? format(field?.value?.from, "dd/MM/yyyy")
                      : "Início"}{" "}
                    {" - "}
                    {field?.value?.to
                      ? format(field?.value?.to, "dd/MM/yyyy")
                      : "Fim"}
                  </>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={field.value}
                onSelect={(e) => {
                  field.onChange({
                    from: e?.from,
                    to: e?.to,
                  });
                }}
                numberOfMonths={2}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
