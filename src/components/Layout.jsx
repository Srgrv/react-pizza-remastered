import React from "react";
import { Outlet } from "react-router-dom";

//components
import Header from "./Header";

const Layout = ({ setSearchParams }) => {
  return (
    <div className="wrapper">
      <Header setSearchParams={setSearchParams} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
