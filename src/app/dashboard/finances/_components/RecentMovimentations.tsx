import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="pill"
                    className={cn(
                      "shrink-0 justify-self-start",
                      isEntrada ? "text-emerald-600" : "text-red-600",
                    )}
                  >
                    {isEntrada ? "Entrada" : "Saída"}
                  </Badge>
                  <span
                    className={cn(
                      "ms-auto font-semibold tabular-nums",
                      isEntrada ? "text-emerald-600" : "text-red-600",
                    )}
                  >
                    {isEntrada ? "+" : "-"}
                    {formatBRL(mov.value)}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
