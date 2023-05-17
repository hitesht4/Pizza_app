import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Link href="/">
           <Image src="/img/Tasty.png" alt="" width="80px" height={"80px"}cursor={"pointer"}/>
        </Link>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/">
            <li className={styles.listItem}>Home</li>
          </Link>
          <Link href="/pizzas">
            <li className={styles.listItem}>Pizzas</li>
          </Link>
          <Link href="/orders">
            <li className={styles.listItem}>Orders</li>
          </Link>
          <Link href="/login">
            <li className={styles.listItem}>Login</li>
          </Link>
        </ul>
      </div>
      <div className={styles.item}>
        <Link href={"/cart"}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{cart.length}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
