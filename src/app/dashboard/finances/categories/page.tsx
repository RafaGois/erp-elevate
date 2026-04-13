"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownRight,
  ArrowUpDown,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Category from "@/lib/models/movimentations/Category";
import MovimentationType from "@/lib/enums/MovimentationType";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import useAppData from "@/data/hooks/useAppData";
import CategoryModal from "@/components/layout/modal/MovimentationCategoryModal";

export default function Inventory() {
  const [selectedObject, setSelectedObject] = useState<Category | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const { setReloading } = useAppData();

  const columns: ColumnDef<Category>[] = [
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
      header: "Tipo",
      accessorKey: "Type",
      cell: ({ row }) => {
        const item = row.original;
        const type = item?.Type;
        if (!type) return "-";
        const label =
          type === MovimentationType.ENTRADA ? "Entrada" : "Saída";
        return (
          <span className="flex flex-row items-center gap-2">
            {label}{" "}
            {type === MovimentationType.ENTRADA ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownRight size={16} />
            )}
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
          <FloatingMenu<Category>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, refetch } = useQuery<Category[]>({
    queryKey: ["data_movimentation_categories"],
    refetchInterval: 60000,
    staleTime: Infinity,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get(
          `/movimentation-categories`,
        );
        return res.data;
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });

  console.log(data);

  async function remove(uid: string) {
    setReloading?.(true);
    await api.delete(
      `/movimentation-categories/${uid}`,
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={data ?? []}
        setAction={setAction}
        setSelectedObject={setSelectedObject}
      />
      <ToolkitModal
        action={action}
        setAction={setAction}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        refetch={refetch}
        ordidaryModal={<CategoryModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
