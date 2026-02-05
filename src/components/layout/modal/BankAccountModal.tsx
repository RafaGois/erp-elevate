import BankAccount from "@/lib/models/BankAccount";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import axios from "axios";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import SelectForm from "../components/inputs/SelectForm";
import User from "@/lib/models/User";

type BankAccountModalProps = BaseModalProps<BankAccount>;

export default function BankAccountModal(props: BankAccountModalProps) {
  const form = useForm<BankAccount>({
    defaultValues: {
      name: props.selectedObject?.name,
      userId: props.selectedObject?.userId,
      number: props.selectedObject?.number,
      agency: props.selectedObject?.agency,
      pixKey: props.selectedObject?.pixKey,
    },
  });

  async function handleSubmit(data: Partial<BankAccount>) {
    try {
      if (props.selectedObject?.id) {
        await update(data);
        toast.success("Conta bancária atualizada com sucesso.");
      } else {
        await create(data);
        toast.success("Conta bancária criada com sucesso.");
      }

      handleClose();
    } catch (error) {
      toast.error(
        error.response.data[0] ??
          error.message ??
          "Erro ao criar ou atualizar conta bancária."
      );
    }
  }

  async function create(data: Partial<BankAccount>) {    
    await axios.post("https://elevatepromedia.com/api/bank-accounts", data);
  }

  async function update(data: Partial<BankAccount>) {
    await axios.put(
      `https://elevatepromedia.com/api/bank-accounts/${props.selectedObject?.id}`,
      data
    );
  }

  async function handleClose() {
    if (props?.setAction) props.setAction(null);
    if (props?.setSelectedObject) props.setSelectedObject(null);
    form.reset();
    if (props?.refetch) props.refetch();
  }

  const { data: users } = useQuery<User[]>({
    queryKey: ["data_users"],
    queryFn: async () => {
      const res = await axios.get("https://elevatepromedia.com/api/users");
      return res.data;
    },
  });

  return (
    <Modal<BankAccount>
      title="Conta bancária"
      description="Adicione uma conta bancária"
      action={props.action}
      setAction={props.setAction}
      setSelectedObject={props.setSelectedObject}
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Form {...form}>
        <form className="py-6">
          <InputForm
            name="name"
            label="Nome"
            placeholder="Nome"
            type="text"
            required
            form={form}
          />
          <SelectForm
            name="userId"
            label="Usuário"
            options={users}
            required
            form={form}
          />
          <div className="flex flex-row gap-2 mt-4"> 
            <InputForm
              name="number"
              label="Número"
              placeholder="Número"
              type="text"
              required
              form={form}
            />
            <InputForm
              name="agency"
              label="Agência"
              placeholder="Agência"
              type="text"
              required
              form={form}
            />
          </div>
          <InputForm
              name="pixKey"
              label="Chave PIX"
              placeholder="Chave PIX"
              type="text"
              required
              form={form}
            />
        </form>
      </Form>
    </Modal>
  );
}
