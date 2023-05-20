import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth);
    destroyCookie(null, "user");
    router.push("/");
    toast("Logged Out Successfully", {
      style: {
        background: "green",
        color: "white",
      },
    });
  };
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
          <li className={styles.listItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={`${styles.listItem}`}>
            {" "}
            <Link href="/pizzas">
              <a>Pizzas</a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
          </li>
          <li className={`${styles.listItem} ${styles.cartLink}`}>
            <Link href="/cart" className={styles.cartLink}>
              <a>Cart</a>
            </Link>
          </li>

          {user ? (
            <li className={styles.listItem} onClick={handleLogout}>
              Logout
            </li>
          ) : (
            <li className={styles.listItem}>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
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
      <Toaster />
    </div>
  );
};

export default Navbar;
