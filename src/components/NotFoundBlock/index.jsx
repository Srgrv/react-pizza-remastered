import React from "react";

//style
import classes from "./NotFoundBlock.module.scss";

const index = () => {
  return (
    <div className={classes.container}>
      <h1>
        <span>:(</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={classes.description}>
        К сожалению данная страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
};

export default index;
