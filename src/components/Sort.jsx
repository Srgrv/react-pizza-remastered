import React from "react";
import { useSelector, useDispatch } from "react-redux";

//icons
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";

//reducers
import { SET_ACTIVE_SORT } from "../redux/slices/filterSlice";

const Sort = ({ direction, setDirection }) => {
  const dispatch = useDispatch();
  const { activeSort } = useSelector((state) => state.filter);
  const [visible, setVisible] = React.useState(false);
  // const [selected, setSelected] = React.useState(0);

  const set_visible = () => {
    setVisible((visible) => !visible);
  };

  const setActiveSort = ({ name, sort }) => {
    dispatch(
      SET_ACTIVE_SORT({
        name,
        sort,
      })
    );
    setVisible(false);
  };

  const list = [
    { name: "популярности", sort: "rating" },
    { name: "цене", sort: "price" },
    { name: "алфавиту", sort: "title" },
  ];

  // const onClickSelect = (obj) => {
  //   setActiveSort(obj);
  //   setVisible(false);
  // };

  return (
    <div className="sort">
      <div className="sort__label">
        <div
          onClick={() => {
            setDirection(!direction);
            setVisible(false);
          }}
        >
          {direction ? <BiSolidDownArrow /> : <BiSolidUpArrow />}
        </div>

        <b>Сортировка по:</b>
        <span onClick={set_visible}>{activeSort.name}</span>
      </div>
      {visible && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, index) => {
              return (
                <li
                  key={`${index}_${obj.name}`}
                  className={activeSort.name === obj.name ? "active" : ""}
                  onClick={() =>
                    setActiveSort({ name: obj.name, sort: obj.sort })
                  }
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;

//закончил делать popup через изменение visible
