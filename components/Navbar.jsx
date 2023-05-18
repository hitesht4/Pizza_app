import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { destroyCookie } from "nookies";

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart);
  const [user] = useAuthState(auth);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Link href="/">
          <a>
            <Image
              src="/img/Tasty.png"
              alt=""
              width="80px"
              height={"80px"}
              cursor={"pointer"}
            />
          </a>
        </Link>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/">
            <a>
              <li className={styles.listItem}>Home</li>
            </a>
          </Link>
          <Link href="/pizzas">
            <a>
              <li className={styles.listItem}>Pizzas</li>
            </a>
          </Link>
          <Link href="/orders">
            <a>
              <li className={styles.listItem}>Orders</li>
            </a>
          </Link>
          {user ? (
            <li
              className={styles.listItem}
              onClick={() => {
                signOut(auth);
                destroyCookie(null, "user");
              }}
            >
              Logout
            </li>
          ) : (
            <Link href="/login">
              <a>
                <li className={styles.listItem}>Login</li>
              </a>
            </Link>
          )}
        </ul>
      </div>
      <div className={styles.item}>
        <Link href={"/cart"}>
          <a>
            <div className={styles.cart}>
              <Image src="/img/cart.png" alt="" width="30px" height="30px" />
              <div className={styles.counter}>{cart.length}</div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
