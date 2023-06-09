import React from "react";
import axios from "axios";
import AllPizzas from "../../components/AllPizzas";

const Pizzas = ({ data }) => {
  return <AllPizzas pizzas={data.data} />;
};

export const getServerSideProps = async () => {
  let { data } = await axios.get("https://pizza-hitesht4.vercel.app/api/products");
  return {
    props: { data },
  };
};

export default Pizzas;
