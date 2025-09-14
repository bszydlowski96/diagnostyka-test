import styles from "./CategoryFilter.module.scss";
import type { CategoryFilterProps } from "./CategoryFilter.types";

export default function CategoryFilter({
  value,
  options,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="category-filter">
        Kategoria
      </label>
      <div className={styles.selectWrapper}>
        <select
          id="category-filter"
          className={styles.select}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Filtruj po kategorii"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg className={styles.arrow} viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
