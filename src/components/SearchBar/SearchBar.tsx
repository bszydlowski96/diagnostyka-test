import { useRef, useEffect } from "react";
import styles from "./SearchBar.module.scss";
import type { SearchBarProps } from "./SearchBar.types";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Szukaj po nazwie lub kodzie...",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && e.ctrlKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={styles.container}>
      <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
      <input
        ref={inputRef}
        type="search"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Szukaj badań"
      />
      {value && (
        <button
          className={styles.clear}
          onClick={() => onChange("")}
          aria-label="Wyczyść wyszukiwanie"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <kbd className={styles.shortcut}>Ctrl + /</kbd>
    </div>
  );
}
