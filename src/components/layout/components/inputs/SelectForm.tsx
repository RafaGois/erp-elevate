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
import {
  RetroSelect,
  type RetroSelectLayout,
  type RetroSelectOption,
} from "@/components/ui/retro-select";
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
  /** @deprecated Prefer `appearance="retro"` */
  triggerVariant?: "modern" | "retro";
  appearance?: "modern" | "retro";
  triggerSize?: "sm" | "default";
  layout?: RetroSelectLayout;
}

export default function SelectForm(props: SelectFormProps) {
  const appearance =
    props.appearance ?? props.triggerVariant ?? "modern";

  function buildOptions(): RetroSelectOption[] {
    const sorted = [...(props.options ?? [])].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    const items: RetroSelectOption[] = sorted.map((o) => ({
      value: String(o.id),
      label: o.name,
    }));
    if (props.allOptions) {
      items.push({ value: "999", label: "Todos" });
    }
    return items;
  }

  return (
    <FormField
      key={props?.key}
      control={props.form.control}
      name={props.name}
      rules={{
        required: props?.required ? "Campo obrigatório" : false,
      }}
      render={({ field }) => {
        const value =
          field.value === null ||
          field.value === undefined ||
          field.value === ""
            ? undefined
            : String(field.value);

        const placeholder = props.isLoading
          ? "Carregando..."
          : "Informe uma opção";

        const onValueChange = (next: string) => {
          field.onChange(next);
          props?.setValue?.(next);
        };

        const disabled = props.disabled || props.isLoading;

        return (
          <FormItem
            key={props.key}
            className={cn("flex w-full min-w-0 flex-1 flex-col", props.className)}
          >
            {props.label && <FormLabel>{props.label}</FormLabel>}
            {appearance === "retro" ? (
              <FormControl className="w-full">
                <RetroSelect
                  key={props?.key}
                  layout={props.layout ?? "default"}
                  size={props.triggerSize ?? "default"}
                  disabled={disabled}
                  value={value}
                  onValueChange={onValueChange}
                  placeholder={placeholder}
                  triggerClassName="w-full min-w-0"
                  contentClassName="fixed z-50"
                  options={buildOptions()}
                />
              </FormControl>
            ) : (
              <Select
                key={props?.key}
                disabled={disabled}
                value={value}
                onValueChange={onValueChange}
              >
                <FormControl className="w-full">
                  <SelectTrigger
                    className="w-full min-w-0"
                    size={props.triggerSize ?? "default"}
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="fixed z-50">
                  <SelectGroup>{buildOptions().map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}</SelectGroup>
                </SelectContent>
              </Select>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
