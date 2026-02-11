"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { EquipamentCategory } from "@/lib/models/EquipamentCategory";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import EquipamentCategoryModal from "@/components/layout/modal/EquipamentCategoryModal";
import useAppData from "@/data/hooks/useAppData";

export default function Inventory() {
  const [selectedObject, setSelectedObject] = useState<EquipamentCategory | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const { setReloading } = useAppData();

  const columns: ColumnDef<EquipamentCategory>[] = [
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
      accessorKey: "Opções",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <FloatingMenu<EquipamentCategory>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, /* isLoading, isFetching, */ refetch } = useQuery<EquipamentCategory[]>(
    {
      queryKey: ["data_equipaments"],
      //refetchInterval: 60000,
      //staleTime: Infinity,
      refetchOnMount: "always",
      queryFn: async () => {
        try {
          const res = await api.get(`/equipament-categories`);
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
    await api.delete(`/equipament-categories/${uid}`);
  }

  return (
    <>
      <DataTable columns={columns} data={data ?? []} setAction={setAction} />
      <ToolkitModal
        action={action}
        setAction={setAction}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        refetch={refetch}
        ordidaryModal={<EquipamentCategoryModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
