import InventoryItem from "@/lib/models/InventoryItem";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";

type InventoryItemModalProps = BaseModalProps<InventoryItem>;


export default function InventoryItemModal(props: InventoryItemModalProps) {
    const form = useForm<InventoryItem>();
  
  
    return (
    <Modal<InventoryItem>
        title="Item de inventário"
        description="Adicione um item de inventário"
        action={props.action ?? null}
        setAction={props.setAction ?? (() => {})}
        selectedObject={props.selectedObject ?? null}
        setSelectedObject={props.setSelectedObject ?? (() => {})}
        refetch={props.refetch}
        form={form}
      onSubmit={form.handleSubmit((data) => console.log(data))}
        >

    </Modal>
  )
}

