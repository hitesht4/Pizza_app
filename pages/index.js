import Head from "next/head";
import Image from "next/image";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import axios from "axios";

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList pizzas={data.data} />
    </div>
  );
}

export const getServerSideProps = async () => {
  let { data } = await axios.get("http://localhost:3000/api/products");
  return {
    props: { data },
  };
};
