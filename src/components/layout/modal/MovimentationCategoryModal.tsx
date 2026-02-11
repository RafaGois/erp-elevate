import Category from "@/lib/models/movimentations/Category";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import api from "@/lib/api";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import SelectForm from "../components/inputs/SelectForm";
import MovimentationType from "@/lib/models/movimentations/Type";

type CategoryModalProps = BaseModalProps<Category>;

export default function CategoryModal(props: CategoryModalProps) {
  const form = useForm<Category>({
    defaultValues: {
      name: props.selectedObject?.name,
      typeId: props.selectedObject?.typeId,
    },
  });

  async function handleSubmit(data: Partial<Category>) {
    try {
      if (props.selectedObject?.id) {
        await update(data);
        toast.success("Categoria de movimentação atualizada com sucesso.");
      } else {
        await create(data);
        toast.success("Categoria de movimentação criada com sucesso.");
      }

      handleClose();
    } catch (error) {
      toast.error(
        error.response.data[0] ??
          error.message ??
          "Erro ao criar ou atualizar categoria de movimentação."
      );
    }
  }

  async function create(data: Partial<Category>) {    
    await api.post("/movimentation-categories", data);
  }

  async function update(data: Partial<Category>) {
    await api.put(
      `/movimentation-categories/${props.selectedObject?.id}`,
      data
    );
  }

  async function handleClose() {
    if (props?.setAction) props.setAction(null);
    if (props?.setSelectedObject) props.setSelectedObject(null);
    form.reset();
    if (props?.refetch) props.refetch();
  }

  const { data: types } = useQuery<MovimentationType[]>({
    queryKey: ["data_movimentation_types"],
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await api.get("/movimentation-types");
      return res.data;
    },
  });

  return (
    <Modal<Category>
      title="Categoria de movimentação"
      description="Adicione uma categoria de movimentação"
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
          <SelectForm
            name="typeId"
            label="Tipo"
            options={types}
            required
            form={form}
          />
        </form>
      </Form>
    </Modal>
  );
}
