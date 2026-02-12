import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

interface SelectFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label?: string;

  options: { id: string; name: string }[];

  required?: boolean;
  className?: string;
  setValue?: (v: string) => void;
  disabled?: boolean;
  allOptions?: boolean;

  key?: number;
  isLoading?: boolean;
}

export default function SelectForm(props: SelectFormProps) {
  function listOptions() {
    return props?.options
      ?.sort((a, b) => a.name.localeCompare(b.name))
      ?.map((o: { id: string; name: string }) => {
        return (
          <SelectItem key={o.id + "-" + o.name} value={o.id + ""}>
            {o.name}
          </SelectItem>
        );
      });
  }

  return (
    <FormField
      key={props?.key}
      control={props.form.control}
      name={props.name}
      rules={{
        required: props?.required ? "Campo obrigatório" : false,
      }}
      render={({ field }) => (
        <FormItem key={props.key} className={cn("flex-1 min-w-0", props.className)}>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <Select
            key={props?.key}
            disabled={props.disabled || props.isLoading}
            value={
              field.value === null || field.value === undefined || field.value === ""
                ? undefined
                : String(field.value)
            }
            onValueChange={(e) => {
              field.onChange(e);
              props?.setValue?.(e);
            }}
          >
            <FormControl className="w-full">
              <SelectTrigger className="w-full min-w-0">
                <SelectValue
                  placeholder={
                    props.isLoading ? "Carregando..." : "Informe uma opção"
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="fixed z-50">
              <SelectGroup>
                {listOptions()}
                {props.allOptions && (
                  <SelectItem key={999} value={"999"}>
                    Todos
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
