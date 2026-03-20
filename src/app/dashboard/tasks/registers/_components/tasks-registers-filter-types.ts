import type { TaskStatus } from "@/lib/enums/TaskStatus";
import type { TaskPriorities } from "@/lib/enums/TaskPriorities";

/** Filtros da tabela de registros de tarefas (somente este contexto). */
export type TasksRegistersFilterValues = {
  ranges: { from?: Date; to?: Date };
  /** Status ocultos na lista (mesma semântica anterior). */
  hiddenStatusIds: TaskStatus[];
  /** Responsáveis ocultos (__unassigned__ = sem responsável). */
  hiddenResponsibleIds: string[];
  /** Prioridades a exibir; vazio = todas. */
  priorityIds: TaskPriorities[];
  /** Projetos a exibir; vazio = todos. */
  projectIds: string[];
};

export function getDefaultTasksRegistersFilters(): TasksRegistersFilterValues {
  return {
    ranges: { from: undefined, to: undefined },
    hiddenStatusIds: [],
    hiddenResponsibleIds: [],
    priorityIds: [],
    projectIds: [],
  };
}
