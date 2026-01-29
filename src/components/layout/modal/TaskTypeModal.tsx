import Type from "@/lib/models/task/TaskType";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import axios from "axios";
import { toast } from "sonner";

type TaskTypeModalProps = BaseModalProps<Type>;

export default function TaskTypeModal(props: TaskTypeModalProps) {
  const form = useForm<Type>({
    defaultValues: {
      name: props.selectedObject?.name,
    },
  });

  async function handleSubmit(data: Partial<Type>) {
    try {
      if (props.selectedObject?.id) {
        await update(data);
        toast.success("Tipo de tarefa atualizado com sucesso.");
      } else {
        await create(data);
        toast.success("Tipo de tarefa criada com sucesso.");
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

  async function create(data: Partial<Type>) {    
    await axios.post("https://elevatepromedia.com/api/task-types", data);
  }

  async function update(data: Partial<Type>) {
    await axios.put(
      `https://elevatepromedia.com/api/task-types/${props.selectedObject?.id}`,
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
    <Modal<Type>
      title="Tipo de tarefa"
      description="Adicione um tipo de tarefa"
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
