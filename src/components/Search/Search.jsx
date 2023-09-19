import React from "react";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";

//icon
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

//style
import classes from "./Search.module.scss";

//reducers
import {
  SET_SEARCH_VALUE,
  SET_ACTIVE_CATEGORY,
  SET_VALUE,
} from "../../redux/slices/filterSlice";

const Search = ({ setSearchParams }) => {
  const dispatch = useDispatch();
  const {
    searchValue,
    activeSort,
    activeCategory,
    pizzasPerPage,
    currentPage,
    direction,
    value,
  } = useSelector((state) => state.filter);

  const setValue = (value) => {
    dispatch(SET_VALUE(value));
  };

  const createParams = (
    sortBy = activeSort.sort,
    category = activeCategory,
    limit = pizzasPerPage,
    page = currentPage,
    search = searchValue,
    order = direction ? "desc" : "asc"
  ) => {
    const params = {};

    //search
    if (search && sortBy !== "price") {
      dispatch(SET_ACTIVE_CATEGORY(0));
      params.search = search;
      params.sortBy = sortBy;
      params.order = order;
      params.limit = limit;
      params.page = page;
    } else if (search && sortBy === "price") {
      dispatch(SET_ACTIVE_CATEGORY(0));
      params.search = search;
      params.order = order;
      params.limit = limit;
      params.page = page;
    } else if (!search && sortBy !== "price") {
      dispatch(SET_ACTIVE_CATEGORY(0));
      params.order = order;
      params.limit = limit;
      params.page = page;
      params.sortBy = sortBy;
    } else if (!search && sortBy === "price") {
      dispatch(SET_ACTIVE_CATEGORY(0));
      params.order = order;
      params.limit = limit;
      params.page = page;
    }

    setSearchParams(params);
  };

  const setSearchValue = (searchValue) => {
    dispatch(SET_SEARCH_VALUE(searchValue));
    createParams(
      activeSort.sort,
      activeCategory,
      pizzasPerPage,
      currentPage,
      searchValue
    );
  };

  // const [value, setValue] = React.useState("");
  const inputRef = React.useRef("");

  const onClickClear = () => {
    setValue("");
    setSearchValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 500),

    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={classes.root}>
      <span className={classes.search}>
        <BsSearch />
      </span>
      <input
        ref={inputRef}
        className={classes.input}
        placeholder="Поиск пиццы..."
        value={value}
        onChange={(e) => onChangeInput(e)}
      />
      {searchValue && (
        <span className={classes.close} onClick={onClickClear}>
          <AiOutlineClose />
        </span>
      )}
    </div>
  );
};

export default Search;
