import React from "react";

//components

import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import Skeleton from "../components/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";

const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = React.useState([]);

  // const [sortPizza, setSortPizza] = React.useState(pizzas);

  const [isLoading, setIsLoading] = React.useState(true);

  // const [activeType, setActiveType] = React.useState(0);
  // const [activeSize, setActiveSize] = React.useState(0);

  const [activeCategory, setActiveCategory] = React.useState(0);
  const [direction, setDirection] = React.useState(true);
  const [activeSort, setActiveSort] = React.useState({
    name: "популярности",
    sort: "rating",
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pizzasPerPage] = React.useState(4);

  const lastPizzaIndex = pizzasPerPage * currentPage;
  const firstPizzaIndex = lastPizzaIndex - pizzasPerPage;
  // const currentPizzas = pizzas.slice(firstPizzaIndex, lastPizzaIndex);

  // const pageNumber = [4];

  // for (let i = 1; i <= Math.ceil(pizzas.length / pizzasPerPage); i++) {
  //   pageNumber.push(i);
  // }

  React.useEffect(() => {
    setIsLoading(true);

    const category = activeCategory > 0 ? `${activeCategory}` : "";
    const order = direction ? "desc" : "asc";
    const sortBy = activeSort.sort;

    // const search = searchValue ? `${searchValue}` : "";

    const url = new URL(`https://64f5b54f2b07270f705d8ef6.mockapi.io/pizzas`);

    if (activeSort.sort !== "price" && !searchValue) {
      category && url.searchParams.append("category", category);

      url.searchParams.append("sortBy", sortBy);
      url.searchParams.append("order", order);
      url.searchParams.append("page", currentPage);
      url.searchParams.append("limit", pizzasPerPage);

      fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((json) => {
          setPizzas(json);

          setIsLoading(false);
        });
    } else if (searchValue) {
      url.searchParams.append("search", searchValue);

      fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((json) => {
          setPizzas(json);
          setActiveCategory(0);
          setIsLoading(false);
        });
    } else {
      url.searchParams.append("category", category);

      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          let sortPizza = json.sort((a, b) => {
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
  }, [activeCategory, activeSort.sort, direction, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Sort
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          direction={direction}
          setDirection={setDirection}
        />
      </div>

      <Pagination
        // pageQty={pageNumber.length}
        currentPage={currentPage}
        setCurrentPage={(numberPage) => {
          setCurrentPage(numberPage);
        }}
      />

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

      <Pagination
        // pageQty={pageNumber.length}
        currentPage={currentPage}
        setCurrentPage={(numberPage) => {
          setCurrentPage(numberPage);
        }}
      />
    </div>
  );
};

export default Home;

//Столкнулся с проблемой mockApi - если я добавляю еще search в url params, то поиск вообще не работает.Решил это следующим образом - оставил фильтрацию на фронтенде, но при начале поиска перевожу вручную категорию на Все пиццы. Таким образом делается всего 1 запрос на бек (в будущем не нужно будет даже дебаунсить все это), но фильтрация выдает нужные результаты еще и с сортировкой. Мне решение понравилось, мб будет кому-то еще полезно.
