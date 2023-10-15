import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

//reducers
import { SET_CURRENT_PAGE, SET_ACTIVE_CATEGORY } from "./filterSlice";

interface IState {
  pizzas: IPizzas[];
  items: ITypes[];
  isLoading: boolean;
  totalPrice: number;
  totalCount: number;
}

interface ITypes {
  id: number;
  types: ISizes[];
}

interface ISizes {
  type: number;
  sizes: IPizza[];
}

interface IPizza {
  item: IItem;
  size: number;
}

interface IItem {
  count: number;
  id: number;
  imageUrl: string;
  price: number[];
  size: number[];
  title: string;
  type: [number, string];
}

interface IPizzas {
  id: number;
  imageUrl: string;
  title: string;
  types: {
    type: number;
    sizes: {
      size: number;
      price: number;
    }[];
  }[];
}

const initialState: IState = {
  pizzas: [],
  items: [],
  isLoading: true,
  totalPrice: 0,
  totalCount: 0,
};

type ActiveSort = {
  name: string;
  sort: string;
};

interface IProps {
  direction: boolean;
  activeCategory: number;
  activeSort: ActiveSort;
  searchValue: string;
  pizzasPerPage: number;
  currentPage: number;
}

interface IRemoveItem {
  id: number;
  type: [number, string];
  size: number[];
}

// interface IAddItem {
//   id: number;
//   title: string;
//   imageUrl: string;
//   type: number[];
//   price: number[];
// }

