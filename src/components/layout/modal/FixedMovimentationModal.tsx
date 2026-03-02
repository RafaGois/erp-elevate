import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import api from "@/lib/api";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import SelectForm from "../components/inputs/SelectForm";
import FixedMovimentation from "@/lib/models/movimentations/FixedMovimentation";
import MovimentationCategory from "@/lib/models/movimentations/Category";
import MovimentationType from "@/lib/enums/MovimentationType";

const MOVIMENTATION_TYPE_OPTIONS = [
  { id: MovimentationType.ENTRADA, name: "Entrada" },
  { id: MovimentationType.SAIDA, name: "Saída" },
] as const;
import { useMemo } from "react";

type FixedMovimentationModalProps = BaseModalProps<FixedMovimentation>;

export default function FixedMovimentationModal(
  props: FixedMovimentationModalProps,
) {
  const form = useForm<Partial<FixedMovimentation>>({
    defaultValues: {
      description: props.selectedObject?.description,
      value: props.selectedObject?.value,
      deadline: returnCorrctDeadline(props.selectedObject?.deadline),
      Type: (props.selectedObject?.Type as MovimentationType) ?? MovimentationType.ENTRADA,
      categoryId: props.selectedObject?.categoryId,
    },
  });


  function returnCorrctDeadline(deadline: Date) {
    if (!deadline) return new Date();

    let deadlineLocal = new Date(deadline);
    return deadlineLocal;
  }

  async function handleSubmit(data: Partial<FixedMovimentation>) {
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

  async function create(data: Partial<FixedMovimentation>) {
    data.deadline = new Date(data.deadline?.toString() ?? "");
    console.log(data);
    
    await api.post(
      "/fixed-movimentations",
      data,
    );
  }

  async function update(data: Partial<FixedMovimentation>) {
    await api.put(
      `/fixed-movimentations/${props.selectedObject?.id}`,
      data,
    );
  }

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

  const selectedType = form.watch("Type");
  const filteredCategories = useMemo(() => {
    if (!selectedType) return [];
    return (
      categories?.filter((category) => category.Type === selectedType) ?? []
    );
  }, [selectedType, categories]);

  return (
    <Modal<FixedMovimentation>
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
        </form>
      </Form>
    </Modal>
  );
}
