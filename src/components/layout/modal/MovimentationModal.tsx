import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import axios from "axios";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import SelectForm from "../components/inputs/SelectForm";
import Movimentation from "@/lib/models/movimentations/Motimentation";
import User from "@/lib/models/User";
import MovimentationType from "@/lib/models/movimentations/Type";
import BankAccount from "@/lib/models/movimentations/BankAccount";
import MovimentationCategory from "@/lib/models/movimentations/Category";
import { useEffect } from "react";

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
    console.log(data.date);
    await axios.post("https://elevatepromedia.com/api/movimentations", data);
  }

  async function update(data: Partial<Movimentation>) {
    await axios.put(
      `https://elevatepromedia.com/api/movimentations/${props.selectedObject?.id}`,
      data
    );
  }

  const { data: users } = useQuery<User[]>({
    queryKey: ["data_users"],
    queryFn: async () => {
      const res = await axios.get("https://elevatepromedia.com/api/users");
      return res.data;
    },
  });

  const { data: types } = useQuery<MovimentationType[]>({
    queryKey: ["data_movimentation_types"],
    queryFn: async () => {
      const res = await axios.get(
        "https://elevatepromedia.com/api/movimentation-types"
      );
      return res.data;
    },
  });

  const { data: bankAccounts } = useQuery<BankAccount[]>({
    queryKey: ["data_bank_accounts"],
    queryFn: async () => {
      const res = await axios.get(
        "https://elevatepromedia.com/api/bank-accounts"
      );
      return res.data;
    },
  });

  const { data: categories } = useQuery<MovimentationCategory[]>({
    queryKey: ["data_movimentation_categories"],
    queryFn: async () => {
      const res = await axios.get(
        "https://elevatepromedia.com/api/movimentation-categories"
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
        <form className="py-6">
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
          <div className="flex flex-row gap-2">
            <SelectForm
              name="userId"
              label="Usuário Responsável"
              options={users}
              required
              form={form}
            />
            <SelectForm
              name="bankAccountId"
              label="Conta Bancária"
              options={bankAccounts}
              required
              form={form}
            />
          </div>
          <div className="flex flex-row gap-2">
            <SelectForm
              name="typeId"
              label="Tipo"
              options={types}
              required
              form={form}
            />
            <SelectForm
              name="categoryId"
              label="Categoria"
              options={categories}
              required
              form={form}
            />
          </div>
        </form>
      </Form>
    </Modal>
  );
}
