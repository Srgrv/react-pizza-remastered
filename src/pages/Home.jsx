import React from "react";

//components

import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import Skeleton from "../components/Skeleton";
import Sort from "../components/Sort";

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const [activeCategory, setActiveCategory] = React.useState(0);
  const [direction, setDirection] = React.useState(true);
  const [activeSort, setActiveSort] = React.useState({
    name: "популярности",
    sort: "rating",
  });

  React.useEffect(() => {
    setIsLoading(true);

    if (activeSort.sort !== "price") {
      fetch(
        `https://64f5b54f2b07270f705d8ef6.mockapi.io/pizzas?${
          activeCategory > 0 ? `category=${activeCategory}` : ""
        }&sortBy=${activeSort.sort}&${direction ? "order=desc" : "order=asc"}`
      )
        .then((res) => res.json())
        .then((json) => {
          setPizzas(json);
          setIsLoading(false);
        });
    } else {
      fetch(
        `https://64f5b54f2b07270f705d8ef6.mockapi.io/pizzas?${
          activeCategory > 0 ? `category=${activeCategory}` : ""
        }`
      )
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
  }, [activeCategory, activeSort.sort, direction]);

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
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((key) => {
              return (
                <PizzaBlock
                  key={key.id}
                  title={key.title}
                  // price={key.price}
                  image={key.imageUrl}
                  // sizes={key.sizes
                  types={key.types}
                  activeType={activeType}
                  setActiveType={setActiveType}
                  activeSize={activeSize}
                  setActiveSize={setActiveSize}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Home;
