import { Equipament } from "@/lib/models/Equipament";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import api from "@/lib/api";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { EquipamentCategory } from "@/lib/models/EquipamentCategory";
import SelectForm from "../components/inputs/SelectForm";

type EquipamentModalProps = BaseModalProps<Equipament>;

export default function EquipamentModal(props: EquipamentModalProps) {
  const form = useForm<Equipament>({
    defaultValues: {
      name: props.selectedObject?.name,
      price: props.selectedObject?.price,
      purchaseDate: props.selectedObject?.purchaseDate,
      categoryId: props.selectedObject?.categoryId,
    },
  });

  async function handleSubmit(data: Partial<Equipament>) {
    try {
      data.purchaseDate = new Date(data.purchaseDate);

      if (props.selectedObject?.id) {
        await update(data);
        toast.success("Equipamento atualizado com sucesso.");
      } else {
        await create(data);
        toast.success("Equipamento criado com sucesso.");
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

  async function create(data: Partial<Equipament>) {
    await api.post("/equipaments", data);
  }

  async function update(data: Partial<Equipament>) {
    await api.put(
      `/equipaments/${props.selectedObject?.id}`,
      data
    );
  }

  async function handleClose() {
    if (props?.setAction) props.setAction(null);
    if (props?.setSelectedObject) props.setSelectedObject(null);
    form.reset();
    if (props?.refetch) props.refetch();
  }

  const {
    data: categories,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<EquipamentCategory[]>({
    queryKey: ["data_equipamentCategories"],
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get(
          `/equipament-categories`
        );
        return res.data;
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });  

  return (
    <Modal<Equipament>
      title="Equipamento"
      description="Adicione um equipamento"
      action={props.action}
      setAction={props.setAction}
      setSelectedObject={props.setSelectedObject}
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Form {...form}>
        <form className="py-6">
          <InputForm
            name="code"
            label="Código"
            placeholder="Código"
            type="text"
            required
            form={form}
          />
          <InputForm
            name="name"
            label="Nome"
            placeholder="Nome"
            type="text"
            required
            form={form}
          />
          <InputForm
            name="price"
            label="Preço"
            placeholder="Preço"
            type="number"
            required
            form={form}
          />
          <InputForm
            name="purchaseDate"
            label="Data de compra"
            placeholder="Data de compra"
            type="date"
            required
            form={form}
          />
          <SelectForm
            name="categoryId"
            label="Categoria"
            options={categories ?? []}
          
            required
            form={form}
            isLoading={isLoading}
            disabled={isFetching}
          />
        </form>
      </Form>
    </Modal>
  );
}
