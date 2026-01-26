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
import BankAccount from "@/lib/models/BankAccount";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import useAppData from "@/data/hooks/useAppData";
import BankAccountModal from "@/components/layout/modal/BankAccountModal";  

export default function Inventory() {
  const [selectedObject, setSelectedObject] = useState<BankAccount | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const { setReloading } = useAppData();

  const columns: ColumnDef<BankAccount>[] = [
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
      accessorKey: "User",
      accessorFn: (row) => row?.User?.name ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.User?.name ?? "-"}</span>;
      },
    },
    {
      accessorKey: "number",
      accessorFn: (row) => row?.number ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.number ?? "-"}</span>;
      },
    },
    {
      accessorKey: "agency",
      accessorFn: (row) => row?.agency ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.agency ?? "-"}</span>;
      },
    },
    {
      accessorKey: "Opções",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <FloatingMenu<BankAccount>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, /* isLoading, isFetching, */ refetch } = useQuery<BankAccount[]>(
    {
      queryKey: ["data_bank_accounts"],
      //refetchInterval: 60000,
      //staleTime: Infinity,
      refetchOnMount: "always",
      queryFn: async () => {
        try {
          const res = await axios.get(`https://elevatepromedia.com/api/bank-accounts`);
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
    await axios.delete(`https://elevatepromedia.com/api/bank-accounts/${uid}`);
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
        ordidaryModal={<BankAccountModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
