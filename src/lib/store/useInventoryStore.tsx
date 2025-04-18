import { create } from "zustand";
import axios from "axios";

type InventoryItem = {
  id?: number;
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
  items: InventoryItem[];
  loading: boolean;
  error: string | null;
  fetchInventory: () => Promise<void>;
  addInventoryItem: (item: InventoryItem) => Promise<void>;
  updateInventoryItem: (id: number, updatedItem: Partial<InventoryItem>) => Promise<void>;
  deleteInventoryItem: (id: number) => Promise<void>;
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

  updateInventoryItem: async (id, updatedItem) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.patch(`/api/inventory/updateItem/${id}`, updatedItem, {
        withCredentials: true,
      });
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, ...response.data.item } : item
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  deleteInventoryItem: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/inventory/deleteItem/${id}`, {
        withCredentials: true,
      });
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
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
