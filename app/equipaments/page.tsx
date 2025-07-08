"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import InventoryItem from "@/lib/models/InventoryItem";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import InventoryItemModal from "@/components/layout/modal/EquipamentModal";

export default function Inventory() {
  const [selectedObject, setSelectedObject] = useState<InventoryItem | null>(
    null
  );
  const [action, setAction] = useState<ModalAction | null>(null);

  const columns: ColumnDef<InventoryItem>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "id",
    },
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
          <FloatingMenu<InventoryItem>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  return (
    <Layout breadcrumb="/equipaments">
      <DataTable columns={columns} data={[]} setAction={setAction} />
      <ToolkitModal
        action={action}
        setAction={setAction}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        ordidaryModal={<InventoryItemModal />}
      />
    </Layout>
  );
}

