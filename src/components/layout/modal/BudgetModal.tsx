"use client";

import Budget from "@/lib/models/Budget";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import TextAreaForm from "../components/inputs/TextareaForm";
import api from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";
import {
  FileAttachmentsPanel,
  FILE_ATTACHMENTS_CONFIG,
} from "./components/FileAttachmentsPanel";

type BudgetModalProps = BaseModalProps<Budget>;

export default function BudgetModal(props: BudgetModalProps) {
  const budgetId = props.selectedObject?.id;
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const form = useForm<Budget>({
    defaultValues: {
      name: props.selectedObject?.name ?? "",
      slug: props.selectedObject?.slug ?? "",
      description: props.selectedObject?.description ?? "",
      value: props.selectedObject?.value ?? 0,
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
    } catch (error: unknown) {
      const err = error as { response?: { data?: string | string[] }; message?: string };
      toast.error(
        (Array.isArray(err.response?.data) ? err.response?.data[0] : err.response?.data) ??
          err.message ??
          "Erro ao criar ou atualizar orçamento."
      );
    }
  }

  async function create(data: Partial<Budget>) {
    const res = await api.post<Budget>("/budgets", data);
    const newId = res.data.id;
    const config = FILE_ATTACHMENTS_CONFIG.budget;
    if (pendingFiles.length > 0) {
      for (const file of pendingFiles) {
        const formData = new FormData();
        formData.append("file", file);
        Object.entries(config.getUploadExtraFields(newId)).forEach(
          ([k, v]) => formData.append(k, v)
        );
        await api.post("/files", formData);
      }
    }
  }

  async function update(data: Partial<Budget>) {
    await api.put(`/budgets/${budgetId}`, data);
  }

  async function handleClose() {
    if (props?.setAction) props.setAction(null);
    if (props?.setSelectedObject) props.setSelectedObject(null);
    form.reset();
    setPendingFiles([]);
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
          <InputForm
            name="slug"
            label="Slug (URL pública)"
            placeholder="ex: proposta-casa-franca"
            type="text"
            form={form}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputForm
              name="client"
              label="Cliente"
              placeholder="Nome do cliente"
              type="text"
              form={form}
            />
            <InputForm
              name="project"
              label="Projeto"
              placeholder="Nome do projeto"
              type="text"
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

          <FileAttachmentsPanel
            ownerId={budgetId}
            ownerType="budget"
            pendingFiles={pendingFiles}
            onPendingFilesChange={setPendingFiles}
            label="Anexos"
            createDescription="Os arquivos serão enviados após salvar o orçamento (opcional)"
            editDescription="Documentos, imagens ou PDFs do orçamento (opcional)"
          />
        </form>
      </Form>
    </Modal>
  );
}
