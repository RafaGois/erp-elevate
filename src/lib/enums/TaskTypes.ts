export enum TaskTypes {
  ENTRADA = "ENTRADA",
  SAIDA = "SAIDA",
}

export const TASK_TYPES_OPTIONS = [
  { id: TaskTypes.ENTRADA, name: "Entrada" },
  { id: TaskTypes.SAIDA, name: "Saída" },
] as const;

export default TASK_TYPES_OPTIONS;