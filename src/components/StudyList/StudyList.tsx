import { useState, useMemo } from "react";
import { useStudies } from "../../hooks/useStudies/useStudies";
import { formatPLN } from "../../lib/currency/currency";
import Modal from "../Modal";
import SearchBar from "../SearchBar";
import CategoryFilter from "../CategoryFilter";
import SortControl from "../SortControl";
import styles from "./StudyList.module.scss";
import type { SortDirection } from "../../types/study";
import type { StudyCardProps, StudyFiltersProps } from "./StudyList.types";
import { useCart } from "../../context/CartContext";

function StudyCard({ study, isInCart, onAdd, onShowDetails }: StudyCardProps) {
  return (
    <li
      className={styles.card}
      onClick={() => onShowDetails(study.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onShowDetails(study.id);
        }
      }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          {study.name}
          <span className={styles.cardCode}>{study.code}</span>
        </div>
        <span
          className={`${styles.category} ${
            styles[`category--${study.category.toLowerCase()}`]
          }`}
        >
          {study.category}
        </span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.metaItem}>
            <svg
              className={styles.icon}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            {study.etaMinutes} min
          </span>
          <span className={styles.metaItem}>
            <svg
              className={styles.icon}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2v8h10V6H5z"
                clipRule="evenodd"
              />
            </svg>
            {study.preparation}
          </span>
        </div>

        <div className={styles.cardFooter}>
          <span className={styles.price}>{formatPLN(study.price)}</span>
          <button
            className={`${styles.addButton} ${isInCart ? styles.added : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isInCart) onAdd(study);
            }}
            disabled={isInCart}
            aria-label={
              isInCart
                ? `${study.name} już w koszyku`
                : `Dodaj ${study.name} do koszyka`
            }
          >
            {isInCart ? (
              <>
                <svg
                  className={styles.checkIcon}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Dodano
              </>
            ) : (
              <>
                <svg
                  className={styles.plusIcon}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Dodaj
              </>
            )}
          </button>
        </div>
      </div>
    </li>
  );
}

function StudyFilters({
  query,
  category,
  sortDir,
  categories,
  onQueryChange,
  onCategoryChange,
  onSortChange,
}: StudyFiltersProps) {
  return (
    <div className={styles.filters}>
      <SearchBar value={query} onChange={onQueryChange} />
      <CategoryFilter
        value={category}
        options={categories}
        onChange={onCategoryChange}
      />
      <SortControl value={sortDir} onChange={onSortChange} />
    </div>
  );
}

export default function StudyList() {
  const { data, loading, error, reload } = useStudies();
  const { add, state } = useCart();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Wszystkie");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    if (!data) return ["Wszystkie"];
    return ["Wszystkie", ...Array.from(new Set(data.map((s) => s.category)))];
  }, [data]);

  const filteredAndSorted = useMemo(() => {
    if (!data) return [];

    const normalized = query.trim().toLowerCase();

    return data
      .filter(
        (study) =>
          (study.name.toLowerCase().includes(normalized) ||
            study.code.toLowerCase().includes(normalized)) &&
          (category === "Wszystkie" || study.category === category)
      )
      .sort((a, b) =>
        sortDir === "asc" ? a.price - b.price : b.price - a.price
      );
  }, [data, query, category, sortDir]);

  const selectedStudy = useMemo(
    () => data?.find((s) => s.id === selectedId) || null,
    [data, selectedId]
  );

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Ładowanie badań...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <svg
          className={styles.errorIcon}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <p className={styles.errorText}>Wystąpił błąd: {error}</p>
        <button className={styles.retryButton} onClick={reload}>
          Spróbuj ponownie
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Brak dostępnych badań</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <StudyFilters
        query={query}
        category={category}
        sortDir={sortDir}
        categories={categories}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onSortChange={setSortDir}
      />

      {filteredAndSorted.length === 0 ? (
        <div className={styles.noResults}>
          <svg
            className={styles.noResultsIcon}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <p>Brak wyników dla "{query}"</p>
          <button
            className={styles.clearFilters}
            onClick={() => {
              setQuery("");
              setCategory("Wszystkie");
            }}
          >
            Wyczyść filtry
          </button>
        </div>
      ) : (
        <ul className={styles.list}>
          {filteredAndSorted.map((study) => (
            <StudyCard
              key={study.id}
              study={study}
              isInCart={!!state.items[study.id]}
              onAdd={add}
              onShowDetails={setSelectedId}
            />
          ))}
        </ul>
      )}

      <Modal
        open={!!selectedStudy}
        title={selectedStudy?.name}
        onClose={() => setSelectedId(null)}
      >
        {selectedStudy && (
          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Kod badania:</span>
              <span className={styles.detailValue}>{selectedStudy.code}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Kategoria:</span>
              <span className={styles.detailValue}>
                {selectedStudy.category}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Cena:</span>
              <span className={styles.detailValue}>
                {formatPLN(selectedStudy.price)}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Czas wykonania:</span>
              <span className={styles.detailValue}>
                {selectedStudy.etaMinutes} minut
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Przygotowanie:</span>
              <span className={styles.detailValue}>
                {selectedStudy.preparation}
              </span>
            </div>
            <div className={styles.detailDescription}>
              <h4>Opis badania</h4>
              <p>{selectedStudy.description}</p>
            </div>
            {!state.items[selectedStudy.id] && (
              <button
                className={styles.modalAddButton}
                onClick={() => {
                  add(selectedStudy);
                  setSelectedId(null);
                }}
              >
                Dodaj do koszyka
              </button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
