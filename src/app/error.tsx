"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Algo deu errado</h1>
      <p className="max-w-md text-muted-foreground">
        Não foi possível carregar esta página. Tente novamente.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md border px-4 py-2 text-sm font-medium"
      >
        Tentar novamente
      </button>
    </div>
  );
}
