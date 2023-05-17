import React from 'react'
import PizzaList from '../../components/PizzaList';
import axios from 'axios';
import AllPizzas from '../../components/AllPizzas';

const Pizzas = ({data}) => {
  return (
    <AllPizzas pizzas={data.data} />
  )
}


export const getServerSideProps = async () => {
    let { data } = await axios.get("http://localhost:3000/api/products");
    console.log(data);
    return {
      props: { data },
    };
  };

export default Pizzas;