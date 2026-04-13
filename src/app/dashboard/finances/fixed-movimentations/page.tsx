"use client";

import DataCard from "@/components/layout/components/card/DataCard";
import { DataTable } from "@/components/layout/components/datatable/DataTable";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import useAppData from "@/data/hooks/useAppData";
import ModalAction from "@/lib/enums/modalAction";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ArrowDownRight,
  ArrowUpDown,
  ArrowUpRight,
  ChartArea,
  DollarSign,
} from "lucide-react";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import { useForm, useWatch } from "react-hook-form";
import { addDays, endOfDay, startOfDay, subDays } from "date-fns";
import { useMemo } from "react";
import FixedMovimentation from "@/lib/models/movimentations/FixedMovimentation";
import useAuth from "@/data/hooks/useAuth";
import MovimentationType from "@/lib/enums/MovimentationType";

const MOVIMENTATION_TYPE_OPTIONS = [
  { id: "all", name: "Todos" },
  { id: MovimentationType.ENTRADA, name: "Entrada" },
  { id: MovimentationType.SAIDA, name: "Saída" },
];
import FixedMovimentationModal from "@/components/layout/modal/FixedMovimentationModal";

export default function FixedMovimentations() {

  const form = useForm({
    defaultValues: {
      select: "all",
      ranges: {
        from: subDays(new Date(), 30),
        to: addDays(new Date(), 365),
      },
    },
  });
  const params = useWatch({ control: form.control });
  const [selectedObject, setSelectedObject] = useState<FixedMovimentation | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);

  const { setReloading } = useAppData();

  const columns: ColumnDef<FixedMovimentation>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Descrição
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "description",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Valor
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "value",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Prazo
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "deadline",
      cell: ({ row }) => {
        const item = row.original;
        const date = new Date(item.deadline);
        return <span>{date.toLocaleDateString("pt-BR")}</span>;
      },
    },
    {
      header: "Tipo",
      accessorKey: "Type",
      cell: ({ row }) => {
        const item = row.original;
        const type = item?.Type;
        if (!type) return "-";
        return (
          <span>
            {type === MovimentationType.ENTRADA ? "Entrada" : "Saída"}
          </span>
        );
      },
    },
    {
      header: "Categoria",
      accessorKey: "Category",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item.Category.name}</span>;
      },
    },
    {
      header: "Opções",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <FloatingMenu<FixedMovimentation>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, refetch } = useQuery<FixedMovimentation[]>({
    queryKey: ["data_fixed_movimentations"],
    refetchInterval: 30000,
    staleTime: Infinity,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get(`/fixed-movimentations`);
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  async function remove(uid: string) {
    setReloading?.(true);
    await api.delete(`/fixed-movimentations/${uid}`);
  }

  const filteredData = useMemo(() => {
    const selectedType = params?.select ?? "all";
    const from = params?.ranges?.from
      ? startOfDay(new Date(params.ranges.from))
      : undefined;
    const toBase = params?.ranges?.to ?? params?.ranges?.from;
    const to = toBase ? endOfDay(new Date(toBase)) : undefined;

    return (data ?? []).filter((item) => {
      if (selectedType !== "all" && item?.Type !== selectedType) {
        return false;
      }

      if (!from && !to) return true;

      const itemDate = item?.deadline ? new Date(item.deadline) : undefined;
      if (!itemDate || Number.isNaN(itemDate.getTime())) return false;

      if (from && itemDate < from) return false;
      if (to && itemDate > to) return false;

      return true;
    });
  }, [data, params?.select, params?.ranges?.from, params?.ranges?.to]);

  return (
    <>
      <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
        <DataCard
          title="Valor total"
          value={filteredData.reduce((acc, item) => acc + item.value, 0)}
          icon={<ChartArea />}
        />
        <DataCard
          title="Valor Líquido"
          value={
            filteredData
              .filter((item) => item?.Type === MovimentationType.ENTRADA)
              .reduce((acc, item) => acc + item.value, 0) -
            filteredData
              .filter((item) => item?.Type === MovimentationType.SAIDA)
              .reduce((acc, item) => acc + item.value, 0)
          }
          icon={<DollarSign />}
        />
        <DataCard
          title="Entradas"
          value={filteredData
            .filter((item) => item?.Type === MovimentationType.ENTRADA)
            .reduce((acc, item) => acc + item.value, 0)}
          icon={<ArrowUpRight />}
        />
        <DataCard
          title="Saídas"
          value={filteredData
            .filter((item) => item?.Type === MovimentationType.SAIDA)
            .reduce((acc, item) => acc + item.value, 0)}
          icon={<ArrowDownRight />}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        setAction={setAction}
        setSelectedObject={setSelectedObject}
        form={form}
        options={MOVIMENTATION_TYPE_OPTIONS}
      />
      <ToolkitModal
        action={action}
        setAction={setAction}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        refetch={refetch}
        ordidaryModal={<FixedMovimentationModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
