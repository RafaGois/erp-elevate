export enum TaskPriorities {
  BAIXA = "BAIXA",
  MEDIA = "MEDIA",
  ALTA = "ALTA",
}

export const TASK_PRIORITIES_OPTIONS = [
  { id: TaskPriorities.BAIXA, name: "Baixa" },
  { id: TaskPriorities.MEDIA, name: "Média" },
  { id: TaskPriorities.ALTA, name: "Alta" },
] as const;