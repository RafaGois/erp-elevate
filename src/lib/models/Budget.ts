import { BudgetContent } from "@/lib/types/budget-content";
import { BudgetType } from "@/lib/enums/BudgetType";

export default interface Budget {
  id: string;
  name: string;
  slug?: string | null;
  description?: string | null;
  value: number;
  type?: BudgetType | null;
  client?: string | null;
  project?: string | null;
  content?: BudgetContent | null;
  createdAt: string;
  updatedAt: string;
}
