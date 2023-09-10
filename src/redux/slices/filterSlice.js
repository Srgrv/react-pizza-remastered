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
    activeCategory: 0,
    activeSort: {
      name: "популярности",
      sort: "rating",
    },
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
  },
});

export const { SET_ACTIVE_CATEGORY, SET_ACTIVE_SORT } = filterSlice.actions;
export default filterSlice.reducer;
