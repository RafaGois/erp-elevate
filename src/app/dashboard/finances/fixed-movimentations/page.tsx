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
import axios from "axios";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import MovimentationModal from "@/components/layout/modal/MovimentationModal";
import { useForm, useWatch } from "react-hook-form";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { useMemo } from "react";
import Fixed from "@/lib/models/movimentations/Fixed";
import useAuth from "@/data/hooks/useAuth";
import MovimentationType from "@/lib/models/movimentations/Type";
import FixedMovimentationModal from "@/components/layout/modal/FixedMovimentationModal";

export default function FixedMovimentations() {
  const { user } = useAuth();
  const form = useForm({
    defaultValues: {
      select: "all",
      ranges: {
        from: subDays(new Date(), 30),
        to: new Date(),
      },
    },
  });
  const params = useWatch({ control: form.control });
  const [selectedObject, setSelectedObject] = useState<Fixed | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);

  const { setReloading } = useAppData();

  const columns: ColumnDef<Fixed>[] = [
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
        if (!item?.Type?.name) return "-";
        return <span>{item?.Type?.name}</span>;
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
          <FloatingMenu<Fixed>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, refetch } = useQuery<Fixed[]>({
    queryKey: ["data_fixed_movimentations"],
    refetchInterval: 30000,
    staleTime: Infinity,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await axios.get(
          `https://elevatepromedia.com/api/fixed-movimentations`,
        );
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  const { data: types } = useQuery<MovimentationType[]>({
    queryKey: ["data_movimentation_types"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `https://elevatepromedia.com/api/movimentation-types`,
        );
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  async function remove(uid: string) {
    setReloading?.(true);
    await axios.delete(
      `https://elevatepromedia.com/api/fixed-movimentations/${uid}`,
    );
  }

  const filteredData = useMemo(() => {
    const selectedType = params?.select ?? "all";
    const from = params?.ranges?.from
      ? startOfDay(new Date(params.ranges.from))
      : undefined;
    const toBase = params?.ranges?.to ?? params?.ranges?.from;
    const to = toBase ? endOfDay(new Date(toBase)) : undefined;

    return (data ?? []).filter((item) => {
      if (selectedType !== "all" && item?.Type?.id !== selectedType) {
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
              .filter((item) => item?.Type?.name === "Entrada")
              .reduce((acc, item) => acc + item.value, 0) -
            filteredData
              .filter((item) => item?.Type?.name === "Saída")
              .reduce((acc, item) => acc + item.value, 0)
          }
          icon={<DollarSign />}
        />
        <DataCard
          title="Entradas"
          value={filteredData
            .filter((item) => item?.Type?.name === "Entrada")
            .reduce((acc, item) => acc + item.value, 0)}
          icon={<ArrowUpRight />}
        />
        <DataCard
          title="Saídas"
          value={filteredData
            .filter((item) => item?.Type?.name === "Saída")
            .reduce((acc, item) => acc + item.value, 0)}
          icon={<ArrowDownRight />}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        setAction={setAction}
        form={form}
        options={[
          { id: "all", name: "Todos" },
          ...(types ?? []).map((type) => ({
            id: type.id,
            name: type.name,
          })),
        ]}
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
