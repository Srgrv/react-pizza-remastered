import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks";

//reducers
import { ADD_ITEM } from "../redux/slices/pizzasSlice";
import { Link } from "react-router-dom";

interface IPizzaBlock {
  id: number;
  imageUrl: string;
  title: string;
  types: {
    type: number;
    sizes: {
      size: number;
      price: number;
    }[];
  }[];
}

interface ITypes {
  id: number;
  types: ISizes[];
}

interface ISizes {
  type: number;
  sizes: IPizza[];
}

interface IPizza {
  id: number;
  title: string;
  imageUrl: string;
  price: number[];
  type: [number, string];
  size: number[];
  count: number;
}

const PizzaBlock: React.FC<IPizzaBlock> = ({ id, title, imageUrl, types }) => {
  const dispatch = useAppDispatch();

  const addedCount = useAppSelector((state) =>
    state.pizzas.items.find((obj) => obj.id === id)
  );

  const count = addedCount
    ? addedCount.types.reduce((a: number, b: any) => {
        return (
          a +
          b.sizes.reduce((a: number, b: any) => {
            return a + b.item.count;
          }, 0)
        );
      }, 0)
    : 0;

  const typeNames: string[] = ["тонкое", "традиционное"];
  // const [value, setValue] = React.useState(0);

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  // const set_value = () => {
  //   setValue(value + 1);
  // };

  const set_active_type = (index: number) => {
    setActiveType(index);
  };

  const set_active_size = (index: number) => {
    setActiveSize(index);
  };

  const addItem = () => {
    let obj = {
      count: 1,
      id,
      title,
      imageUrl,
      price: [activeSize, types[activeType].sizes[activeSize].price],
      type: [activeType, typeNames[activeType]],
      size: [activeSize, types[activeType].sizes[activeSize].size],
    } as IPizza;
    dispatch(ADD_ITEM(obj));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>

      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {Object.values(types).map((item: any, index: number) => {
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
          onClick={addItem}
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
          {count > 0 && <i>{count}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
