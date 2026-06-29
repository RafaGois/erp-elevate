"use client";

import { createContext, useContext } from "react";
import type { DadosRelatorio, ReportHighlight } from "@/types/report-content";

export interface ReportEditContextValue {
  isAdmin: boolean;
  dados: DadosRelatorio;
  /** Atualiza um campo escalar via caminho pontilhado (ex: "perfil.novosSeguidores"). */
  setField: (path: string, value: number | string) => void;
  addDestaque: (highlight?: Partial<ReportHighlight>) => void;
  removeDestaque: (index: number) => void;
}

const noop = () => {};

const ReportEditContext = createContext<ReportEditContextValue>({
  isAdmin: false,
  dados: {} as DadosRelatorio,
  setField: noop,
  addDestaque: noop,
  removeDestaque: noop,
});

export const useReportEdit = () => useContext(ReportEditContext);

export default ReportEditContext;
