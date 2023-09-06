import React from "react";

const PizzaBlock = ({
  title,
  image,
  types,
  // activeType,
  // setActiveType,
  // activeSize,
  // setActiveSize,
}) => {
  const typeNames = ["тонкое", "традиционное"];
  const [value, setValue] = React.useState(0);

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const set_value = () => {
    setValue(value + 1);
  };

  const set_active_type = (index) => {
    setActiveType(index);
  };

  const set_active_size = (index) => {
    setActiveSize(index);
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={image} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {Object.values(types).map((item, index) => {
            return (
              <li
                key={`${item}_${index}`}
                className={activeType === index ? "active" : ""}
                onClick={() => set_active_type(index)}
              >
                {typeNames[item.type]}
              </li>
            );
          })}
        </ul>
        <ul>
          {Object.values(types)[activeType].sizes.map((item, index) => (
            <li
              key={`${item}_${index}`}
              className={activeSize === index ? "active" : ""}
              onClick={() => set_active_size(index)}
            >
              {item.size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">
          {Object.values(types)[activeType].sizes[activeSize].price} ₽
        </div>
        <button
          className="button button--outline button--add"
          onClick={set_value}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{value}</i>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;