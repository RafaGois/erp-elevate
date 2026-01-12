import { EquipamentCategory } from "@/lib/models/EquipamentCategory";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import axios from "axios";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import SelectForm from "../components/inputs/SelectForm";

type EquipamentCategoryModalProps = BaseModalProps<EquipamentCategory>;

export default function EquipamentCategoryModal(props: EquipamentCategoryModalProps) {
  const form = useForm<EquipamentCategory>({
    defaultValues: {
      name: props.selectedObject?.name,
    },
  });

  async function handleSubmit(data: Partial<EquipamentCategory>) {
    try {
      if (props.selectedObject?.id) {
        await update(data);
        toast.success("Categoria de equipamento atualizada com sucesso.");
      } else {
        await create(data);
        toast.success("Categoria de equipamento criada com sucesso.");
      }

      handleClose();
    } catch (error) {
      toast.error(
        error.response.data[0] ??
          error.message ??
          "Erro ao criar ou atualizar equipamento."
      );
    }
  }

  async function create(data: Partial<EquipamentCategory>) {
    await axios.post("https://elevatepromedia.com/api/equipament-categories", data);
  }

  async function update(data: Partial<EquipamentCategory>) {
    await axios.put(
      `https://elevatepromedia.com/api/equipament-categories/${props.selectedObject?.id}`,
      data
    );
  }

  async function handleClose() {
    if (props?.setAction) props.setAction(null);
    if (props?.setSelectedObject) props.setSelectedObject(null);
    form.reset();
    if (props?.refetch) props.refetch();
  }

  return (
    <Modal<EquipamentCategory>
      title="Categoria de equipamento"
      description="Adicione uma categoria de equipamento"
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
        </form>
      </Form>
    </Modal>
  );
}
