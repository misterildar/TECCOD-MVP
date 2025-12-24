import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { servicesMap, type Service } from "../../../shared/mock/services";

interface CartState {
  selectedIds: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  hasItem: (id: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      selectedIds: [],
      addItem: (id) =>
        set((state) => {
          if (state.selectedIds.includes(id)) {
            return state;
          }
          return { selectedIds: [...state.selectedIds, id] };
        }),
      removeItem: (id) =>
        set((state) => ({
          selectedIds: state.selectedIds.filter((itemId) => itemId !== id),
        })),
      clearCart: () => set({ selectedIds: [] }),
      hasItem: (id) => get().selectedIds.includes(id),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useCartServices = () =>
  useCartStore(
    useShallow((state) =>
      state.selectedIds
        .map((id) => servicesMap.get(id))
        .filter((s): s is Service => !!s)
    )
  );

export const useCartTotal = () =>
  useCartStore((state) =>
    state.selectedIds.reduce(
      (sum, id) => sum + (servicesMap.get(id)?.price || 0),
      0
    )
  );

export const useCart = () => {
  const selectedIds = useCartStore((state) => state.selectedIds);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartTotal();

  const isSelected = (id: string) => selectedIds.includes(id);

  return {
    selectedIds,
    addItem,
    removeItem,
    clearCart,
    totalPrice,
    isSelected,
  };
};
