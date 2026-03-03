"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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

export interface BudgetFile {
  id: string;
  originalName: string;
  size?: number;
}

export interface FilePreviewPanelProps {
  /** Nome de cada arquivo (para exibição e detecção de tipo) */
  items: Array<{ name: string }>;
  /** Retorna URL para preview (sync para File, async para API) */
  getPreviewUrl: (index: number) => string | Promise<string>;
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onRemove: (index: number) => void;
  onDownload: (index: number) => void;
  className?: string;
}

export function FilePreviewPanel({
  items,
  getPreviewUrl,
  currentIndex,
  onIndexChange,
  onRemove,
  onDownload,
  className,
}: FilePreviewPanelProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const item = items[currentIndex] ?? null;
  const previewType = item ? getFilePreviewType(item.name) : "other";

  useEffect(() => {
    if (!item || currentIndex < 0 || currentIndex >= items.length) {
      setPreviewUrl(null);
      return;
    }

    let revoked = false;
    setLoading(true);
    setError(null);

    const result = getPreviewUrl(currentIndex);

    if (typeof result === "string") {
      setPreviewUrl(result);
      setLoading(false);
      return () => {
        if (result.startsWith("blob:")) URL.revokeObjectURL(result);
      };
    }

    result
      .then((url) => {
        if (revoked && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
          return;
        }
        if (!revoked) {
          setPreviewUrl(url);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!revoked) {
          setError("Não foi possível carregar o arquivo.");
          setPreviewUrl(null);
          setLoading(false);
        }
      });

    return () => {
      revoked = true;
      setPreviewUrl((prev) => {
        if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
        return null;
      });
    };
  }, [currentIndex, items, getPreviewUrl]);

  const goPrev = () =>
    onIndexChange((currentIndex - 1 + items.length) % items.length);
  const goNext = () => onIndexChange((currentIndex + 1) % items.length);

  if (items.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={goPrev}
            disabled={items.length <= 1}
            aria-label="Arquivo anterior"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums">
            {currentIndex + 1} / {items.length}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={goNext}
            disabled={items.length <= 1}
            aria-label="Próximo arquivo"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <p
          className="truncate text-sm font-medium text-foreground min-w-0 flex-1"
          title={item?.name}
        >
          {item?.name}
        </p>
      </div>

      <div className="group relative aspect-video min-h-[200px] w-full rounded-lg border bg-muted/30 flex items-center justify-center overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="text-sm text-muted-foreground">Carregando…</span>
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm">{error}</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onDownload(currentIndex)}
            >
              <Download className="size-4 mr-2" />
              Baixar arquivo
            </Button>
          </div>
        )}
        {!loading && !error && previewUrl && (
          <>
            {previewType === "image" && (
              <>
                <img
                  src={previewUrl}
                  alt={item?.name ?? "Preview"}
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-10 w-10 shrink-0"
                    onClick={() => onDownload(currentIndex)}
                    aria-label="Baixar arquivo"
                  >
                    <Download className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-10 w-10 shrink-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => onRemove(currentIndex)}
                    aria-label="Remover arquivo"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </>
            )}
            {previewType === "pdf" && (
              <>
                <iframe
                  src={previewUrl}
                  title={item?.name ?? "PDF"}
                  className="h-full w-full min-h-[300px] border-0"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-10 w-10 shrink-0"
                    onClick={() => onDownload(currentIndex)}
                    aria-label="Baixar arquivo"
                  >
                    <Download className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-10 w-10 shrink-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => onRemove(currentIndex)}
                    aria-label="Remover arquivo"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </>
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
                  onClick={() => onDownload(currentIndex)}
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
