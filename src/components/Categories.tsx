import React from "react";

interface ICategory {
  activeCategory: number;
  setActiveCategory: (index: number) => void;
}

type Categories = string[];

const categories: Categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<ICategory> = ({
  activeCategory,
  setActiveCategory,
}) => {
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
