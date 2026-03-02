import Category from "@/lib/models/movimentations/Category";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import api from "@/lib/api";
import { toast } from "sonner";
import SelectForm from "../components/inputs/SelectForm";
import MovimentationType from "@/lib/enums/MovimentationType";
import { useEffect } from "react";

const MOVIMENTATION_TYPE_OPTIONS = [
  { id: MovimentationType.ENTRADA, name: "Entrada" },
  { id: MovimentationType.SAIDA, name: "Saída" },
] as const;

type CategoryFormData = Partial<Pick<Category, "name" | "Type">>;
type CategoryModalProps = BaseModalProps<Category>;

export default function CategoryModal(props: CategoryModalProps) {
  const form = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
      Type: MovimentationType.ENTRADA,
    },
  });

  useEffect(() => {
    if (props.action && props.selectedObject) {
      form.reset({
        name: props.selectedObject.name ?? "",
        Type: (props.selectedObject.Type as MovimentationType) ?? MovimentationType.ENTRADA,
      });
    } else if (props.action && !props.selectedObject) {
      form.reset({ name: "", Type: MovimentationType.ENTRADA });
    }
  }, [props.action, props.selectedObject, form]);

  async function handleSubmit(data: CategoryFormData) {
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

  async function create(data: CategoryFormData) {
    await api.post("/movimentation-categories", data);
  }

  async function update(data: CategoryFormData) {
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
            name="Type"
            label="Tipo"
            options={[...MOVIMENTATION_TYPE_OPTIONS]}
            required
            form={form}
          />
        </form>
      </Form>
    </Modal>
  );
}
