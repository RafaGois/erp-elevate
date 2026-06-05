import { Skeleton } from "@/components/ui/skeleton";

interface ChartStateProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty?: boolean;
  /** Altura aproximada do skeleton, alinhada à altura do gráfico. */
  height?: number;
  children: React.ReactNode;
}

/**
 * Renderiza loading / erro / vazio de forma padronizada para os blocos
 * do dashboard, ou o conteúdo quando os dados estão prontos.
 */
export default function ChartState({
  isLoading,
  isError,
  isEmpty,
  height = 300,
  children,
}: ChartStateProps) {
  if (isLoading) {
    return <Skeleton className="w-full rounded-md" style={{ height }} />;
  }

  if (isError) {
    return (
      <div
        className="flex items-center justify-center text-sm text-muted-foreground"
        style={{ height }}
      >
        Não foi possível carregar os dados.
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div
        className="flex items-center justify-center text-sm text-muted-foreground"
        style={{ height }}
      >
        Sem dados para o período.
      </div>
    );
  }

  return <>{children}</>;
}
