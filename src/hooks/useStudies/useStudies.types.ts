import type { Study } from "../../types/study";

export interface UseStudiesReturn {
  data: Study[] | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export type ApiResponse = Study[] | { studies: Study[] };
