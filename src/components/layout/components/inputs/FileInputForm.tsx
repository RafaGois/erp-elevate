"use client";

import {
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileUp, Loader2, FileText, X } from "lucide-react";
import { useRef, useState } from "react";
import api from "@/lib/api";

interface FileInputFormProps {
  /** Rota da API para enviar o arquivo (ex: POST /files) */
  uploadUrl?: string;
  /** Campos extras para o FormData (ex: { budgetId: "..." }) */
  extraFields?: Record<string, string>;
  /** Chamado após cada upload com sucesso (ex: refetch da listagem) */
  onSuccess?: () => void;
  /** Chamado em erro de upload */
  onError?: (error: unknown) => void;
  /** Modo adiar: não envia na hora; usa pendingFiles + onPendingFilesChange (criação de orçamento) */
  deferUpload?: boolean;
  /** Arquivos pendentes (usado quando deferUpload) */
  pendingFiles?: File[];
  /** Callback quando a lista de arquivos pendentes muda (usado quando deferUpload) */
  onPendingFilesChange?: (files: File[]) => void;
  description?: string;
  accept?: string;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileInputForm(props: FileInputFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const isDefer = props.deferUpload === true;
  const pending = props.pendingFiles ?? [];

  async function uploadFiles(fileList: FileList | null) {
    if (!fileList?.length) return;

    if (isDefer) {
      const next = [...pending, ...Array.from(fileList)];
      props.onPendingFilesChange?.(next);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    if (!props.uploadUrl) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const formData = new FormData();
        formData.append("file", file);
        if (props.extraFields) {
          for (const [key, value] of Object.entries(props.extraFields)) {
            formData.append(key, value);
          }
        }
        await api.post(props.uploadUrl, formData);
      }
      props.onSuccess?.();
    } catch (error) {
      props.onError?.(error);
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removePending(index: number) {
    const next = pending.filter((_, i) => i !== index);
    props.onPendingFilesChange?.(next);
  }

  return (
    <FormItem className={cn("space-y-2", props.className)}>
      <input
        ref={inputRef}
        type="file"
        accept={props.accept}
        multiple={props.multiple}
        disabled={props.disabled || isUploading}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={(e) => {
          uploadFiles(e.target.files);
        }}
      />
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!props.disabled && !isUploading) inputRef.current?.click();
          }
        }}
        onClick={() => {
          if (!props.disabled && !isUploading) inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!props.disabled && !isUploading) setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragOver(false);
          if (props.disabled || isUploading) return;
          uploadFiles(e.dataTransfer.files);
        }}
        className={cn(
          "relative flex min-h-[100px] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors",
          "border-input bg-muted/30 hover:bg-muted/50 hover:border-muted-foreground/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDragOver && "border-primary bg-primary/5",
          (props.disabled || isUploading) && "pointer-events-none opacity-60",
          !props.disabled && !isUploading && "cursor-pointer"
        )}
      >
        {isUploading ? (
          <Loader2 className="size-8 shrink-0 animate-spin text-muted-foreground" />
        ) : (
          <FileUp className="size-8 shrink-0 text-muted-foreground" />
        )}
        <div className="text-center text-sm">
          <p className="font-medium text-foreground">
            {isUploading
              ? "Enviando..."
              : isDragOver
                ? "Solte o arquivo aqui"
                : "Arraste um arquivo ou clique para selecionar"}
          </p>
        </div>
      </div>

      {isDefer && pending.length > 0 && (
        <ul className="space-y-2">
          {pending.map((file, i) => (
            <li
              key={`${file.name}-${i}-${file.size}`}
              className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5 text-sm shadow-xs"
            >
              <FileText className="size-5 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                onClick={() => removePending(i)}
                aria-label="Remover arquivo"
              >
                <X className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
    </FormItem>
  );
}
