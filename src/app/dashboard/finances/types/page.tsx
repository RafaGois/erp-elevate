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
import Type from "@/lib/models/movimentations/Type";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import useAppData from "@/data/hooks/useAppData";
import MovimentationTypeModal from "@/components/layout/modal/MovimentationTypeModal";  

export default function Inventory() {
  const [selectedObject, setSelectedObject] = useState<Type | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const { setReloading } = useAppData();

  const columns: ColumnDef<Type>[] = [
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
          <FloatingMenu<Type>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, /* isLoading, isFetching, */ refetch } = useQuery<Type[]>(
    {
      queryKey: ["data_movimentation_types"],
      //refetchInterval: 60000,
      //staleTime: Infinity,
      refetchOnMount: "always",
      queryFn: async () => {
        try {
          const res = await api.get(`/movimentation-types`);
          return res.data;
        } catch (err) {
          return [];
        }
      },
    }
  );

  async function remove(uid: string) {
    setReloading?.(true);
    await api.delete(`/movimentation-types/${uid}`);
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
        ordidaryModal={<MovimentationTypeModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
