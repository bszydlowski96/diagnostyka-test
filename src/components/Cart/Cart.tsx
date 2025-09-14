import styles from "./Cart.module.scss";
import { formatPLN } from "../../lib/currency/currency";
import type { CartItemProps, CartSummaryProps } from "./Cart.types";
import { useCart } from "../../context/CartContext/CartContext";

function CartItem({
  id,
  name,
  code,
  price,
  etaMinutes,
  onRemove,
}: CartItemProps) {
  return (
    <li className={styles.item}>
      <div className={styles.itemInfo}>
        <div className={styles.itemName}>
          {name} <span className={styles.itemCode}>[{code}]</span>
        </div>
        <div className={styles.itemMeta}>Czas: {etaMinutes} min</div>
      </div>
      <div className={styles.itemActions}>
        <strong className={styles.itemPrice}>{formatPLN(price)}</strong>
        <button
          className={styles.removeButton}
          onClick={() => onRemove(id)}
          aria-label={`Usuń ${name} z koszyka`}
        >
          Usuń
        </button>
      </div>
    </li>
  );
}

function CartSummary({
  count,
  totalPrice,
  totalEta,
  onClear,
}: CartSummaryProps) {
  return (
    <div className={styles.summary}>
      <div className={styles.summaryRow}>
        <span>Pozycji:</span>
        <strong>{count}</strong>
      </div>
      <div className={styles.summaryRow}>
        <span>Łączny czas:</span>
        <strong>{totalEta} min</strong>
      </div>
      <div className={styles.summaryRow}>
        <span>Suma:</span>
        <strong className={styles.totalPrice}>{formatPLN(totalPrice)}</strong>
      </div>
      <button
        className={styles.clearButton}
        onClick={onClear}
        aria-label="Wyczyść cały koszyk"
      >
        Wyczyść koszyk
      </button>
    </div>
  );
}

export default function Cart() {
  const { state, remove, clear, count, totalPrice, totalEta } = useCart();
  const items = Object.values(state.items);

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none">
          <path
            d="M3 3h18l-1 13H4L3 3zm0 0l1.5 9m0 0h15m-15 0L7 21m10-9l-3 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p className={styles.emptyText}>Koszyk jest pusty</p>
        <p className={styles.emptyHint}>Dodaj badania z listy obok</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            code={item.code}
            price={item.price}
            etaMinutes={item.etaMinutes}
            onRemove={remove}
          />
        ))}
      </ul>
      <CartSummary
        count={count}
        totalPrice={totalPrice}
        totalEta={totalEta}
        onClear={clear}
      />
    </div>
  );
}
