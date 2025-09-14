import type { SortDirection } from "../../types/study";

export interface SortControlProps {
  value: SortDirection;
  onChange: (value: SortDirection) => void;
}
