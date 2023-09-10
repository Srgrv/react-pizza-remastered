import { configureStore } from "@reduxjs/toolkit";

//slices
import filterSlice from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    filter: filterSlice,
  },
});

export default store;
