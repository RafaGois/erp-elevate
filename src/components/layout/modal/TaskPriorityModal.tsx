import Priority from "@/lib/models/task/Priority";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import api from "@/lib/api";
import { toast } from "sonner";
import SelectForm from "../components/inputs/SelectForm";

type TaskPriorityModalProps = BaseModalProps<Priority>;

export default function TaskPriorityModal(props: TaskPriorityModalProps) {
  const form = useForm<Priority>({
    defaultValues: {
      name: props.selectedObject?.name,
      level: props.selectedObject?.level,
    },
  });

  async function handleSubmit(data: Partial<Priority>) {
    data.level = Number(data.level);
    try {
      if (props.selectedObject?.id) {
        await update(data);
        toast.success("Prioridade de tarefa atualizada com sucesso.");
      } else {
        await create(data);
        toast.success("Prioridade de tarefa criada com sucesso.");
      }

      handleClose();
    } catch (error) {
      toast.error(
        error.response.data[0] ??
          error.message ??
          "Erro ao criar ou atualizar prioridade de tarefa."
      );
    }
  }

  async function create(data: Partial<Priority>) {    
    await api.post("/task-priorities", data);
  }

  async function update(data: Partial<Priority>) {
    await api.put(
      `/task-priorities/${props.selectedObject?.id}`,
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
    <Modal<Priority>
      title="Prioridade de tarefa"
      description="Adicione uma prioridade de tarefa"
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
            name="level"
            label="Nível"
            options={[{ id: "1", name: "Baixa" }, { id: "2", name: "Média" }, { id: "3", name: "Alta" }]}
            required
            form={form}
          />
        </form>
      </Form>
    </Modal>
  );
}
