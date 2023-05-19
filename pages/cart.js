import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { AiFillDelete } from "react-icons/ai";
import { CalculateTotal, Delete, Reset } from "../redux/cart/cart.types";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const { cart, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleDelete = (id) => {
    dispatch({ type: Delete, payload: id });
  };

  const createCheckoutSession = async () => {
    try {
      let res = await axios.post(
        "http://localhost:3000/api/checkout_sessions",
        { cart }
      );
      window.location = res.data.sessionUrl;
    } catch (e) {
      console.log(e.message);
    }
  };

  const createOrder = async () => {
    if (!user) {
      toast("Login In First", {
        style: {
          background: "red",
          color: "white",
        },
      });
      router.push("/login");
      return;
    }
    if (cart.length <= 0) {
      toast("Your cart was Empty", {
        style: {
          background: "black",
          color: "white",
        },
      });
      router.push("/pizzas");
      return;
    }
    let orderItems = cart.map((item) => ({
      id: item.id,
      title: item.title,
      img: item.img,
      price: item.price,
    }));
    let order = {
      customer: localStorage.getItem("user"),
      total: total,
      paymentMethod: "Card",
      items: [...orderItems],
    };
    try {
      await axios.post("http://localhost:3000/api/orders", order);
      await createCheckoutSession();
      dispatch({ type: Reset });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    dispatch({ type: CalculateTotal, payload: total });
  }, [cart,router,dispatch,total]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {cart.length > 0 ? (
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.trTitle}>
                <th>Product</th>
                <th>Name</th>
                <th className={styles.extraCol}>Extras</th>
                <th>Price</th>
                <th className={styles.Quant}>Quantity</th>
                <th>Delete</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                return (
                  <tr className={styles.tr} key={index}>
                    <td>
                      <div className={styles.imgContainer}>
                        <Image
                          src={item.img}
                          layout="fill"
                          objectFit="cover"
                          alt=""
                        />
                      </div>
                    </td>
                    <td>
                      <span className={styles.name}>{item.title}</span>
                    </td>
                    <td className={styles.extraCol}>
                      {item.extras.length === 0 ? (
                        <p>None</p>
                      ) : (
                        <p className={styles.extras}>
                          {item.extras.map((i, index) => (
                            <span key={index}>{i}</span>
                          ))}
                        </p>
                      )}
                    </td>
                    <td>
                      <span className={styles.price}>${item.price}</span>
                    </td>
                    <td className={styles.Quant}>
                      <span className={styles.quantity}>{item.qty}</span>
                    </td>
                    <td>
                      <span
                        className={styles.delete}
                        onClick={() => handleDelete(item.id)}
                      >
                        <AiFillDelete style={{ fontSize: "1.5rem" }} />
                      </span>
                    </td>
                    <td>
                      <span className={styles.total}>${item.total}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1>Your Cart is Empty</h1>
        )}
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${total}
          </div>
          <button className={styles.button} onClick={createOrder}>
            CHECKOUT NOW!
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Cart;
