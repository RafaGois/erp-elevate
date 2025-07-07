import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/hooks/use-toast";

import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { Copy, Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import ModalAction from "@/lib/enums/modalAction";

interface WithId {
  id: string;
}

interface FloatingMenuProps<T> {
  selectedObject: T;
  setSelectedObject: (newSelectedObject: T) => void;
  setAction: (newAction: ModalAction) => void;
}

export default function FloatingMenu<T extends WithId>(
  props: FloatingMenuProps<T>
) {
  const { toast } = useToast();

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
            navigator.clipboard.writeText(props.selectedObject.id + "");
            toast({
              title: `ID ${props.selectedObject.id} copiado com sucesso.`,
            });
          }}
        >
          <Copy />
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
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
