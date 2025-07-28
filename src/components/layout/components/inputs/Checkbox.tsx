import { Label } from "@/components/ui/label";

interface CheckboxProps {
  id: string;
  name: string;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id={props.id} name={props.name} />
      <Label htmlFor={props.id}>{props.name}</Label>
    </div>
  );
}
