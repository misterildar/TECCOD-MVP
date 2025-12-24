import type { Service } from '../../model/types';

export interface ServiceCardProps {
  service: Service;
  onAdd: (service: Service) => void;
  isSelected?: boolean;
}
