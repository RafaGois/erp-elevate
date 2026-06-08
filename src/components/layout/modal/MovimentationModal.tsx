import Modal from "./components/Modal";
import { BaseModalProps } from "@/types/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import api from "@/lib/api";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import SelectForm from "../components/inputs/SelectForm";
import Movimentation from "@/types/models/movimentations/Movimentation";
import User from "@/types/models/User";
import BankAccount from "@/types/models/movimentations/BankAccount";
import MovimentationCategory from "@/types/models/movimentations/Category";
import { useMemo } from "react";
import MovimentationType from "@/types/enums/MovimentationType";

const MOVIMENTATION_TYPE_OPTIONS = [
  { id: MovimentationType.ENTRADA, name: "Entrada" },
  { id: MovimentationType.SAIDA, name: "Saída" },
] as const;


type MovimentationModalProps = BaseModalProps<Movimentation>;

export default function MovimentationModal(props: MovimentationModalProps) {
  const form = useForm<Movimentation>({
    defaultValues: {
      description: props.selectedObject?.description,
      value: props.selectedObject?.value,
      date: returnCorrctDate(props.selectedObject?.date),
      userId: props.selectedObject?.userId,
      Type: (props.selectedObject?.Type as MovimentationType) ?? MovimentationType.ENTRADA,
      bankAccountId: props.selectedObject?.bankAccountId,
      categoryId: props.selectedObject?.categoryId,
      installments: props.selectedObject?.installments ?? 1,
    },
  });

  function returnCorrctDate(date: Date) {
    if(!date) return new Date();

    const dateLocal = new Date(date);
    dateLocal.setDate(dateLocal.getDate() - 1);
    return dateLocal; 
  }

  async function handleSubmit(data: Movimentation) {
    try {

      if (props.selectedObject?.id) {
       
        await update(data);
        toast.success("Movimentação atualizada com sucesso.");
      } else {
        console.log(data);
        
        await create(data);
        toast.success("Movimentação criada com sucesso.");
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

  function normalizePayload(data: Movimentation) {
    data.date = new Date(data.date?.toString() ?? "");
    data.installments = Math.max(1, Math.floor(Number(data.installments) || 1));
  }

  async function create(data: Movimentation) {
    normalizePayload(data);
    await api.post<Movimentation>("/movimentations", data);
  }

  async function update(data: Movimentation) {
    normalizePayload(data);
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

  const selectedType = form.watch("Type");
  const filteredCategories = useMemo(() => {
    if (!selectedType) return [];
    return categories?.filter((category) => category.Type === selectedType) ?? [];
  }, [selectedType, categories]);

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
          <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[min(60vh,28rem)] scrollbar-hide py-2">
            <InputForm
              name="description"
              label="Descrição"
              placeholder="Descrição"
              type="text"
              required
              form={form}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
              <InputForm
                name="value"
                label="Valor"
                placeholder="Valor da parcela "
                type="number"
                required
                form={form}
              />
              <InputForm
                name="installments"
                label="Parcelas"
                placeholder="1"
                type="number"
                form={form}
              />
            </div>
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
                name="Type"
                label="Tipo"
                options={[...MOVIMENTATION_TYPE_OPTIONS]}
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
