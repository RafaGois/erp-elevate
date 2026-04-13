"use client";

import DataCard from "@/components/layout/components/card/DataCard";
import { DataTable } from "@/components/layout/components/datatable/DataTable";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import useAppData from "@/data/hooks/useAppData";
import ModalAction from "@/lib/enums/modalAction";
import Movimentation from "@/lib/models/movimentations/Motimentation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDownRight,
  ArrowUpDown,
  ArrowUpRight,
  DollarSign,
  Hash,
  ListFilter,
} from "lucide-react";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import MovimentationModal from "@/components/layout/modal/MovimentationModal";
import { useForm, useWatch } from "react-hook-form";
import { endOfDay, startOfDay, subDays } from "date-fns";
import MovimentationType from "@/lib/enums/MovimentationType";
import User from "@/lib/models/User";
import BankAccount from "@/lib/models/movimentations/BankAccount";
import MovimentationCategory from "@/lib/models/movimentations/Category";
import { MovimentationsFilterDialog } from "./_components/MovimentationsFilterDialog";
import type { MovimentationsFilterValues } from "./_components/movimentations-filter-types";
import {
  MOVIMENTATIONS_FILTERS_STORAGE_KEY,
  parseMovimentationsFiltersFromStorage,
  serializeMovimentationsFilters,
} from "./_components/movimentations-filter-storage";

function getDefaultMovimentationFilters(): MovimentationsFilterValues {
  return {
    ranges: { from: subDays(new Date(), 30), to: new Date() },
    types: [],
    categoryIds: [],
    bankAccountIds: [],
    userIds: [],
  };
}

function countActiveFilterDimensions(
  v: Partial<MovimentationsFilterValues> | undefined,
): number {
  if (!v) return 0;
  let n = 0;
  if (v.types?.length) n++;
  if (v.categoryIds?.length) n++;
  if (v.bankAccountIds?.length) n++;
  if (v.userIds?.length) n++;
  return n;
}

