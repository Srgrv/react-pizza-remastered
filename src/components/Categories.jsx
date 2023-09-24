import React from "react";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories = ({ activeCategory, setActiveCategory }) => {
  debugger;
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={`${index}_${item}`}
              onClick={() => {
                setActiveCategory(index);
              }}
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
