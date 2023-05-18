import Link from "next/link";
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const AllPizzas = ({ pizzas }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BESTSELLER PIZZAS IN TOWN</h1>
      <p className={styles.desc}>
        Get your hands on some delicious pizza in minutes. Which means you can
        spend less time cooking and more time relaxing..
      </p>
      <div className={styles.wrapper}>
        {pizzas.map((pizza) => {
          return <PizzaCard key={pizza._id} pizza={pizza} />;
        })}
      </div>
    </div>
  );
};

export default AllPizzas;
