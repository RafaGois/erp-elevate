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

import Project from "@/lib/models/Project";
import {
  TASK_PRIORITIES_OPTIONS,
  TaskPriorities,
} from "@/lib/enums/TaskPriorities";

import { TASK_STATUS_OPTIONS, TaskStatus } from "@/lib/enums/TaskStatus";
import TextAreaForm from "../components/inputs/TextareaForm";

type TaskModalProps = BaseModalProps<Task>;

export default function TaskModal(props: TaskModalProps) {
  const form = useForm<Task>({
    defaultValues: {
      name: props.selectedObject?.name,
      description: props.selectedObject?.description,
      responsibleId: props.selectedObject?.responsibleId,
      Priority:
        (props.selectedObject?.Priority as TaskPriorities) ??
        TaskPriorities.BAIXA,
      Status:
        (props.selectedObject?.Status as TaskStatus) ?? TaskStatus.PENDENTE,
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
        if(data.deadline) {
          data.deadline = new Date(data.deadline + "T00:00:00");
        }
        data.Status = TaskStatus.PENDENTE;

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
    const payload: Record<string, unknown> = {};
    if (data.name != null && String(data.name).trim() !== "")
      payload.name = data.name;
    if (data.description != null && String(data.description).trim() !== "")
      payload.description = data.description;
    if (data.Status != null && String(data.Status).trim() !== "")
      payload.Status = data.Status;
    if (data.Priority != null && String(data.Priority).trim() !== "")
      payload.Priority = data.Priority;
    if (data.responsibleId != null && String(data.responsibleId).trim() !== "")
      payload.responsibleId = data.responsibleId;
    if (data.projectId != null && String(data.projectId).trim() !== "")
      payload.projectId = data.projectId;
    const rawDeadline = data.deadline;
    if (rawDeadline != null && String(rawDeadline).trim() !== "") {
      payload.deadline =
        rawDeadline instanceof Date
          ? rawDeadline.toISOString()
          : new Date(rawDeadline).toISOString();
    }
    await api.put(`/tasks/${props.selectedObject?.id}`, payload);
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
        <form className="flex flex-col gap-4 py-2">
          <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[min(60vh,28rem)] scrollbar-hide py-2">
            <InputForm
              name="name"
              label="Nome"
              placeholder="Nome"
              type="text"
              required
              form={form}
            />
            <TextAreaForm
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
              {props.selectedObject?.id && (
                <SelectForm
                  name="Status"
                  label="Status"
                  options={[...TASK_STATUS_OPTIONS]}
                  form={form}
                />
              )}
              <SelectForm
                name="Priority"
                label="Prioridade"
                options={[...TASK_PRIORITIES_OPTIONS]}
                form={form}
              />
            </div>
            <SelectForm
              name="projectId"
              label="Projeto"
              options={projects ?? []}
              form={form}
            />
            <InputForm
              name="deadline"
              label="Prazo"
              placeholder="Prazo"
              type="date"
              form={form}
            />
          </div>
        </form>
      </Form>
    </Modal>
  );
}
