import React from "react";
import "./App.css";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

//pages

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

//components

import Layout from "./components/Layout";

function App() {
  const [searchParams, setSearchParams] = useSearchParams(
    "?order=desc&sortBy=rating&limit=4&page=1"
  );
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

//react-pizza-v2, №8 - 27:55
