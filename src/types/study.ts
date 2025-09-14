export interface Study {
  id: string;
  name: string;
  code: string;
  category: string;
  price: number;
  etaMinutes: number;
  preparation: string;
  description: string;
}

export type SortDirection = "asc" | "desc";
export type StudyCategory = "Wszystkie" | string;
