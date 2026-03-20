import { endOfDay, startOfDay } from "date-fns";
import Task from "@/lib/models/task/Task";
import { TASK_STATUS_OPTIONS, TaskStatus } from "@/lib/enums/TaskStatus";
import { TaskPriorities } from "@/lib/enums/TaskPriorities";
import type { TasksRegistersFilterValues } from "./tasks-registers-filter-types";

const unassignedResponsibleId = "__unassigned__";

/**
 * Aplica os mesmos critérios do dialog de filtros (tabela e Kanban).
 */
export function filterAndSortTasksByRegistersFilters(
  data: Task[] | undefined,
  filterParams: Partial<TasksRegistersFilterValues> | undefined,
  responsibleFilterOptions: { id: string; name: string }[],
): Task[] {
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
}
