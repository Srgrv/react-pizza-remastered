import React from "react";
import "./App.css";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

//pages

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";

//components

import Layout from "./components/Layout";

function App() {
  const [searchParams, setSearchParams] = useSearchParams("");
  return (
    <Routes>
      <Route path="/" element={<Layout setSearchParams={setSearchParams} />}>
        <Route
          index
          element={
            <Home
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          }
        />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

//react-pizza-v2, №8 - 27:55
