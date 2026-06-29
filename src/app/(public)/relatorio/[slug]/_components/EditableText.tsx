"use client";

import { ElementType, useEffect, useRef, useState } from "react";
import { useReportEdit } from "./report-edit-context";

interface Props {
  value: string;
  /** Caminho pontilhado dentro de `dados` (ex: "observacoes" ou "destaques.0.titulo"). */
  path: string;
  multiline?: boolean;
  placeholder?: string;
  className?: string;
  tag?: ElementType;
}

/** Texto editável inline (espelha o EditableField do orçamento, tema escuro). */
export default function EditableText({
  value,
  path,
  multiline = false,
  placeholder = "Clique para editar",
  className = "",
  tag: Tag = "span",
}: Props) {
  const { isAdmin, setField } = useReportEdit();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      autoResize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  function autoResize() {
    const el = inputRef.current;
    if (el && multiline) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }

  function commit() {
    setField(path, draft.trim());
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setDraft(value);
      setEditing(false);
    }
    if (e.key === "Enter" && !multiline) commit();
  }

  if (!isAdmin) return <Tag className={className}>{value}</Tag>;

  if (editing) {
    const shared =
      "w-full resize-none border-b border-[#bdfa3c]/70 bg-transparent focus:outline-none " + className;
    return multiline ? (
      <textarea
        ref={inputRef}
        className={shared + " overflow-hidden"}
        value={draft}
        placeholder={placeholder}
        rows={1}
        onChange={(e) => {
          setDraft(e.target.value);
          autoResize();
        }}
        onBlur={commit}
        onKeyDown={handleKeyDown}
      />
    ) : (
      <input
        ref={inputRef}
        type="text"
        className={shared}
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return (
    <Tag
      onClick={() => setEditing(true)}
      title="Clique para editar"
      className={`${className} cursor-text decoration-[#bdfa3c]/60 underline-offset-4 transition-colors hover:underline`}
    >
      {value || <span className="italic opacity-30">{placeholder}</span>}
    </Tag>
  );
}
