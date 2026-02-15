"use client";

import Budget from "@/lib/models/Budget";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import TextAreaForm from "../components/inputs/TextareaForm";
import FileInputForm from "../components/inputs/FileInputForm";
import api from "@/lib/api";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";
import { useState } from "react";

type BudgetModalProps = BaseModalProps<Budget>;

interface BudgetFile {
  id: string;
  originalName: string;
  size?: number;
}

export default function BudgetModal(props: BudgetModalProps) {
  const budgetId = props.selectedObject?.id;
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const form = useForm<Budget>({
    defaultValues: {
      name: props.selectedObject?.name ?? "",
      description: props.selectedObject?.description ?? "",
      value: props.selectedObject?.value ?? 0,
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
    if (pendingFiles.length > 0) {
      for (const file of pendingFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("budgetId", newId);
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

  const { data: files, refetch: refetchFiles } = useQuery<BudgetFile[]>({
    queryKey: ["data_files_budgets", budgetId],
    enabled: !!budgetId,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get(`/files/budget/${budgetId}`);
        return res.data;
      } catch {
        return [];
      }
    },
  });

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  async function removeFile(file: BudgetFile) {
    try {
      await api.delete(`/files/${file.id}`);
      await refetchFiles();
      toast.success("Arquivo removido.");
    } catch {
      toast.error("Erro ao remover arquivo.");
    }
  }

  async function handleDownload(file: BudgetFile) {
    try {
      const res = await api.get(`/files/file/${file.id}`, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(res.data as Blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.originalName || "download";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Erro ao baixar arquivo.");
    }
  }

  function handleUploadError(error: unknown) {
    const err = error as { response?: { data?: string | string[] }; message?: string };
    toast.error(
      (Array.isArray(err.response?.data) ? err.response?.data[0] : err.response?.data) ??
        err.message ??
        "Erro ao enviar arquivo."
    );
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
            placeholder="Nome"
            type="text"
            required
            form={form}
          />
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

          {/* Criando: anexos em estado; ao salvar, orçamento é criado e depois os arquivos são enviados com o novo id */}
          {!budgetId && (
            <FileInputForm
              deferUpload
              pendingFiles={pendingFiles}
              onPendingFilesChange={setPendingFiles}
              description="Os arquivos serão enviados após salvar o orçamento (opcional)"
              accept=".pdf,image/*,.doc,.docx,.txt,.csv,.xls,.xlsx,.ppt,.pptx,.odt,.ods,.odp"
              multiple
            />
          )}
          <label htmlFor="files" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Anexos</label>
          {/* Editando: envia já com o id do orçamento e atualiza a listagem */}
          {budgetId && (
            <>
              {files && files.length > 0 && (
                <ul className="space-y-2">
                  {files.map((file) => (
                    <li
                      key={file.id}
                      role="button"
                      tabIndex={0}
                      className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5 text-sm shadow-xs cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleDownload(file)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleDownload(file);
                        }
                      }}
                    >
                      <FileText className="size-5 shrink-0 text-muted-foreground" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-foreground" title={file.originalName}>
                          {file.originalName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {file.size != null ? formatFileSize(file.size) : "—"}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(file);
                        }}
                        aria-label="Remover arquivo"
                      >
                        <X className="size-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
              <FileInputForm
                uploadUrl="/files"
                extraFields={{ budgetId }}
                onSuccess={refetchFiles}
                onError={handleUploadError}
                description="Documentos, imagens ou PDFs do orçamento (opcional)"
                accept=".pdf,image/*,.doc,.docx,.txt,.csv,.xls,.xlsx,.ppt,.pptx,.odt,.ods,.odp"
                multiple
              />
            </>
          )}
        </form>
      </Form>
    </Modal>
  );
}
