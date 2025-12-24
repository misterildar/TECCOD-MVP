interface Service {
  id: string;
  title: string;
  price: number;
}

export interface OrderSummaryProps {
  selectedServices: Service[];
  total: number;
  onCheckout: () => void;
}
