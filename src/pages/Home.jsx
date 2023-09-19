import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

//components
import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import Skeleton from "../components/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";

//reducers
import {
  SET_ACTIVE_CATEGORY,
  SET_CURRENT_PAGE,
  SET_ACTIVE_SORT,
  SET_DIRECTION,
  SET_SEARCH_VALUE,
  SET_VALUE,
  SET_FILTERS,
} from "../redux/slices/filterSlice";
import { SET_PIZZAS, SET_IS_LOADING } from "../redux/slices/pizzasSlice";

const Home = ({ searchParams, setSearchParams }) => {
  const dispatch = useDispatch();
  const {
    activeCategory,
    activeSort,
    currentPage,
    searchValue,
    direction,
    pizzasPerPage,
    value,
  } = useSelector((state) => state.filter);
  const { pizzas, isLoading } = useSelector((state) => state.pizzas);

  const setPizzas = (pizzas) => {
    dispatch(SET_PIZZAS(pizzas));
  };

  const setActiveSort = ({ name, sort }) => {
    dispatch(
      SET_ACTIVE_SORT({
        name,
        sort,
      })
    );

    const params = {};
    const order = direction ? "desc" : "asc";

    if (activeCategory === 0 && sort === "price" && searchParams) {
      // debugger;
      params.search = searchValue;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (activeCategory === 0 && sort !== "price" && searchValue) {
      // debugger;
      params.search = searchValue;
      params.sortBy = sort;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
      // } else if (activeCategory > 0 && sort === "price" && searchValue) {
      //   debugger;
      //   dispatch(SET_ACTIVE_CATEGORY(0));
      //   params.search = searchValue;
      //   params.order = order;
      //   params.limit = pizzasPerPage;
      //   params.page = 1;
      // } else if (activeCategory > 0 && sort !== "price" && searchValue) {
      //   debugger;
      //   dispatch(SET_ACTIVE_CATEGORY(0));
      //   params.sortBy = sort;
      //   params.search = searchValue;
      //   params.order = order;
      //   params.limit = pizzasPerPage;
      //   params.page = 1;
    } else if (activeCategory === 0 && sort === "price" && !searchParams) {
      // debugger;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (activeCategory === 0 && sort !== "price" && !searchValue) {
      // debugger;
      params.sortBy = sort;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (activeCategory > 0 && sort === "price" && !searchValue) {
      // debugger;
      params.category = activeCategory;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (activeCategory > 0 && sort !== "price" && !searchValue) {
      // debugger;
      params.category = activeCategory;
      params.sortBy = sort;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    }
    setSearchParams(params);
  };

  const setActiveCategory = (category) => {
    dispatch(SET_ACTIVE_CATEGORY(category));

    const params = {};
    const order = direction ? "desc" : "asc";
    //category
    if (category === 0 && activeSort.sort !== "price" && !searchValue) {
      // debugger;
      dispatch(SET_CURRENT_PAGE(1));
      params.order = order;
      params.sortBy = activeSort.sort;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (category === 0 && activeSort.sort === "price" && !searchValue) {
      // debugger;
      dispatch(SET_CURRENT_PAGE(1));
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (category > 0 && activeSort.sort !== "price" && !searchValue) {
      // debugger;
      dispatch(SET_CURRENT_PAGE(1));
      params.category = category;
      params.sortBy = activeSort.sort;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (category > 0 && activeSort.sort === "price" && !searchValue) {
      // debugger;
      dispatch(SET_CURRENT_PAGE(1));
      params.category = category;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (category > 0 && activeSort.sort === "price" && searchValue) {
      // debugger;
      dispatch(SET_SEARCH_VALUE(""));
      dispatch(SET_VALUE(""));
      params.category = category;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (category > 0 && activeSort.sort !== "price" && searchValue) {
      // debugger;
      dispatch(SET_SEARCH_VALUE(""));
      dispatch(SET_VALUE(""));
      params.category = category;
      params.sortBy = activeSort.sort;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (category === 0 && activeSort.sort === "price" && searchValue) {
      // debugger;
      dispatch(SET_SEARCH_VALUE(""));
      dispatch(SET_VALUE(""));
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (category === 0 && activeSort.sort !== "price" && searchValue) {
      // debugger;
      dispatch(SET_SEARCH_VALUE(""));
      dispatch(SET_VALUE(""));
      params.sortBy = activeSort.sort;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    }
    setSearchParams(params);
  };

  const setCurrentPage = (numberPage) => {
    dispatch(SET_CURRENT_PAGE(numberPage));
    // const params = {};
    // const order = direction ? "desc" : "asc";
    // if (activeCategory === 0 && activeSort.sort === "price") {
    //   params.order = order;
    //   params.limit = pizzasPerPage;
    //   params.page = numberPage;
    // } else if (activeCategory === 0 && activeCategory.sort !== "price") {
    //   params.sortBy = activeSort.sort;
    //   params.order = order;
    //   params.limit = pizzasPerPage;
    //   params.page = numberPage;
    // }
    // setSearchParams(params);
  };

  const setDirection = (direction) => {
    dispatch(SET_DIRECTION(direction));
  };

  const setIsLoading = (isLoading) => {
    dispatch(SET_IS_LOADING(isLoading));
  };

  const createParams = (
    sortBy = activeSort.sort,
    category = activeCategory,
    limit = pizzasPerPage,
    page = currentPage,
    search = searchValue,
    order = direction ? "desc" : "asc"
  ) => {
    const params = {};
    debugger;
    //category
    if (category === 0 && sortBy !== "price" && !search) {
      dispatch(SET_CURRENT_PAGE(1));
      params.order = order;
      params.sortBy = sortBy;
      params.limit = limit;
      params.page = 1;
    } else if (category === 0 && sortBy === "price" && !search) {
      dispatch(SET_CURRENT_PAGE(1));
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (category > 0 && sortBy !== "price" && !search) {
      dispatch(SET_CURRENT_PAGE(1));
      params.category = category;
      params.sortBy = sortBy;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    } else if (category > 0 && sortBy === "price" && !search) {
      dispatch(SET_CURRENT_PAGE(1));
      params.category = category;
      params.order = order;
      params.limit = pizzasPerPage;
      params.page = 1;
    }

    if (sortBy !== "price" && search) {
      params.search = searchValue;
      params.sortBy = sortBy;
      params.order = order;
      params.limit = limit;
      params.page = 1;
    } else if (sortBy === "price" && search) {
      params.search = searchValue;
      params.order = order;
      params.limit = limit;
      params.page = 1;
    } else if (category > 0 && sortBy === "price" && search) {
      dispatch(SET_SEARCH_VALUE(""));
      dispatch(SET_VALUE(""));
      params.category = category;
      params.order = order;
      params.limit = limit;
      params.page = 1;
    } else if (category > 0 && sortBy !== "price" && search) {
      dispatch(SET_SEARCH_VALUE(""));
      dispatch(SET_VALUE(""));
      params.category = category;
      params.sortBy = sortBy;
      params.order = order;
      params.limit = limit;
      params.page = 1;
    } else if (category === 0 && sortBy === "price" && search) {
      dispatch(SET_SEARCH_VALUE(""));
      dispatch(SET_VALUE(""));
      params.order = order;
      params.limit = limit;
      params.page = 1;
    } else if (category === 0 && sortBy !== "price" && search) {
      dispatch(SET_SEARCH_VALUE(""));
      dispatch(SET_VALUE(""));
      params.sortBy = sortBy;
      params.order = order;
      params.limit = limit;
      params.page = 1;
    }

    setSearchParams(params);
  };

  // React.useEffect(() => {
  //   const params = {};
  //   for (let [key, item] of searchParams.entries()) {
  //     params[key] = item;
  //   }
  //   dispatch(SET_FILTERS(params));
  // }, []);

  // React.useEffect(() => {
  //   debugger;
  //   const params = {};
  //   const order = direction ? "desc" : "asc";
  //   //category
  //   if (activeCategory === 0 && activeSort.sort !== "price" && !searchValue) {
  //     // debugger;
  //     dispatch(SET_CURRENT_PAGE(1));
  //     params.order = order;
  //     params.sortBy = activeSort.sort;
  //     params.limit = pizzasPerPage;
  //     params.page = 1;
  //   } else if (
  //     activeCategory === 0 &&
  //     activeSort.sort === "price" &&
  //     !searchValue
  //   ) {
  //     // debugger;
  //     dispatch(SET_CURRENT_PAGE(1));
  //     params.order = order;
  //     params.limit = pizzasPerPage;
  //     params.page = 1;
  //   } else if (
  //     activeCategory > 0 &&
  //     activeSort.sort !== "price" &&
  //     !searchValue
  //   ) {
  //     // debugger;
  //     dispatch(SET_CURRENT_PAGE(1));
  //     params.category = activeCategory;
  //     params.sortBy = activeSort.sort;
  //     params.order = order;
  //     params.limit = pizzasPerPage;
  //     params.page = 1;
  //   } else if (
  //     activeCategory > 0 &&
  //     activeSort.sort === "price" &&
  //     !searchValue
  //   ) {
  //     // debugger;
  //     dispatch(SET_CURRENT_PAGE(1));
  //     params.category = activeCategory;
  //     params.order = order;
  //     params.limit = pizzasPerPage;
  //     params.page = 1;
  //   } else if (
  //     activeCategory > 0 &&
  //     activeSort.sort === "price" &&
  //     searchValue
  //   ) {
  //     // debugger;
  //     dispatch(SET_SEARCH_VALUE(""));
  //     dispatch(SET_VALUE(""));
  //     params.category = activeCategory;
  //     params.order = order;
  //     params.limit = pizzasPerPage;
  //     params.page = 1;
  //   } else if (
  //     activeCategory > 0 &&
  //     activeSort.sort !== "price" &&
  //     searchValue
  //   ) {
  //     // debugger;
  //     dispatch(SET_SEARCH_VALUE(""));
  //     dispatch(SET_VALUE(""));
  //     params.category = activeCategory;
  //     params.sortBy = activeSort.sort;
  //     params.order = order;
  //     params.limit = pizzasPerPage;
  //     params.page = 1;
  //   } else if (
  //     activeCategory === 0 &&
  //     activeSort.sort === "price" &&
  //     searchValue
  //   ) {
  //     // debugger;
  //     dispatch(SET_SEARCH_VALUE(""));
  //     dispatch(SET_VALUE(""));
  //     params.order = order;
  //     params.limit = pizzasPerPage;
  //     params.page = 1;
  //   } else if (
  //     activeCategory === 0 &&
  //     activeSort.sort !== "price" &&
  //     searchValue
  //   ) {
  //     // debugger;
  //     dispatch(SET_SEARCH_VALUE(""));
  //     dispatch(SET_VALUE(""));
  //     params.sortBy = activeSort.sort;
  //     params.order = order;
  //     params.limit = pizzasPerPage;
  //     params.page = 1;
  //   }
  //   //sort
  //   if (activeCategory === 0 && activeSort.sort === "price") {
  //     params.order = order;
  //     params.limit = pizzasPerPage;
  //     params.page = currentPage;
  //   } else if (activeCategory === 0 && activeCategory.sort !== "price") {
  //     params.sortBy = activeSort.sort;
  //     params.order = order;
  //     params.limit = pizzasPerPage;
  //     params.page = currentPage;
  //   }
  //   //search
  //   if (searchValue && activeCategory.sort !== "price") {
  //     dispatch(SET_ACTIVE_CATEGORY(0));
  //     params.search = searchValue;
  //     params.sortBy = activeCategory.sort;
  //     params.order = order;
  //     params.limit = pizzasPerPage;
  //     params.page = currentPage;
  //   } else if (searchValue && activeCategory.sort === "price") {
  //     dispatch(SET_ACTIVE_CATEGORY(0));
  //     params.search = searchValue;
  //     params.order = order;
  //     params.limit = pizzasPerPage;
  //     params.page = currentPage;
  //   } else if (!searchValue && activeCategory.sort !== "price") {
  //     dispatch(SET_ACTIVE_CATEGORY(0));
  //     params.order = order;
  //     params.limit = pizzasPerPage;
  //     params.page = currentPage;
  //     params.sortBy = activeCategory.sort;
  //   } else if (!searchValue && activeCategory.sort === "price") {
  //     dispatch(SET_ACTIVE_CATEGORY(0));
  //     params.order = order;
  //     params.limit = pizzasPerPage;
  //     params.page = currentPage;
  //   }
  //   setSearchParams(params);
  // }, [
  //   activeCategory,
  //   activeSort,
  //   currentPage,
  //   searchValue,
  //   direction,
  //   pizzasPerPage,
  //   value,
  // ]);

  console.log("render home");

  // React.useEffect(() => {
  //   debugger;
  //   if (!searchParams.toString()) {
  //     const params = {};
  //     params.order = "desc";
  //     params.sortBy = "rating";
  //     params.limit = 4;
  //     params.page = 1;

  //     setSearchParams(params);
  //   }
  //   console.log("useEffect without dependences");
  // }, []);

  React.useEffect(() => {
    setIsLoading(true);

    const url = new URL(`https://64f5b54f2b07270f705d8ef6.mockapi.io/pizzas`);
    const config = {
      method: "GET",
      headers: { "content-type": "application/json" },
    };
    debugger;

    // console.log(
    //   searchParams.toString() === "order=desc&sortBy=rating&limit=4&page=1"
    // );

    url.search = searchParams.toString();
    axios.get(url, config).then((res) => {
      setPizzas(res.data);
      setIsLoading(false);
    });
    console.log("useEffect with dependencies");
    // eslint-disable-next-line
  }, [
    // activeCategory,
    // activeSort,
    // currentPage,
    // searchValue,
    // direction,
    // pizzasPerPage,
    // value,

    searchParams,
  ]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Sort
          setActiveSort={setActiveSort}
          direction={direction}
          setDirection={setDirection}
        />
      </div>
      {!searchValue && activeCategory === 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={(numberPage) => {
            dispatch(SET_CURRENT_PAGE(numberPage));
          }}
        />
      )}

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((key) => {
              return (
                <PizzaBlock
                  key={key.id}
                  title={key.title}
                  image={key.imageUrl}
                  types={key.types}
                />
              );
            })}
      </div>

      {!searchValue && activeCategory === 0 && (
        <Pagination
          // pageQty={pageNumber.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Home;

//Столкнулся с проблемой mockApi - если я добавляю еще search в url params, то поиск вообще не работает.Решил это следующим образом - оставил фильтрацию на фронтенде, но при начале поиска перевожу вручную категорию на Все пиццы. Таким образом делается всего 1 запрос на бек (в будущем не нужно будет даже дебаунсить все это), но фильтрация выдает нужные результаты еще и с сортировкой. Мне решение понравилось, мб будет кому-то еще полезно.

//сначала срабатывает useEffect, который запрашивает запрос на сервер исходя из тех данных которые находятся в state

//далее, создается еще один useEffect с теми же зависимостями как у первого, где самостоятельно создается строка с get-параметры запроса и вставляется в useNavigate

//далее создается еще один useEffect без зависимостей, где из searchParams создается объект ключ:значение, который нужно передать в state

//для этого создается reducer, который обновляется все параметры в state
