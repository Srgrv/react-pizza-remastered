import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   activeCategory: 0,
//   activeSort: {
//     name: "популярности",
//     sort: "rating",
//   },
// };

const filterSlice = createSlice({
  name: "filter",
  initialState: {
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
  },
  reducers: {
    SET_ACTIVE_CATEGORY(state, action) {
      state.activeCategory = action.payload;
    },
    SET_ACTIVE_SORT(state, action) {
      state.activeSort = {
        name: action.payload.name,
        sort: action.payload.sort,
      };
    },
    SET_CURRENT_PAGE(state, action) {
      state.currentPage = action.payload;
    },
    SET_SEARCH_VALUE(state, action) {
      state.searchValue = action.payload;
    },
    SET_DIRECTION(state, action) {
      state.direction = action.payload;
    },
    SET_VALUE(state, action) {
      state.value = action.payload;
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
} = filterSlice.actions;
export default filterSlice.reducer;
