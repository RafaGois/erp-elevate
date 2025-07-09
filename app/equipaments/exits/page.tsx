"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import Layout from "@/components/layout/Layout";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import EquipamentExitModal from "@/components/layout/modal/EquipamentExitModal";
import { Button } from "@/components/ui/button";
import useAppData from "@/data/hooks/useAppData";
import ModalAction from "@/lib/enums/modalAction";
import EquipamentExit from "@/lib/models/Equipament";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

export default function Movimentations() {
  const [selectedObject, setSelectedObject] = useState<EquipamentExit | null>(
    null
  );
  const [action, setAction] = useState<ModalAction | null>(null);

  const { setReloading } = useAppData();

  const columns: ColumnDef<EquipamentExit>[] = [
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
        return (
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
          <FloatingMenu<EquipamentExit>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, refetch } = useQuery<EquipamentExit[]>({
    queryKey: ["data_equipamentsExits"],
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/equipamentExits`);
        return res.data;
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });

  async function remove(uid: string) {
    setReloading(true);
    await axios.delete(`/api/exits/${uid}`);
    refetch();
  }

  return (
    <Layout breadcrumb="equipaments/exits">
      <DataTable columns={columns} data={data ?? []} setAction={setAction} />
      <ToolkitModal
        action={action}
        setAction={setAction}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        refetch={refetch}
        ordidaryModal={<EquipamentExitModal />}
        confirmModal={<ConfirmDialog remove={remove} />}
      />
    </Layout>
  );
}
