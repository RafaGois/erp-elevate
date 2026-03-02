import User from "@/lib/models/User";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import SelectForm from "../components/inputs/SelectForm";
import api from "@/lib/api";
import { toast } from "sonner";
import { useEffect } from "react";
import { UserLevel } from "@/lib/enums/UserLevel";

const USER_LEVEL_OPTIONS = [
  { id: UserLevel.ADMIN, name: "Admin" },
  { id: UserLevel.USER, name: "Usuário" },
  { id: UserLevel.VIEWER, name: "Visualizador" },
  { id: UserLevel.TESTER, name: "Testador" },
] as const;

type UserFormData = Partial<Pick<User, "name" | "username" | "password">> & {
  level?: string;
};
type UserModalProps = BaseModalProps<User>;

export default function UserModal(props: UserModalProps) {
  const isEdit = !!props.selectedObject?.id;

  const form = useForm<UserFormData>({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      level: UserLevel.USER,
    },
  });

  useEffect(() => {
    if (props.action && props.selectedObject) {
      form.reset({
        name: props.selectedObject.name ?? "",
        username: props.selectedObject.username ?? "",
        password: "",
        level: (props.selectedObject.level as string) ?? UserLevel.USER,
      });
    } else if (props.action && !props.selectedObject) {
      form.reset({
        name: "",
        username: "",
        password: "",
        level: UserLevel.USER,
      });
    }
  }, [props.action, props.selectedObject, form]);

  async function handleSubmit(data: UserFormData) {
    try {
      if (props.selectedObject?.id) {
        await update(data);
        toast.success("Usuário atualizado com sucesso.");
      } else {
        await create(data);
        toast.success("Usuário criado com sucesso.");
      }

      handleClose();
    } catch (error: unknown) {
      const err = error as { response?: { data?: string[] }; message?: string };
      toast.error(
        err?.response?.data?.[0] ??
          err?.message ??
          "Erro ao criar ou atualizar usuário."
      );
    }
  }

  async function create(data: UserFormData) {
    const payload = { ...data };
    await api.post("/users", payload);
  }

  async function update(data: UserFormData) {
    const payload = { ...data };
    if (!payload.password?.trim()) {
      delete payload.password;
    }
    console.log(payload);
    await api.put(`/users/${props.selectedObject?.id}`, payload);
  }

  async function handleClose() {
    if (props?.setAction) props.setAction(null);
    if (props?.setSelectedObject) props.setSelectedObject(null);
    form.reset();
    if (props?.refetch) props.refetch();
  }

  return (
    <Modal<User>
      title="Usuário"
      description={isEdit ? "Edite os dados do usuário" : "Adicione um novo usuário"}
      action={props.action}
      setAction={props.setAction}
      setSelectedObject={props.setSelectedObject}
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Form {...form}>
        <form className="py-6 space-y-4">
          <InputForm
            name="name"
            label="Nome"
            placeholder="Nome"
            type="text"
            required
            form={form}
          />
          <InputForm
            name="username"
            label="Usuário (login)"
            placeholder="Usuário"
            type="text"
            required
            form={form}
          />
          <InputForm
            name="password"
            label={isEdit ? "Nova senha (deixe em branco para manter)" : "Senha"}
            placeholder={isEdit ? "••••••••" : "Senha"}
            type="password"
            required={!isEdit}
            form={form}
          />
          <SelectForm
            name="level"
            label="Nível"
            options={[...USER_LEVEL_OPTIONS]}
            required
            form={form}
          />
        </form>
      </Form>
    </Modal>
  );
}
