import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { useRef } from "react";

//components
import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import Skeleton from "../components/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";

//list
import { list } from "../components/Sort";

//extra-reducers
import { FETCH_PIZZAS } from "../redux/slices/pizzasSlice";

//reducers
import {
  SET_ACTIVE_CATEGORY,
  SET_CURRENT_PAGE,
  SET_ACTIVE_SORT,
  SET_DIRECTION,
  // SET_SEARCH_VALUE,
  // SET_VALUE,
  SET_FILTERS,
} from "../redux/slices/filterSlice";

//intefaces and types

const Home: React.FC = () => {
  //render
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    activeCategory,
    activeSort,
    currentPage,
    searchValue,
    direction,
    pizzasPerPage,
    value,
  } = useAppSelector((state) => state.filter);
  const { pizzas, isLoading } = useAppSelector((state) => state.pizzas);

  const useSearch = useRef(false);
  const useYes = useRef(false);
  const useMounted = useRef(false);

  // const setPizzas = (pizzas) => {
  //   dispatch(SET_PIZZAS(pizzas));
  // };

  type PropsActiveSort = {
    name: string;
    sort: string;
  };

  const setActiveSort = ({ name, sort }: PropsActiveSort) => {
    dispatch(
      SET_ACTIVE_SORT({
        name,
        sort,
      })
    );
  };

  const setActiveCategory = (category: number) => {
    dispatch(SET_ACTIVE_CATEGORY(category));
  };

  const setCurrentPage = (current: number) => {
    dispatch(SET_CURRENT_PAGE(current));
  };

  const setDirection = (direction: boolean) => {
    dispatch(SET_DIRECTION(direction));
  };

  const fetchPizzas = async () => {
    dispatch(
      FETCH_PIZZAS({
        direction,
        activeCategory,
        activeSort,
        searchValue,
        pizzasPerPage,
        currentPage,
      })
    );
  };

  React.useEffect(() => {
    //первый useEffect
    interface IParams {
      order?: string;
      sortBy?: string;
      limit?: number;
      page?: number;
      category?: number;
      search?: string;
    }

    if (useMounted.current) {
      const params: IParams = {};
      const order = direction ? "desc" : "asc";

      if (activeCategory === 0 && activeSort.sort !== "price" && !searchValue) {
        //1
        //debuger;
        // dispatch(SET_CURRENT_PAGE(1));
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
        // dispatch(SET_CURRENT_PAGE(1));
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
        // dispatch(SET_SEARCH_VALUE(""));
        // dispatch(SET_VALUE(""));
        dispatch(SET_ACTIVE_CATEGORY(0));
        params.search = searchValue;
        // params.category = activeCategory;
        params.limit = pizzasPerPage;
        params.page = 1;
      } else if (
        activeCategory > 0 &&
        activeSort.sort !== "price" &&
        searchValue
      ) {
        // 6
        //debuger;
        // dispatch(SET_SEARCH_VALUE(""));
        // dispatch(SET_VALUE(""));
        // params.category = activeCategory;
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
        //debuger;
        // dispatch(SET_SEARCH_VALUE(""));
        // dispatch(SET_VALUE(""));
        params.search = searchValue;
        params.limit = pizzasPerPage;
        params.page = currentPage;
      } else if (
        activeCategory === 0 &&
        activeSort.sort !== "price" &&
        searchValue
      ) {
        // 8
        //debuger;
        // dispatch(SET_SEARCH_VALUE(""));
        // dispatch(SET_VALUE(""));
        params.search = searchValue;
        params.sortBy = activeSort.sort;
        params.order = order;
        // params.limit = pizzasPerPage;
        // params.page = currentPage;
      }

      const queryString = qs.stringify(params);

      navigate(`?${queryString}`);
    }
    useMounted.current = true;
    useYes.current = true;
  }, [
    activeCategory,
    activeSort,
    currentPage,
    searchValue,
    direction,
    pizzasPerPage,
    value,
    navigate,
    dispatch,
  ]);

  React.useEffect(() => {
    // второй useEffect
    if (window.location.search) {
      interface IParams {
        order?: string;
        sortBy?: string;
        limit?: number;
        page?: number;
        category?: number;
        search?: string;
      }
      const params: IParams = qs.parse(window.location.search.substring(1));
      const sortBy = list.find((obj) => obj.sort === params.sortBy);
      const d = { ...params, sortBy };
      dispatch(SET_FILTERS(d));
      useSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    // третий useEffect
    if (!useSearch.current) {
      fetchPizzas();
    }

    useSearch.current = false;
    useYes.current = false;
    // eslint-disable-next-line
  }, [
    activeCategory,
    activeSort,
    currentPage,
    searchValue,
    direction,
    pizzasPerPage,
    value,

    // searchParams,
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
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((key) => {
              return (
                // <Link to={`/pizza/${key.id}`}>
                <PizzaBlock
                  key={key.id}
                  // title={key.title}
                  // image={key.imageUrl}
                  // types={key.types}
                  {...key}
                />
                // </Link>
              );
            })}
      </div>

      {!searchValue && activeCategory === 0 && pizzas.length === 0 && (
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
//qs (парсит и может генерировать)
//useSearchParams (парсит и может перезаписывать)

//далее, создается еще один useEffect с теми же зависимостями как у первого, где самостоятельно создается строка с get-параметры запроса и вставляется в useNavigate

//далее создается еще один useEffect без зависимостей, где из searchParams создается объект ключ:значение, который нужно передать в state

//для этого создается reducer, который обновляется все параметры в state
