import React from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";

//icons
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";

export const list = [
  { name: "популярности", sort: "rating" },
  { name: "цене", sort: "price" },
  { name: "алфавиту", sort: "title" },
];

const Sort = ({ direction, setDirection, setActiveSort }) => {
  const { activeSort } = useSelector((state) => state.filter);
  const [visible, setVisible] = React.useState(false);

  const sortRef = useRef();

  const set_visible = () => {
    setVisible((visible) => !visible);
  };

  const set_active_sort = ({ name, sort }) => {
    // debugger;
    setActiveSort({ name, sort });
    setVisible(false);
  };

  const handleOutsideClick = (e) => {
    if (!e.composedPath().includes(sortRef.current)) {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
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
                    set_active_sort({ name: obj.name, sort: obj.sort })
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
