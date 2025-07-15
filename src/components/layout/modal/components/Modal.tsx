import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAppData from "@/data/hooks/useAppData";
import ModalAction from "@/lib/enums/modalAction";

interface ModalProps<T> {
  action?: ModalAction;
  setAction?: (newAction: ModalAction | null) => void;

  setSelectedObject?: (newSelectedObject: T | null) => void;

  title: string;
  description: string;

  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (event: any) => void;
}

export default function Modal<T>(props: ModalProps<T>) {
  const { reloading, setReloading } = useAppData();

  function handleClose() {
    props.form?.reset();
    if (props.setAction) props.setAction(null);
    if (props.setSelectedObject) props.setSelectedObject(null);
  }

  return (
    <Dialog
      open={!!props?.action}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
        setReloading?.(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {props.children}
        <DialogFooter>
          <Button
            disabled={reloading}
            className="bg-card"
            variant="outline"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button disabled={reloading} onClick={props.onSubmit}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
