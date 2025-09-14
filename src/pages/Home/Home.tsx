import styles from "./Home.module.scss";
import StudyList from "../../components/StudyList";
import Cart from "../../components/Cart";

export default function Home() {
  return (
    <section className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <svg
                className={styles.titleIcon}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-.01a1 1 0 100-2H8a4 4 0 014 4v6a4 4 0 01-4 4H6a4 4 0 01-4-4V7a4 4 0 014-4z"
                  clipRule="evenodd"
                />
              </svg>
              Dostępne badania
            </h2>
            <span className={styles.badge}>Laboratorium</span>
          </div>
          <StudyList />
        </div>
      </div>

      <aside className={styles.sidebar}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <svg
                className={styles.titleIcon}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Twój koszyk
            </h2>
          </div>
          <Cart />
        </div>
      </aside>
    </section>
  );
}
