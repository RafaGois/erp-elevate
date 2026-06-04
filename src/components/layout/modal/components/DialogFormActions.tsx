import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

type SubmitVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;

interface DialogFormActionsProps {
  onCancel: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (event?: any) => void;
  loading?: boolean;
  cancelLabel?: string;
  submitLabel?: string;
  submitVariant?: SubmitVariant;
}

export default function DialogFormActions({
  onCancel,
  onSubmit,
  loading = false,
  cancelLabel = "Cancelar",
  submitLabel = "Salvar",
  submitVariant = "default",
}: DialogFormActionsProps) {
  const btnClass = "elevate-dialog__footer-btn w-full sm:w-[8.75rem]";

  return (
    <div className="elevate-dialog__footer-actions">
      <Button
        type="button"
        variant="outline"
        size="default"
        disabled={loading}
        className={btnClass}
        onClick={onCancel}
      >
        {cancelLabel}
      </Button>
      <Button
        type="button"
        variant={submitVariant}
        size="default"
        disabled={loading}
        className={btnClass}
        onClick={onSubmit}
      >
        {submitLabel}
      </Button>
    </div>
  );
}
