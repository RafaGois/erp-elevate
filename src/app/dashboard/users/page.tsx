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
import User from "@/lib/models/User";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import UserModal from "@/components/layout/modal/UserModal";
import useAppData from "@/data/hooks/useAppData";
import { UserLevel } from "@/lib/enums/UserLevel";

const USER_LEVEL_LABELS: Record<UserLevel, string> = {
  [UserLevel.ADMIN]: "Admin",
  [UserLevel.USER]: "Usuário",
  [UserLevel.VIEWER]: "Visualizador",
  [UserLevel.TESTER]: "Testador",
};

export default function UsersPage() {
  const [selectedObject, setSelectedObject] = useState<User | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const { setReloading } = useAppData();

  const columns: ColumnDef<User>[] = [
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
      accessorKey: "username",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nível
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "level",
      cell: ({ row }) => {
        const level = row.original.level;
        return USER_LEVEL_LABELS[level as UserLevel] ?? level;
      },
    },
    {
      accessorKey: "Opções",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <FloatingMenu<User>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, refetch } = useQuery<User[]>({
    queryKey: ["data_users"],
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get("/users");
        return res.data;
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });

  async function remove(uid: string) {
    setReloading?.(true);
    await api.delete(`/users/${uid}`);
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
        ordidaryModal={<UserModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
