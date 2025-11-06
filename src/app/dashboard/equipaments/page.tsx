"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Equipament } from "@/lib/models/Equipament";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import EquipamentModal from "@/components/layout/modal/EquipamentModal";
import useAppData from "@/data/hooks/useAppData";
import DataCard from "@/components/layout/components/card/DataCard";

export default function Inventory() {
  const [selectedObject, setSelectedObject] = useState<Equipament | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const { setReloading } = useAppData();

  const columns: ColumnDef<Equipament>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "name",
    },
    {
      header: "Valor",
      accessorKey: "price",
      cell: ({ row }) => {
        const item = row.original;
        return (
          item?.price && (
            <span>
              {item.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          )
        );
      },
    },
    {
      header: "Data de compra",
      accessorKey: "purchaseDate",
      cell: ({ row }) => {
        const item = row.original;

        const correctDate = new Date(item?.purchaseDate);
        correctDate.setDate(correctDate.getDate() + 1);

        return (
          item?.purchaseDate && (
            <span>{correctDate?.toLocaleDateString("pt-BR")}</span>
          )
        );
      },
    },
    {
      accessorKey: "Opções",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <FloatingMenu<Equipament>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, /* isLoading, isFetching, */ refetch } = useQuery<Equipament[]>(
    {
      queryKey: ["data_equipaments"],
      //refetchInterval: 60000,
      //staleTime: Infinity,
      refetchOnMount: "always",
      queryFn: async () => {
        try {
          const res = await axios.get(`http://localhost:8080/equipaments`);
          return res.data;
        } catch (err) {
          console.log(err);
          return [];
        }
      },
    }
  );

  async function remove(uid: string) {
    setReloading?.(true);
    await axios.delete(`http://localhost:8080/equipaments/${uid}`);
  }

  return (
    <>
      <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
        <DataCard title="Total" value={data?.length ?? 0} />
        <DataCard
          title="Valor total"
          value={data?.reduce((acc, item) => acc + item.price, 0) ?? 0}
        />
        <DataCard
          title="Valor total"
          value={data?.reduce((acc, item) => acc + item.price, 0) ?? 0}
        />
        <DataCard
          title="Valor total"
          value={data?.reduce((acc, item) => acc + item.price, 0) ?? 0}
        />
      </div>
      <DataTable columns={columns} data={data ?? []} setAction={setAction} />
      <ToolkitModal
        action={action}
        setAction={setAction}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        refetch={refetch}
        ordidaryModal={<EquipamentModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
