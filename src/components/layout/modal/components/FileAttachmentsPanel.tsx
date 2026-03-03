"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import FileInputForm from "@/components/layout/components/inputs/FileInputForm";
import { FilePreviewPanel } from "./FilePreviewPanel";

export interface AttachedFile {
  id: string;
  originalName: string;
  size?: number;
}

export type FileOwnerType = "budget" | "movimentation";

export interface FileAttachmentsConfig {
  getFetchUrl: (ownerId: string) => string;
  getUploadExtraFields: (ownerId: string) => Record<string, string>;
}

export const FILE_ATTACHMENTS_CONFIG: Record<
  FileOwnerType,
  FileAttachmentsConfig
> = {
  budget: {
    getFetchUrl: (id) => `/files/budget/${id}`,
    getUploadExtraFields: (id) => ({ budgetId: id }),
  },
  movimentation: {
    getFetchUrl: (id) => `/files/movimentation/${id}`,
    getUploadExtraFields: (id) => ({ ownerId: id, ownerType: "MOVIMENTATION" }),
  },
};

const FILE_ACCEPT =
  ".pdf,image/*,.doc,.docx,.txt,.csv,.xls,.xlsx,.ppt,.pptx,.odt,.ods,.odp";

interface FileAttachmentsPanelProps {
  ownerId?: string | null;
  ownerType: FileOwnerType;
  pendingFiles?: File[];
  onPendingFilesChange?: (files: File[]) => void;
  label?: string;
  createDescription?: string;
  editDescription?: string;
  className?: string;
}

export function FileAttachmentsPanel({
  ownerId,
  ownerType,
  pendingFiles = [],
  onPendingFilesChange,
  label = "Anexos",
  createDescription = "Os arquivos serão enviados após salvar (opcional)",
  editDescription = "Documentos, imagens ou PDFs (opcional)",
  className,
}: FileAttachmentsPanelProps) {
  const [previewIndex, setPreviewIndex] = useState(0);

  const config = FILE_ATTACHMENTS_CONFIG[ownerType];

  const { data: serverFiles, refetch: refetchFiles } = useQuery<AttachedFile[]>({
    queryKey: ["data_files", ownerType, ownerId],
    enabled: !!ownerId,
    refetchOnMount: "always",
    queryFn: async () => {
      if (!ownerId) return [];
      try {
        const res = await api.get(config.getFetchUrl(ownerId));
        return res.data;
      } catch {
        return [];
      }
    },
  });

  const files = ownerId ? (serverFiles ?? []) : [];
  const items = ownerId
    ? files.map((f) => ({ name: f.originalName }))
    : pendingFiles.map((f) => ({ name: f.name }));
  const hasFiles = items.length > 0;

  useEffect(() => {
    if (hasFiles) {
      setPreviewIndex((prev) => Math.min(prev, items.length - 1));
    } else {
      setPreviewIndex(0);
    }
  }, [hasFiles, items.length]);

  const getPreviewUrl = useCallback(
    (index: number): string | Promise<string> => {
      if (ownerId && files[index]) {
        return api
          .get(`/files/file/${files[index].id}`, { responseType: "blob" })
          .then((res) => URL.createObjectURL(res.data as Blob));
      }
      if (pendingFiles[index]) {
        return URL.createObjectURL(pendingFiles[index]);
      }
      return Promise.reject(new Error("Arquivo não encontrado"));
    },
    [ownerId, files, pendingFiles]
  );

  async function removeFile(file: AttachedFile) {
    try {
      await api.delete(`/files/${file.id}`);
      await refetchFiles();
      toast.success("Arquivo removido.");
    } catch {
      toast.error("Erro ao remover arquivo.");
    }
  }

  async function handleDownload(file: AttachedFile) {
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
    const err = error as {
      response?: { data?: string | string[] };
      message?: string;
    };
    toast.error(
      (Array.isArray(err.response?.data)
        ? err.response?.data[0]
        : err.response?.data) ??
        err.message ??
        "Erro ao enviar arquivo."
    );
  }

  function handleRemove(index: number) {
    if (ownerId && files[index]) {
      removeFile(files[index]);
    } else {
      const next = pendingFiles.filter((_, i) => i !== index);
      onPendingFilesChange?.(next);
    }
  }

  function handleDownloadByIndex(index: number) {
    if (ownerId && files[index]) {
      handleDownload(files[index]);
    } else if (pendingFiles[index]) {
      const url = URL.createObjectURL(pendingFiles[index]);
      const a = document.createElement("a");
      a.href = url;
      a.download = pendingFiles[index].name || "download";
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
        {label}
      </label>

      {hasFiles && (
        <FilePreviewPanel
          items={items}
          getPreviewUrl={getPreviewUrl}
          currentIndex={Math.min(previewIndex, items.length - 1)}
          onIndexChange={setPreviewIndex}
          onRemove={handleRemove}
          onDownload={handleDownloadByIndex}
          className="mb-4"
        />
      )}
      {!ownerId ? (
        <FileInputForm
          deferUpload
          pendingFiles={pendingFiles}
          onPendingFilesChange={onPendingFilesChange}
          hidePendingList
          description={createDescription}
          accept={FILE_ACCEPT}
          multiple
        />
      ) : (
        <FileInputForm
          uploadUrl="/files"
          extraFields={config.getUploadExtraFields(ownerId)}
          onSuccess={refetchFiles}
          onError={handleUploadError}
          description={editDescription}
          accept={FILE_ACCEPT}
          multiple
        />
      )}
    </div>
  );
}
