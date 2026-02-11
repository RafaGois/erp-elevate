import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import api from "@/lib/api";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import SelectForm from "../components/inputs/SelectForm";
import Fixed from "@/lib/models/movimentations/Fixed";
import MovimentationType from "@/lib/models/movimentations/Type";
import MovimentationCategory from "@/lib/models/movimentations/Category";
import { useMemo } from "react";

type FixedMovimentationModalProps = BaseModalProps<Fixed>;

export default function FixedMovimentationModal(
  props: FixedMovimentationModalProps,
) {
  const form = useForm<Fixed>({
    defaultValues: {
      description: props.selectedObject?.description,
      value: props.selectedObject?.value,
      deadline: returnCorrctDeadline(props.selectedObject?.deadline),
      typeId: props.selectedObject?.typeId,
      categoryId: props.selectedObject?.categoryId,
    },
  });

  /* 
  
Invalid `repository.create()` invocation in /var/www/elevate_api/src/service/fixedMovimentation.service.ts:24:50 21 } 22 23 
async function create(fixedMovimentation: FixedMovimentation): 
Promise<FixedMovimentation> { → 24 const newFixedMovimentation = await repository.create({ data: { description: "teste", value: 4500, deadline: "2026-02-09T13:58:35.000Z", typeId: "593119bb-2002-4953-974d-f916f4557843", categoryId: "b2f321a5-74ea-4d63-86ad-29b9c30e667d" }, include: { Type: true, BankAccount: true, ~~~~~~~~~~~ Category: true } }) Unknown field `BankAccount` for include statement on model `FixedMovimentation`. Available options are marked with ?.

  
  */

  function returnCorrctDeadline(deadline: Date) {
    if (!deadline) return new Date();

    let deadlineLocal = new Date(deadline);
    return deadlineLocal;
  }

  async function handleSubmit(data: Partial<Fixed>) {
    try {
      if (props.selectedObject?.id) {
        await update(data);
        toast.success("Movimentação fixa atualizada com sucesso.");
      } else {
        await create(data);
        toast.success("Movimentação fixa criada com sucesso.");
      }

      handleClose();
    } catch (error) {
      toast.error(
        error.response.data[0] ??
          error.message ??
          "Erro ao criar ou atualizar movimentação fixa.",
      );
    }
  }

  async function create(data: Partial<Fixed>) {
    data.deadline = new Date(data.deadline?.toString() ?? "");
    console.log(data);
    
    await api.post(
      "/fixed-movimentations",
      data,
    );
  }

  async function update(data: Partial<Fixed>) {
    await api.put(
      `/fixed-movimentations/${props.selectedObject?.id}`,
      data,
    );
  }

  const { data: types } = useQuery<MovimentationType[]>({
    queryKey: ["data_movimentation_types"],
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await api.get(
        "/movimentation-types",
      );
      return res.data;
    },
  });

  const { data: categories } = useQuery<MovimentationCategory[]>({
    queryKey: ["data_movimentation_categories"],
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await api.get(
        "/movimentation-categories",
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

  const selectedTypeId = form.watch("typeId");
  const filteredCategories = useMemo(() => {
    if (!selectedTypeId) return [];
    return (
      categories?.filter((category) => category.Type.id === selectedTypeId) ??
      []
    );
  }, [selectedTypeId, categories]);

  return (
    <Modal<Fixed>
      title="Movimentação Fixa"
      description="Adicione uma movimentação fixa"
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
            name="deadline"
            label="Prazo"
            placeholder="Prazo"
            type="date"
            required
            form={form}
          />
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
              options={filteredCategories}
              required
              form={form}
            />
          </div>
        </form>
      </Form>
    </Modal>
  );
}
