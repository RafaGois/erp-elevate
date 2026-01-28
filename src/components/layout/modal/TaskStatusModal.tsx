import Status from "@/lib/models/task/Status";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import axios from "axios";
import { toast } from "sonner";
import SelectForm from "../components/inputs/SelectForm";

type TaskStatusModalProps = BaseModalProps<Status>;

export default function TaskStatusModal(props: TaskStatusModalProps) {
  const form = useForm<Status>({
    defaultValues: {
      name: props.selectedObject?.name,
      level: props.selectedObject?.level,
    },
  });

  async function handleSubmit(data: Partial<Status>) {
    data.level = Number(data.level);
    try {
      if (props.selectedObject?.id) {
        await update(data);
        toast.success("Status de tarefa atualizado com sucesso.");
      } else {
        await create(data);
        toast.success("Status de tarefa criada com sucesso.");
      }

      handleClose();
    } catch (error) {
      toast.error(
        error.response.data[0] ??
          error.message ??
          "Erro ao criar ou atualizar status de tarefa."
      );
    }
  }

  async function create(data: Partial<Status>) {    
    await axios.post("https://elevatepromedia.com/api/task-statuses", data);
  }

  async function update(data: Partial<Status>) {
    await axios.put(
      `https://elevatepromedia.com/api/task-statuses/${props.selectedObject?.id}`,
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
    <Modal<Status>
      title="Status de tarefa"
      description="Adicione um status de tarefa"
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
