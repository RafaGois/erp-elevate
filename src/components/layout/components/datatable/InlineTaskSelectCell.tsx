"use client";

import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface InlineTaskSelectOption {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

export interface InlineTaskSelectCellProps {
  taskId: string;
  value: string;
  options: InlineTaskSelectOption[];
  isEditing: boolean;
  isUpdating: boolean;
  onEdit: () => void;
  onEditClose: () => void;
  onUpdateStart: () => void;
  onUpdateEnd: () => void;
  onUpdate: (taskId: string, value: string) => Promise<void>;
  successMessage?: string;
  errorMessage?: string;
  placeholder?: string;
}

export function InlineTaskSelectCell({
  taskId,
  value,
  options,
  isEditing,
  isUpdating,
  onEdit,
  onEditClose,
  onUpdateStart,
  onUpdateEnd,
  onUpdate,
  successMessage = "Atualizado.",
  errorMessage = "Erro ao atualizar.",
  placeholder,
}: InlineTaskSelectCellProps) {
  const currentOption = options.find((o) => o.id === value);
  const displayValue = currentOption ? (
    <span className="flex items-center gap-1">
      {currentOption.icon}
      {currentOption.name}
    </span>
  ) : (
    <span className="text-muted-foreground">—</span>
  );

  async function handleValueChange(newValue: string) {
    if (newValue === value) return;
    onUpdateStart();
    try {
      await onUpdate(taskId, newValue);
      onEditClose();
      toast.success(successMessage);
    } catch {
      toast.error(errorMessage);
    } finally {
      onUpdateEnd();
    }
  }

  if (isEditing) {
    return (
      <Select
        value={value}
        open={isEditing}
        onOpenChange={(open) => {
          if (!open) onEditClose();
        }}
        onValueChange={handleValueChange}
      >
        <SelectTrigger
          className="h-8 w-full min-w-40 border-dashed bg-muted/50"
          size="sm"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent align="start">
          <SelectGroup>
            {options.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                <span className="flex items-center gap-2">
                  {opt.icon}
                  {opt.name}
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <button
      type="button"
      onClick={onEdit}
      className="flex w-full min-w-0 cursor-pointer items-center gap-1 rounded px-2 py-1.5 text-left transition-colors hover:bg-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {isUpdating ? (
        <LoaderCircle className="h-3 w-3 animate-spin text-muted-foreground" />
      ) : (
        displayValue
      )}
    </button>
  );
}
