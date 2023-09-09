import React from "react";
import { Outlet } from "react-router-dom";

//components
import Header from "./Header";

const Layout = ({ searchValue, setSearchValue }) => {
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
