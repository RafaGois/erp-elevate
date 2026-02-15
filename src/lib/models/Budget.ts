export default interface Budget {
  id: string;
  name: string;
  description: string | null;
  value: number;
  createdAt: string;
  updatedAt: string;
}
