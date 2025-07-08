import Equipament from "@/lib/models/equipament";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";

type EquipamentModalProps = BaseModalProps<Equipament>;

export default function EquipamentModal(props: EquipamentModalProps) {
  const form = useForm<Equipament>({
    defaultValues: {
      name: props.selectedObject?.name,
      price: props.selectedObject?.price,
      purchaseDate: props.selectedObject?.purchaseDate,
    }
  });

  return (
    <Modal<Equipament>
      title="Equipamento"
      description="Adicione um equipamento"
      action={props.action}
      setAction={props.setAction}
      setSelectedObject={props.setSelectedObject}
      form={form}
      onSubmit={form.handleSubmit((data) => console.log(data))}
    >
      <Form {...form}>
        <form className="py-6">
          <InputForm
            name="name"
            label="Nome"
            placeholder="Nome"
            type="text"
            required
            form={form}
           
          />
          <InputForm
            name="price"
            label="Preço"
            placeholder="Preço"
            type="number"
            required
            form={form}
            
          />
          <InputForm
            name="purchaseDate"
            label="Data de compra"
            placeholder="Data de compra"
            type="date"
            required
            form={form}
          />
        </form>
      </Form>
    </Modal>
  );
}
