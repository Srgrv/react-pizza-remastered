import React from "react";

//icon
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

//style
import classes from "./Search.module.scss";

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={classes.root}>
      <span className={classes.search}>
        <BsSearch />
      </span>
      <input
        className={classes.input}
        placeholder="Поиск пиццы..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <span className={classes.close} onClick={() => setSearchValue("")}>
          <AiOutlineClose />
        </span>
      )}
    </div>
  );
};

export default Search;
