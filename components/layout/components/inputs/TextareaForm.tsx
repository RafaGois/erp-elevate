import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface TextareaFormProps {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  defaultValue?: string;

  required?: boolean;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  className?: string;
}

export default function TextAreaForm(props: TextareaFormProps) {
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