export const FETCH_PIZZAS = createAsyncThunk(
  "pizzas/fetchPizzas",
  async (props: IProps, { rejectWithValue, dispatch }) => {
    const {
      direction,
      activeCategory,
      activeSort,
      searchValue,
      pizzasPerPage,
      currentPage,
    } = props;

    const url: URL = new URL(
      `https://64f5b54f2b07270f705d8ef6.mockapi.io/pizzas/?order=desc&sortBy=rating&limit=4&page=1`
    );

    interface IParams {
      order?: string;
      sortBy?: string;
      limit?: number;
      page?: number;
      category?: number;
      search?: string;
    }
    const params: IParams = {};
    const order = direction ? "desc" : "asc";

    if (activeCategory === 0 && activeSort.sort !== "price" && !searchValue) {
      //1
      //debuger;
      params.order = order;
      params.sortBy = activeSort.sort;
      params.limit = pizzasPerPage;
      params.page = currentPage;
    } else if (
      activeCategory === 0 &&
      activeSort.sort === "price" &&
      !searchValue
    ) {
      //2
      //debuger;
      params.limit = pizzasPerPage;
      params.page = currentPage;
    } else if (
      activeCategory > 0 &&
      activeSort.sort !== "price" &&
      !searchValue
    ) {
      //3
      //debuger;
      dispatch(SET_CURRENT_PAGE(1));
      params.category = activeCategory;
      params.sortBy = activeSort.sort;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (
      activeCategory > 0 &&
      activeSort.sort === "price" &&
      !searchValue
    ) {
      // 4
      //debuger;
      dispatch(SET_CURRENT_PAGE(1));
      params.category = activeCategory;

      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (
      activeCategory > 0 &&
      activeSort.sort === "price" &&
      searchValue
    ) {
      // 5
      //debuger;
      dispatch(SET_ACTIVE_CATEGORY(0));
      params.search = searchValue;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (
      activeCategory > 0 &&
      activeSort.sort !== "price" &&
      searchValue
    ) {
      // 6
      //debuger;
      dispatch(SET_ACTIVE_CATEGORY(0));
      params.search = searchValue;
      params.sortBy = activeSort.sort;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (
      activeCategory === 0 &&
      activeSort.sort === "price" &&
      searchValue
    ) {
      // 7
      //debuger
      params.search = searchValue;
      params.limit = pizzasPerPage;
      params.page = currentPage;
    } else if (
      activeCategory === 0 &&
      activeSort.sort !== "price" &&
      searchValue
    ) {
      // 8
      //debuger
      params.search = searchValue;
      params.sortBy = activeSort.sort;
      params.order = order;
    }

    const queries = new URLSearchParams(params);
    url.search = queries.toString();

    const config = {
      method: "GET",
      headers: { "content-type": "application/json" },
    };

    const res = (await axios.get<IPizzas[]>(url.toString(), config)).data;
    if (activeSort.sort === "price") {
      let sortPizza = res.sort((a: IPizzas, b: IPizzas) => {
        let a1 = a.types[0].sizes[0].price;
        let b1 = b.types[0].sizes[0].price;
        if (direction) {
          if (a1 > b1) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a1 < b1) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      return sortPizza;
      // setPizzas(sortPizza);
      // setIsLoading(false);
    } else {
      return res;
      // setPizzas(res.data);
    }
  }
);

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    // SET_PIZZAS(state, action: PayloadAction<any>) {
    //   state.pizzas = action.payload;
    // },
    // SET_IS_LOADING(state, action: PayloadAction<any>) {
    //   state.isLoading = action.payload;
    // },
    ADD_ITEM(state, action: PayloadAction<IItem>) {
      let findId = state.items.find((obj) => obj.id === action.payload.id);
      if (findId) {
        let findType = findId.types.find(
          (obj) => obj.type === action.payload.type[0]
        );
        if (findType) {
          let findSize = findType.sizes.find(
            (obj) => obj.size === action.payload.price[0]
          );
          if (findSize) {
            findSize.item.count++;
          } else {
            findType.sizes.push({
              item: { ...action.payload, count: 1 },
              size: action.payload.price[0],
            });
          }
        } else {
          findId.types.push({
            type: action.payload.type[0],
            sizes: [
              {
                item: { ...action.payload, count: 1 },
                size: action.payload.price[0],
              },
            ],
          });
        }
      } else {
        state.items.push({
          id: action.payload.id,
          types: [
            {
              type: action.payload.type[0],
              sizes: [
                {
                  item: { ...action.payload, count: 1 },
                  size: action.payload.price[0],
                },
              ],
            },
          ],
        });
      }

      state.totalPrice = state.items.reduce((a, b) => {
        return (
          a +
          b.types.reduce((a: number, b: any) => {
            return (
              a +
              b.sizes.reduce((a: number, b: any) => {
                return a + b.item.count * b.item.price[1];
              }, 0)
            );
          }, 0)
        );
      }, 0);

      // this.TOTAL_PRICE();
      // this.TOTAL_COUNT();

      state.totalCount = state.items.reduce((a, b) => {
        return (
          a +
          b.types.reduce((a: number, b: any) => {
            return (
              a +
              b.sizes.reduce((a: number, b: any) => {
                return a + b.item.count;
              }, 0)
            );
          }, 0)
        );
      }, 0);
    },
    REMOVE_ITEM(state, action: PayloadAction<IRemoveItem>) {
      state.items = state.items
        .map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              types: item.types
                .flat()
                .map((types: any) => {
                  if (types.type === action.payload.type[0]) {
                    return {
                      ...types,
                      sizes: types.sizes
                        .flat()
                        .map((sizes: any) => {
                          if (sizes.size === action.payload.size[0]) {
                            if (sizes.item.count > 0) {
                              return {
                                ...sizes,
                                item: {
                                  ...sizes.item,
                                  count: sizes.item.count - 1,
                                },
                              };
                            } else {
                              return sizes;
                            }
                          } else {
                            return sizes;
                          }
                        })
                        .filter((sizes: any) => {
                          return !(
                            sizes.size === action.payload.size[0] &&
                            sizes.item.count === 0
                          );
                        }),
                    };
                  } else {
                    return types;
                  }
                })
                .filter((types: any) => types.sizes.length !== 0),
            };
          } else {
            return item;
          }
        })
        .filter((item) => item.types.length !== 0);

      // TOTAL_PRICE();
      // TOTAL_COUNT();

      state.totalPrice = state.items.reduce((a, b) => {
        debugger;
        return (
          a +
          b.types.reduce((a: number, b: any) => {
            return (
              a +
              b.sizes.reduce((a: number, b: any) => {
                return a + b.item.count * b.item.price[1];
              }, 0)
            );
          }, 0)
        );
      }, 0);

      state.totalCount = state.items.reduce((a: number, b: any) => {
        debugger;
        return (
          a +
          b.types.reduce((a: number, b: any) => {
            return (
              a +
              b.sizes.reduce((a: number, b: any) => {
                return a + b.item.count;
              }, 0)
            );
          }, 0)
        );
      }, 0);
    },
    DELETE_ITEMS(state, action: PayloadAction<IRemoveItem>) {
      state.items = state.items
        .map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              types: item.types
                .flat()
                .map((types: any) => {
                  if (types.type === action.payload.type[0]) {
                    return {
                      ...types,
                      sizes: types.sizes
                        .flat()
                        .filter(
                          (sizes: any) => sizes.size !== action.payload.size[0]
                        ),
                    };
                  } else {
                    return types;
                  }
                })
                .filter((types: any) => types.sizes.length !== 0),
            };
          } else {
            return item;
          }
        })
        .filter((item) => item.types.length !== 0);

      // TOTAL_PRICE();
      // TOTAL_COUNT();

      state.totalPrice = state.items.reduce((a: number, b: any) => {
        debugger;
        return (
          a +
          b.types.reduce((a: number, b: any) => {
            return (
              a +
              b.sizes.reduce((a: number, b: any) => {
                return a + b.item.count * b.item.price[1];
              }, 0)
            );
          }, 0)
        );
      }, 0);

      state.totalCount = state.items.reduce((a: number, b: any) => {
        debugger;
        return (
          a +
          b.types.reduce((a: number, b: any) => {
            return (
              a +
              b.sizes.reduce((a: number, b: any) => {
                return a + b.item.count;
              }, 0)
            );
          }, 0)
        );
      }, 0);
    },
    CLEAR(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      // state.totalPrice = state.items.reduce((a, b) => {
      //   debugger;
      //   return (
      //     a +
      //     b.types.reduce((a, b) => {
      //       return (
      //         a +
      //         b.sizes.reduce((a, b) => {
      //           return a + b.item.count * b.item.price[1];
      //         }, 0)
      //       );
      //     }, 0)
      //   );
      // }, 0);

      // state.totalCount = state.items.reduce((a, b) => {
      //   debugger;
      //   return (
      //     a +
      //     b.types.reduce((a, b) => {
      //       return (
      //         a +
      //         b.sizes.reduce((a, b) => {
      //           return a + b.item.count;
      //         }, 0)
      //       );
      //     }, 0)
      //   );
      // }, 0);
      // TOTAL_PRICE();
      // TOTAL_COUNT();
    },
  },
  extraReducers: (build) => {
    build.addCase(FETCH_PIZZAS.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(
      FETCH_PIZZAS.fulfilled,
      (state, action: PayloadAction<IPizzas[]>) => {
        state.pizzas = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export const {
  // SET_PIZZAS,
  // SET_IS_LOADING,
  ADD_ITEM,
  REMOVE_ITEM,
  DELETE_ITEMS,
  CLEAR,
} = pizzasSlice.actions;
export default pizzasSlice.reducer;
