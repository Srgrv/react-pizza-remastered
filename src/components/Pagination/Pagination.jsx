import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

//style

import classes from "./Pagination.module.scss";

const Pagination = ({ pageQty = 3, currentPage, setCurrentPage }) => {
  // debugger;
  const number = []; // объявляется массив для работы с пагинацией

  for (let i = 1; i <= pageQty; i++) {
    number.push(i);
  } // создается массив для работы с пагинацией исходя из pageQty (количество страниц, по умолчанию = 3)

  // const [arrOfCurrButton, setArrOfCurrButton] = useState([]); //

  // useEffect(() => {
  // let tempNumberOfPages = [...arrOfCurrButton];
  // if (pageQty > 7) {
  //   let dotsLeft = "... ";
  //   let dotsRight = " ...";

  //   if (currentPage < 5) {
  //     const sliced = number.slice(0, 5);
  //     tempNumberOfPages = [...sliced, dotsRight, number.length];
  //   } else if (currentPage > 3 && currentPage < number.length - 2) {
  //     const sliced1 = number.slice(currentPage - 2, currentPage);
  //     const sliced2 = number.slice(currentPage, currentPage + 1);
  //     tempNumberOfPages = [
  //       1,
  //       dotsLeft,
  //       ...sliced1,
  //       ...sliced2,
  //       dotsRight,
  //       number.length,
  //     ];
  //   } else if (currentPage > number.length - 3) {
  //     const sliced = number.slice(number.length - 5);
  //     tempNumberOfPages = [1, dotsLeft, ...sliced];
  //   } else if (currentPage === dotsRight) {
  //     setCurrentPage(arrOfCurrButton[3] + 2);
  //   } else if (currentPage === dotsLeft) {
  //     setCurrentPage(arrOfCurrButton[3] - 2);
  //   }

  //   setArrOfCurrButton(tempNumberOfPages);
  // } else {
  // debugger;
  // setArrOfCurrButton(number);
  // }
  //   // eslint-disable-next-line
  // }, [currentPage, pageQty]); //зависимость от текущей страницы или (количества страниц - отключено)

  return (
    <div>
      <div className={classes.paginationContainer}>
        <Link
          className={currentPage === 1 ? classes.disabled : ""}
          onClick={() => {
            if (currentPage !== 1) {
              const current = currentPage - 1;
              setCurrentPage(current);
            }
          }}
        >
          Prev
        </Link>

        {number.map((item, index) => {
          return (
            <Link
              // to={`${item}`}
              key={index}
              // href="!#"
              className={currentPage === item ? classes.active : ""}
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </Link>
          );
        })}
        <Link
          onClick={() => {
            debugger;
            if (currentPage !== number.length) {
              const current = currentPage + 1;
              setCurrentPage(current);
            }
          }}
          className={currentPage === number.length ? classes.disabled : ""}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
