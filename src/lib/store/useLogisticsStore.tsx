import { create } from "zustand";
import axios from "axios";
import type { InferSelectModel } from "drizzle-orm";
import type { vehicle, delivery, maintenanceSchedule } from "@/db/schema";

// Drizzle model types
export type Vehicle = InferSelectModel<typeof vehicle>;
export type Delivery = InferSelectModel<typeof delivery>;
export type MaintenanceSchedule = InferSelectModel<typeof maintenanceSchedule>;

interface LogisticsState {
  vehicles: Vehicle[];
  deliveries: Delivery[];
  maintenanceSchedules: MaintenanceSchedule[];
  isLoading: boolean;
  error: string | null;

  fetchVehicles: () => Promise<void>;
  fetchDeliveries: () => Promise<void>;
  fetchMaintenanceSchedules: () => Promise<void>;

  addVehicle: (
    vehicle: Omit<Vehicle, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  addDelivery: (
    delivery: Omit<Delivery, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  addMaintenanceSchedule: (
    schedule: Omit<MaintenanceSchedule, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
}

export const useLogisticsStore = create<LogisticsState>((set, get) => ({
  vehicles: [],
  deliveries: [],
  maintenanceSchedules: [],
  isLoading: false,
  error: null,

  fetchVehicles: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get("/api/vehicle/fetchVehicles", {
        withCredentials: true,
      });
      set({ vehicles: res.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  fetchDeliveries: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get("/api/delivery/fetchDeliveries", {
        withCredentials: true,
      });
      set({ deliveries: res.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  fetchMaintenanceSchedules: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        "/api/maintenanceSchedule/fetchMaintenanceSchedule",
        {
          withCredentials: true,
        }
      );
      set({ maintenanceSchedules: res.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  addVehicle: async (vehicleData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post("/api/vehicle/addVehicle", vehicleData, {
        withCredentials: true,
      });
      set((state) => ({
        vehicles: [...state.vehicles, res.data],
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  addDelivery: async (deliveryData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post("/api/delivery/addDelivery", deliveryData, {
        withCredentials: true,
      });
      set((state) => ({
        deliveries: [...state.deliveries, res.data],
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  addMaintenanceSchedule: async (scheduleData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        "/api/maintenanceSchedule/addMaintenanceSchedule",
        scheduleData,
        {
          withCredentials: true,
        }
      );
      set((state) => ({
        maintenanceSchedules: [...state.maintenanceSchedules, res.data],
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },
}));
