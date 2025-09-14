import { useCallback, useEffect, useState } from "react";
import type { Study } from "../../types/study";
import type { UseStudiesReturn, ApiResponse } from "./useStudies.types";

export function useStudies(
  url = "http://localhost:4000/studies"
): UseStudiesReturn {
  const [data, setData] = useState<Study[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json: ApiResponse = await response.json();
      const studies = Array.isArray(json) ? json : json.studies;

      setData(studies);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Nieznany błąd podczas pobierania danych";
      setError(message);
      console.error("Failed to fetch studies:", err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
