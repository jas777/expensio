export default interface Expense {
  id: string;
  createdAt: number;
  updatedAt: number;
  value: number;
  description: string;
  issuer: string;
}
