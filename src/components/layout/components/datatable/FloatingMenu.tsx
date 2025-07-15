import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { CheckCheck, Copy, Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import ModalAction from "@/lib/enums/modalAction";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Equipament } from "@/lib/models/Equipament";

interface WithId {
  uid: string;
  equipaments?: Equipament[];
}

interface FloatingMenuProps<T> {
  selectedObject: T;
  setSelectedObject: (newSelectedObject: T) => void;
  setAction: (newAction: ModalAction) => void;
}

export default function FloatingMenu<T extends WithId>(
  props: FloatingMenuProps<T>
) {
  const hasEquipaments = props.selectedObject?.equipaments?.length ?? 0;

  console.log(props.selectedObject);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(props.selectedObject.uid + "");
            toast.success(
              `ID ${props.selectedObject.uid} copiado com sucesso.`
            );
          }}
        >
          <Copy />
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={cn(hasEquipaments < 1 && "hidden")}
          onClick={() => {
            props.setSelectedObject(props.selectedObject);
            props.setAction(ModalAction.Finish);
          }}
        >
          <CheckCheck strokeWidth={3} />
          <DropdownMenuLabel>Finalizar</DropdownMenuLabel>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            props.setSelectedObject(props.selectedObject);
            props.setAction(ModalAction.Update);
          }}
        >
          <Edit2 />
          <DropdownMenuLabel>Editar</DropdownMenuLabel>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            props.setSelectedObject(props.selectedObject);
            props.setAction(ModalAction.Delete);
          }}
        >
          <Trash2 />
          <DropdownMenuLabel>Excluir</DropdownMenuLabel>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
