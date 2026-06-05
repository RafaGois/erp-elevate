import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAppData from "@/hooks/use-app-data";
import ModalAction from "@/types/enums/modalAction";
import DialogFormActions from "./DialogFormActions";

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
    setReloading?.(false);
    if (props.setAction) props.setAction(null);
    if (props.setSelectedObject) props.setSelectedObject(null);
  }

  return (
    <Dialog
     
      open={!!props?.action}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
        if (!isOpen) setReloading?.(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        
        <div className="elevate-dialog__scroll max-h-[calc(100vh-20rem)] scrollbar-hide">
          {props.children}
        </div>
        <DialogFooter>
          <DialogFormActions
            loading={reloading}
            onCancel={handleClose}
            onSubmit={props.onSubmit}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
