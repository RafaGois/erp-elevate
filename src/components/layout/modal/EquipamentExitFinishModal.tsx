import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
//import Checkbox from "../components/inputs/Checkbox";
import api from "@/lib/api";
import { toast } from "sonner";
import { EquipamentExit } from "@/lib/models/EquipamentExit";

type EquipamentExitModalProps = BaseModalProps<EquipamentExit>;

export default function EquipamentExitFinishModal(
  props: EquipamentExitModalProps
) {
  const form = useForm<EquipamentExit>();

  async function handleSubmit(data: Partial<EquipamentExit>) {
    try {
      if (data.equipaments?.length == 0) {
        toast.error("Selecione pelo menos um equipamento.");
        return;
      }

      await update(data);
      toast.success("Equipamento atualizado com sucesso.");

      handleClose();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao criar ou atualizar equipamento."
      );
    }
  }

  async function update(data: Partial<EquipamentExit>) {
    await api.put(`/equipament-exits/${props.selectedObject?.id}`, data);
  }

  async function handleClose() {
    if (props?.setAction) props.setAction(null);
    if (props?.setSelectedObject) props.setSelectedObject(null);
    form.reset();
    if (props?.refetch) props.refetch();
  }

  return (
    <Modal<EquipamentExit>
      title="Finalizar Saida de Equipamentos"
      description="Finalize a saida de seus equipamentos."
      action={props.action}
      setAction={props.setAction}
      setSelectedObject={props.setSelectedObject}
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className="flex flex-col gap-3">
        
      </div>
    </Modal>
  );
}
