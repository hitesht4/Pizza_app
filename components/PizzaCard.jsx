import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";
import Link from "next/link";

const PizzaCard = ({pizza}) => {
  return (
    <Link href={`/product/${pizza._id}`} passHref>
    <div className={styles.container}>
      <Image src={pizza.img} alt="" width="500" height="500" />
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>${pizza.prices[0]}</span>
      <p className={styles.desc}>
        {pizza.desc}
      </p>
    </div>
    </Link>
  );
};

export default PizzaCard;
