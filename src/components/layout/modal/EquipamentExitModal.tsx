import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import axios from "axios";
import { toast } from "sonner";
import { Equipament } from "@/lib/models/Equipament";
import { EquipamentExit } from "@/lib/models/EquipamentExit";
import { MultiSelectForm } from "../components/inputs/MultiSelectForm";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TextAreaForm from "@/components/layout/components/inputs/TextareaForm";

type EquipamentExitModalProps = BaseModalProps<EquipamentExit>;

export default function EquipamentExitModal(props: EquipamentExitModalProps) {
  const [selectedEquipaments, setSelectedEquipaments] = useState<string[]>([]);

  const form = useForm<EquipamentExit>({
    defaultValues: {
      name: props.selectedObject?.name,
      observation: props.selectedObject?.observation,
      equipaments: props.selectedObject?.equipaments,
      date: props.selectedObject?.date ?? new Date(),
    },
  });

  console.log(props.selectedObject?.date ?? new Date());

  const { data: equipaments } = useQuery<Equipament[]>({
    queryKey: ["data_equipaments"],
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/equipaments`);
        return res.data;
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });

  async function handleSubmit(data: Partial<EquipamentExit>) {
    try {
      if (data.equipaments?.length == 0) {
        toast.error("Selecione pelo menos um equipamento.");
        return;
      }

      data.equipaments =
        equipaments?.filter((equipament) =>
          selectedEquipaments.includes(equipament.uid)
        ) ?? [];

      if (props.selectedObject?.uid) {
        await update(data);
        toast.success("Equipamento atualizado com sucesso.");
      } else {
        await create(data);
        toast.success("Equipamento criado com sucesso.");
      }

      handleClose();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao criar ou atualizar equipamento."
      );
    }
  }

  async function create(data: Partial<EquipamentExit>) {
    await axios.post("/api/equipamentExits", data);
  }

  async function update(data: Partial<EquipamentExit>) {
    await axios.put(`/api/equipamentExits/${props.selectedObject?.uid}`, data);
  }

  async function handleClose() {
    if (props?.setAction) props.setAction(null);
    if (props?.setSelectedObject) props.setSelectedObject(null);
    form.reset();
    if (props?.refetch) props.refetch();
  }

  return (
    <Modal<EquipamentExit>
      title="Saida de Equipamentos"
      description="Adicione uma saida para seus equipamentos."
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
          <TextAreaForm
            name="observation"
            label="Observação"
            placeholder="Observação"
            type="text"
            required
            form={form}
          />
          <MultiSelectForm
            label="Equipamentos"
            options={equipaments ?? []}
            onValueChange={setSelectedEquipaments}
            defaultValue={
              props?.selectedObject?.equipaments?.map(
                (equipament) => equipament.uid
              ) ?? []
            }
          />
          <InputForm
            name="date"
            label="Data"
            placeholder="Data"
            type="date"
            required
            form={form}
          />
        </form>
      </Form>
    </Modal>
  );
}
