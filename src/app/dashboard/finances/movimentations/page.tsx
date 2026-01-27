"use client";

import DataCard from "@/components/layout/components/card/DataCard";
import { DataTable } from "@/components/layout/components/datatable/DataTable";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import useAppData from "@/data/hooks/useAppData";
import ModalAction from "@/lib/enums/modalAction";
import Movimentation from "@/lib/models/movimentations/Motimentation";
import { useEffect, useState } from "react";
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

type SelectedType = "Entrada" | "Saída" | "Todos";
export interface Params {
  type?: SelectedType;
  ranges?: {
    from?: Date;
    to?: Date;
  };
}

export default function Movimentations() {
  const form = useForm<Params>({
    defaultValues: {
      type: "Todos",
      ranges: {
        from: subDays(new Date(), 30),
        to: new Date(),
      },
    },
  });
  const params = useWatch({ control: form.control });
  const [selectedObject, setSelectedObject] = useState<Movimentation | null>(
    null,
  );
  const [action, setAction] = useState<ModalAction | null>(null);
  
  const { setReloading } = useAppData();

  const columns: ColumnDef<Movimentation>[] = [
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
            Data
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "date",
      cell: ({ row }) => {
        const item = row.original;
        const date = new Date(item.date);
        // Formatar para DD/MM/YYYY
        return <span>{date.toLocaleDateString("pt-BR")}</span>;
      },
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Usuário
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "User",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item.User.name}</span>;
      },
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tipo
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "Type",
      cell: ({ row }) => {
        const item = row.original;
        if (!item?.Type?.name) return "-";
        return <span>{item?.Type?.name}</span>;
      },
    },

    {
      header: ({ column }) => {
        return <p>Opções</p>;
      },
      accessorKey: "Opções",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <FloatingMenu<Movimentation>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, /* isLoading, isFetching, */ refetch } = useQuery<
    Movimentation[]
  >({
    queryKey: ["data_movimentations"],
    //refetchInterval: 60000,
    //staleTime: Infinity,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await axios.get(
          `https://elevatepromedia.com/api/movimentations`,
        );
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  async function remove(uid: string) {
    setReloading?.(true);
    await axios.delete(`https://elevatepromedia.com/api/movimentations/${uid}`);
  }

  const filteredData = useMemo(() => {
    const selectedType = params?.type ?? "Todos";
    const from = params?.ranges?.from
      ? startOfDay(new Date(params.ranges.from))
      : undefined;
    const toBase = params?.ranges?.to ?? params?.ranges?.from;
    const to = toBase ? endOfDay(new Date(toBase)) : undefined;

    return (data ?? []).filter((item) => {
      if (selectedType !== "Todos" && item?.Type?.name !== selectedType) {
        return false;
      }

      if (!from && !to) return true;

      const itemDate = item?.date ? new Date(item.date) : undefined;
      if (!itemDate || Number.isNaN(itemDate.getTime())) return false;

      if (from && itemDate < from) return false;
      if (to && itemDate > to) return false;

      return true;
    });
  }, [data, params?.type, params?.ranges?.from, params?.ranges?.to]);

  return (
    <>
      <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
        <DataCard
          title="Total"
          value={data?.length ?? 0}
          icon={<DollarSign />}
        />
        <DataCard
          title="Valor total" //entradas - saidas
          value={data?.reduce((acc, item) => acc + item.value, 0) ?? 0}
          icon={<ChartArea />}
        />
        <DataCard
          title="Entradas"
          value={
            data
              ?.filter((item) => item.Type.name == "Entrada")
              .reduce((acc, item) => acc + item.value, 0) ?? 0
          }
          icon={<ArrowUpRight />}
        />
        <DataCard
          title="Saídas"
          value={
            data
              ?.filter((item) => item.Type.name == "Saída")
              .reduce((acc, item) => acc + item.value, 0) ?? 0
          }
          icon={<ArrowDownRight />}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        setAction={setAction}
        form={form}
      />
      <ToolkitModal
        action={action}
        setAction={setAction}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        refetch={refetch}
        ordidaryModal={<MovimentationModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
