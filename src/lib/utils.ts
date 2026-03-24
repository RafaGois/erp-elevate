import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === "string") return error;
  if (error instanceof Error && error.message) return error.message;

  const err = error as {
    response?: { data?: unknown };
    message?: string;
  };

  const data = err?.response?.data;

  if (typeof data === "string") return data;
  if (Array.isArray(data) && typeof data[0] === "string") return data[0];
  if (data && typeof data === "object") {
    const objectMessage = (data as { message?: unknown }).message;
    if (typeof objectMessage === "string") return objectMessage;
  }

  if (typeof err?.message === "string") return err.message;
  return fallback;
}