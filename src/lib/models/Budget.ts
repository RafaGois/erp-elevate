import { BudgetContent } from "@/lib/types/budget-content";

export default interface Budget {
  id: string;
  name: string;
  slug?: string | null;
  description?: string | null;
  value: number;
  client?: string | null;
  project?: string | null;
  content?: BudgetContent | null;
  createdAt: string;
  updatedAt: string;
}
