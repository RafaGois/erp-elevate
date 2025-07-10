"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Equipament from "@/lib/models/Equipament";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import EquipamentModal from "@/components/layout/modal/EquipamentModal";
import useAppData from "@/data/hooks/useAppData";

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
        return item?.price && (
          <span>
            {item.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        );
      },
    },
    {
      header: "Data de compra",
      accessorKey: "purchaseDate",
      cell: ({ row }) => {
        const item = row.original;
        return item?.purchaseDate && (
          <span>
            {new Date(item?.purchaseDate)?.toLocaleDateString("pt-BR")}
          </span>
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
          const res = await axios.get(`/api/equipaments`);
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
    await axios.delete(`/api/equipaments/${uid}`);
  }

  return (
    <Layout breadcrumb="/equipaments">
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
    </Layout>
  );
}
