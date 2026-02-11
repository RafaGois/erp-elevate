import Task from "@/lib/models/task/Task";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import api from "@/lib/api";
import { toast } from "sonner";
import SelectForm from "../components/inputs/SelectForm";
import User from "@/lib/models/User";
import { useQuery } from "@tanstack/react-query";
import Status from "@/lib/models/task/Status";
import Priority from "@/lib/models/task/Priority";
import Type from "@/lib/models/task/TaskType";
import Project from "@/lib/models/Project";

type TaskModalProps = BaseModalProps<Task>;

export default function TaskModal(props: TaskModalProps) {
  const form = useForm<Task>({
    defaultValues: {
      name: props.selectedObject?.name,
      description: props.selectedObject?.description,
      responsibleId: props.selectedObject?.responsibleId,
      statusId: props.selectedObject?.statusId,
      priorityId: props.selectedObject?.priorityId,
      typeId: props.selectedObject?.typeId,
      projectId: props.selectedObject?.projectId,
      deadline: props.selectedObject?.deadline,
    },
  });

  async function handleSubmit(data: Partial<Task>) {
    try {
      if (props.selectedObject?.id) {
        await update(data);
        toast.success("Tarefa atualizada com sucesso.");
      } else {
        data.deadline = new Date(data.deadline + "T00:00:00");
        data.statusId = "c78c04cb-6139-422b-a60f-83a86a92dec9";
        await create(data);
        toast.success("Tarefa criada com sucesso.");
      }

      handleClose();
    } catch (error) {
      toast.error(
        error.response.data[0] ??
          error.message ??
          "Erro ao criar ou atualizar tarefa.",
      );
    }
  }

  async function create(data: Partial<Task>) {
    await api.post("/tasks", data);
  }

  async function update(data: Partial<Task>) {
    await api.put(
      `/tasks/${props.selectedObject?.id}`,
      data,
    );
  }

  async function handleClose() {
    if (props?.setAction) props.setAction(null);
    if (props?.setSelectedObject) props.setSelectedObject(null);
    form.reset();
    if (props?.refetch) props.refetch();
  }

  const { data: users } = useQuery<User[]>({
    queryKey: ["data_users"],
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get(`/users`);
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  const { data: statuses } = useQuery<Status[]>({
    queryKey: ["data_task_statuses"],
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get(
          `/task-statuses`,
        );
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  const { data: priorities } = useQuery<Priority[]>({
    queryKey: ["data_task_priorities"],
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get(
          `/task-priorities`,
        );
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  const { data: types } = useQuery<Type[]>({
    queryKey: ["data_task_types"],
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get(
          `/task-types`,
        );
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  const { data: projects } = useQuery<Project[]>({
    queryKey: ["data_projects"],
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get(`/projects`);
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  return (
    <Modal<Task>
      title="Tarefa"
      description="Adicione uma tarefa"
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
            name="description"
            label="Descrição"
            placeholder="Descrição"
            type="text"
            form={form}
          />
          <SelectForm
            name="responsibleId"
            label="Responsável"
            options={users ?? []}
            required
            form={form}
          />
          <div className="flex flex-row gap-2 mt-2">
            {props.selectedObject?.id && (
            <SelectForm
              name="statusId"
              label="Status"
              options={statuses ?? []}
              form={form}
            />
            )}
            <SelectForm
              name="priorityId"
              label="Prioridade"
              options={priorities ?? []}
              required
              form={form}
            />
          </div>
          <div className="flex flex-row gap-2 mt-2">
            <SelectForm
              name="typeId"
              label="Tipo"
              options={types ?? []}
              required
              form={form}
            />
            <SelectForm
              name="projectId"
              label="Projeto"
              options={projects ?? []}
              
              form={form}
            />
          </div>
          <InputForm
            name="deadline"
            label="Prazo"
            placeholder="Prazo"
            type="date"
            required
            form={form}
            className="mt-2"
          />
        </form>
      </Form>
    </Modal>
  );
}
