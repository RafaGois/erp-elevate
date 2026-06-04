import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RecentMovimentationDatum } from "../_lib/types";
import { formatBRL, formatDate } from "../_lib/format";

interface Props {
  data: RecentMovimentationDatum[];
}

export default function RecentMovimentations({ data }: Props) {
  if (data.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Nenhuma movimentação registrada.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Descrição</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((mov) => {
          const isEntrada = mov.type === "ENTRADA";
          return (
            <TableRow key={mov.id}>
              <TableCell className="font-medium">
                {mov.description ?? "—"}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {mov.category ?? "Sem categoria"}
              </TableCell>
              <TableCell className="text-muted-foreground tabular-nums">
                {formatDate(mov.date)}
              </TableCell>
              <TableCell className="text-right">
                <span className="flex items-center justify-end gap-2">
                  <Badge
                    variant="pill"
                    className={cn(
                      isEntrada
                        ? "text-emerald-600"
                        : "text-red-600",
                    )}
                  >
                    {isEntrada ? "Entrada" : "Saída"}
                  </Badge>
                  <span
                    className={cn(
                      "font-semibold tabular-nums",
                      isEntrada ? "text-emerald-600" : "text-red-600",
                    )}
                  >
                    {isEntrada ? "+" : "-"}
                    {formatBRL(mov.value)}
                  </span>
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
