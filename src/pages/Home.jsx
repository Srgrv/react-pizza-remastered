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
import { SET_ACTIVE_CATEGORY } from "../redux/slices/filterSlice";

const Home = ({ searchValue }) => {
  const { activeCategory, activeSort } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const setActiveCategory = (id) => {
    dispatch(SET_ACTIVE_CATEGORY(id));
  };

  const [pizzas, setPizzas] = React.useState([]);

  // const [sortPizza, setSortPizza] = React.useState(pizzas);

  const [isLoading, setIsLoading] = React.useState(true);

  // const [activeType, setActiveType] = React.useState(0);
  // const [activeSize, setActiveSize] = React.useState(0);

  // const [activeCategory, setActiveCategory] = React.useState(0); //redux
  const [direction, setDirection] = React.useState(true);
  // const [activeSort, setActiveSort] = React.useState({
  //   name: "популярности",
  //   sort: "rating",
  // }); //redux

  const [currentPage, setCurrentPage] = React.useState(1);
  const pizzasPerPage = 4;

  // const lastPizzaIndex = pizzasPerPage * currentPage;
  // const firstPizzaIndex = lastPizzaIndex - pizzasPerPage;
  // const currentPizzas = pizzas.slice(firstPizzaIndex, lastPizzaIndex);

  // const pageNumber = [4];

  // for (let i = 1; i <= Math.ceil(pizzas.length / pizzasPerPage); i++) {
  //   pageNumber.push(i);
  // }

  // const setActiveCategory = (index) => {
  //   dispatch(SET_ACTIVE_CATEGORY(index));
  // };

  React.useEffect(() => {
    setIsLoading(true);

    const category = activeCategory > 0 ? `${activeCategory}` : "";
    const order = direction ? "desc" : "asc";
    const sortBy = activeSort.sort;

    // const search = searchValue ? `${searchValue}` : "";

    const url = new URL(`https://64f5b54f2b07270f705d8ef6.mockapi.io/pizzas`);

    const config = {
      method: "GET",
      headers: { "content-type": "application/json" },
    };

    if (activeSort.sort !== "price" && !searchValue) {
      category && url.searchParams.append("category", category);
      url.searchParams.append("sortBy", sortBy);
      url.searchParams.append("order", order);
      activeCategory === 0 && url.searchParams.append("page", currentPage);
      activeCategory === 0 && url.searchParams.append("limit", pizzasPerPage);

      axios.get(url, config).then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
    } else if (searchValue) {
      url.searchParams.append("search", searchValue);

      axios.get(url, config).then((res) => {
        let sortPizza = res.data.sort((a, b) => {
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
        setPizzas(sortPizza);

        setActiveCategory(0);
        // dispatch(SET_ACTIVE_CATEGORY(0));
        setIsLoading(false);
      });
    } else {
      url.searchParams.append("category", category);

      axios.get(url, config).then((res) => {
        let sortPizza = res.data.sort((a, b) => {
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
        setPizzas(sortPizza);
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [activeCategory, activeSort.sort, direction, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Sort
          // activeSort={activeSort}
          // setActiveSort={setActiveSort}
          direction={direction}
          setDirection={setDirection}
        />
      </div>
      {!searchValue && activeCategory === 0 && (
        <Pagination
          // pageQty={pageNumber.length}
          currentPage={currentPage}
          setCurrentPage={(numberPage) => {
            setCurrentPage(numberPage);
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
          setCurrentPage={(numberPage) => {
            setCurrentPage(numberPage);
          }}
        />
      )}
    </div>
  );
};

export default Home;

//Столкнулся с проблемой mockApi - если я добавляю еще search в url params, то поиск вообще не работает.Решил это следующим образом - оставил фильтрацию на фронтенде, но при начале поиска перевожу вручную категорию на Все пиццы. Таким образом делается всего 1 запрос на бек (в будущем не нужно будет даже дебаунсить все это), но фильтрация выдает нужные результаты еще и с сортировкой. Мне решение понравилось, мб будет кому-то еще полезно.
