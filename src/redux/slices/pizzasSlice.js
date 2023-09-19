import { createSlice } from "@reduxjs/toolkit";

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState: {
    pizzas: [],
    isLoading: true,
  },
  reducers: {
    SET_PIZZAS(state, action) {
      state.pizzas = action.payload;
    },
    SET_IS_LOADING(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { SET_PIZZAS, SET_IS_LOADING } = pizzasSlice.actions;
export default pizzasSlice.reducer;
