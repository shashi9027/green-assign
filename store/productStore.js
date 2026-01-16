import { create } from "zustand";
import axios from "axios";

const LIMIT = 10;

/**
 CACHING STRATEGY USED: PAGE + SEARCH + CATEGORY BASED CACHE
 
  We store API results in a cache object like:
  cache = {
    "page_1_search__category_": { products: [...], total: 100 },
    "page_2_search__category_": { products: [...], total: 100 },
    "page_1_search_tv_category_": { products: [...], total: 20 },
    "page_1_search__category_smartphones": { products: [...], total: 15 }
 }
 
  WHY THIS CACHING IS USEFUL:
   Avoids repeated API calls when revisiting pages
   Improves performance and user experience (faster UI)
   Reduces network usage
  Prevents unnecessary reloading when switching tabs/pages
 */

export const useProductStore = create((set, get) => ({
  products: [],
  total: 0,
  page: 1,
  search: "",
  category: "",
  cache: {}, //stores cached results

  fetchProducts: async (page = 1, search = "", category = "") => {
    const skip = (page - 1) * LIMIT;

    // Create a unique cache key based on page + search + category
    const cacheKey = `page_${page}_search_${search}_category_${category}`;

    //CHECK CACHE FIRST (CLIENT-SIDE CACHING)
    const existingCache = get().cache[cacheKey];

    if (existingCache) {
      console.log("Using cached product data for:", cacheKey);

      set({
        products: existingCache.products,
        total: existingCache.total,
        page,
        search,
        category,
      });

      return; //no API call needed
    }

    //IF NOT IN CACHE, FETCH FROM API
    let url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
        search
      )}&limit=${LIMIT}`;
    }

    if (category) {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(
        category
      )}?limit=${LIMIT}`;
    }

    const res = await axios.get(url);

    const newData = {
      products: res.data.products,
      total: res.data.total,
    };

    //STORE RESULT IN CACHE
    set((state) => ({
      products: newData.products,
      total: newData.total,
      page: search || category ? 1 : page, // reset page when filtering
      search,
      category,

      cache: {
        ...state.cache,
        [cacheKey]: newData, //save result for future use
      },
    }));
  },
}));
