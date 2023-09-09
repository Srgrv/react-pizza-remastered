import React from "react";
import "./App.css";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";

//pages

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

//components

import Layout from "./components/Layout";

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout searchValue={searchValue} setSearchValue={setSearchValue} />
        }
      >
        <Route index element={<Home searchValue={searchValue} />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

//react-pizza-v2, №8 - 27:55
