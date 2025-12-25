import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { servicesMap } from '../../../shared/mock/services';
import type { Service } from '../../service/model/types';
import type { CartState } from './types';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      selectedIds: new Set<string>(),
      addItem: (id) =>
        set((state) => ({
          selectedIds: new Set(state.selectedIds).add(id),
        })),
      removeItem: (id) =>
        set((state) => {
          const newIds = new Set(state.selectedIds);
          newIds.delete(id);
          return { selectedIds: newIds };
        }),
      clearCart: () => set({ selectedIds: new Set<string>() }),
      hasItem: (id) => get().selectedIds.has(id),
    }),
    {
      name: 'cart-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              selectedIds: new Set(state.selectedIds),
            },
          };
        },
        setItem: (name, newValue) => {
          const { state, version } = newValue;
          const value = {
            state: {
              ...state,
              selectedIds: Array.from(state.selectedIds),
            },
            version,
          };
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);

export const useCartServices = () =>
  useCartStore(
    useShallow((state) => {
      const serviceOrUndefined = [...state.selectedIds].map((id) => servicesMap.get(id));
      const services = serviceOrUndefined.filter(
        (service): service is Service => service !== undefined,
      );
      return services;
    }),
  );

export const useCartTotal = () =>
  useCartStore((state) =>
    [...state.selectedIds].reduce((sum, id) => sum + (servicesMap.get(id)?.price || 0), 0),
  );

export const useCart = () => {
  const selectedIds = useCartStore((state) => state.selectedIds);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = useCartTotal();

  const isSelected = (id: string) => selectedIds.has(id);

  return {
    selectedIds,
    addItem,
    removeItem,
    clearCart,
    totalPrice,
    isSelected,
  };
};
