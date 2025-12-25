import type { Service } from '../../service/model/types';

export type CartItem = Service;

export interface CartState {
  selectedIds: Set<string>;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  hasItem: (id: string) => boolean;
}
