"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
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
import { DatePickerForm } from "@/components/layout/components/inputs/DatePickerForm";
import MovimentationType from "@/lib/enums/MovimentationType";
import type User from "@/lib/models/User";
import type BankAccount from "@/lib/models/movimentations/BankAccount";
import type MovimentationCategory from "@/lib/models/movimentations/Category";
import type { MovimentationsFilterValues } from "./movimentations-filter-types";

const TYPE_OPTIONS: { id: MovimentationType; label: string }[] = [
  { id: MovimentationType.ENTRADA, label: "Entrada" },
  { id: MovimentationType.SAIDA, label: "Saída" },
];

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

export type MovimentationsFilterDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<MovimentationsFilterValues>;
  categories: MovimentationCategory[];
  bankAccounts: BankAccount[];
  users: User[];
  getDefaultValues: () => MovimentationsFilterValues;
};

export function MovimentationsFilterDialog({
  open,
  onOpenChange,
  form,
  categories,
  bankAccounts,
  users,
  getDefaultValues,
}: MovimentationsFilterDialogProps) {
  const formRhf = form as unknown as UseFormReturn<FieldValues>;

  const [catQuery, setCatQuery] = useState("");
  const [bankQuery, setBankQuery] = useState("");
  const [userQuery, setUserQuery] = useState("");

  const types = form.watch("types") ?? [];
  const categoryIds = form.watch("categoryIds") ?? [];
  const bankIds = form.watch("bankAccountIds") ?? [];
  const userIds = form.watch("userIds") ?? [];

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.name.localeCompare(b.name)),
    [categories],
  );
  const sortedBanks = useMemo(
    () => [...bankAccounts].sort((a, b) => a.name.localeCompare(b.name)),
    [bankAccounts],
  );
  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.name.localeCompare(b.name)),
    [users],
  );

  const filteredCategories = useMemo(() => {
    const q = catQuery.trim().toLowerCase();
    if (!q) return sortedCategories;
    return sortedCategories.filter((c) => c.name.toLowerCase().includes(q));
  }, [sortedCategories, catQuery]);

  const filteredBanks = useMemo(() => {
    const q = bankQuery.trim().toLowerCase();
    if (!q) return sortedBanks;
    return sortedBanks.filter((b) => b.name.toLowerCase().includes(q));
  }, [sortedBanks, bankQuery]);

  const filteredUsers = useMemo(() => {
    const q = userQuery.trim().toLowerCase();
    if (!q) return sortedUsers;
    return sortedUsers.filter((u) => u.name.toLowerCase().includes(q));
  }, [sortedUsers, userQuery]);

  function toggleId(
    field: "categoryIds" | "bankAccountIds" | "userIds",
    id: string,
  ) {
    const list = form.getValues(field) ?? [];
    const next = list.includes(id)
      ? list.filter((x) => x !== id)
      : [...list, id];
    form.setValue(field, next, { shouldDirty: true });
  }

  function handleClear() {
    form.reset(getDefaultValues());
  }

  useEffect(() => {
    if (!open) {
      setCatQuery("");
      setBankQuery("");
      setUserQuery("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[min(90vh,720px)] flex-col gap-0 p-0 sm:max-w-lg"
        showCloseButton
      >
        <DialogHeader className="p-6 pb-2 pr-14">
          <DialogTitle>Filtros de movimentações</DialogTitle>
          <DialogDescription>
            Período, tipos (um ou mais), categoria, conta bancária e usuário.
            Deixe uma seção sem marcação para não filtrar por ela.
          </DialogDescription>
        </DialogHeader>

        <Form {...formRhf}>
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Período</Label>
              <DatePickerForm form={formRhf} />
            </div>

            <Separator />

            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Tipo</p>
                <p className="text-muted-foreground text-xs">
                  Marque os tipos que devem aparecer. Nenhuma marcação = todos.
                </p>
              </div>
              <div className="border-border rounded-md border">
                {TYPE_OPTIONS.map((opt) => (
                  <ToggleRow
                    key={opt.id}
                    id={`mov-filter-type-${opt.id}`}
                    label={opt.label}
                    checked={types.includes(opt.id)}
                    onCheckedChange={(checked) => {
                      const has = types.includes(opt.id);
                      if (checked === has) return;
                      form.setValue(
                        "types",
                        has
                          ? types.filter((x) => x !== opt.id)
                          : [...types, opt.id],
                        { shouldDirty: true },
                      );
                    }}
                  />
                ))}
              </div>
            </div>

            <Separator />

            <FilterSection
              title="Categoria"
              hint="Marcadas = só essas categorias. Nenhuma = todas."
              searchPlaceholder="Buscar categoria..."
              searchQuery={catQuery}
              onSearchChange={setCatQuery}
            >
              {filteredCategories.length === 0 ? (
                <p className="text-muted-foreground p-3 text-sm">
                  Nenhuma categoria encontrada.
                </p>
              ) : (
                filteredCategories.map((c) => (
                  <ToggleRow
                    key={c.id}
                    id={`mov-filter-cat-${c.id}`}
                    label={c.name}
                    checked={categoryIds.includes(c.id)}
                    onCheckedChange={(next) => {
                      if (next !== categoryIds.includes(c.id))
                        toggleId("categoryIds", c.id);
                    }}
                  />
                ))
              )}
            </FilterSection>

            <Separator />

            <FilterSection
              title="Conta bancária"
              hint="Marcadas = só essas contas. Nenhuma = todas."
              searchPlaceholder="Buscar conta..."
              searchQuery={bankQuery}
              onSearchChange={setBankQuery}
            >
              {filteredBanks.length === 0 ? (
                <p className="text-muted-foreground p-3 text-sm">
                  Nenhuma conta encontrada.
                </p>
              ) : (
                filteredBanks.map((b) => (
                  <ToggleRow
                    key={b.id}
                    id={`mov-filter-bank-${b.id}`}
                    label={b.name}
                    checked={bankIds.includes(b.id)}
                    onCheckedChange={(next) => {
                      if (next !== bankIds.includes(b.id))
                        toggleId("bankAccountIds", b.id);
                    }}
                  />
                ))
              )}
            </FilterSection>

            <Separator />

            <FilterSection
              title="Usuário"
              hint="Marcados = só esses usuários. Nenhum = todos."
              searchPlaceholder="Buscar usuário..."
              searchQuery={userQuery}
              onSearchChange={setUserQuery}
            >
              {filteredUsers.length === 0 ? (
                <p className="text-muted-foreground p-3 text-sm">
                  Nenhum usuário encontrado.
                </p>
              ) : (
                filteredUsers.map((u) => (
                  <ToggleRow
                    key={u.id}
                    id={`mov-filter-user-${u.id}`}
                    label={u.name}
                    checked={userIds.includes(u.id)}
                    onCheckedChange={(next) => {
                      if (next !== userIds.includes(u.id))
                        toggleId("userIds", u.id);
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
