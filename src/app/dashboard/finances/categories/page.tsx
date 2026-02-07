"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownRight, ArrowUpDown, ArrowUpRight, Circle, DivideCircleIcon } from "lucide-react";
import { useState } from "react";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Category from "@/lib/models/movimentations/Category";
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
      accessorFn: (row) => row?.Type?.name ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        if (!item?.Type?.name) return "-";
        return <span className="flex flex-row items-center gap-2">{item?.Type?.name} {item?.Type?.name == "Entrada" ? <ArrowUpRight size={16}/> : <ArrowDownRight size={16} /> } </span>;
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

  const { data, refetch } = useQuery<Category[]>(
    {
      queryKey: ["data_movimentation_categories"],
      refetchInterval: 60000,
      staleTime: Infinity,
      refetchOnMount: "always",
      queryFn: async () => {
        try {
          const res = await axios.get(`https://elevatepromedia.com/api/movimentation-categories`);
          return res.data;
        } catch (err) {
          return [];
        }
      },
    }
  );

  async function remove(uid: string) {
    setReloading?.(true);
    await axios.delete(`https://elevatepromedia.com/api/movimentation-categories/${uid}`);
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
        ordidaryModal={<CategoryModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
