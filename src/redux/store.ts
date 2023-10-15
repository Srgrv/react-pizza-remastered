import { configureStore } from "@reduxjs/toolkit";

//slices
import filterSlice from "./slices/filterSlice";
import pizzasSlice from "./slices/pizzasSlice";

const store = configureStore({
  reducer: {
    filter: filterSlice,
    pizzas: pizzasSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
