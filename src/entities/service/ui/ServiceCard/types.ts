interface Service {
  id: string;
  title: string;
  price: number;
}

export interface ServiceCardProps {
  service: Service;
  onAdd: (service: Service) => void;
  isSelected?: boolean;
}
