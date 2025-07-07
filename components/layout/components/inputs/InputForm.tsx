import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/templates/ui/form";
import { Input } from "@/templates/ui/input";
import { UseFormReturn } from "react-hook-form";

interface InputFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  defaultValue?: string | number;

  required?: boolean;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  className?: string;

  disabled?: boolean;
}

export default function InputForm(props: InputFormProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      
      rules={{
        required: props?.required ? "Campo obrigatório" : false,
      }}
      render={({ field }) => (
        <FormItem className={cn("space-y-0 flex-1", props.className)}>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input
              disabled={props?.disabled}
              className="[&:-webkit-autofill]:text-black [&:-webkit-autofill]:bg-foreground"
              placeholder={props.placeholder}
              required={props?.required}
              defaultValue={props?.defaultValue}
              type={props.type}
              {...props.form.register(field.name, {
                valueAsNumber: props.type == "number",
              })}
            />
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
