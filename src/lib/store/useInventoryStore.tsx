import { create } from "zustand";
import axios from "axios";

type InventoryItem = {
  name: string;
  productId: string;
  category?: string;
  qtyPurchased?: number;
  unitPrice?: number;
  totalAmount?: number;
  inStock?: number;
  supplier?: string;
  supplierContact?: string;
  status?: string;
  minimumStockLevel?: number;
  reorderPoint?: number;
  location?: string;
  notes?: string;
};

type InventoryState = {
  items: any[];
  loading: boolean;
  error: string | null;
  fetchInventory: () => Promise<void>;
  addInventoryItem: (item: InventoryItem) => Promise<void>;
};

export const useInventoryStore = create<InventoryState>((set) => ({
  items: [],
  loading: false,
  error: null,

  fetchInventory: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get("/api/inventory/fetchInventory", {
        withCredentials: true,
      });

      set({ items: response.data, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  addInventoryItem: async (item) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post("/api/inventory/addItem", item, {
        withCredentials: true,
      });

      // Optionally add the new item to the state
      set((state) => ({
        items: [...state.items, response.data.item],
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },
}));
