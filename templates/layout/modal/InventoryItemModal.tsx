import InventoryItem from "@/lib/models/InventoryItem";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import InputForm from "../components/inputs/InputForm";

type InventoryItemModalProps = BaseModalProps<InventoryItem>;

export default function InventoryItemModal(props: InventoryItemModalProps) {
  const form = useForm<InventoryItem>();

  return (
    <Modal<InventoryItem>
      title="Item de inventário"
      description="Adicione um item de inventário"
      action={props.action}
      setAction={props.setAction}
      setSelectedObject={props.setSelectedObject}
      form={form}
      onSubmit={form.handleSubmit((data) => console.log(data))}
    >
        <InputForm
            name="name"
            label="Nome"
            placeholder="Nome do item"
            type="text"
            required
            form={form}
        />
        
    </Modal>
  );
}
