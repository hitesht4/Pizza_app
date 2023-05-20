import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import axios from "axios";

export default function Home({data}) {
  return (
    <div>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/img/Tasty.png" />
      </Head>
      <Featured />
      <PizzaList pizzas={data}/>
    </div>
  );
}

export const getServerSideProps=async()=>{
  let {data}=await axios.get("https://pizza-hitesht4.vercel.app/api/products/featured");
  return {
    props:{
      data
    }
  }

}
