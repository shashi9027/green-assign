import { create } from "zustand";

export const useAuthStore = create((set) => ({
  accessToken: null,
  user: null,

  setAuth: (session) =>
    set({
      accessToken: session?.accessToken || null,
      user: session?.user || null,
    }),

  clearAuth: () =>
    set({
      accessToken: null,
      user: null,
    }),
}));
