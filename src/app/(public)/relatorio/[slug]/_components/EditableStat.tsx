"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "./CountUp";
import { useReportEdit } from "./report-edit-context";

interface Props {
  value: number;
  /** Caminho pontilhado dentro de `dados` (ex: "perfil.novosSeguidores"). */
  path: string;
  format?: (n: number) => string;
  className?: string;
  /** Anima de 0 até o valor na visualização do cliente (default: true). */
  countUp?: boolean;
  /** Duração do count-up na visualização do cliente. */
  duration?: number;
}

/**
 * Número editável inline. Cliente vê o valor (com count-up); admin clica e edita,
 * espelhando o EditableField do orçamento — mas para valores numéricos.
 */
export default function EditableStat({ value, path, format, className = "", countUp = true, duration }: Props) {
  const { isAdmin, setField } = useReportEdit();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function commit() {
    const n = Number(draft);
    setField(path, Number.isFinite(n) ? n : 0);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") commit();
    if (e.key === "Escape") {
      setDraft(String(value));
      setEditing(false);
    }
  }

  if (!isAdmin) {
    return countUp ? (
      <CountUp value={value} format={format} duration={duration} className={className} />
    ) : (
      <span className={className}>{format ? format(value) : value.toLocaleString("pt-BR")}</span>
    );
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="number"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        className={`${className} w-[5ch] max-w-full border-b border-[#bdfa3c]/70 bg-transparent text-center tabular-nums focus:outline-none`}
        style={{ width: `${Math.max(4, draft.length + 1)}ch` }}
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      title="Clique para editar"
      className={`${className} cursor-text rounded decoration-[#bdfa3c]/60 underline-offset-4 transition-colors hover:underline`}
    >
      {format ? format(value) : value.toLocaleString("pt-BR")}
    </span>
  );
}
