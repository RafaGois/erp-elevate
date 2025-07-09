import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { toast } from "sonner"

interface WithUid {
  uid: string;
}

type ConfirmDialogProps<T extends WithUid> = BaseModalProps<T> & {
  title?: string;
  message?: string;

  remove: (uid: string) => Promise<void>;
  refetch: () => void;
};

export default function ConfirmDialog<T extends WithUid>(props: ConfirmDialogProps<T>) {
  async function handleClick() {
    
    try {
      await props.remove(props?.selectedObject?.uid ?? "");
      if (props.setAction) props.setAction(null);
      props.refetch();
      toast.success("Registro removido com sucesso.");
    } catch (err) {
      toast.error(err as string);
    }
  }

  return (
    <AlertDialog
      open={!!props.action}
      onOpenChange={(isOpen: boolean) => {
        if (!isOpen) {
          if (props.setAction) props.setAction(null);
          if (props.setSelectedObject) props.setSelectedObject(null);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title ?? "Tem certeza?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {props.message ??
              `Esta ação não pode ser desfeita. Isso excluirá permanentemente o
            registro, o removendo de nossos servidores.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-card">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClick}
            className="bg-destructive hover:bg-destructive/70 text-white"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
