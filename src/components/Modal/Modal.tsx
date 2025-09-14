import { useEffect, useRef } from "react";
import styles from "./Modal.module.scss";
import type { ModalProps } from "./Modal.types";

export default function Modal({
  open,
  title,
  onClose,
  children,
  size = "md",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} aria-modal="true" role="dialog">
      <div
        ref={dialogRef}
        className={`${styles.dialog} ${styles[`dialog--${size}`]}`}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Zamknij"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
