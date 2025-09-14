export interface CartItemProps {
  id: string;
  name: string;
  code: string;
  price: number;
  etaMinutes: number;
  onRemove: (id: string) => void;
}

export interface CartSummaryProps {
  count: number;
  totalPrice: number;
  totalEta: number;
  onClear: () => void;
}
