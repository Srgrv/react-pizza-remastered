import React from "react";
import { Outlet } from "react-router-dom";

//components
import Header from "./Header";

const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
