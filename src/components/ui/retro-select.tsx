"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./retro-select.css";

export type RetroSelectLayout = "default" | "toolbar" | "compact";
export type RetroSelectSize = "sm" | "default";

export type RetroSelectOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type RetroSelectRootProps = React.ComponentProps<typeof Select>;

export type RetroSelectProps = Omit<RetroSelectRootProps, "variant"> & {
  /** Wrapper + presets de largura (toolbar, paginação compacta). */
  layout?: RetroSelectLayout;
  className?: string;
  size?: RetroSelectSize;
  placeholder?: string;
  triggerClassName?: string;
  contentClassName?: string;
  contentSide?: React.ComponentProps<typeof SelectContent>["side"];
  /** Lista simples; omita e use children para composição manual. */
  options?: RetroSelectOption[];
  children?: React.ReactNode;
};

function RetroSelect({
  layout = "default",
  className,
  size = "default",
  placeholder,
  triggerClassName,
  contentClassName,
  contentSide,
  options,
  children,
  ...rootProps
}: RetroSelectProps) {
  const hasCustomChildren = children != null;

  return (
    <div
      className={cn(
        "retro-select",
        layout !== "default" && `retro-select--${layout}`,
        className,
      )}
    >
      <Select variant="retro" {...rootProps}>
        {hasCustomChildren ? (
          children
        ) : (
          <>
            <SelectTrigger
              size={size}
              className={cn("w-full min-w-0", triggerClassName)}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent side={contentSide} className={contentClassName}>
              <SelectGroup>
                {options?.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </>
        )}
      </Select>
    </div>
  );
}

function RetroSelectTrigger({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SelectTrigger>) {
  return <SelectTrigger size={size} className={className} {...props} />;
}

function RetroSelectValue({
  ...props
}: React.ComponentProps<typeof SelectValue>) {
  return <SelectValue {...props} />;
}

function RetroSelectContent({
  className,
  ...props
}: React.ComponentProps<typeof SelectContent>) {
  return <SelectContent className={className} {...props} />;
}

function RetroSelectGroup({
  ...props
}: React.ComponentProps<typeof SelectGroup>) {
  return <SelectGroup {...props} />;
}

function RetroSelectItem({
  className,
  ...props
}: React.ComponentProps<typeof SelectItem>) {
  return <SelectItem className={className} {...props} />;
}

function RetroSelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectLabel>) {
  return <SelectLabel className={className} {...props} />;
}

function RetroSelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectSeparator>) {
  return <SelectSeparator className={className} {...props} />;
}

function RetroSelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectScrollUpButton>) {
  return <SelectScrollUpButton className={className} {...props} />;
}

function RetroSelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectScrollDownButton>) {
  return <SelectScrollDownButton className={className} {...props} />;
}

/** Mapeia `{ id, name }` ou números para opções do RetroSelect. */
export function toRetroSelectOptions(
  items: readonly { id: string; name: string }[] | readonly number[],
): RetroSelectOption[] {
  if (items.length === 0) return [];
  const first = items[0];
  if (typeof first === "number") {
    return (items as readonly number[]).map((n) => ({
      value: String(n),
      label: n,
    }));
  }
  return (items as readonly { id: string; name: string }[]).map((item) => ({
    value: item.id,
    label: item.name,
  }));
}

export {
  RetroSelect,
  RetroSelectTrigger,
  RetroSelectValue,
  RetroSelectContent,
  RetroSelectGroup,
  RetroSelectItem,
  RetroSelectLabel,
  RetroSelectSeparator,
  RetroSelectScrollUpButton,
  RetroSelectScrollDownButton,
};
