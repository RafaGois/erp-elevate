"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerForm } from "@/components/layout/components/inputs/DatePickerForm";
import { TASK_STATUS_OPTIONS, TaskStatus } from "@/lib/enums/TaskStatus";
import { TASK_PRIORITIES_OPTIONS, TaskPriorities } from "@/lib/enums/TaskPriorities";
import type { TasksRegistersFilterValues } from "./tasks-registers-filter-types";

function ToggleRow({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="hover:bg-muted/80 flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm"
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
      />
      <span className="min-w-0 flex-1 leading-snug">{label}</span>
    </label>
  );
}

function FilterSection({
  title,
  hint,
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  children,
}: {
  title: string;
  hint: string;
  searchPlaceholder?: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-muted-foreground text-xs">{hint}</p>
      </div>
      {searchPlaceholder ? (
        <Input
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8"
        />
      ) : null}
      <div className="border-border max-h-44 overflow-y-auto rounded-md border">
        {children}
      </div>
    </div>
  );
}

export type TasksRegistersFilterDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<TasksRegistersFilterValues>;
  responsibleOptions: { id: string; name: string }[];
  projectOptions: { id: string; name: string }[];
  getDefaultValues: () => TasksRegistersFilterValues;
};

export function TasksRegistersFilterDialog({
  open,
  onOpenChange,
  form,
  responsibleOptions,
  projectOptions,
  getDefaultValues,
}: TasksRegistersFilterDialogProps) {
  const formRhf = form as unknown as UseFormReturn<FieldValues>;

  const [respQuery, setRespQuery] = useState("");
  const [projectQuery, setProjectQuery] = useState("");

  const hiddenStatusIds = form.watch("hiddenStatusIds") ?? [];
  const hiddenResponsibleIds = form.watch("hiddenResponsibleIds") ?? [];
  const priorityIds = form.watch("priorityIds") ?? [];
  const projectIds = form.watch("projectIds") ?? [];

  const sortedProjects = useMemo(
    () => [...projectOptions].sort((a, b) => a.name.localeCompare(b.name)),
    [projectOptions],
  );
  const sortedResp = useMemo(
    () => [...responsibleOptions].sort((a, b) => a.name.localeCompare(b.name)),
    [responsibleOptions],
  );

  const filteredResp = useMemo(() => {
    const q = respQuery.trim().toLowerCase();
    if (!q) return sortedResp;
    return sortedResp.filter((r) => r.name.toLowerCase().includes(q));
  }, [sortedResp, respQuery]);

  const filteredProjects = useMemo(() => {
    const q = projectQuery.trim().toLowerCase();
    if (!q) return sortedProjects;
    return sortedProjects.filter((p) => p.name.toLowerCase().includes(q));
  }, [sortedProjects, projectQuery]);

  function toggleHiddenStatus(status: TaskStatus) {
    const hidden = form.getValues("hiddenStatusIds") ?? [];
    const next = hidden.includes(status)
      ? hidden.filter((x) => x !== status)
      : [...hidden, status];
    form.setValue("hiddenStatusIds", next, { shouldDirty: true });
  }

  function toggleHiddenResponsible(id: string) {
    const hidden = form.getValues("hiddenResponsibleIds") ?? [];
    const next = hidden.includes(id)
      ? hidden.filter((x) => x !== id)
      : [...hidden, id];
    form.setValue("hiddenResponsibleIds", next, { shouldDirty: true });
  }

  function togglePriority(p: TaskPriorities) {
    const cur = form.getValues("priorityIds") ?? [];
    const next = cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p];
    form.setValue("priorityIds", next, { shouldDirty: true });
  }

  function toggleProject(id: string) {
    const cur = form.getValues("projectIds") ?? [];
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    form.setValue("projectIds", next, { shouldDirty: true });
  }

  function handleClear() {
    form.reset(getDefaultValues());
  }

  useEffect(() => {
    if (!open) {
      setRespQuery("");
      setProjectQuery("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[min(90vh,760px)] flex-col gap-0 p-0 sm:max-w-lg"
        showCloseButton
      >
        <DialogHeader className="p-6 pb-2 pr-14">
          <DialogTitle>Filtros da tabela de tarefas</DialogTitle>
          <DialogDescription>
            Prazo, status, prioridade, responsável e projeto. Afeta apenas a
            visualização em tabela; o Kanban mantém os próprios filtros.
          </DialogDescription>
        </DialogHeader>

        <Form {...formRhf}>
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Prazo (deadline)</Label>
              <DatePickerForm form={formRhf} />
              <p className="text-muted-foreground text-xs">
                Sem datas = sem filtro por prazo. Com intervalo = tarefas cujo
                prazo está no período (sem prazo válido continuam visíveis).
              </p>
            </div>

            <Separator />

            <FormField
              control={form.control}
              name="statusQuickFilter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Filtro rápido por status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {TASK_STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <Separator />

            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Visibilidade por status</p>
                <p className="text-muted-foreground text-xs">
                  Desmarque para ocultar tarefas com esse status (além do filtro
                  rápido acima).
                </p>
              </div>
              <div className="border-border rounded-md border">
                {TASK_STATUS_OPTIONS.map((s) => (
                  <ToggleRow
                    key={s.id}
                    id={`task-filter-show-status-${s.id}`}
                    label={`Exibir: ${s.name}`}
                    checked={!hiddenStatusIds.includes(s.id as TaskStatus)}
                    onCheckedChange={(show) => {
                      const isHidden = hiddenStatusIds.includes(s.id as TaskStatus);
                      if (show && isHidden) toggleHiddenStatus(s.id as TaskStatus);
                      if (!show && !isHidden) toggleHiddenStatus(s.id as TaskStatus);
                    }}
                  />
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Prioridade</p>
                <p className="text-muted-foreground text-xs">
                  Marque prioridades para restringir a lista. Nenhuma marcada =
                  todas.
                </p>
              </div>
              <div className="border-border rounded-md border">
                {TASK_PRIORITIES_OPTIONS.map((p) => (
                  <ToggleRow
                    key={p.id}
                    id={`task-filter-priority-${p.id}`}
                    label={p.name}
                    checked={priorityIds.includes(p.id as TaskPriorities)}
                    onCheckedChange={(checked) => {
                      const has = priorityIds.includes(p.id as TaskPriorities);
                      if (checked === has) return;
                      togglePriority(p.id as TaskPriorities);
                    }}
                  />
                ))}
              </div>
            </div>

            <Separator />

            <FilterSection
              title="Responsável"
              hint="Desmarque para ocultar tarefas desse responsável."
              searchPlaceholder="Buscar responsável..."
              searchQuery={respQuery}
              onSearchChange={setRespQuery}
            >
              {filteredResp.length === 0 ? (
                <p className="text-muted-foreground p-3 text-sm">
                  Nenhum responsável encontrado.
                </p>
              ) : (
                filteredResp.map((r) => (
                  <ToggleRow
                    key={r.id}
                    id={`task-filter-resp-${r.id}`}
                    label={r.name}
                    checked={!hiddenResponsibleIds.includes(r.id)}
                    onCheckedChange={(show) => {
                      const isHidden = hiddenResponsibleIds.includes(r.id);
                      if (show && isHidden) toggleHiddenResponsible(r.id);
                      if (!show && !isHidden) toggleHiddenResponsible(r.id);
                    }}
                  />
                ))
              )}
            </FilterSection>

            <Separator />

            <FilterSection
              title="Projeto"
              hint="Marcados = apenas esses projetos. Nenhum = todos."
              searchPlaceholder="Buscar projeto..."
              searchQuery={projectQuery}
              onSearchChange={setProjectQuery}
            >
              {filteredProjects.length === 0 ? (
                <p className="text-muted-foreground p-3 text-sm">
                  Nenhum projeto encontrado.
                </p>
              ) : (
                filteredProjects.map((p) => (
                  <ToggleRow
                    key={p.id}
                    id={`task-filter-proj-${p.id}`}
                    label={p.name}
                    checked={projectIds.includes(p.id)}
                    onCheckedChange={(checked) => {
                      const has = projectIds.includes(p.id);
                      if (checked === has) return;
                      toggleProject(p.id);
                    }}
                  />
                ))
              )}
            </FilterSection>
          </div>

          <DialogFooter className="border-border bg-background shrink-0 gap-2 border-t p-4 sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="w-full sm:w-auto"
            >
              Limpar filtros
            </Button>
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Aplicar e fechar
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
