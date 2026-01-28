import Project from "@/lib/models/Project";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import axios from "axios";
import { toast } from "sonner";
import SwitchForm from "../components/inputs/SwitchForm";

type ProjectModalProps = BaseModalProps<Project>;

export default function ProjectModal(props: ProjectModalProps) {
  const form = useForm<Project>({
    defaultValues: {
      name: props.selectedObject?.name,
    },
  });

  async function handleSubmit(data: Partial<Project>) {
    try {
      if (props.selectedObject?.id) {
        await update(data);
        toast.success("Projeto atualizado com sucesso.");
      } else {
        await create(data);
        toast.success("Projeto criado com sucesso.");
      }

      handleClose();
    } catch (error) {
      toast.error(
        error.response.data[0] ??
          error.message ??
          "Erro ao criar ou atualizar projeto."
      );
    }
  }

  async function create(data: Partial<Project>) {    
    await axios.post("https://elevatepromedia.com/api/projects", data);
  }

  async function update(data: Partial<Project>) {
    await axios.put(
      `https://elevatepromedia.com/api/projects/${props.selectedObject?.id}`,
      data
    );
  }

  async function handleClose() {
    if (props?.setAction) props.setAction(null);
    if (props?.setSelectedObject) props.setSelectedObject(null);
    form.reset();
    if (props?.refetch) props.refetch();
  }

  return (
    <Modal<Project>
      title="Projeto"
      description="Adicione um projeto"
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
          <SwitchForm
            form={form}
            name="active"
            label="Ativo"
            id="active"
          />
        </form>
      </Form>
    </Modal>
  );
}
