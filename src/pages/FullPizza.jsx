import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(
      `https://64f5b54f2b07270f705d8ef6.mockapi.io/pizzas/${id}`
    );

    const config = {
      method: "GET",
      headers: { "content-type": "application/json" },
    };

    async function fetchPizza() {
      try {
        const res = await axios.get(url, config);
        setPizza(res.data);
      } catch (error) {
        alert("Ошибка получения пиццы");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return "Загрузка....";
  }

  return (
    <div className="container">
      <h1>{pizza.title}</h1>
      <img src={pizza.imageUrl} />
      <h2>pizza №{id}</h2>
    </div>
  );
};

export default FullPizza;
