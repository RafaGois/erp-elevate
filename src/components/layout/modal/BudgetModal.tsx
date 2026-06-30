"use client";

import Budget from "@/types/models/Budget";
import BudgetType from "@/types/enums/BudgetType";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/types/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import SelectForm from "../components/inputs/SelectForm";
import TextAreaForm from "../components/inputs/TextareaForm";
import api from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";

type BudgetModalProps = BaseModalProps<Budget>;

export default function BudgetModal(props: BudgetModalProps) {
  const budgetId = props.selectedObject?.id;

  const form = useForm<Budget>({
    defaultValues: {
      name: props.selectedObject?.name ?? "",
      slug: props.selectedObject?.slug ?? "",
      description: props.selectedObject?.description ?? "",
      value: props.selectedObject?.value ?? 0,
      type: props.selectedObject?.type ?? BudgetType.SOFTWARE,
      client: props.selectedObject?.client ?? "",
      project: props.selectedObject?.project ?? "",
    },
  });

  async function handleSubmit(data: Partial<Budget>) {
    try {
      if (budgetId) {
        await update(data);
        toast.success("Orçamento atualizado com sucesso.");
      } else {
        await create(data);
        toast.success("Orçamento criado com sucesso.");
      }
      handleClose();
    } catch (error) {
      toast.error(getErrorMessage(error, "Erro ao criar ou atualizar orçamento."));
    }
  }

  function buildSlug(value: string | null | undefined): string {
    return (value ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function create(data: Partial<Budget>) {
    const clientSlug = buildSlug(data.client);
    const projectSlug = buildSlug(data.project);
    data.slug = `${clientSlug}-${projectSlug}-${Date.now()}`;
    await api.post<Budget>("/budgets", data);
  }

  async function update(data: Partial<Budget>) {
    await api.put(`/budgets/${budgetId}`, data);
  }

  async function handleClose() {
    if (props?.setAction) props.setAction(null);
    if (props?.setSelectedObject) props.setSelectedObject(null);
    form.reset();
    if (props?.refetch) props.refetch();
  }

  return (
    <Modal<Budget>
      title="Orçamento"
      description="Adicione ou edite um orçamento"
      action={props.action}
      setAction={props.setAction}
      setSelectedObject={props.setSelectedObject}
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Form {...form}>
        <form className="py-6 space-y-4">
          <InputForm
            name="name"
            label="Nome"
            placeholder="Nome do orçamento"
            type="text"
            required
            form={form}
          />
          <SelectForm
            name="type"
            label="Tipo de orçamento"
            options={[
              { id: BudgetType.SOFTWARE, name: "Software" },
              { id: BudgetType.AUDIOVISUAL, name: "Audiovisual" },
            ]}
            form={form}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <InputForm
              name="client"
              label="Cliente"
              placeholder="Nome do cliente"
              type="text"
              required
              form={form}
            />
            <InputForm
              name="project"
              label="Projeto"
              placeholder="Nome do projeto"
              type="text"
              required
              form={form}
            />
          </div>
          <TextAreaForm
            name="description"
            label="Descrição"
            placeholder="Descrição (opcional)"
            type="text"
            form={form}
          />
          <InputForm
            name="value"
            label="Valor"
            placeholder="0,00"
            type="number"
            required
            form={form}
          />
        </form>
      </Form>
    </Modal>
  );
}
