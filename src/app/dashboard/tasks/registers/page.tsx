"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Circle, CircleDashed } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import api from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Task from "@/lib/models/task/Task";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import useAppData from "@/data/hooks/useAppData";
import TaskModal from "@/components/layout/modal/TaskModal";
import { useForm, useWatch } from "react-hook-form";
import { endOfDay, startOfDay } from "date-fns";
import { TASK_STATUS_OPTIONS, TaskStatus } from "@/lib/enums/TaskStatus";
import { TaskPriorities } from "@/lib/enums/TaskPriorities";
import { InlineTaskSelectCell } from "@/components/layout/components/datatable/InlineTaskSelectCell";
import ViewModeSwitch, {
  ViewMode,
} from "@/components/layout/components/datatable/ViewModeSwitch";
import TaskKanbanBoard from "@/components/layout/components/datatable/TaskKanbanBoard";

export default function Tasks() {
  const viewModeStorageKey = "tasks-registers-view-mode";
  const hiddenStatusFilterStorageKey = "tasks-registers-hidden-status-filter";
  const [selectedObject, setSelectedObject] = useState<Task | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [hiddenStatusFilterIds, setHiddenStatusFilterIds] = useState<TaskStatus[]>([]);
  const [editingStatusTaskId, setEditingStatusTaskId] = useState<string | null>(
    null
  );
  const [updatingStatusTaskId, setUpdatingStatusTaskId] = useState<
    string | null
  >(null);
  const [editingPriorityTaskId, setEditingPriorityTaskId] = useState<
    string | null
  >(null);
  const [updatingPriorityTaskId, setUpdatingPriorityTaskId] = useState<
    string | null
  >(null);
  const { setReloading } = useAppData();

  const form = useForm({
    defaultValues: {
      ranges: {
        from: undefined,
        to: undefined,
      },
      select: "all",
    },
  });

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery<Task[]>({
    queryKey: ["data_tasks"],
    refetchInterval: 10000,
    staleTime: Infinity,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get(`/tasks`);
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  useEffect(() => {
    const raw = window.localStorage.getItem(viewModeStorageKey);
    if (raw === "table" || raw === "kanban") {
      setViewMode(raw);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(viewModeStorageKey, viewMode);
  }, [viewMode]);

  useEffect(() => {
    const raw = window.localStorage.getItem(hiddenStatusFilterStorageKey);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as TaskStatus[];
      const allowed = parsed.filter((statusId) =>
        TASK_STATUS_OPTIONS.some((status) => status.id === statusId)
      );
      setHiddenStatusFilterIds(allowed);
    } catch {
      window.localStorage.removeItem(hiddenStatusFilterStorageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      hiddenStatusFilterStorageKey,
      JSON.stringify(hiddenStatusFilterIds)
    );
  }, [hiddenStatusFilterIds]);

  const statusOptions = [
    { id: TaskStatus.PENDENTE, icon: <CircleDashed fill="#8d8e8f" stroke="#8d8e8f" className="w-3 h-3" />, name: "Pendente" },
    { id: TaskStatus.EM_ANDAMENTO, icon: <Circle fill="#ebba34" stroke="#ebba34" className="w-3 h-3 animate-pulse" />, name: "Em andamento" },
    { id: TaskStatus.CONCLUIDA, icon: <Circle fill="#008000" stroke="#008000" className="w-3 h-3" />, name: "Concluída" },
    { id: TaskStatus.CANCELADA, icon: <Circle fill="#eb3a34" stroke="#eb3a34" className="w-3 h-3" />, name: "Cancelada" },
    { id: TaskStatus.ATRASADA, icon: <Circle fill="#eb3a34" stroke="#eb3a34" className="w-3 h-3" />, name: "Atrasada" },
  ];

  const priorityOptions = [
    { id: TaskPriorities.BAIXA, icon: <CircleDashed fill="#008000" stroke="#8d8e8f" className="w-3 h-3" />, name: "Baixa" },
    { id: TaskPriorities.MEDIA, icon: <Circle fill="#ebba34" stroke="#ebba34" className="w-3 h-3 animate-pulse" />, name: "Média" },
    { id: TaskPriorities.ALTA, icon: <Circle fill="#bf1300" stroke="#850d00" className="w-3 h-3" />, name: "Alta" },
  ];

  async function handleUpdateStatus(taskId: string, value: string) {
    await api.put(`/tasks/${taskId}`, { Status: value as TaskStatus });
    await queryClient.invalidateQueries({ queryKey: ["data_tasks"] });
  }

  async function handleUpdatePriority(taskId: string, value: string) {
    await api.put(`/tasks/${taskId}`, { Priority: value as TaskPriorities });
    await queryClient.invalidateQueries({ queryKey: ["data_tasks"] });
  }

  function toggleStatusFilter(statusId: TaskStatus) {
    setHiddenStatusFilterIds((prev) =>
      prev.includes(statusId)
        ? prev.filter((id) => id !== statusId)
        : [...prev, statusId]
    );
  }

  const columns: ColumnDef<Task>[] = [
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
      accessorKey: "description",
      header: "Descrição",
      accessorFn: (row) => row?.description ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.description ?? "-"}</span>;
      },
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Projeto
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "Project.name",
    },
    {
      accessorKey: "priority",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Prioridade
            <ArrowUpDown />
          </Button>
        );
      },
      accessorFn: (row) => row?.Priority ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        const currentPriority = (item?.Priority as TaskPriorities) ?? TaskPriorities.BAIXA;
        return (
          <InlineTaskSelectCell
            taskId={item?.id ?? ""}
            value={currentPriority}
            options={priorityOptions}
            isEditing={editingPriorityTaskId === item?.id}
            isUpdating={updatingPriorityTaskId === item?.id}
            onEdit={() => item?.id && setEditingPriorityTaskId(item.id)}
            onEditClose={() => setEditingPriorityTaskId(null)}
            onUpdateStart={() => item?.id && setUpdatingPriorityTaskId(item.id)}
            onUpdateEnd={() => setUpdatingPriorityTaskId(null)}
            onUpdate={handleUpdatePriority}
            successMessage="Prioridade atualizada."
            errorMessage="Erro ao atualizar prioridade."
            placeholder="Prioridade"
          />
        );
      },
    },    
    {
      accessorKey: "responsible",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Responsável
            <ArrowUpDown />
          </Button>
        );
      },
      accessorFn: (row) => row?.Responsible?.name ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.Responsible?.name ?? "-"}</span>;
      },
    },
    {
      accessorKey: "deadline",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Prazo
            <ArrowUpDown />
          </Button>
        );
      },
      accessorFn: (row) => row?.deadline ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <span>
            {item?.deadline
              ? new Date(item.deadline).toLocaleDateString()
              : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Criado em
            <ArrowUpDown />
          </Button>
        );
      },
      accessorFn: (row) => row?.createdAt ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <span>
            {item?.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "Status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown />
          </Button>
        );
      },
      accessorFn: (row) => row?.Status ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        const currentStatus = (item?.Status as TaskStatus) ?? TaskStatus.PENDENTE;
        return (
          <InlineTaskSelectCell
            taskId={item?.id ?? ""}
            value={currentStatus}
            options={statusOptions}
            isEditing={editingStatusTaskId === item?.id}
            isUpdating={updatingStatusTaskId === item?.id}
            onEdit={() => item?.id && setEditingStatusTaskId(item.id)}
            onEditClose={() => setEditingStatusTaskId(null)}
            onUpdateStart={() => item?.id && setUpdatingStatusTaskId(item.id)}
            onUpdateEnd={() => setEditingStatusTaskId(null)}
            onUpdate={handleUpdateStatus}
            successMessage="Status atualizado."
            errorMessage="Erro ao atualizar status."
            placeholder="Status"
          />
        );
      },
    },
    {
      accessorKey: "Opções",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <FloatingMenu<Task>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const params = useWatch({ control: form.control });

  const filteredData = useMemo(() => {
    const selectedStatus = params?.select ?? "all";
    const visibleStatusIds = TASK_STATUS_OPTIONS
      .map((status) => status.id)
      .filter((statusId) => !hiddenStatusFilterIds.includes(statusId));
    const from = params?.ranges?.from
      ? startOfDay(new Date(params.ranges.from))
      : undefined;
    const toBase = params?.ranges?.to ?? params?.ranges?.from;
    const to = toBase ? endOfDay(new Date(toBase)) : undefined;

    const priorityWeight: Record<TaskPriorities, number> = {
      [TaskPriorities.ALTA]: 3,
      [TaskPriorities.MEDIA]: 2,
      [TaskPriorities.BAIXA]: 1,
    };

    return (data ?? [])
      .filter((item) => {
        if (selectedStatus !== "all" && item?.Status !== selectedStatus) {
          return false;
        }
        if (
          visibleStatusIds.length > 0 &&
          !visibleStatusIds.includes(
            ((item?.Status as TaskStatus) ?? TaskStatus.PENDENTE)
          )
        ) {
          return false;
        }

        if (!from && !to) return true;

        const itemDate = item?.deadline ? new Date(item.deadline) : undefined;
        if (!itemDate || Number.isNaN(itemDate.getTime())) return true;

        if (from && itemDate < from) return false;
        if (to && itemDate > to) return false;

        return true;
      })
      .sort((a, b) => {
        const aPriority =
          priorityWeight[(a?.Priority as TaskPriorities) ?? TaskPriorities.BAIXA] ?? 1;
        const bPriority =
          priorityWeight[(b?.Priority as TaskPriorities) ?? TaskPriorities.BAIXA] ?? 1;

        if (aPriority !== bPriority) return bPriority - aPriority;

        const aDeadline = a?.deadline ? new Date(a.deadline).getTime() : Number.POSITIVE_INFINITY;
        const bDeadline = b?.deadline ? new Date(b.deadline).getTime() : Number.POSITIVE_INFINITY;

        return aDeadline - bDeadline;
      });
  }, [
    data,
    hiddenStatusFilterIds,
    params?.select,
    params?.ranges?.from,
    params?.ranges?.to,
  ]);



  async function remove(uid: string) {
    setReloading?.(true);
    await api.delete(`/tasks/${uid}`);
  }

  function openTaskInModal(task: Task) {
    setSelectedObject(task);
    setAction(ModalAction.Update);
  }

  return (
    <>
      <div className="mb-2">
        <ViewModeSwitch value={viewMode} onChange={setViewMode} />
      </div>
      {viewMode === "table" ? (
        <DataTable
          columns={columns}
          data={filteredData ?? []}
          setAction={setAction}
          form={form}
          statusFilterOptions={[...TASK_STATUS_OPTIONS]}
          hiddenStatusIds={hiddenStatusFilterIds}
          onToggleStatusFilter={toggleStatusFilter}
        />
      ) : (
        <TaskKanbanBoard
          tasks={filteredData ?? []}
          onEditTask={openTaskInModal}
          onCreateTask={() => setAction(ModalAction.Create)}
          onUpdateTaskStatus={async (taskId, status) => {
            await handleUpdateStatus(taskId, status);
          }}
        />
      )}
      <ToolkitModal
        action={action}
        setAction={setAction}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        refetch={refetch}
        ordidaryModal={<TaskModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
