import type { Study, SortDirection } from "../../types/study";

export interface StudyListProps {
  studies?: Study[];
}

export interface StudyCardProps {
  study: Study;
  isInCart: boolean;
  onAdd: (study: Study) => void;
  onShowDetails: (id: string) => void;
}

export interface StudyFiltersProps {
  query: string;
  category: string;
  sortDir: SortDirection;
  categories: string[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: SortDirection) => void;
}
