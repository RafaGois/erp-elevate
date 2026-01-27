import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectedType } from "@/app/dashboard/finances/movimentations/page";

interface SelectProps {
  options: { id: string; name: string }[];
  placeholder: string;
  value: SelectedType;
  onChange: (value: SelectedType) => void;
}

export default function SelectComponent(props: SelectProps) {
  return (
    <Select value={props.value} onValueChange={props.onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
