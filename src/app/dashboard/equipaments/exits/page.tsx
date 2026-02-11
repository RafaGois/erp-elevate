"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import EquipamentExitFinishModal from "@/components/layout/modal/EquipamentExitFinishModal";
import EquipamentExitModal from "@/components/layout/modal/EquipamentExitModal";
import { Button } from "@/components/ui/button";
import useAppData from "@/data/hooks/useAppData";
import ModalAction from "@/lib/enums/modalAction";
import { EquipamentExit } from "@/lib/models/EquipamentExit";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import api from "@/lib/api";
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
      header: "Observação",
      accessorKey: "observation",
    },
    {
      header: "Data",
      accessorKey: "date",
      cell: ({ row }) => {
        const item = row.original;

        const correctDate = new Date(item.date);
        correctDate.setDate(correctDate.getDate() + 1);

        return <span>{correctDate?.toLocaleDateString("pt-BR")}</span>;
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
        const res = await api.get(`/equipament-exits`);
        return res.data;
      } catch (err) {
        console.log(err);
        
        return [];
      }
    },
  });

  async function remove(uid: string) {
    setReloading?.(true);
    await api.delete(`/equipament-exits/${uid}`);
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.[0]?.id ? data : []}
        setAction={setAction}
      />
      <ToolkitModal
        action={action}
        setAction={setAction}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        refetch={refetch}
        ordidaryModal={<EquipamentExitModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
        finishModal={<EquipamentExitFinishModal />}
      />
    </>
  );
}
