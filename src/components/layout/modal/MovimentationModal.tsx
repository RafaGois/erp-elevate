import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import api from "@/lib/api";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import SelectForm from "../components/inputs/SelectForm";
import Movimentation from "@/lib/models/movimentations/Motimentation";
import User from "@/lib/models/User";
import MovimentationType from "@/lib/models/movimentations/Type";
import BankAccount from "@/lib/models/movimentations/BankAccount";
import MovimentationCategory from "@/lib/models/movimentations/Category";
import { useEffect, useMemo, useState } from "react";

type MovimentationModalProps = BaseModalProps<Movimentation>;

export default function MovimentationModal(props: MovimentationModalProps) {
  const form = useForm<Movimentation>({
    defaultValues: {
      description: props.selectedObject?.description,
      value: props.selectedObject?.value,
      date: returnCorrctDate(props.selectedObject?.date),
      userId: props.selectedObject?.userId,
      typeId: props.selectedObject?.typeId,
      bankAccountId: props.selectedObject?.bankAccountId,
      categoryId: props.selectedObject?.categoryId,
    },
  });

  function returnCorrctDate(date: Date) {
    if(!date) return new Date();

    let dateLocal = new Date(date);
    dateLocal.setDate(dateLocal.getDate() - 1);
    return dateLocal;
  }

  async function handleSubmit(data: Partial<Movimentation>) {
    try {
      
      if (props.selectedObject?.id) {
       
        await update(data);
        toast.success("Categoria de equipamento atualizada com sucesso.");
      } else {
        await create(data);
        toast.success("Categoria de equipamento criada com sucesso.");
      }

      handleClose();
    } catch (error) {
      toast.error(
        error.response.data[0] ??
          error.message ??
          "Erro ao criar ou atualizar equipamento."
      );
    }
  }

  async function create(data: Partial<Movimentation>) {
    data.date = new Date(data.date?.toString() ?? '');
    await api.post("/movimentations", data);
  }

  async function update(data: Partial<Movimentation>) {
    await api.put(
      `/movimentations/${props.selectedObject?.id}`,
      data
    );
  }

  const { data: users } = useQuery<User[]>({
    queryKey: ["data_users"],
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
  });

  const { data: types } = useQuery<MovimentationType[]>({
    queryKey: ["data_movimentation_types"],
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await api.get(
        "/movimentation-types"
      );
      return res.data;
    },
  });

  const { data: bankAccounts } = useQuery<BankAccount[]>({
    queryKey: ["data_bank_accounts"],
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await api.get(
        "/bank-accounts"
      );
      return res.data;
    },
  });

  const { data: categories } = useQuery<MovimentationCategory[]>({
    queryKey: ["data_movimentation_categories"],
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await api.get(
        "/movimentation-categories"
      );
      return res.data;
    },
  });

  async function handleClose() {
    if (props?.setAction) props.setAction(null);
    if (props?.setSelectedObject) props.setSelectedObject(null);
    form.reset();
    if (props?.refetch) props.refetch();
  }

  const selectedUserId = form.watch("userId");
  const filteredBankAccounts = useMemo(() => {
    if (!selectedUserId) return [];
    return bankAccounts?.filter((bankAccount) => bankAccount.User.id === selectedUserId) ?? [];
  }, [selectedUserId, bankAccounts]);

  const selectedTypeId = form.watch("typeId");
  const filteredCategories = useMemo(() => {
    if (!selectedTypeId) return [];
    return categories?.filter((category) => category.Type.id === selectedTypeId) ?? [];
  }, [selectedTypeId, categories]);

  return (
    <Modal<Movimentation>
      title="Movimentação"
      description="Adicione uma movimentação"
      action={props.action}
      setAction={props.setAction}
      setSelectedObject={props.setSelectedObject}
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Form {...form}>
        <form className="flex flex-col gap-4 py-2">
          <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[min(60vh,28rem)] pr-1">
            <InputForm
              name="description"
              label="Descrição"
              placeholder="Descrição"
              type="text"
              required
              form={form}
            />
            <InputForm
              name="value"
              label="Valor"
              placeholder="Valor"
              type="number"
              required
              form={form}
            />
            <InputForm
              name="date"
              label="Data"
              placeholder="Data"
              type="date"
              required
              form={form}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
              <SelectForm
                name="userId"
                label="Usuário Responsável"
                options={users ?? []}
                required
                form={form}
              />
              <SelectForm
                name="bankAccountId"
                label="Conta Bancária"
                options={filteredBankAccounts}
                required
                form={form}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
              <SelectForm
                name="typeId"
                label="Tipo"
                options={types ?? []}
                required
                form={form}
              />
              <SelectForm
                name="categoryId"
                label="Categoria"
                options={filteredCategories}
                required
                form={form}
              />
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
