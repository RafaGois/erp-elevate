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

export function DatePickerForm({ form, label }: { form: any; label: string }) {
  return (
    <FormField
      control={form.control}
      name="ranges"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field?.value?.start && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />

                  <>
                    {field?.value?.from
                      ? format(field?.value?.from, "dd/MM/yyyy")
                      : "Informe Inicio"}{" "}
                    {" - "}
                    {field?.value?.to
                      ? format(field?.value?.to, "dd/MM/yyyy")
                      : "Informe Fim"}
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
