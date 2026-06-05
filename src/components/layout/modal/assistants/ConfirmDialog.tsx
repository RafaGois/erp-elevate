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
import useAppData from "@/data/hooks/useAppData";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { toast } from "sonner";

interface WithId {
  id: string;
}

type ConfirmDialogProps<T extends WithId> = BaseModalProps<T> & {
  title?: string;
  message?: string;

  remove: (uid: string) => Promise<void>;
  refetch: () => void;
};

export default function ConfirmDialog<T extends WithId>(
  props: ConfirmDialogProps<T>
) {
  const { setReloading } = useAppData();

  async function handleClick() {
    try {
      await props.remove(props?.selectedObject?.id ?? "");
      if (props.setAction) props.setAction(null);
      props.refetch();
      toast.success("Registro removido com sucesso.");
    } catch (err) {
      toast.error(err as string);
    } finally {
      setReloading?.(false);
    }
  }

  return (
    <AlertDialog
      open={!!props.action}
      onOpenChange={(isOpen: boolean) => {
        if (!isOpen) {
          if (props.setAction) props.setAction(null);
          if (props.setSelectedObject) props.setSelectedObject(null);
          setReloading?.(false);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title ?? "Tem certeza?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {props.message ??
              "Esta ação não pode ser desfeita. Isso excluirá permanentemente o registro, removendo-o dos servidores."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="elevate-dialog__footer-btn w-full sm:w-[8.75rem]">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            className="elevate-dialog__footer-btn w-full sm:w-[8.75rem]"
            onClick={handleClick}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
