"use client";

import { ElementType, useEffect, useRef, useState } from "react";

interface EditableFieldProps {
  value: string;
  onChange: (v: string) => void;
  isAdmin: boolean;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  tag?: ElementType;
  /** When true, blur/commit keeps an empty string instead of reverting to the previous value. */
  allowEmpty?: boolean;
}

export default function EditableField({
  value,
  onChange,
  isAdmin,
  multiline = false,
  className = "",
  placeholder = "Clique para editar",
  tag: Tag = "span",
  allowEmpty = false,
}: EditableFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  useEffect(() => { setDraft(value); }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      if (!multiline) {
        const len = inputRef.current.value.length;
        inputRef.current.setSelectionRange(len, len);
      }
      autoResize();
    }
  }, [editing, multiline]);

  function autoResize() {
    const el = inputRef.current;
    if (el && multiline) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }

  function commit() {
    const trimmed = draft.trim();
    const next = allowEmpty ? trimmed : trimmed || value;
    setDraft(next);
    onChange(next);
    setEditing(false);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") { cancel(); return; }
    if (e.key === "Enter" && !multiline) { commit(); return; }
  }

  if (!isAdmin) return <Tag className={className}>{value}</Tag>;

  if (editing) {
    const sharedClass =
      "bg-transparent border-b border-[#0A0A0A]/30 focus:border-[#D9381E] " +
      "focus:outline-none resize-none w-full transition-colors duration-200 " +
      className;

    return multiline ? (
      <textarea
        ref={inputRef}
        className={sharedClass + " overflow-hidden"}
        value={draft}
        placeholder={placeholder}
        rows={1}
        onChange={(e) => { setDraft(e.target.value); autoResize(); }}
        onBlur={commit}
        onKeyDown={handleKeyDown}
      />
    ) : (
      <input
        ref={inputRef}
        type="text"
        className={sharedClass}
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
      className={
        className +
        " cursor-text group/ef relative hover:after:absolute hover:after:inset-x-0 " +
        "hover:after:bottom-0 hover:after:h-[1px] hover:after:bg-[#D9381E]/50 " +
        "transition-colors"
      }
      onClick={() => setEditing(true)}
      title="Clique para editar"
    >
      {value || <span className="opacity-30 italic">{placeholder}</span>}
    </Tag>
  );
}
