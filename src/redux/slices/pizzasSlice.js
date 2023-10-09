import { createSlice } from "@reduxjs/toolkit";

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState: {
    pizzas: [],
    items: [],
    isLoading: true,
    totalPrice: 0,
    totalCount: 0,
  },
  reducers: {
    SET_PIZZAS(state, action) {
      state.pizzas = action.payload;
    },
    SET_IS_LOADING(state, action) {
      state.isLoading = action.payload;
    },
    ADD_ITEM(state, action) {
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
          b.types.reduce((a, b) => {
            return (
              a +
              b.sizes.reduce((a, b) => {
                return a + b.item.count * b.item.price[1];
              }, 0)
            );
          }, 0)
        );
      }, 0);

      state.totalCount = state.items.reduce((a, b) => {
        return (
          a +
          b.types.reduce((a, b) => {
            return (
              a +
              b.sizes.reduce((a, b) => {
                return a + b.item.count;
              }, 0)
            );
          }, 0)
        );
      }, 0);
    },
    REMOVE_ITEM(state, action) {
      state.items = state.items
        .map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              types: item.types
                .flat()
                .map((types) => {
                  if (types.type === action.payload.type[0]) {
                    return {
                      ...types,
                      sizes: types.sizes
                        .flat()
                        .map((sizes) => {
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
                        .filter((sizes) => {
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
                .filter((types) => types.sizes.length !== 0),
            };
          } else {
            return item;
          }
        })
        .filter((item) => item.types.length !== 0);

      state.totalPrice = state.items.reduce((a, b) => {
        debugger;
        return (
          a +
          b.types.reduce((a, b) => {
            return (
              a +
              b.sizes.reduce((a, b) => {
                return a + b.item.count * b.item.price[1];
              }, 0)
            );
          }, 0)
        );
      }, 0);

      state.totalCount = state.items.reduce((a, b) => {
        debugger;
        return (
          a +
          b.types.reduce((a, b) => {
            return (
              a +
              b.sizes.reduce((a, b) => {
                return a + b.item.count;
              }, 0)
            );
          }, 0)
        );
      }, 0);
    },
    DELETE_ITEMS(state, action) {
      state.items = state.items
        .map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              types: item.types
                .flat()
                .map((types) => {
                  if (types.type === action.payload.type[0]) {
                    return {
                      ...types,
                      sizes: types.sizes
                        .flat()
                        .filter(
                          (sizes) => sizes.size !== action.payload.size[0]
                        ),
                    };
                  } else {
                    return types;
                  }
                })
                .filter((types) => types.sizes.length !== 0),
            };
          } else {
            return item;
          }
        })
        .filter((item) => item.types.length !== 0);

      state.totalPrice = state.items.reduce((a, b) => {
        debugger;
        return (
          a +
          b.types.reduce((a, b) => {
            return (
              a +
              b.sizes.reduce((a, b) => {
                return a + b.item.count * b.item.price[1];
              }, 0)
            );
          }, 0)
        );
      }, 0);

      state.totalCount = state.items.reduce((a, b) => {
        debugger;
        return (
          a +
          b.types.reduce((a, b) => {
            return (
              a +
              b.sizes.reduce((a, b) => {
                return a + b.item.count;
              }, 0)
            );
          }, 0)
        );
      }, 0);
    },
  },
});

export const {
  SET_PIZZAS,
  SET_IS_LOADING,
  ADD_ITEM,
  REMOVE_ITEM,
  DELETE_ITEMS,
} = pizzasSlice.actions;
export default pizzasSlice.reducer;
