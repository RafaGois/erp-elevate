"use client"

import { DataTable } from "@/templates/layout/components/datatable/DataTable";
import FloatingMenu from "@/templates/layout/components/datatable/FloatingMenu";
import Layout from "@/templates/layout/Layout";
import { Button } from "@/templates/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import InventoryItem from "@/lib/models/InventoryItem";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import ToolkitModal from "@/templates/layout/modal/components/ToolkitModal";

export default function Inventory() {
  const [selectedObject, setSelectedObject] = useState<InventoryItem | null>(null);
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
    <Layout breadcrumb="/inventory">
      <DataTable columns={columns} data={[]} />
      <ToolkitModal
        action={action}
        setAction={setAction}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        refetch={null}


      />
    </Layout>
  );
}
