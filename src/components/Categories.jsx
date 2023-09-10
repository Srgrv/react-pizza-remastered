import React from "react";
import { useSelector, useDispatch } from "react-redux";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories = ({ activeCategory, setActiveCategory }) => {
  const dispatch = useDispatch();
  // const { activeCategory } = useSelector((state) => state.filter);
  // const [active, setActive] = React.useState(0);

  // const setActiveCategory = (index) => {
  //   dispatch(SET_ACTIVE_CATEGORY(index));
  // };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={`${index}_${item}`}
              onClick={() => setActiveCategory(index)}
              className={activeCategory === index ? "active" : ""}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
