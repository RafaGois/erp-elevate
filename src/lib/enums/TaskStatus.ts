export enum TaskStatus {
  PENDENTE = "PENDENTE",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDA = "CONCLUIDA",
  CANCELADA = "CANCELADA",
  ATRASADA = "ATRASADA",
}

export const TASK_STATUS_OPTIONS = [
  { id: TaskStatus.PENDENTE, name: "Pendente" },
  { id: TaskStatus.EM_ANDAMENTO, name: "Em andamento" },
  { id: TaskStatus.CONCLUIDA, name: "Concluída" },
  { id: TaskStatus.CANCELADA, name: "Cancelada" },
  { id: TaskStatus.ATRASADA, name: "Atrasada" },
] as const;