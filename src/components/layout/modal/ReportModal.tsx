"use client";

import Report from "@/types/models/Report";
import ReportStatus from "@/types/enums/ReportStatus";
import Modal from "./components/Modal";
import { BaseModalProps } from "@/types/BaseModalProps";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputForm from "../components/inputs/InputForm";
import SelectForm from "../components/inputs/SelectForm";
import api from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import { getReportTemplate } from "@/lib/data/report-template";
import { toast } from "sonner";

type ReportModalProps = BaseModalProps<Report>;

// Competência padrão: mês atual em "YYYY-MM".
function currentCompetencia() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function buildSlug(client: string | null | undefined, competencia: string) {
  return `${client ?? "cliente"}-${competencia}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Criação enxuta — igual ao orçamento: só registramos o relatório (nome, cliente,
 * competência, status). As métricas NÃO são informadas aqui; são preenchidas
 * depois clicando nos valores direto na tela de apresentação (/relatorio/[slug]).
 */
export default function ReportModal(props: ReportModalProps) {
  const reportId = props.selectedObject?.id;
  const selected = props.selectedObject;

  const form = useForm<Report>({
    defaultValues: {
      name: selected?.name ?? "",
      client: selected?.client ?? "",
      competencia: selected?.competencia ?? currentCompetencia(),
      status: selected?.status ?? ReportStatus.RASCUNHO,
    },
  });

  async function handleSubmit(data: Report) {
    try {
      const competencia = data.competencia?.trim() || currentCompetencia();
      if (reportId) {
        // Edição do registro: só metadados, sem tocar nos `dados` já salvos.
        await api.put(`/reports/${reportId}`, {
          name: data.name,
          client: data.client,
          competencia,
          status: data.status,
        });
        toast.success("Relatório atualizado com sucesso.");
      } else {
        await api.post<Report>("/reports", {
          name: data.name,
          client: data.client,
          competencia,
          status: data.status,
          slug: buildSlug(data.client, competencia),
          // Estrutura zerada só para o registro nascer válido e editável na tela.
          dados: getReportTemplate(competencia),
        });
        toast.success("Relatório criado. Abra-o para preencher as métricas na tela.");
      }
      handleClose();
    } catch (error) {
      toast.error(getErrorMessage(error, "Erro ao salvar relatório."));
    }
  }

  function handleClose() {
    props.setAction?.(null);
    props.setSelectedObject?.(null);
    form.reset();
    props.refetch?.();
  }

  return (
    <Modal<Report>
      title="Relatório mensal"
      description="Crie o registro. As métricas são preenchidas depois, na própria tela do relatório."
      action={props.action}
      setAction={props.setAction}
      setSelectedObject={props.setSelectedObject}
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Form {...form}>
        <form className="space-y-4 py-6">
          <InputForm
            name="name"
            label="Título do relatório"
            placeholder="Ex: Relatório de Junho — ACME"
            type="text"
            required
            form={form}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputForm
              name="client"
              label="Cliente"
              placeholder="Nome do cliente"
              type="text"
              required
              form={form}
            />
            <InputForm
              name="competencia"
              label="Competência (mês)"
              type="month"
              required
              form={form}
            />
          </div>
          <SelectForm
            name="status"
            label="Status"
            options={[
              { id: ReportStatus.RASCUNHO, name: "Rascunho" },
              { id: ReportStatus.PUBLICADO, name: "Publicado" },
            ]}
            form={form}
          />
        </form>
      </Form>
    </Modal>
  );
}
