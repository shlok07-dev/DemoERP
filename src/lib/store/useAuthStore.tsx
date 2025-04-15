// /lib/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  userId?: number;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      userId: undefined,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });

          const response = await axios.post("/api/userLogin", {
            email,
            password,
          });

          const data = response.data;

          if (response.status !== 200 || data.error) {
            throw new Error(data.error || "Login failed");
          }

          set({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
            userId: data.user?.id,
          });
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "An error occurred during login",
            isAuthenticated: false,
          });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });

          // Call logout API endpoint to clear server-side session/cookies
          await axios.post("/api/logout");

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            userId: undefined,
          });
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "An error occurred during logout",
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage", // name of the item in storage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }), // only persist these fields
    }
  )
);
