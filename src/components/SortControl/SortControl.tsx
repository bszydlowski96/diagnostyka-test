import styles from "./SortControl.module.scss";
import type { SortControlProps } from "./SortControl.types";

export default function SortControl({ value, onChange }: SortControlProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="sort-control">
        Sortowanie
      </label>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${value === "asc" ? styles.active : ""}`}
          onClick={() => onChange("asc")}
          aria-label="Sortuj rosnąco"
          title="Cena: rosnąco"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
          </svg>
          <span>Rosnąco</span>
        </button>
        <button
          className={`${styles.button} ${
            value === "desc" ? styles.active : ""
          }`}
          onClick={() => onChange("desc")}
          aria-label="Sortuj malejąco"
          title="Cena: malejąco"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
          </svg>
          <span>Malejąco</span>
        </button>
      </div>
    </div>
  );
}
