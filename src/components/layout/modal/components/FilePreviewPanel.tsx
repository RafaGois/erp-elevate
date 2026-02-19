"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { ChevronLeft, ChevronRight, Download, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface BudgetFile {
  id: string;
  originalName: string;
  size?: number;
}

const IMAGE_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".bmp",
  ".ico",
];
const PDF_EXTENSION = ".pdf";

function getFilePreviewType(filename: string): "image" | "pdf" | "other" {
  const lower = filename.toLowerCase();
  if (IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext))) return "image";
  if (lower.endsWith(PDF_EXTENSION)) return "pdf";
  return "other";
}

interface FilePreviewPanelProps {
  files: BudgetFile[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onRemove: (file: BudgetFile) => void;
  onDownload: (file: BudgetFile) => void;
  className?: string;
}

export function FilePreviewPanel({
  files,
  currentIndex,
  onIndexChange,
  onRemove,
  onDownload,
  className,
}: FilePreviewPanelProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const file = files[currentIndex] ?? null;
  const previewType = file ? getFilePreviewType(file.originalName) : "other";

  useEffect(() => {
    if (!file) {
      setBlobUrl(null);
      return;
    }

    let revoked = false;
    setLoading(true);
    setError(null);

    api
      .get(`/files/file/${file.id}`, { responseType: "blob" })
      .then((res) => {
        if (revoked) return;
        const url = URL.createObjectURL(res.data as Blob);
        setBlobUrl(url);
        setLoading(false);
      })
      .catch(() => {
        if (!revoked) {
          setError("Não foi possível carregar o arquivo.");
          setBlobUrl(null);
          setLoading(false);
        }
      });

    return () => {
      revoked = true;
      setBlobUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    };
  }, [file?.id]);

  const goPrev = () => {
    onIndexChange((currentIndex - 1 + files.length) % files.length);
  };

  const goNext = () => {
    onIndexChange((currentIndex + 1) % files.length);
  };

  if (files.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Navegação e controles */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={goPrev}
            disabled={files.length <= 1}
            aria-label="Arquivo anterior"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums">
            {currentIndex + 1} / {files.length}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={goNext}
            disabled={files.length <= 1}
            aria-label="Próximo arquivo"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <p className="truncate text-sm font-medium text-foreground" title={file?.originalName}>
            {file?.originalName}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => file && onDownload(file)}
            disabled={!file}
            aria-label="Baixar arquivo"
          >
            <Download className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => file && onRemove(file)}
            disabled={!file}
            aria-label="Remover arquivo"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      {/* Área de visualização */}
      <div className="relative aspect-video min-h-[200px] w-full rounded-lg border bg-muted/30 flex items-center justify-center overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="text-sm text-muted-foreground">Carregando…</span>
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm">{error}</span>
            {file && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => file && onDownload(file)}
              >
                <Download className="size-4 mr-2" />
                Baixar arquivo
              </Button>
            )}
          </div>
        )}
        {!loading && !error && blobUrl && (
          <>
            {previewType === "image" && (
              <img
                src={blobUrl}
                alt={file?.originalName ?? "Preview"}
                className="max-h-full max-w-full object-contain"
              />
            )}
            {previewType === "pdf" && (
              <iframe
                src={blobUrl}
                title={file?.originalName ?? "PDF"}
                className="h-full w-full min-h-[300px] border-0"
              />
            )}
            {previewType === "other" && (
              <div className="flex flex-col items-center gap-3 p-6 text-center">
                <FileText className="size-16 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Visualização não disponível para este tipo de arquivo.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => file && onDownload(file)}
                >
                  <Download className="size-4 mr-2" />
                  Baixar
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
