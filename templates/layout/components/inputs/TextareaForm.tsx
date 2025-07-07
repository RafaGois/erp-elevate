"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/templates/ui/form";
import { Textarea } from "@/templates/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface TextareaFormProps {
  form: UseFormReturn;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  defaultValue?: string;

  required?: boolean;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  className?: string;
}

export function TextareaForm(props: TextareaFormProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={props?.placeholder}
              className="resize-none"
              rows={6}
              defaultValue={props.defaultValue}
              {...field}
            />
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
