import { create } from "zustand";
import axios from "axios";

const LIMIT = 10;

/**
  CACHING STRATEGY USED: PAGE-BASED CACHE
 
  We store API results in a cache object like:
  cache = {
    "page_1_search_": { users: [...], total: 100 },
    "page_2_search_": { users: [...], total: 100 },
    "page_1_search_john": { users: [...], total: 20 }
   }
 
  WHY THIS CACHING IS USEFUL:
  Reduces unnecessary API calls
  Improves performance & UX (faster response)
  Saves network usage
  Prevents flickering/loading when revisiting pages
 */

export const useUserStore = create((set, get) => ({
  users: [],
  total: 0,
  page: 1,
  search: "",
  cache: {}, //stores cached results

  fetchUsers: async (page = 1, search = "") => {
    const skip = (page - 1) * LIMIT;

    //Create a unique cache key based on page + search
    const cacheKey = `page_${page}_search_${search}`;

    //CHECK CACHE FIRST (CLIENT-SIDE CACHING)
    const existingCache = get().cache[cacheKey];

    if (existingCache) {
      console.log("Using cached data for:", cacheKey);

      set({
        users: existingCache.users,
        total: existingCache.total,
        page,
        search,
      });

      return; //no API call needed
    }

    //IF NOT IN CACHE, FETCH FROM API
    let url;

    if (search) {
      url = `https://dummyjson.com/users/search?q=${encodeURIComponent(
        search
      )}&limit=${LIMIT}`;
    } else {
      url = `https://dummyjson.com/users?limit=${LIMIT}&skip=${skip}`;
    }

    const res = await axios.get(url);

    const newData = {
      users: res.data.users,
      total: res.data.total,
    };

    //STORE RESULT IN CACHE
    set((state) => ({
      users: newData.users,
      total: newData.total,
      page: search ? 1 : page,
      search,

      cache: {
        ...state.cache,
        [cacheKey]: newData, // save result for future use
      },
    }));
  },
}));
