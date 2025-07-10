import {Equipament} from "@/lib/models";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import axios from "axios";
import { toast } from "sonner";

type EquipamentModalProps = BaseModalProps<Equipament>;

export default function EquipamentModal(props: EquipamentModalProps) {
  const form = useForm<Equipament>({
    defaultValues: {
      name: props.selectedObject?.name,
      price: props.selectedObject?.price,
      purchaseDate: props.selectedObject?.purchaseDate,
    },
  });

  async function handleSubmit(data: Partial<Equipament>) {
    try {
      if (props.selectedObject?.uid) {
        await update(data);
        toast.success("Equipamento atualizado com sucesso.");
      } else {
        await create(data);
        toast.success("Equipamento criado com sucesso.");
      }

      handleClose();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao criar ou atualizar equipamento."
      );
    }
  }

  async function create(data: Partial<Equipament>) {
    await axios.post("/api/equipaments", data);
  }

  async function update(data: Partial<Equipament>) {
    await axios.put(`/api/equipaments/${props.selectedObject?.uid}`, data);
  }

  async function handleClose() {
    if (props?.setAction) props.setAction(null);
    if (props?.setSelectedObject) props.setSelectedObject(null);
    form.reset();
    if (props?.refetch) props.refetch();
  }

  return (
    <Modal<Equipament>
      title="Equipamento"
      description="Adicione um equipamento"
      action={props.action}
      setAction={props.setAction}
      setSelectedObject={props.setSelectedObject}
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
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
