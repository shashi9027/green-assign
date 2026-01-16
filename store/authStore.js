import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null,
  user: null,

  setAuth: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