export default function Movimentations() {
  const filterForm = useForm<MovimentationsFilterValues>({
    defaultValues: getDefaultMovimentationFilters(),
  });
  const filterParams = useWatch({ control: filterForm.control });
  const filtersRestoredRef = useRef(false);

  /** Restaura do localStorage antes do paint para evitar sobrescrever com o default. */
  useLayoutEffect(() => {
    try {
      const raw = localStorage.getItem(MOVIMENTATIONS_FILTERS_STORAGE_KEY);
      const parsed = parseMovimentationsFiltersFromStorage(raw);
      if (parsed) {
        filterForm.reset(parsed);
      }
    } catch {
      localStorage.removeItem(MOVIMENTATIONS_FILTERS_STORAGE_KEY);
    } finally {
      filtersRestoredRef.current = true;
    }
    // Montagem única; `filterForm` do useForm é estável neste ciclo de vida.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!filtersRestoredRef.current) return;
    try {
      const values = filterForm.getValues();
      localStorage.setItem(
        MOVIMENTATIONS_FILTERS_STORAGE_KEY,
        serializeMovimentationsFilters(values),
      );
    } catch {
      /* quota / modo privado */
    }
  }, [filterParams, filterForm]);

  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState<Movimentation | null>(
    null,
  );
  const [action, setAction] = useState<ModalAction | null>(null);

  const { setReloading } = useAppData();

  const activeFilterDimensions = useMemo(
    () => countActiveFilterDimensions(filterParams),
    [
      filterParams?.types,
      filterParams?.categoryIds,
      filterParams?.bankAccountIds,
      filterParams?.userIds,
    ],
  );

  const columns: ColumnDef<Movimentation>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Descrição
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "description",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Valor
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "value",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "date",
      cell: ({ row }) => {
        const item = row.original;
        const date = new Date(item.date);
        return <span>{date.toLocaleDateString("pt-BR")}</span>;
      },
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Usuário
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "User",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item.User.name}</span>;
      },
    },
    {
      accessorKey: "BankAccount",
      header: "Conta",
      accessorFn: (row) => row?.BankAccount?.name ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.BankAccount?.name ?? "-"}</span>;
      },
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tipo
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "type",
      cell: ({ row }) => {
        const item = row.original;
        const type = item?.Type;
        if (!type) return "-";
        return (
          <span>
            {type === MovimentationType.ENTRADA ? "Entrada" : "Saída"}
          </span>
        );
      },
    },
    {
      accessorKey: "Category",
      header: "Categoria",
      accessorFn: (row) => row?.Category?.name ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.Category?.name ?? "-"}</span>;
      },
    },
    {
      header: () => <p>Opções</p>,
      accessorKey: "Opções",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <FloatingMenu<Movimentation>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, refetch } = useQuery<Movimentation[]>({
    queryKey: ["data_movimentations"],
    refetchInterval: 30000,
    staleTime: Infinity,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get(`/movimentations`);
        return res.data;
      } catch {
        return [];
      }
    },
  });

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["data_users"],
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
  });

  const { data: bankAccounts = [] } = useQuery<BankAccount[]>({
    queryKey: ["data_bank_accounts"],
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await api.get("/bank-accounts");
      return res.data;
    },
  });

  const { data: categories = [] } = useQuery<MovimentationCategory[]>({
    queryKey: ["data_movimentation_categories"],
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await api.get("/movimentation-categories");
      return res.data;
    },
  });

  async function remove(uid: string) {
    setReloading?.(true);
    await api.delete(`/movimentations/${uid}`);
  }

  const filteredData = useMemo(() => {
    const from = filterParams?.ranges?.from
      ? startOfDay(new Date(filterParams.ranges.from))
      : undefined;
    const toBase =
      filterParams?.ranges?.to ?? filterParams?.ranges?.from;
    const to = toBase ? endOfDay(new Date(toBase)) : undefined;

    const typesSel = filterParams?.types ?? [];
    const categoryIds = filterParams?.categoryIds ?? [];
    const bankAccountIds = filterParams?.bankAccountIds ?? [];
    const userIds = filterParams?.userIds ?? [];

    return (data ?? []).filter((item) => {
      if (
        typesSel.length > 0 &&
        !typesSel.includes(item?.Type as MovimentationType)
      ) {
        return false;
      }

      if (categoryIds.length > 0) {
        const cid = item?.Category?.id ?? item?.categoryId;
        if (!cid || !categoryIds.includes(String(cid))) return false;
      }

      if (bankAccountIds.length > 0) {
        const bid =
          item?.BankAccount?.id ?? (item as { bankAccountId?: string })?.bankAccountId;
        if (!bid || !bankAccountIds.includes(String(bid))) return false;
      }

      if (userIds.length > 0) {
        const uid = item?.User?.id ?? (item as { userId?: string })?.userId;
        if (!uid || !userIds.includes(String(uid))) return false;
      }

      if (!from && !to) return true;

      const itemDate = item?.date ? new Date(item.date) : undefined;
      if (!itemDate || Number.isNaN(itemDate.getTime())) return false;

      if (from && itemDate < from) return false;
      if (to && itemDate > to) return false;

      return true;
    });
  }, [data, filterParams]);

  return (
    <>
      <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
        <DataCard
          title="Quantidade de Entradas"
          value={
            filteredData.filter(
              (item) => item?.Type === MovimentationType.ENTRADA,
            ).length
          }
          icon={<Hash />}
        />
        <DataCard
          title="Valor Líquido"
          value={
            filteredData
              .filter((item) => item?.Type === MovimentationType.ENTRADA)
              .reduce((acc, item) => acc + item.value, 0) -
            filteredData
              .filter((item) => item?.Type === MovimentationType.SAIDA)
              .reduce((acc, item) => acc + item.value, 0)
          }
          icon={<DollarSign />}
        />
        <DataCard
          title="Entradas"
          value={filteredData
            .filter((item) => item?.Type === MovimentationType.ENTRADA)
            .reduce((acc, item) => acc + item.value, 0)}
          icon={<ArrowUpRight />}
        />
        <DataCard
          title="Saídas"
          value={filteredData
            .filter((item) => item?.Type === MovimentationType.SAIDA)
            .reduce((acc, item) => acc + item.value, 0)}
          icon={<ArrowDownRight />}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        setAction={setAction}
        setSelectedObject={setSelectedObject}
        toolbarStart={
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 shrink-0"
            onClick={() => setFilterDialogOpen(true)}
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
      <MovimentationsFilterDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        form={filterForm}
        categories={categories}
        bankAccounts={bankAccounts}
        users={users}
        getDefaultValues={getDefaultMovimentationFilters}
      />
      <ToolkitModal
        action={action}
        setAction={setAction}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        refetch={refetch}
        ordidaryModal={<MovimentationModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
