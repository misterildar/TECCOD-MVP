import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { servicesMap, type Service } from "../../../shared/mock/services";

interface CartState {
  selectedIds: string[];
  addItem: (id: string) => void;
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
