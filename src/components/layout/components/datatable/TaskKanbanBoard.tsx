"use client";

import { CalendarDays, EyeOff, SlidersHorizontal, User2, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Task from "@/lib/models/task/Task";
import { TASK_STATUS_OPTIONS, TaskStatus } from "@/lib/enums/TaskStatus";
import { TaskPriorities } from "@/lib/enums/TaskPriorities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface TaskKanbanBoardProps {
  tasks: Task[];
  onEditTask?: (task: Task) => void;
  onUpdateTaskStatus?: (taskId: string, status: TaskStatus) => Promise<void>;
  onCreateTask?: () => void;
}

const PRIORITY_STYLE: Record<TaskPriorities, string> = {
  [TaskPriorities.BAIXA]:
    "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  [TaskPriorities.MEDIA]:
    "bg-amber-500/10 text-amber-700 border-amber-500/20",
  [TaskPriorities.ALTA]: "bg-rose-500/10 text-rose-700 border-rose-500/20",
};

const PRIORITY_LABEL: Record<TaskPriorities, string> = {
  [TaskPriorities.BAIXA]: "Baixa",
  [TaskPriorities.MEDIA]: "Média",
  [TaskPriorities.ALTA]: "Alta",
};

export default function TaskKanbanBoard({
  tasks,
  onEditTask,
  onUpdateTaskStatus,
  onCreateTask,
}: TaskKanbanBoardProps) {
  const mobileCardsLimit = 4;
  const statusStorageKey = "tasks-kanban-hidden-status-columns";
  const responsibleStorageKey = "tasks-kanban-hidden-responsibles";
  const unassignedResponsibleId = "__unassigned__";
  const [hiddenStatusColumns, setHiddenStatusColumns] = useState<TaskStatus[]>([]);
  const [statusStorageReady, setStatusStorageReady] = useState(false);
  const [hiddenResponsibleIds, setHiddenResponsibleIds] = useState<string[]>([]);
  const [responsibleStorageReady, setResponsibleStorageReady] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dropTargetStatus, setDropTargetStatus] = useState<TaskStatus | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedStatuses, setExpandedStatuses] = useState<Record<string, boolean>>({});
  const [statusOverrides, setStatusOverrides] = useState<Record<string, TaskStatus>>(
    {}
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const raw = window.localStorage.getItem(statusStorageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as TaskStatus[];
        const allowed = parsed.filter((s) =>
          TASK_STATUS_OPTIONS.some((opt) => opt.id === s)
        );
        setHiddenStatusColumns(allowed);
      } catch {
        window.localStorage.removeItem(statusStorageKey);
      }
    }
    setStatusStorageReady(true);
  }, []);

  useEffect(() => {
    if (!statusStorageReady) return;
    window.localStorage.setItem(statusStorageKey, JSON.stringify(hiddenStatusColumns));
  }, [hiddenStatusColumns, statusStorageReady]);

  useEffect(() => {
    const raw = window.localStorage.getItem(responsibleStorageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as string[];
        setHiddenResponsibleIds(parsed);
      } catch {
        window.localStorage.removeItem(responsibleStorageKey);
      }
    }
    setResponsibleStorageReady(true);
  }, []);

  useEffect(() => {
    if (!responsibleStorageReady) return;
    window.localStorage.setItem(
      responsibleStorageKey,
      JSON.stringify(hiddenResponsibleIds)
    );
  }, [hiddenResponsibleIds, responsibleStorageReady]);

  useEffect(() => {
    setStatusOverrides({});
  }, [tasks]);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const responsibleOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const task of tasks) {
      const id = task?.Responsible?.id ?? unassignedResponsibleId;
      const name = task?.Responsible?.name ?? "Sem responsável";
      if (!map.has(id)) map.set(id, name);
    }
    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const byResponsible = tasks.filter((task) => {
      const id = task?.Responsible?.id ?? unassignedResponsibleId;
      return !hiddenResponsibleIds.includes(id);
    });

    if (!normalizedSearch) return byResponsible;
    return byResponsible.filter((task) => {
      const tokens = [
        task?.name,
        task?.description,
        task?.Responsible?.name,
        task?.Project?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return tokens.includes(normalizedSearch);
    });
  }, [hiddenResponsibleIds, normalizedSearch, tasks]);

  const columns = useMemo(
    () =>
      TASK_STATUS_OPTIONS.filter(
        (status) => !hiddenStatusColumns.includes(status.id)
      ).map((status) => ({
        ...status,
        tasks: visibleTasks.filter((task) => {
          const currentStatus =
            statusOverrides[task.id] ?? ((task?.Status as TaskStatus) ?? TaskStatus.PENDENTE);
          return currentStatus === status.id;
        }),
      })),
    [hiddenStatusColumns, statusOverrides, visibleTasks]
  );

  const xlGridColsClass =
    columns.length <= 1
      ? "xl:grid-cols-1"
      : columns.length === 2
        ? "xl:grid-cols-2"
        : columns.length === 3
          ? "xl:grid-cols-3"
          : columns.length === 4
            ? "xl:grid-cols-4"
            : "xl:grid-cols-5";
  const cardsGridClass = columns.length <= 3 ? "2xl:grid-cols-2" : "";

  function toggleColumn(status: TaskStatus) {
    setHiddenStatusColumns((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  }

  function toggleResponsible(responsibleId: string) {
    setHiddenResponsibleIds((prev) =>
      prev.includes(responsibleId)
        ? prev.filter((id) => id !== responsibleId)
        : [...prev, responsibleId]
    );
  }

  function toggleExpandedStatus(status: TaskStatus) {
    setExpandedStatuses((prev) => ({ ...prev, [status]: !prev[status] }));
  }

  async function handleDropOnColumn(status: TaskStatus) {
    if (!draggedTaskId || !onUpdateTaskStatus) return;
    const task = tasks.find((t) => t.id === draggedTaskId);
    if (!task) return;
    const currentStatus =
      statusOverrides[task.id] ?? ((task?.Status as TaskStatus) ?? TaskStatus.PENDENTE);
    if (currentStatus === status) {
      setDraggedTaskId(null);
      setDropTargetStatus(null);
      return;
    }

    setStatusOverrides((prev) => ({ ...prev, [task.id]: status }));
    try {
      await onUpdateTaskStatus(task.id, status);
      toast.success("Status atualizado.");
    } catch (error: unknown) {
      setStatusOverrides((prev) => {
        const next = { ...prev };
        delete next[task.id];
        return next;
      });
      const err = error as { response?: { data?: string[] }; message?: string };
      toast.error(
        err?.response?.data?.[0] ?? err?.message ?? "Erro ao atualizar status."
      );
    } finally {
      setDraggedTaskId(null);
      setDropTargetStatus(null);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Buscar tarefa no kanban..."
          className="h-8 w-full md:max-w-sm"
        />
        <div className="flex justify-end gap-2">
        {onCreateTask ? (
          <Button type="button" size="sm" onClick={onCreateTask}>
            Nova tarefa
          </Button>
        ) : null}
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" size="sm" variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              Responsáveis
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64 p-3">
            <p className="mb-2 text-sm font-medium">Filtrar responsáveis</p>
            <div className="space-y-1.5">
              {responsibleOptions.map((responsible) => {
                const isVisible = !hiddenResponsibleIds.includes(responsible.id);
                return (
                  <button
                    key={responsible.id}
                    type="button"
                    onClick={() => toggleResponsible(responsible.id)}
                    className="hover:bg-muted flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm"
                  >
                    <span>{responsible.name}</span>
                    {!isVisible ? (
                      <EyeOff className="text-muted-foreground h-4 w-4" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" size="sm" variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Colunas
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64 p-3">
            <p className="mb-2 text-sm font-medium">Exibir colunas</p>
            <div className="space-y-1.5">
              {TASK_STATUS_OPTIONS.map((status) => {
                const isVisible = !hiddenStatusColumns.includes(status.id);
                return (
                  <button
                    key={status.id}
                    type="button"
                    onClick={() => toggleColumn(status.id)}
                    className="hover:bg-muted flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm"
                  >
                    <span>{status.name}</span>
                    {!isVisible ? (
                      <EyeOff className="text-muted-foreground h-4 w-4" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
        </div>
      </div>

      <div className={`grid grid-cols-1 gap-4 ${xlGridColsClass}`}>
        {columns.map((column) => (
          <section
            key={column.id}
            onDragOver={(event) => {
              event.preventDefault();
              setDropTargetStatus(column.id);
            }}
            onDragLeave={() => {
              if (dropTargetStatus === column.id) {
                setDropTargetStatus(null);
              }
            }}
            onDrop={(event) => {
              event.preventDefault();
              void handleDropOnColumn(column.id as TaskStatus);
            }}
            className={`bg-muted/30 flex min-h-72 flex-col rounded-lg border p-3 transition-colors ${
              dropTargetStatus === column.id
                ? "ring-2 ring-primary/40 bg-primary/5"
                : ""
            }`}
          >
            <header className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold">{column.name}</h3>
              <span className="bg-background rounded-full border px-2 py-0.5 text-xs">
                {column.tasks.length}
              </span>
            </header>

            <div
              data-status-scroll
              className={`grid max-h-[55vh] flex-1 grid-cols-1 gap-3 overflow-y-auto pr-1 [touch-action:pan-y] md:max-h-[62vh] ${cardsGridClass}`}
            >
              {column.tasks.length === 0 ? (
                <div className="text-muted-foreground col-span-full rounded-md border border-dashed p-3 text-xs">
                  Sem tarefas neste status.
                </div>
              ) : (
                (isMobile && !expandedStatuses[column.id]
                  ? column.tasks.slice(0, mobileCardsLimit)
                  : column.tasks
                ).map((task) => {
                  const priority =
                    (task?.Priority as TaskPriorities) ?? TaskPriorities.BAIXA;
                  const priorityClass =
                    PRIORITY_STYLE[priority] ?? PRIORITY_STYLE[TaskPriorities.BAIXA];
                  const priorityLabel =
                    PRIORITY_LABEL[priority] ?? PRIORITY_LABEL[TaskPriorities.BAIXA];

                  return (
                    <article
                      key={task.id}
                      draggable={!!onUpdateTaskStatus}
                      onWheel={(event) => {
                        const scroller = (
                          event.currentTarget.closest("[data-status-scroll]") as HTMLElement | null
                        );
                        if (!scroller) return;
                        scroller.scrollTop += event.deltaY;
                      }}
                      onDragStart={(event) => {
                        setDraggedTaskId(task.id);
                        event.dataTransfer.effectAllowed = "move";
                      }}
                      onDragEnd={() => {
                        setDraggedTaskId(null);
                        setDropTargetStatus(null);
                      }}
                      className={`bg-background rounded-md border p-2.5 shadow-xs h-full flex flex-col ${
                        onUpdateTaskStatus ? "cursor-grab active:cursor-grabbing" : ""
                      } ${draggedTaskId === task.id ? "opacity-60" : ""}`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-snug line-clamp-2">
                          {task?.name ?? "-"}
                        </p>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${priorityClass}`}
                        >
                          {priorityLabel}
                        </span>
                      </div>

                      {task?.description ? (
                        <p className="text-muted-foreground mb-2.5 line-clamp-2 text-xs">
                          {task.description}
                        </p>
                      ) : null}

                      <div className="text-muted-foreground mb-2.5 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5">
                          <User2 className="h-3.5 w-3.5" />
                          <span>{task?.Responsible?.name ?? "Sem responsável"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span>
                            {task?.deadline
                              ? new Date(task.deadline).toLocaleDateString()
                              : "Sem prazo"}
                          </span>
                        </div>
                      </div>

                      {onEditTask ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full mt-auto"
                          onClick={() => onEditTask(task)}
                        >
                          Abrir tarefa
                        </Button>
                      ) : null}
                    </article>
                  );
                })
              )}
            </div>
            {isMobile && column.tasks.length > mobileCardsLimit ? (
              <div className="mt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-full text-xs"
                  onClick={() => toggleExpandedStatus(column.id)}
                >
                  {expandedStatuses[column.id] ? "Ver menos" : "Ver mais"}
                </Button>
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}
