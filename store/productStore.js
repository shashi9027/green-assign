import { create } from "zustand";
import axios from "axios";

const LIMIT = 10;

export const useProductStore = create((set) => ({
  products: [],
  total: 0,
  page: 1,
  search: "",
  category: "",

  fetchProducts: async (page = 1, search = "", category = "") => {
    const skip = (page - 1) * LIMIT;

    let url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}&limit=${LIMIT}&skip=${skip}`;
    }

    if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${LIMIT}&skip=${skip}`;
    }

    const res = await axios.get(url);

    set({
      products: res.data.products,
      total: res.data.total,
      page,
      search,
      category,
    });
  },
}));
