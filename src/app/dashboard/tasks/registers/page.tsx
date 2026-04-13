"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ModalAction from "@/lib/enums/modalAction";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Circle, CircleDashed, ListFilter } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
import { TasksRegistersFilterDialog } from "./_components/TasksRegistersFilterDialog";
import {
  getDefaultTasksRegistersFilters,
  type TasksRegistersFilterValues,
} from "./_components/tasks-registers-filter-types";
import {
  TASKS_REGISTERS_FILTERS_STORAGE_KEY,
  loadTasksRegistersFiltersInitial,
  serializeTasksRegistersFilters,
} from "./_components/tasks-registers-filter-storage";

const viewModeStorageKey = "tasks-registers-view-mode";
const unassignedResponsibleId = "__unassigned__";

function countActiveTasksFilterDimensions(
  v: Partial<TasksRegistersFilterValues> | undefined,
): number {
  if (!v) return 0;
  let n = 0;
  if (v.ranges?.from || v.ranges?.to) n++;
  if (v.hiddenStatusIds?.length) n++;
  if (v.hiddenResponsibleIds?.length) n++;
  if (v.priorityIds?.length) n++;
  if (v.projectIds?.length) n++;
  return n;
}

export default function Tasks() {
  const [selectedObject, setSelectedObject] = useState<Task | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [tasksFilterDialogOpen, setTasksFilterDialogOpen] = useState(false);
  const [editingStatusTaskId, setEditingStatusTaskId] = useState<string | null>(
    null,
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

  const filterForm = useForm<TasksRegistersFilterValues>({
    defaultValues: getDefaultTasksRegistersFilters(),
  });
  const filterParams = useWatch({ control: filterForm.control });
  const filtersRestoredRef = useRef(false);

  useLayoutEffect(() => {
    try {
      const initial = loadTasksRegistersFiltersInitial();
      filterForm.reset(initial);
    } catch {
      localStorage.removeItem(TASKS_REGISTERS_FILTERS_STORAGE_KEY);
    } finally {
      filtersRestoredRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!filtersRestoredRef.current) return;
    try {
      localStorage.setItem(
        TASKS_REGISTERS_FILTERS_STORAGE_KEY,
        serializeTasksRegistersFilters(filterForm.getValues()),
      );
    } catch {
      /* quota / modo privado */
    }
  }, [filterParams, filterForm]);

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

  const activeFilterDimensions = useMemo(
    () => countActiveTasksFilterDimensions(filterParams),
    [
      filterParams?.ranges?.from,
      filterParams?.ranges?.to,
      filterParams?.hiddenStatusIds,
      filterParams?.hiddenResponsibleIds,
      filterParams?.priorityIds,
      filterParams?.projectIds,
    ],
  );

  const responsibleFilterOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const task of data ?? []) {
      const id = task?.Responsible?.id ?? unassignedResponsibleId;
      const name = task?.Responsible?.name ?? "Sem responsável";
      if (!map.has(id)) map.set(id, name);
    }
    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  const projectFilterOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const task of data ?? []) {
      const id = task?.Project?.id;
      const name = task?.Project?.name;
      if (id && name && !map.has(id)) map.set(id, name);
    }
    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

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
            onUpdateEnd={() => setUpdatingStatusTaskId(null)}
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

  const tableFilteredData = useMemo(() => {
    const hiddenStatusFilterIds = filterParams?.hiddenStatusIds ?? [];
    const hiddenResponsibleFilterIds =
      filterParams?.hiddenResponsibleIds ?? [];
    const priorityIds = filterParams?.priorityIds ?? [];
    const projectIds = filterParams?.projectIds ?? [];

    const visibleStatusIds = TASK_STATUS_OPTIONS.map((status) => status.id).filter(
      (statusId) =>
        !hiddenStatusFilterIds.includes(statusId as TaskStatus),
    );
    const visibleResponsibleIds = responsibleFilterOptions
      .map((r) => r.id)
      .filter((id) => !hiddenResponsibleFilterIds.includes(id));

    const from = filterParams?.ranges?.from
      ? startOfDay(new Date(filterParams.ranges.from))
      : undefined;
    const toBase =
      filterParams?.ranges?.to ?? filterParams?.ranges?.from;
    const to = toBase ? endOfDay(new Date(toBase)) : undefined;

    const priorityWeight: Record<TaskPriorities, number> = {
      [TaskPriorities.ALTA]: 3,
      [TaskPriorities.MEDIA]: 2,
      [TaskPriorities.BAIXA]: 1,
    };

    return (data ?? [])
      .filter((item) => {
        if (
          visibleStatusIds.length > 0 &&
          !visibleStatusIds.includes(
            (item?.Status as TaskStatus) ?? TaskStatus.PENDENTE,
          )
        ) {
          return false;
        }

        if (
          visibleResponsibleIds.length > 0 &&
          !visibleResponsibleIds.includes(
            item?.Responsible?.id ?? unassignedResponsibleId,
          )
        ) {
          return false;
        }

        if (
          priorityIds.length > 0 &&
          !priorityIds.includes(
            (item?.Priority as TaskPriorities) ?? TaskPriorities.BAIXA,
          )
        ) {
          return false;
        }

        if (projectIds.length > 0) {
          const pid =
            item?.Project?.id ??
            (item as { projectId?: string }).projectId;
          if (!pid || !projectIds.includes(String(pid))) {
            return false;
          }
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
    filterParams,
    responsibleFilterOptions,
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
        <>
          <DataTable
            columns={columns}
            data={tableFilteredData ?? []}
            setAction={setAction}
            setSelectedObject={setSelectedObject}
            toolbarStart={
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2 shrink-0"
                onClick={() => setTasksFilterDialogOpen(true)}
              >
                <ListFilter className="h-4 w-4" />
                Filtros
                {activeFilterDimensions > 0 ? (
                  <Badge variant="secondary" className="h-5 min-w-5 px-1.5">
                    {activeFilterDimensions}
                  </Badge>
                ) : null}
              </Button>
            }
          />
          <TasksRegistersFilterDialog
            open={tasksFilterDialogOpen}
            onOpenChange={setTasksFilterDialogOpen}
            form={filterForm}
            responsibleOptions={responsibleFilterOptions}
            projectOptions={projectFilterOptions}
            getDefaultValues={getDefaultTasksRegistersFilters}
          />
        </>
      ) : (
        <TaskKanbanBoard
          tasks={data ?? []}
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
