import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//interfaces
interface IState {
  currentPage: number;
  activeCategory: number;
  activeSort: ActiveSort;
  searchValue: string;
  direction: boolean;
  pizzasPerPage: number;
  value: string;
}

type ActiveSort = {
  name: string;
  sort: string;
};

interface ISetFilters {
  category?: number;
  sortBy?: ActiveSort;
  page?: number;
  search?: string;
  order?: string;
}

const initialState: IState = {
  currentPage: 1,
  activeCategory: 0,
  activeSort: {
    name: "популярности",
    sort: "rating",
  },
  searchValue: "",
  direction: true,
  pizzasPerPage: 4,
  value: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    SET_ACTIVE_CATEGORY(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
      if (state.activeCategory !== 0) {
        state.value = "";
        state.searchValue = "";
      }
    },
    SET_ACTIVE_SORT(state, action: PayloadAction<ActiveSort>) {
      state.activeSort = {
        name: action.payload.name,
        sort: action.payload.sort,
      };
    },
    SET_CURRENT_PAGE(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    SET_SEARCH_VALUE(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    SET_DIRECTION(state, action: PayloadAction<boolean>) {
      state.direction = action.payload;
    },
    SET_VALUE(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    SET_FILTERS(state, action: PayloadAction<ISetFilters>) {
      if (action.payload.category !== undefined) {
        state.activeCategory = action.payload.category;
      }
      if (action.payload.sortBy !== undefined) {
        state.activeSort = action.payload.sortBy;
      }
      if (action.payload.page !== undefined) {
        state.currentPage = action.payload.page;
      }
      if (action.payload.search !== undefined) {
        state.searchValue = action.payload.search;
      }
      if (action.payload.order !== undefined) {
        if (action.payload.order === "desc") {
          state.direction = true;
        }
        if (action.payload.order === "asc") {
          state.direction = false;
        }
      }

      // state.pizzasPerPage = action.payload.pizzasPerPage;
      // state.value = action.payload.value;
    },
  },
});

export const {
  SET_ACTIVE_CATEGORY,
  SET_ACTIVE_SORT,
  SET_CURRENT_PAGE,
  SET_SEARCH_VALUE,
  SET_DIRECTION,
  SET_VALUE,
  SET_FILTERS,
} = filterSlice.actions;
export default filterSlice.reducer;
