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
  // const [active, setActive] = React.useState(0);

  const onClickSetActive = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={`${index}_${item}`}
              onClick={() => onClickSetActive(index)}
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
