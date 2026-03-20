import {
  TaskStatus,
  TASK_STATUS_OPTIONS,
} from "@/lib/enums/TaskStatus";
import {
  TaskPriorities,
  TASK_PRIORITIES_OPTIONS,
} from "@/lib/enums/TaskPriorities";
import type { TasksRegistersFilterValues } from "./tasks-registers-filter-types";
import { getDefaultTasksRegistersFilters } from "./tasks-registers-filter-types";

export const TASKS_REGISTERS_FILTERS_STORAGE_KEY =
  "erp-elevate-tasks-registers-filters";

const LEGACY_HIDDEN_STATUS_KEY = "tasks-registers-hidden-status-filter";
const LEGACY_HIDDEN_RESPONSIBLE_KEY =
  "tasks-registers-hidden-responsible-filter";

const VALID_STATUSES = new Set<string>(
  TASK_STATUS_OPTIONS.map((o) => o.id as string),
);
const VALID_PRIORITIES = new Set<string>(
  TASK_PRIORITIES_OPTIONS.map((o) => o.id as string),
);

type StoredShape = {
  ranges?: { from?: string | null; to?: string | null };
  hiddenStatusIds?: string[];
  hiddenResponsibleIds?: string[];
  priorityIds?: string[];
  projectIds?: string[];
};

function parseIsoDate(s: string | null | undefined): Date | undefined {
  if (s == null || s === "") return undefined;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function readLegacyFilters(): Partial<TasksRegistersFilterValues> | null {
  let partial: Partial<TasksRegistersFilterValues> = {};
  let hadAny = false;

  try {
    const statusRaw = localStorage.getItem(LEGACY_HIDDEN_STATUS_KEY);
    if (statusRaw) {
      const parsed = JSON.parse(statusRaw) as string[];
      const hiddenStatusIds = parsed.filter((id): id is TaskStatus =>
        VALID_STATUSES.has(id),
      );
      partial = { ...partial, hiddenStatusIds };
      hadAny = true;
    }
  } catch {
    localStorage.removeItem(LEGACY_HIDDEN_STATUS_KEY);
  }

  try {
    const respRaw = localStorage.getItem(LEGACY_HIDDEN_RESPONSIBLE_KEY);
    if (respRaw) {
      const parsed = JSON.parse(respRaw) as string[];
      partial = {
        ...partial,
        hiddenResponsibleIds: parsed.map(String),
      };
      hadAny = true;
    }
  } catch {
    localStorage.removeItem(LEGACY_HIDDEN_RESPONSIBLE_KEY);
  }

  return hadAny ? partial : null;
}

function clearLegacyFilterKeys(): void {
  localStorage.removeItem(LEGACY_HIDDEN_STATUS_KEY);
  localStorage.removeItem(LEGACY_HIDDEN_RESPONSIBLE_KEY);
}

export function parseTasksRegistersFiltersFromStorage(
  raw: string | null,
): TasksRegistersFilterValues | null {
  if (raw == null || raw === "") return null;
  try {
    const data = JSON.parse(raw) as StoredShape;

    const hiddenStatusIds = (data.hiddenStatusIds ?? []).filter(
      (id): id is TaskStatus => VALID_STATUSES.has(id),
    );
    const hiddenResponsibleIds = (data.hiddenResponsibleIds ?? []).map(
      String,
    );
    const priorityIds = (data.priorityIds ?? []).filter(
      (id): id is TaskPriorities => VALID_PRIORITIES.has(id),
    );
    const projectIds = (data.projectIds ?? []).map(String);

    return {
      ranges: {
        from: parseIsoDate(data.ranges?.from ?? undefined),
        to: parseIsoDate(data.ranges?.to ?? undefined),
      },
      hiddenStatusIds,
      hiddenResponsibleIds,
      priorityIds,
      projectIds,
    };
  } catch {
    return null;
  }
}

export function serializeTasksRegistersFilters(
  v: TasksRegistersFilterValues,
): string {
  return JSON.stringify({
    ranges: {
      from: v.ranges?.from?.toISOString?.() ?? null,
      to: v.ranges?.to?.toISOString?.() ?? null,
    },
    hiddenStatusIds: v.hiddenStatusIds,
    hiddenResponsibleIds: v.hiddenResponsibleIds,
    priorityIds: v.priorityIds,
    projectIds: v.projectIds,
  });
}

/** Lê o blob novo ou faz migração única das chaves antigas de status/responsável. */
export function loadTasksRegistersFiltersInitial(): TasksRegistersFilterValues {
  try {
    const raw = localStorage.getItem(TASKS_REGISTERS_FILTERS_STORAGE_KEY);
    const parsed = parseTasksRegistersFiltersFromStorage(raw);
    if (parsed) {
      return parsed;
    }
    const legacy = readLegacyFilters();
    if (legacy) {
      clearLegacyFilterKeys();
      return { ...getDefaultTasksRegistersFilters(), ...legacy };
    }
  } catch {
    localStorage.removeItem(TASKS_REGISTERS_FILTERS_STORAGE_KEY);
  }
  return getDefaultTasksRegistersFilters();
}
