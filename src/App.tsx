import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import styles from "./App.module.scss";
import { CartProvider } from "./context/CartContext/CartContext";

export default function App() {
  return (
    <CartProvider>
      <div className={styles.app}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Link to="/" className={styles.logo}>
              <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <h1 className={styles.logoTitle}>MedLab Pro</h1>
                <span className={styles.logoSubtitle}>
                  System zarządzania badaniami
                </span>
              </div>
            </Link>

            <nav className={styles.nav}>
              <span className={styles.version}>v1.0.0</span>
              <span className={styles.tag}>MVP</span>
              <span className={styles.tag}>React + TypeScript</span>
            </nav>
          </div>
        </header>

        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <footer className={styles.footer}>
          <p>&copy; 2024 MedLab Pro. Zadanie rekrutacyjne.</p>
        </footer>
      </div>
    </CartProvider>
  );
}
