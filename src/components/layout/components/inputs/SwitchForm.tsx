import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
} from "@/components/ui/field";

interface SwitchFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label: string;
  description?: string;
  id?: string;
}

export default function SwitchForm(props: SwitchFormProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <Field orientation="horizontal" className="max-w-sm">
            <FieldContent>
              <FormLabel>{props.label}</FormLabel>
              {props.description && (
                <FieldDescription>{props.description}</FieldDescription>
              )}
            </FieldContent>
            <FormControl>
              <Switch
                id={props.id || props.name}
                checked={field.value ?? false}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
            </FormControl>
          </Field>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}