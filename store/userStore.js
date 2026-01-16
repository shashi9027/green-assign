import { create } from "zustand";
import axios from "axios";

const LIMIT = 10;

export const useUserStore = create((set) => ({
  users: [],
  total: 0,
  page: 1,
  search: "",

  fetchUsers: async (page = 1, search = "") => {
    const skip = (page - 1) * LIMIT;

    let url = `https://dummyjson.com/users?limit=${LIMIT}&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/users/search?q=${search}&limit=${LIMIT}&skip=${skip}`;
    }

    const res = await axios.get(url);

    set({
      users: res.data.users,
      total: res.data.total,
      page,
      search,
    });
  },
}));
